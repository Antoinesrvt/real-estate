import React, { useEffect, useState } from 'react';
import { MarketData, getMarketData } from '../lib/marketData';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import {
  Search,
  MapPin,
  TrendingUp,
  Building2,
  DollarSign,
  Home,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  ArrowRight,
} from "lucide-react";
import { useDebouncedCallback } from "use-debounce";

interface MarketResearchContentProps {
  currency?: string;
}

const MarketResearchContent: React.FC<MarketResearchContentProps> = ({
  currency = "EUR",
}) => {
  const [marketData, setMarketData] = useState<MarketData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string>("Bordeaux");
  const [timeRange, setTimeRange] = useState<string>("1y");
  const [suggestions, setSuggestions] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = await getMarketData(selectedLocation);
        setMarketData(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch market data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [selectedLocation]);

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
    }).format(value);
  };

  const handleLocationSearch = useDebouncedCallback(async (searchTerm: string) => {
    try {
      // Using Google Places Autocomplete API
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${searchTerm}&types=(cities)&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}`
      );
      const data = await response.json();
      // Update location suggestions
      setSuggestions(data.predictions);
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  }, 300);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !marketData) {
    return <div>Error: {error || 'Failed to load market data'}</div>;
  }

  const currentMetrics = marketData.metrics;

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card className="bg-white">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for a location..."
                  className="w-full pl-10 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => handleLocationSearch(e.target.value)}
                />
              </div>
            </div>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="6m">6 Months</option>
              <option value="1y">1 Year</option>
              <option value="2y">2 Years</option>
              <option value="5y">5 Years</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Market Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">Average Price</p>
                <p className="text-2xl font-bold">
                  {formatCurrency(currentMetrics.avgPrice)}
                </p>
                <p
                  className={`text-sm flex items-center mt-1 ${
                    currentMetrics.priceChange >= 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {currentMetrics.priceChange >= 0 ? (
                    <ArrowUpRight className="h-4 w-4" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4" />
                  )}
                  {Math.abs(currentMetrics.priceChange)}% year over year
                </p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">Average Rental</p>
                <p className="text-2xl font-bold">
                  {formatCurrency(currentMetrics.avgRental)}
                </p>
                <p
                  className={`text-sm flex items-center mt-1 ${
                    currentMetrics.rentalChange >= 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {currentMetrics.rentalChange >= 0 ? (
                    <ArrowUpRight className="h-4 w-4" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4" />
                  )}
                  {Math.abs(currentMetrics.rentalChange)}% year over year
                </p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <Home className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">Days on Market</p>
                <p className="text-2xl font-bold">
                  {currentMetrics.daysOnMarket}
                </p>
                <p className="text-sm text-gray-500 mt-1">Avg. time to sell</p>
              </div>
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">Available Properties</p>
                <p className="text-2xl font-bold">{currentMetrics.inventory}</p>
                <p className="text-sm text-gray-500 mt-1">Active listings</p>
              </div>
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Building2 className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Market Trends Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Market Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={marketData.priceHistory}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-50" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" orientation="left" stroke="#3b82f6" />
                <YAxis yAxisId="right" orientation="right" stroke="#10b981" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                  formatter={(value: number, name: string) => [
                    name === "price"
                      ? formatCurrency(value)
                      : name === "rental"
                      ? formatCurrency(value)
                      : value,
                    name.charAt(0).toUpperCase() + name.slice(1),
                  ]}
                />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="price"
                  stroke="#3b82f6"
                  name="Price"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="rental"
                  stroke="#10b981"
                  name="Rental"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="inventory"
                  stroke="#6366f1"
                  name="Inventory"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Location Comparison and Property Type Analysis sections can be added here */}
      {/* These sections would need to be updated to use real data from the API */}
      {/* ... */}

    </div>
  );
};

export default MarketResearchContent;
