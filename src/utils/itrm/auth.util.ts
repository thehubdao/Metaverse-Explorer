import axios from 'axios';
import {verifyMessage, WalletClient} from 'viem';
import {Module} from '../../enums/logging.enum';
import {LogError} from "../logging.util";
import {Raise} from "../common.util";
import {Result} from "../../types/common.type";
import { TokenData } from '../../interfaces/itrm/auth.interface';

interface NonceResponse {
  nonce: number;
}

export async function AuthConnect(client: WalletClient): Promise<Result<TokenData>> {
  try {
    const [account] = await client.getAddresses();
    const nonceResponse = await GetNonce(account);
    if (!nonceResponse.success) return nonceResponse;
        
    const message = `${nonceResponse.value.nonce}`;
    const signature = await client.signMessage({
      account: account,
      message: message,
    });
    
    const signedAddress = await verifyMessage({
      address: account,
      message: message,
      signature: signature
    });
    
    if (!signedAddress) return {success: false, errMessage: "Couldn't verify the nonce!"};
    
    return SendSignedNonce(account, signature);
  } catch (err) {
    const msg = "Auth service connect has failed";
    LogError(Module.AuthService, msg, err);
    return {success: false, errMessage: msg};
  }
}

async function GetNonce(address: string): Promise<Result<NonceResponse>> {
  try {
    const itrmAuthUrl = process.env.NEXT_PUBLIC_AUTH_SERVICE ?? Raise("Missing AuthService env variable!");
    
    const result = await axios.get<NonceResponse>(`${itrmAuthUrl}/authService/getNonce`, {
      params: {
        address
      }
    });
    return {success: true, value: result.data};
  }
  catch (err) {
    const msg = "Error fetching nonce!"
    LogError(Module.ITRMAuth, msg, err);
    return {success: false, errMessage: msg};
  }
}

async function SendSignedNonce(address: string, signedNonce: string): Promise<Result<TokenData>> {
  try {
    const itrmAuthUrl = process.env.NEXT_PUBLIC_AUTH_SERVICE ?? Raise("Missing AuthService env variable!");
    
    const result = await axios.post<TokenData>(`${itrmAuthUrl}/authService/loginWallet?address=${address}&signature=${signedNonce}`,
      {},
      {
        withCredentials: true,
        headers: {'Content-Type': 'application/json'}
      }
    );
    
    return {success: true, value: result.data};
  }
  catch (err) {
    const msg = "Error getting SignedNonce!";
    LogError(Module.ITRMAuth, msg, err);
    return {success: false, errMessage: msg};
  }
}
