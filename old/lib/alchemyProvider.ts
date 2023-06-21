import { Network, Alchemy } from 'alchemy-sdk';

// Optional Config object, but defaults to demo api-key and eth-mainnet.
const ethereumSettings = {
  apiKey: process.env.ALCHEMY_API_KEY, // Replace with your Alchemy API Key.
  network: Network.ETH_MAINNET, // Replace with your network.
};

async function main(address: string) {
  const alchemy = new Alchemy(ethereumSettings);

  const baycAddress = '0x5cc5b05a8a13e3fbdb0bb9fccd98d38e50f90c38';

  for await (const nft of alchemy.nft.getNftsForContractIterator(baycAddress, {
    // Omit the NFT metadata for smaller payloads.
    omitMetadata: true,
  })) {
    await alchemy.nft
      .getOwnersForNft(nft.contract.address, nft.tokenId)
      .then((response) => {
        response.owners.map((owner) => {
          if (owner === address) {
            //console.log("owners:", response.owners, "tokenId:", nft.tokenId)
          }
        })
      });
  }
}

export const printAlchemy = (address: string) => {
  main(address)
}