import React from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  TrendingUp,
  TrendingDown,
  AlertCircle,
  DollarSign,
  Home,
  Users,
  Calendar,
  ArrowUp,
  ArrowDown,
  Bell,
  Activity,
} from "lucide-react";

interface DashboardContentProps {
  currency?: string;
  portfolioData?: any; // Define a more specific type if available
  marketData?: any; // Define a more specific type if available
}

const DashboardContent: React.FC<DashboardContentProps> = ({
  currency = "USD",
  portfolioData,
  marketData,
}) => {
  // Sample data - in production, this would come from props or API
  const propertyStats = {
    totalProperties: 5,
    occupancyRate: 92,
    totalValue: 2500000,
    monthlyIncome: 12500,
    yearOverYearGrowth: 8.5,
    pendingMaintenance: 3,
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
    }).format(value);
  };

  const recentAlerts = [
    {
      id: 1,
      type: "success",
      message: "New market report available for Downtown area",
      time: "2h ago",
    },
    {
      id: 2,
      type: "warning",
      message: "Maintenance due for Property #123 next week",
      time: "5h ago",
    },
    {
      id: 3,
      type: "info",
      message: "Property values increased 5% in your area",
      time: "1d ago",
    },
  ];

  const monthlyPerformance = [
    { month: "Jan", income: 12000, expenses: 3000 },
    { month: "Feb", income: 12500, expenses: 2800 },
    { month: "Mar", income: 12300, expenses: 3200 },
    { month: "Apr", income: 13000, expenses: 3100 },
    { month: "May", income: 12800, expenses: 2900 },
    { month: "Jun", income: 13200, expenses: 3300 },
  ];

  const portfolioDistribution = [
    { name: "Residential", value: 60, color: "#3b82f6" },
    { name: "Commercial", value: 25, color: "#10b981" },
    { name: "Industrial", value: 15, color: "#6366f1" },
  ];



  return (
    <div className="space-y-6">
      {/* Quick Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Portfolio Value</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(propertyStats.totalValue)}
                </p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <ArrowUp className="h-4 w-4 mr-1" />
                  {propertyStats.yearOverYearGrowth}% from last year
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
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Properties</p>
                <p className="text-2xl font-bold text-gray-900">
                  {propertyStats.totalProperties}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {propertyStats.pendingMaintenance} need attention
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
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">Monthly Income</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(propertyStats.monthlyIncome)}
                </p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <ArrowUp className="h-4 w-4 mr-1" />
                  5.2% from last month
                </p>
              </div>
              <div className="p-2 bg-purple-100 rounded-lg">
                <Activity className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">Occupancy Rate</p>
                <p className="text-2xl font-bold text-gray-900">
                  {propertyStats.occupancyRate}%
                </p>
                <p className="text-sm text-gray-500 mt-1">Target: 95%</p>
              </div>
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Users className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyPerformance}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-50" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip
                    formatter={(value) => formatCurrency(value)}
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                  />
                  <Bar dataKey="income" fill="#3b82f6" name="Income" />
                  <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Portfolio Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={portfolioDistribution}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {portfolioDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => `${value}%`}
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-4 mt-4">
                {portfolioDistribution.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-gray-600">
                      {item.name} ({item.value}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Recent Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentAlerts.map((alert) => (
              <div
                key={alert.id}
                className="flex items-start gap-4 p-3 rounded-lg bg-gray-50"
              >
                <div
                  className={`
                  p-2 rounded-full
                  ${
                    alert.type === "success"
                      ? "bg-green-100"
                      : alert.type === "warning"
                      ? "bg-yellow-100"
                      : "bg-blue-100"
                  }
                `}
                >
                  <AlertCircle
                    className={`
                    h-5 w-5
                    ${
                      alert.type === "success"
                        ? "text-green-600"
                        : alert.type === "warning"
                        ? "text-yellow-600"
                        : "text-blue-600"
                    }
                  `}
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{alert.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardContent;
