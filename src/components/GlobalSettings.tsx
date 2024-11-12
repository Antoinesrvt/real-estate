// New file: src/components/GlobalSettings.jsx
import React from "react";
import { Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export const GlobalSettings = ({
  currency,
  setCurrency,
  country,
  setCountry,
}) => {
  const currencies = [
    { code: "USD", symbol: "$", name: "US Dollar" },
    { code: "EUR", symbol: "€", name: "Euro" },
    { code: "GBP", symbol: "£", name: "British Pound" },
    { code: "JPY", symbol: "¥", name: "Japanese Yen" },
    // Add more currencies
  ];

  const countries = [
    { code: "US", name: "United States", taxRate: 25 },
    { code: "UK", name: "United Kingdom", taxRate: 20 },
    { code: "FR", name: "France", taxRate: 30 },
    { code: "DE", name: "Germany", taxRate: 27.5 },
    // Add more countries
  ];

  return (
    <Card className="mb-6">
      <CardHeader className="bg-gray-50">
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5" />
          Global Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Currency
            </label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full p-2 border rounded-lg"
            >
              {currencies.map((curr) => (
                <option key={curr.code} value={curr.code}>
                  {curr.symbol} - {curr.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Country
            </label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full p-2 border rounded-lg"
            >
              {countries.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name} (Tax Rate: {c.taxRate}%)
                </option>
              ))}
            </select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
