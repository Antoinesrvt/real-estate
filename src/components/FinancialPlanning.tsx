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
  Calculator,
  DollarSign,
  TrendingUp,
  FileText,
  Building2,
  PiggyBank,
  ArrowUpRight,
  ArrowDownRight,
  ArrowRight,
  Percent,
} from "lucide-react";

interface MortgageDetails {
  loanAmount: number;
  interestRate: number;
  term: number;
  downPayment: number;
}

interface TaxInfo {
  propertyTax: number;
  incomeTaxRate: number;
  deductions: number;
}

interface CashFlow {
  month: string;
  income: number;
  expenses: number;
  net: number;
}

interface InvestmentProjection {
  year: number;
  propertyValue: number;
  equity: number;
  returnOnInvestment: number;
}

interface FinancialMetrics {
  monthlyMortgage: number;
  netOperatingIncome: number;
  cashOnCashReturn: number;
  capRate: number;
  totalReturn: number;
}

const FinancialPlanningContent: React.FC = () => {
  // State management for form inputs
  const [mortgageDetails, setMortgageDetails] = useState<MortgageDetails>({
    loanAmount: 300000,
    interestRate: 4.5,
    term: 30,
    downPayment: 60000,
  });

  const [taxInfo, setTaxInfo] = useState<TaxInfo>({
    propertyTax: 3000,
    incomeTaxRate: 25,
    deductions: 5000,
  });

  // Sample data for visualizations
  const cashFlowData: CashFlow[] = [
    { month: "Jan", income: 5000, expenses: 3200, net: 1800 },
    { month: "Feb", income: 5000, expenses: 3300, net: 1700 },
    { month: "Mar", income: 5100, expenses: 3200, net: 1900 },
    { month: "Apr", income: 5000, expenses: 3400, net: 1600 },
    { month: "May", income: 5200, expenses: 3300, net: 1900 },
    { month: "Jun", income: 5100, expenses: 3200, net: 1900 },
  ];

  const projectionData: InvestmentProjection[] = [
    { year: 1, propertyValue: 360000, equity: 70000, returnOnInvestment: 8.5 },
    { year: 2, propertyValue: 374400, equity: 85000, returnOnInvestment: 9.2 },
    {
      year: 3,
      propertyValue: 389376,
      equity: 102000,
      returnOnInvestment: 10.1,
    },
    {
      year: 4,
      propertyValue: 404951,
      equity: 120000,
      returnOnInvestment: 10.8,
    },
    {
      year: 5,
      propertyValue: 421149,
      equity: 140000,
      returnOnInvestment: 11.5,
    },
  ];

  const calculateMortgage = (details: MortgageDetails): number => {
    const principal = details.loanAmount - details.downPayment;
    const monthlyRate = details.interestRate / 100 / 12;
    const numberOfPayments = details.term * 12;

    const mortgage =
      (principal *
        (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    return Math.round(mortgage);
  };

  const calculateMetrics = (): FinancialMetrics => {
    const monthlyMortgage = calculateMortgage(mortgageDetails);
    const annualIncome = cashFlowData.reduce(
      (sum, month) => sum + month.income,
      0
    );
    const annualExpenses = cashFlowData.reduce(
      (sum, month) => sum + month.expenses,
      0
    );
    const netOperatingIncome = annualIncome - annualExpenses;

    return {
      monthlyMortgage,
      netOperatingIncome,
      cashOnCashReturn:
        (netOperatingIncome / mortgageDetails.downPayment) * 100,
      capRate: (netOperatingIncome / mortgageDetails.loanAmount) * 100,
      totalReturn:
        ((projectionData[4].propertyValue - mortgageDetails.loanAmount) /
          mortgageDetails.loanAmount) *
        100,
    };
  };

  const metrics = calculateMetrics();

  return (
    <div className="space-y-6">
      {/* Financial Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">Monthly Mortgage</p>
                <p className="text-2xl font-bold">${metrics.monthlyMortgage}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Principal & Interest
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
                <p className="text-sm text-gray-500">Cash on Cash Return</p>
                <p className="text-2xl font-bold">
                  {metrics.cashOnCashReturn.toFixed(1)}%
                </p>
                <p className="text-sm text-gray-500 mt-1">Annual Return</p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <Percent className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">Cap Rate</p>
                <p className="text-2xl font-bold">
                  {metrics.capRate.toFixed(1)}%
                </p>
                <p className="text-sm text-gray-500 mt-1">Net Income Ratio</p>
              </div>
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">5-Year Return</p>
                <p className="text-2xl font-bold">
                  {metrics.totalReturn.toFixed(1)}%
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Projected Total Return
                </p>
              </div>
              <div className="p-2 bg-yellow-100 rounded-lg">
                <PiggyBank className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mortgage Calculator */}
      <Card>
        <CardHeader>
          <CardTitle>Mortgage Calculator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Loan Amount
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <input
                    type="number"
                    value={mortgageDetails.loanAmount}
                    onChange={(e) =>
                      setMortgageDetails({
                        ...mortgageDetails,
                        loanAmount: Number(e.target.value),
                      })
                    }
                    className="w-full pl-10 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Down Payment
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <input
                    type="number"
                    value={mortgageDetails.downPayment}
                    onChange={(e) =>
                      setMortgageDetails({
                        ...mortgageDetails,
                        downPayment: Number(e.target.value),
                      })
                    }
                    className="w-full pl-10 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Interest Rate (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={mortgageDetails.interestRate}
                  onChange={(e) =>
                    setMortgageDetails({
                      ...mortgageDetails,
                      interestRate: Number(e.target.value),
                    })
                  }
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Term (Years)
                </label>
                <select
                  value={mortgageDetails.term}
                  onChange={(e) =>
                    setMortgageDetails({
                      ...mortgageDetails,
                      term: Number(e.target.value),
                    })
                  }
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value={15}>15 Years</option>
                  <option value={20}>20 Years</option>
                  <option value={30}>30 Years</option>
                </select>
              </div>
            </div>

            {/* Mortgage Summary */}
            <Card className="bg-gray-50">
              <CardContent className="p-4">
                <h3 className="font-medium text-lg mb-4">Payment Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Principal & Interest</span>
                    <span className="font-medium">
                      ${metrics.monthlyMortgage}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Property Tax</span>
                    <span className="font-medium">
                      ${Math.round(taxInfo.propertyTax / 12)}
                    </span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg font-medium">
                      <span>Total Monthly Payment</span>
                      <span className="text-blue-600">
                        $
                        {metrics.monthlyMortgage +
                          Math.round(taxInfo.propertyTax / 12)}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Cash Flow Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Cash Flow Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cashFlowData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-50" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
                  formatter={(value) => `$${value}`}
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                />
                <Legend />
                <Bar dataKey="income" fill="#10b981" name="Income" />
                <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
                <Bar dataKey="net" fill="#3b82f6" name="Net Income" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Investment Projection */}
      <Card>
        <CardHeader>
          <CardTitle>5-Year Investment Projection</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={projectionData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-50" />
                <XAxis dataKey="year" />
                <YAxis yAxisId="left" orientation="left" stroke="#3b82f6" />
                <YAxis yAxisId="right" orientation="right" stroke="#10b981" />
                <Tooltip
                  formatter={(value, name) => [
                    `$${value.toLocaleString()}`,
                    name,
                  ]}
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="propertyValue"
                  stroke="#3b82f6"
                  name="Property Value"
                  strokeWidth={2}
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="equity"
                  stroke="#10b981"
                  name="Equity"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialPlanningContent;
