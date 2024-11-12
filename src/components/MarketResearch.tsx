import React, { useState } from "react";
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
  Building2,
  DollarSign,
  Home,
  Users,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
// import { useDebouncedCallback } from 'use-debounce';

interface MarketTrends {
  priceHistory: { month: string; price: number; rental: number; inventory: number }[];
  metrics: {
    avgPrice: number;
    priceChange: number;
    avgRental: number;
    rentalChange: number;
    daysOnMarket: number;
    inventory: number;
  };
}

interface LocationComparison {
  area: string;
  price: number;
  rental: number;
  appreciation: number;
}

interface PropertyType {
  type: string;
  inventory: number;
  trend: "up" | "down";
  change: number;
}

interface MarketResearchContentProps {
  currency?: string;
}

const MarketResearchContent: React.FC<MarketResearchContentProps> = ({ currency = "USD" }) => {
  const [selectedLocation] = useState<string>("downtown");
  const [timeRange, setTimeRange] = useState<string>("1y");
  // const [suggestions, setSuggestions] = useState<any[]>([]);

  // Sample data - would come from API in production
  const marketTrends: Record<string, MarketTrends> = {
    downtown: {
      priceHistory: [
        { month: "Jan", price: 320, rental: 1800, inventory: 145 },
        { month: "Feb", price: 325, rental: 1850, inventory: 132 },
        { month: "Mar", price: 335, rental: 1900, inventory: 128 },
        { month: "Apr", price: 340, rental: 1950, inventory: 115 },
        { month: "May", price: 345, rental: 2000, inventory: 98 },
        { month: "Jun", price: 355, rental: 2100, inventory: 87 },
      ],
      metrics: {
        avgPrice: 355000,
        priceChange: 8.5,
        avgRental: 2100,
        rentalChange: 12.3,
        daysOnMarket: 28,
        inventory: 87,
      },
    },
  };

  const locationComparison: LocationComparison[] = [
    { area: "Downtown", price: 355000, rental: 2100, appreciation: 8.5 },
    { area: "Suburbs", price: 285000, rental: 1700, appreciation: 6.2 },
    { area: "Waterfront", price: 425000, rental: 2400, appreciation: 9.8 },
    {
      area: "Business District",
      price: 380000,
      rental: 2200,
      appreciation: 7.9,
    },
  ];

  const propertyTypes: PropertyType[] = [
    { type: "Apartment", inventory: 234, trend: "up", change: 5.2 },
    { type: "House", inventory: 156, trend: "down", change: -2.8 },
    { type: "Condo", inventory: 189, trend: "up", change: 3.4 },
    { type: "Commercial", inventory: 78, trend: "up", change: 7.6 },
  ];

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
    }).format(value);
  };

  const currentMetrics = marketTrends[selectedLocation].metrics;

  // const handleLocationSearch = useDebouncedCallback(async (searchTerm: string) => {
  //   try {
  //     // Using Google Places Autocomplete API
  //     const response = await fetch(
  //       `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${searchTerm}&types=(cities)&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}`
  //     );
  //     const data = await response.json();
  //     // Update location suggestions
  //     setSuggestions(data.predictions);
  //   } catch (error) {
  //     console.error('Error fetching locations:', error);
  //   }
  // }, 300);

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
              <LineChart data={marketTrends[selectedLocation].priceHistory}>
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
                      ? formatCurrency(value * 1000)
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
                  name="Price (K)"
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

      {/* Location Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Location Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={locationComparison}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-50" />
                <XAxis dataKey="area" />
                <YAxis />
                <Tooltip
                  formatter={(value: number, name: string) => [
                    name === "price"
                      ? formatCurrency(value)
                      : name === "rental"
                      ? formatCurrency(value)
                      : `${value}%`,
                    name.charAt(0).toUpperCase() + name.slice(1),
                  ]}
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                />
                <Legend />
                <Bar dataKey="price" fill="#3b82f6" name="Average Price" />
                <Bar dataKey="rental" fill="#10b981" name="Average Rental" />
                <Bar
                  dataKey="appreciation"
                  fill="#6366f1"
                  name="Appreciation %"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Property Type Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Property Type Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {propertyTypes.map((property) => (
              <div key={property.type} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">{property.type}</h3>
                  <span
                    className={`flex items-center ${
                      property.trend === "up"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {property.trend === "up" ? (
                      <ArrowUpRight className="h-4 w-4" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4" />
                    )}
                    {Math.abs(property.change)}%
                  </span>
                </div>
                <p className="text-2xl font-bold">{property.inventory}</p>
                <p className="text-sm text-gray-500">Available Units</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketResearchContent;
