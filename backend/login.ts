import axios from "axios"

export const fetchNonce = async (address: string) => {
  const nonceRes = await fetch(
    `${process.env.ITRM_SERVICE}/authService/getNonce?address=${address}`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }
  )
  return await nonceRes.json()
}

export const sendSignedNonce = async (signedNonce: string, address: string) => {
  const loginRes = await axios.post(
    `${process.env.ITRM_SERVICE}/authService/loginWallet?address=${address}&signature=${signedNonce}`, {},
    {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },

    }
  )
  const accessToken = await loginRes.data
  const { token } = accessToken
  const decodeRes = await axios.get(
    `${process.env.ITRM_SERVICE}/authService/decodeToken`,
    {
      headers: {
        'Content-Type': 'application/json',
        'Authentication': `${token}`
      },
    }
  )
  const decodedToken = await decodeRes.data

  return { accessToken, decodedToken }
}
