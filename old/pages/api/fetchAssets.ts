import type { NextApiRequest, NextApiResponse } from 'next'

// Fetch Assets from OpenSea. So Far Open Sea returns up to 50 results per request
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const wallet = req.body.wallet
  const assetContract = req.body.assetContract
  try {
    const response = await fetch(
      `https://api.opensea.io/api/v1/assets?owner=${wallet}&asset_contract_address=${assetContract}&order_direction=desc&offset=0&limit=50`,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': process.env.OPENSEA!,
        },
      }
    )
    const data = await response.json()
    res.status(200).json(data)
  } catch (err) {
    res.status(400).json(err)
  }
}
