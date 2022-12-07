export const fetchNonce = async (address: string) => {
  const nonceRes = await fetch(
    process.env.ITRM_SERVICE + '/mgh-login/login/nonce',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        address,
      }),
    }
  )
  return await nonceRes.json()
}

export const sendSignedNonce = async (signedNonce: string, address: string) => {
  const loginRes = await fetch(
    process.env.ITRM_SERVICE +'/mgh-login/login/login',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        signature: signedNonce,
        address: address,
      }),
    }
  )
  return await loginRes.json()
}
