import { Currencies } from "../enums/common";

//* Function to fetch currency data from the Coingecko API.
export const fetchCurrencyData = async () => {
  // Base URL for the Coingecko API
  const API_BASE_URL = 'https://api.coingecko.com/api/v3';

  try {
    // Fetch currency data for Ethereum and USDCoin against USD
    const response: Response = await fetch(`${API_BASE_URL}/simple/price?ids=ethereum,usd-coin&vs_currencies=usd`);

    // Check if the response status indicates success (HTTP 200 OK)
    if (!response.ok) throw new Error('Failed to fetch currency data');

    const data = await response.json() as { ethereum: { usd: number }, 'usd-coin': { usd: number } };

    // Extract the values for Ethereum and USDCoin
    const ethereumValue: number = data.ethereum.usd;
    const usdCoinValue: number = data['usd-coin'].usd;

    // Return an object with the currency values
    return {
      [Currencies.Ethereum]: ethereumValue,
      [Currencies.USDCoin]: usdCoinValue,
    };
  } catch (error) {
    // If an error occurs during the fetch or data is missing, log the error and return null
    console.error('Error fetching currency data:', error);
    return null;
  }
};
