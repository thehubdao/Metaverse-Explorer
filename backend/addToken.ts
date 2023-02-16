const tokenSymbol = 'MGH';
const tokenDecimals = 18;
const tokenImage = 'https://app.metagamehub.io/images/mgh_logo.png';


const addTokenToWallet = async (signer: any, address: string) => {
    try {
        // wasAdded is a boolean. Like any RPC method, an error may be thrown.
        await signer.request({
            method: 'wallet_watchAsset',
            params: {
                type: 'ERC20', // Initially only supports ERC20, but eventually more!
                options: {
                    address: address, // The address that the token is at.
                    symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
                    decimals: tokenDecimals, // The number of decimals in the token
                    image: tokenImage, // A string url of the token logo
                },
            },
        });

    } catch (error) {
        console.log(error);
    }
}

export default addTokenToWallet
