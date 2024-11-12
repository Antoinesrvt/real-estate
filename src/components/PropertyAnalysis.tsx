"use client";
import React, { useState } from "react";
import {
  PlusCircle,
  Trash2,
  Calculator,
  Building2,
  DollarSign,
  Copy,
  Edit2,
  Check,
  X,
  Home,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useQueryStates, parseAsString, createParser } from "nuqs";

// Types and Interfaces
interface RentalUnit {
  id: number;
  name: string;
  monthlyReturn: string;
  recurringCosts: string;
  isLocked: boolean;
}

interface NewUnit {
  name: string;
  monthlyReturn: string;
  recurringCosts: string;
}

interface ChartDataPoint {
  month: number;
  investment: number;
  returns: number;
}

interface CalculationResult {
  totalInvestment: number;
  monthlyNetReturn: number;
  yearlyReturn: number;
  roi: number;
  breakEvenMonths: number;
  chartData: ChartDataPoint[];
}

interface SaleAnalysisYear {
  year: number;
  propertyValue: number;
  cumulativeRentalIncome: number;
  totalReturn: number;
  annualizedReturn: number;
  comparedToCityAverage: number;
  roi: number;
}

const parseAsRentalUnits = createParser<RentalUnit[]>({
  parse(queryValue: string) {
    try {
      const parsed = JSON.parse(queryValue);
      if (!Array.isArray(parsed)) return [];
      return parsed.map((unit: RentalUnit) => ({
        // Specify RentalUnit type instead of any
        id: Number(unit.id),
        name: String(unit.name),
        monthlyReturn: String(unit.monthlyReturn),
        recurringCosts: String(unit.recurringCosts),
        isLocked: Boolean(unit.isLocked),
      }));
    } catch {
      return [];
    }
  },
  serialize(value: RentalUnit[]) {
    return JSON.stringify(value);
  },
}).withDefault([]);

const RealEstateCalculator: React.FC = () => {
  // Separate persistent URL states from temporary UI states
  const [states, setStates] = useQueryStates({
    baseInvestment: parseAsString.withDefault(""),
    renovationCost: parseAsString.withDefault(""),
    units: parseAsRentalUnits,
    marketAppreciation: parseAsString.withDefault(""),
    cityAverageReturn: parseAsString.withDefault(""),
  });

  // Local UI states that don't need URL persistence
  const [editingUnit, setEditingUnit] = useState<RentalUnit | null>(null);
  const [calculationResult, setCalculationResult] =
    useState<CalculationResult | null>(null);
  const [newUnit, setNewUnit] = useState<NewUnit>({
    name: "",
    monthlyReturn: "",
    recurringCosts: "",
  });
  const [saleAnalysis, setSaleAnalysis] = useState<SaleAnalysisYear[] | null>(
    null
  );

  // Destructure the URL states
  const {
    baseInvestment,
    renovationCost,
    units,
    marketAppreciation,
    cityAverageReturn,
  } = states;

  // Update state setter functions
  const resetNewUnit = (): void => {
    setNewUnit({
      name: "",
      monthlyReturn: "",
      recurringCosts: "",
    });
  };

  const addUnit = (): void => {
    if (newUnit.name && newUnit.monthlyReturn) {
      setStates({
        units: [
          ...units,
          {
            ...newUnit,
            id: Date.now(),
            isLocked: true,
          },
        ],
      });
      resetNewUnit();
    }
  };

  // Other state setters remain similar but use the appropriate setState function
  const setUnits = (updatedUnits: RentalUnit[]) => {
    setStates({ units: updatedUnits });
  };

  const duplicateUnit = (unit: RentalUnit): void => {
    const duplicatedUnit: RentalUnit = {
      ...unit,
      id: Date.now(),
      name: `${unit.name} (Copy)`,
    };
    setUnits([...units, duplicatedUnit]);
  };

  const removeUnit = (id: number): void => {
    setUnits(units.filter((unit) => unit.id !== id));
  };

  const startEditing = (unit: RentalUnit): void => {
    setEditingUnit({ ...unit });
  };

// const saveEdit = (): void => {
//   // Remove unused variable warning
//   if (editingUnit) {
//     setUnits(
//       units.map((unit) => (unit.id === editingUnit.id ? editingUnit : unit))
//     );
//     setEditingUnit(null);
//   }
// };

  // Update input handlers
  const handleBaseInvestmentChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStates({ baseInvestment: e.target.value });
  };

  const handleRenovationCostChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStates({ renovationCost: e.target.value });
  };

  const handleMarketAppreciationChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStates({ marketAppreciation: e.target.value });
  };

  const handleCityAverageReturnChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStates({ cityAverageReturn: e.target.value });
  };

  const calculateReturn = (): void => {
    const totalInvestment: number =
      Number(baseInvestment) + Number(renovationCost);
    const monthlyNetReturn: number = units.reduce((acc, unit) => {
      return acc + (Number(unit.monthlyReturn) - Number(unit.recurringCosts));
    }, 0);
    const yearlyReturn: number = monthlyNetReturn * 12;
    const roi: number = (yearlyReturn / totalInvestment) * 100;
    const breakEvenMonths: number = totalInvestment / monthlyNetReturn;

    const chartData: ChartDataPoint[] = Array.from({ length: 121 }, (_, i) => ({
      month: i,
      investment: totalInvestment,
      returns: monthlyNetReturn * i,
    }));

    setCalculationResult({
      totalInvestment,
      monthlyNetReturn,
      yearlyReturn,
      roi,
      breakEvenMonths,
      chartData,
    });
  };

  const analyzeSale = () => {
    const totalInvestment = Number(baseInvestment) + Number(renovationCost);
    const monthlyNetReturn = units.reduce((acc, unit) => {
      return acc + (Number(unit.monthlyReturn) - Number(unit.recurringCosts));
    }, 0);
    const yearlyReturn = monthlyNetReturn * 12;
    const roi = (yearlyReturn / totalInvestment) * 100;

    // Calculate property value appreciation over years
    const appreciationRate = parseFloat(marketAppreciation) / 100;
    const cityReturn = parseFloat(cityAverageReturn) / 100;

    // Generate 10 years of analysis
    const analysis: SaleAnalysisYear[] = Array.from(
      { length: 10 },
      (_, year) => {
        const yearNumber = year + 1;
        const appreciatedValue =
          totalInvestment * Math.pow(1 + appreciationRate, yearNumber);
        const cumulativeRentalIncome = yearlyReturn * yearNumber;
        const totalReturn =
          appreciatedValue + cumulativeRentalIncome - totalInvestment;
        const annualizedReturn =
          (Math.pow(
            (appreciatedValue + cumulativeRentalIncome) / totalInvestment,
            1 / yearNumber
          ) -
            1) *
          100;

        return {
          year: yearNumber,
          propertyValue: appreciatedValue,
          cumulativeRentalIncome,
          totalReturn,
          annualizedReturn,
          comparedToCityAverage: annualizedReturn - cityReturn * 100,
          roi,
        };
      }
    );

    setSaleAnalysis(analysis);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8 bg-gray-50 min-h-screen">
      {/* Initial Investment Section */}
      <Card className="shadow-lg">
        <CardHeader className="bg-blue-50">
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <Building2 className="h-6 w-6" />
            Property Investment Details
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Base Investment ($)
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  value={baseInvestment}
                  onChange={handleBaseInvestmentChange}
                  className="w-full pl-10 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter property cost"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Renovation Cost ($)
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  value={renovationCost}
                  onChange={handleRenovationCostChange}
                  className="w-full pl-10 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter renovation cost"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add New Unit Section */}
      <Card className="shadow-lg">
        <CardHeader className="bg-green-50">
          <CardTitle className="flex items-center gap-2 text-green-800">
            <Home className="h-6 w-6" />
            Add New Rental Unit
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Unit Name
              </label>
              <input
                type="text"
                value={newUnit.name}
                onChange={(e) =>
                  setNewUnit({ ...newUnit, name: e.target.value })
                }
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder="e.g., Apartment 1A"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Monthly Return ($)
              </label>
              <input
                type="number"
                value={newUnit.monthlyReturn}
                onChange={(e) =>
                  setNewUnit({ ...newUnit, monthlyReturn: e.target.value })
                }
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder="Monthly rental income"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Monthly Costs ($)
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={newUnit.recurringCosts}
                  onChange={(e) =>
                    setNewUnit({ ...newUnit, recurringCosts: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="Monthly expenses"
                />
                <button
                  onClick={addUnit}
                  disabled={!newUnit.name || !newUnit.monthlyReturn}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  <PlusCircle className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Units Display Section */}
      {units.length > 0 && (
        <div className="grid md:grid-cols-3 gap-6">
          {units.map((unit) => (
            <Card
              key={unit.id}
              className="shadow-lg hover:shadow-xl transition-shadow"
            >
              <CardHeader
                className={`bg-blue-50 ${
                  editingUnit?.id === unit.id ? "bg-yellow-50" : ""
                }`}
              >
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Home className="h-5 w-5 text-blue-600" />
                    {editingUnit?.id === unit.id ? (
                      <input
                        type="text"
                        value={editingUnit.name}
                        onChange={(e) =>
                          setEditingUnit({
                            ...editingUnit,
                            name: e.target.value,
                          })
                        }
                        className="p-1 border rounded"
                      />
                    ) : (
                      unit.name
                    )}
                  </span>
                  <div className="flex gap-2">
                    {editingUnit?.id === unit.id ? (
                      <>
                        <button
                          onClick={() => setEditingUnit(null)}
                          className="p-1 text-green-600 hover:text-green-700"
                        >
                          <Check className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => setEditingUnit(null)}
                          className="p-1 text-red-600 hover:text-red-700"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => startEditing(unit)}
                          className="p-1 text-blue-600 hover:text-blue-700"
                        >
                          <Edit2 className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => duplicateUnit(unit)}
                          className="p-1 text-green-600 hover:text-green-700"
                        >
                          <Copy className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => removeUnit(unit.id)}
                          className="p-1 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </>
                    )}
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Monthly Return</p>
                      {editingUnit?.id === unit.id ? (
                        <input
                          type="number"
                          value={editingUnit.monthlyReturn}
                          onChange={(e) =>
                            setEditingUnit({
                              ...editingUnit,
                              monthlyReturn: e.target.value,
                            })
                          }
                          className="p-1 border rounded w-full"
                        />
                      ) : (
                        <p className="text-lg font-semibold text-green-600">
                          ${Number(unit.monthlyReturn).toLocaleString()}
                        </p>
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Monthly Costs</p>
                      {editingUnit?.id === unit.id ? (
                        <input
                          type="number"
                          value={editingUnit.recurringCosts}
                          onChange={(e) =>
                            setEditingUnit({
                              ...editingUnit,
                              recurringCosts: e.target.value,
                            })
                          }
                          className="p-1 border rounded w-full"
                        />
                      ) : (
                        <p className="text-lg font-semibold text-red-600">
                          ${Number(unit.recurringCosts || 0).toLocaleString()}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="pt-2 border-t">
                    <p className="text-sm text-gray-500">Net Monthly Income</p>
                    <p className="text-xl font-bold text-blue-600">
                      $
                      {(
                        Number(unit.monthlyReturn) -
                        Number(unit.recurringCosts || 0)
                      ).toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Calculate Button */}
      {units.length > 0 && (
        <button
          onClick={calculateReturn}
          disabled={!baseInvestment || !units.length}
          className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all text-lg font-semibold"
        >
          <Calculator className="h-6 w-6" />
          Calculate Investment Return
        </button>
      )}

      {/* Results Section */}
      {calculationResult && (
        <Card className="shadow-lg">
          <CardHeader className="bg-purple-50">
            <CardTitle className="flex items-center gap-2 text-purple-800">
              <DollarSign className="h-6 w-6" />
              Investment Analysis Results
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-green-50">
                <CardContent className="p-4">
                  <p className="text-sm text-gray-600">Total Investment</p>
                  <p className="text-2xl font-bold text-green-700">
                    ${calculationResult.totalInvestment.toLocaleString()}
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-blue-50">
                <CardContent className="p-4">
                  <p className="text-sm text-gray-600">Monthly Net Return</p>
                  <p className="text-2xl font-bold text-blue-700">
                    ${calculationResult.monthlyNetReturn.toLocaleString()}
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-purple-50">
                <CardContent className="p-4">
                  <p className="text-sm text-gray-600">Yearly Return</p>
                  <p className="text-2xl font-bold text-purple-700">
                    ${calculationResult.yearlyReturn.toLocaleString()}
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-yellow-50">
                <CardContent className="p-4">
                  <p className="text-sm text-gray-600">
                    Return on Investment (ROI)
                  </p>
                  <p className="text-2xl font-bold text-yellow-700">
                    {calculationResult.roi.toFixed(2)}%
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-orange-50">
                <CardContent className="p-4">
                  <p className="text-sm text-gray-600">Break-even Point</p>
                  <p className="text-2xl font-bold text-orange-700">
                    {Math.ceil(calculationResult.breakEvenMonths)} months
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardContent className="p-4">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={calculationResult.chartData}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        className="opacity-50"
                      />
                      <XAxis
                        dataKey="month"
                        label={{
                          value: "Months",
                          position: "bottom",
                          style: { fill: "#666" },
                        }}
                        tick={{ fill: "#666" }}
                      />
                      <YAxis
                        label={{
                          value: "Amount ($)",
                          angle: -90,
                          position: "left",
                          style: { fill: "#666" },
                        }}
                        tick={{ fill: "#666" }}
                        tickFormatter={(value) =>
                          `$${(value / 1000).toFixed(0)}k`
                        }
                      />
                      <Tooltip
                        formatter={(value) => [
                          `$${value.toLocaleString()}`,
                          "",
                        ]}
                        labelFormatter={(label) => `Month ${label}`}
                        contentStyle={{
                          backgroundColor: "rgba(255, 255, 255, 0.9)",
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                          padding: "8px",
                        }}
                      />
                      <Legend
                        verticalAlign="top"
                        height={36}
                        formatter={(value: string) => (
                          <span style={{ color: "#666", marginLeft: "8px" }}>
                            {value}
                          </span>
                        )}
                      />
                      <Line
                        type="monotone"
                        dataKey="investment"
                        stroke="#ef4444"
                        name="Total Investment"
                        strokeWidth={2}
                        dot={false}
                      />
                      <Line
                        type="monotone"
                        dataKey="returns"
                        stroke="#22c55e"
                        name="Cumulative Returns"
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Investment Analysis
                  </h4>
                  <p className="text-sm text-gray-600">
                    Based on your current returns, you will break even on your
                    investment in approximately{" "}
                    <span className="font-semibold text-blue-600">
                      {Math.ceil(calculationResult.breakEvenMonths)} months
                    </span>{" "}
                    ({(calculationResult.breakEvenMonths / 12).toFixed(1)}{" "}
                    years). The annual ROI of {calculationResult.roi.toFixed(2)}
                    % indicates a
                    {calculationResult.roi > 10
                      ? " strong"
                      : calculationResult.roi > 5
                      ? " moderate"
                      : " conservative"}{" "}
                    return on your investment.
                  </p>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      )}

      {/* Sale Analysis Section */}
      {calculationResult && (
        <Card className="shadow-lg">
          <CardHeader className="bg-indigo-50">
            <CardTitle className="flex items-center gap-2 text-indigo-800">
              <Building2 className="h-6 w-6" />
              Sale Analysis & Projections
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Expected Market Appreciation Rate (%/year)
                </label>
                <input
                  type="number"
                  value={marketAppreciation}
                  onChange={handleMarketAppreciationChange}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g., 3.5"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  City Average Return Rate (%/year)
                </label>
                <input
                  type="number"
                  value={cityAverageReturn}
                  onChange={handleCityAverageReturnChange}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g., 7"
                />
              </div>
            </div>

            <button
              onClick={analyzeSale}
              disabled={!marketAppreciation || !cityAverageReturn}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 disabled:bg-gray-300 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all text-lg font-semibold"
            >
              Analyze Potential Sale
            </button>

            {saleAnalysis && (
              <div className="space-y-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                          Year
                        </th>
                        <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">
                          Property Value
                        </th>
                        <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">
                          Cumulative Rental Income
                        </th>
                        <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">
                          Total Return
                        </th>
                        <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">
                          Annualized Return
                        </th>
                        <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">
                          vs City Average
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {saleAnalysis.map((year: SaleAnalysisYear) => (
                        <tr key={year.year} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-gray-700">
                            Year {year.year}
                          </td>
                          <td className="px-4 py-3 text-sm text-right text-gray-700">
                            $
                            {year.propertyValue.toLocaleString(undefined, {
                              maximumFractionDigits: 0,
                            })}
                          </td>
                          <td className="px-4 py-3 text-sm text-right text-gray-700">
                            $
                            {year.cumulativeRentalIncome.toLocaleString(
                              undefined,
                              { maximumFractionDigits: 0 }
                            )}
                          </td>
                          <td className="px-4 py-3 text-sm text-right font-medium text-blue-600">
                            $
                            {year.totalReturn.toLocaleString(undefined, {
                              maximumFractionDigits: 0,
                            })}
                          </td>
                          <td
                            className={`px-4 py-3 text-sm text-right font-medium ${
                              year.annualizedReturn >= 10
                                ? "text-green-600"
                                : "text-yellow-600"
                            }`}
                          >
                            {year.annualizedReturn.toFixed(1)}%
                          </td>
                          <td
                            className={`px-4 py-3 text-sm text-right font-medium ${
                              year.comparedToCityAverage >= 0
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {year.comparedToCityAverage >= 0 ? "+" : ""}
                            {year.comparedToCityAverage.toFixed(1)}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Sale Recommendations */}
                <Card className="bg-gray-50">
                  <CardContent className="p-4">
                    <h4 className="font-medium text-gray-700 mb-2">
                      Sale Recommendations
                    </h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      {saleAnalysis?.some(
                        (year: SaleAnalysisYear) =>
                          year.annualizedReturn >
                          parseFloat(cityAverageReturn) * 100 * 1.5
                      ) ? (
                        <p>
                          ✨{" "}
                          <span className="font-medium">
                            Strong Performance:
                          </span>{" "}
                          Your investment is outperforming the city average
                          significantly in some years. Consider holding for
                          maximum appreciation.
                        </p>
                      ) : saleAnalysis?.every(
                          (year: SaleAnalysisYear) =>
                            year.annualizedReturn <
                            parseFloat(cityAverageReturn) * 100
                        ) ? (
                        <p>
                          ⚠️{" "}
                          <span className="font-medium">Underperforming:</span>{" "}
                          Returns are below city average. Consider strategic
                          improvements or earlier exit if trend continues.
                        </p>
                      ) : (
                        <p>
                          📈{" "}
                          <span className="font-medium">
                            Steady Performance:
                          </span>{" "}
                          Returns are in line with market averages. Hold period
                          should align with your investment goals.
                        </p>
                      )}

                      {saleAnalysis?.find(
                        (year: SaleAnalysisYear) => year.annualizedReturn > 15
                      ) ? (
                        <p>
                          🎯{" "}
                          <span className="font-medium">
                            Optimal Sale Window:
                          </span>{" "}
                          Year{" "}
                          {
                            saleAnalysis?.find(
                              (year: SaleAnalysisYear) =>
                                year.annualizedReturn > 15
                            )?.year
                          }{" "}
                          shows particularly strong returns above 15%
                          annualized.
                        </p>
                      ) : null}

                      <p className="font-medium">Market Context:</p>
                      <p className="font-medium">
                        City average return is {cityAverageReturn}% with{" "}
                        {marketAppreciation}% appreciation rate.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {units.length === 0 && (
        <Alert className="bg-blue-50 border-blue-200">
          <AlertDescription className="text-center py-8 text-gray-600">
            Start by adding your first rental unit using the form above.
            <br />
            You can add multiple units and customize their details later.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default RealEstateCalculator;
