export default async function handler(req, res) {
  const tokenID = req.body.tokenID
  const metaverse = req.body.metaverse
  const X = req.body.X
  const Y = req.body.Y
  let response
  try {
    tokenID ?
      response = await fetch(`${process.env.ITRM_SERVICE}/${metaverse}/predict?tokenId=${tokenID}`) :
      response = await fetch(`${process.env.ITRM_SERVICE}/${metaverse}/predict?x=${X}&y=${Y}`)
    const data = await response.json()
    res.json({ ...data, metaverse })
  } catch (err) {
    res.status(400).json(err)
  }
}

