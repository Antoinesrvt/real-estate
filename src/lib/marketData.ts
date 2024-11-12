import axios from 'axios';

export interface MarketData {
  priceHistory: Array<{
    month: string;
    price: number;
    rental: number;
    inventory: number;
  }>;
  metrics: {
    avgPrice: number;
    priceChange: number;
    avgRental: number;
    rentalChange: number;
    daysOnMarket: number;
    inventory: number;
  };
}

export async function getMarketData(location: string = 'Bordeaux'): Promise<MarketData> {
  const options = {
    method: 'GET',
    url: 'https://rentola.p.rapidapi.com/listings/search',
    params: {
      location: location,
      country: 'fr'
    },
    headers: {
      'X-RapidAPI-Key': process.env.RENTOLA_API_KEY,
      'X-RapidAPI-Host': 'rentola.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    const listings = response.data.data;

    // Process the data to fit our MarketData interface
    const priceHistory = generatePriceHistory(listings);
    const metrics = calculateMetrics(listings);

    return {
      priceHistory,
      metrics
    };
  } catch (error) {
    console.error('Error fetching market data:', error);
    throw error;
  }
}

export interface Listing {
  price: number;
  rent: number;
  created_at: string; // Assuming this is a date string
  // Add any other relevant fields from the listings data
}

function generatePriceHistory(listings: Listing[]): MarketData['priceHistory'] {
  const last12Months = Array.from({ length: 12 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    return date.toISOString().slice(0, 7); // YYYY-MM format
  }).reverse();

  return last12Months.map(month => ({
    month,
    price: calculateAveragePrice(listings),
    rental: calculateAverageRental(listings),
    inventory: listings.length
  }));
}

function calculateMetrics(listings: Listing[]): MarketData['metrics'] {
  const avgPrice = calculateAveragePrice(listings);
  const avgRental = calculateAverageRental(listings);

  return {
    avgPrice,
    priceChange: 0, // Would require historical data
    avgRental,
    rentalChange: 0, // Would require historical data
    daysOnMarket: calculateAverageDaysOnMarket(listings),
    inventory: listings.length
  };
}

function calculateAveragePrice(listings: Listing[]): number {
  const prices = listings.map(l => l.price).filter(p => p > 0);
  return prices.length ? Math.round(prices.reduce((a, b) => a + b) / prices.length) : 0;
}

function calculateAverageRental(listings: Listing[]): number {
  const rentals = listings.map(l => l.rent).filter(r => r > 0);
  return rentals.length ? Math.round(rentals.reduce((a, b) => a + b) / rentals.length) : 0;
}

function calculateAverageDaysOnMarket(listings: Listing[]): number {
  const now = new Date();
  const daysOnMarket = listings.map(l => {
    const listDate = new Date(l.created_at);
    return Math.round((now.getTime() - listDate.getTime()) / (1000 * 60 * 60 * 24));
  });
  return Math.round(daysOnMarket.reduce((a, b) => a + b) / daysOnMarket.length);
}
