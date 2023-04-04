import axios from "axios"

export const fetchNonce = async (address: string) => {
  const nonceRes = await fetch(
    `${process.env.AUTH_SERVICE}/authService/getNonce?address=${address}`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }
  )
  return await nonceRes.json()
}

export const sendSignedNonce = async (signedNonce: string, address: string) => {
  const loginRes = await axios.post(
    `${process.env.AUTH_SERVICE}/authService/loginWallet?address=${address}&signature=${signedNonce}`, {},
    {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },

    }
  )
  const accessToken = await loginRes.data

  return { accessToken }
}
