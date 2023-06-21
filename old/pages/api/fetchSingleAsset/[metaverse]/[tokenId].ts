import type { NextApiRequest, NextApiResponse } from 'next'

// Fetch Single Asset from Open Sea.
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const tokenId = req.query.tokenId
  const metaverse = req.query.metaverse
  try {
    const response = await fetch(
      `https://api.opensea.io/api/v1/asset/${metaverse}/${tokenId}/listings?limit=20`,
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
