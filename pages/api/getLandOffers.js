export default async function handler(req, res) {
	const tokenID = req.query.tokenID;
	const metaverse = req.query.metaverse;
	const X = req.query.X;
	const Y = req.query.Y;
	const flag = req.query?.flag;
	let response;
	try {
		if (flag) {
			response = await fetch(
				`https://api.opensea.io/api/v1/asset/${metaverse}/${tokenID}/offers`,
				{
					headers: {
						"Content-Type": "application/json",
						"X-API-KEY": process.env.OPENSEA,
					},
				}
			);
		} else if (tokenID) {
			response = await fetch(
				`${process.env.ITRM_SERVICE}/${metaverse}/predict?tokenId=${tokenID}`,
			);
		} else {
			response = await fetch(
				`${process.env.ITRM_SERVICE}/${metaverse}/predict?x=${X}&y=${Y}`,
			);
		}

		const data = await response.json();
		res.json({ ...data, metaverse });
	} catch (err) {
		res.status(400).json(err);
	}
}
