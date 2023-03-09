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
  const loginRes = await fetch(
    `${process.env.ITRM_SERVICE}/authService/loginWallet?address=${address}&signature=${signedNonce}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }
  )
  const accessToken = await loginRes.json()
  const { token } = accessToken
  const decodeRes = await fetch(
    `${process.env.ITRM_SERVICE}/authService/loginWallet`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authentication': `Bearer ${token}`
      },
    }
  )
  const decodedToken = await decodeRes.json()

  return { accessToken, decodedToken }
}
