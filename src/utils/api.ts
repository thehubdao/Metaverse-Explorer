import { Currencies } from "../enums/common.enum";

//* Function to fetch currency data from the Coingecko API.
export const fetchCurrencyData = async () => {
  // Base URL for the Coingecko API
  const API_BASE_URL = 'https://api.coingecko.com/api/v3';

  try {
    // Fetch currency data for Ethereum and USDCoin against USD
    const response = await fetch(`${API_BASE_URL}/simple/price?ids=ethereum,usd-coin&vs_currencies=usd`);
    const data = await response.json();

    // Extract the values for Ethereum and USDCoin
    const ethereumValue = data.ethereum.usd;
    const usdCoinValue = data['usd-coin'].usd;

    // Return an object with the currency values
    return {
      [Currencies.Ethereum]: ethereumValue,
      [Currencies.USDCoin]: usdCoinValue,
    };
  } catch (error) {
    // If an error occurs during the fetch, log the error and return null
    console.error('Error fetching currency data:', error);
    return null;
  }
};
