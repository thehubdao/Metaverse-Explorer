import axios from "axios"

export const fetchNonce = async (address: string) => {
  const nonceRes = await axios.get(
    `${process.env.AUTH_SERVICE}/authService/getNonce?address=${address}`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }
  )
  console.log(nonceRes,  nonceRes.data)
  return await nonceRes.data
}

export const sendSignedNonce = async (signedNonce: string, address: string) => {
  const loginRes = await axios.post(
    `${process.env.AUTH_SERVICE}/authService/loginWallet?address=${address}&signature=${signedNonce}`, {},
    {
      headers: { 'Content-Type': 'application/json',
      
       },

    }
  )
  const accessToken = await loginRes.data

  return { accessToken }
}
