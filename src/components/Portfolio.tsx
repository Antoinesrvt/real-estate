// Types and interfaces
interface Property {
  id: string;
  name: string;
  type: 'residential' | 'commercial' | 'industrial';
  address: string;
  purchasePrice: number;
  currentValue: number;
  monthlyRent: number;
  occupancyRate: number;
  expenses: {
    mortgage: number;
    maintenance: number;
    taxes: number;
    insurance: number;
  };
  metrics: {
    cashFlow: number;
    roi: number;
    appreciation: number;
  };
  documents: Document[];
  maintenanceSchedule: MaintenanceItem[];
}

interface Document {
  id: string;
  name: string;
  type: 'contract' | 'insurance' | 'tax' | 'inspection' | 'other';
  date: string;
  status: 'valid' | 'expired' | 'pending';
}

interface MaintenanceItem {
  id: string;
  task: string;
  dueDate: string;
  status: 'pending' | 'completed' | 'overdue';
  estimatedCost: number;
}

interface PortfolioMetrics {
  totalValue: number;
  totalEquity: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  netOperatingIncome: number;
  totalAppreciation: number;
  averageOccupancy: number;
}

// Component
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
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
  Legend 
} from 'recharts';
import { 
  Building2, 
  DollarSign, 
  FileText, 
  Lollipop,
  Plus,
  Filter,
  Download,
  Printer,
  MoreVertical,
  Eye,
  Edit2,
  Trash2,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const PortfolioContent: React.FC = () => {
  // Sample data - would come from API/database in production
  const [properties, setProperties] = useState<Property[]>([
    {
      id: "1",
      name: "Downtown Apartment Complex",
      type: "residential",
      address: "123 Main St, Downtown",
      purchasePrice: 2500000,
      currentValue: 2800000,
      monthlyRent: 25000,
      occupancyRate: 95,
      expenses: {
        mortgage: 12000,
        maintenance: 2000,
        taxes: 2500,
        insurance: 1000,
      },
      metrics: {
        cashFlow: 7500,
        roi: 12.5,
        appreciation: 12,
      },
      documents: [
        {
          id: "d1",
          name: "Purchase Agreement",
          type: "contract",
          date: "2023-06-15",
          status: "valid",
        },
        {
          id: "d2",
          name: "Insurance Policy",
          type: "insurance",
          date: "2024-01-01",
          status: "valid",
        },
      ],
      maintenanceSchedule: [
        {
          id: "m1",
          task: "HVAC Inspection",
          dueDate: "2024-12-01",
          status: "pending",
          estimatedCost: 500,
        },
        {
          id: "m2",
          task: "Roof Repair",
          dueDate: "2024-11-15",
          status: "completed",
          estimatedCost: 2000,
        },
      ],
    },
    // Add more properties as needed
  ]);

  const [activeView, setActiveView] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"name" | "value" | "roi">("value");
  const [filterType, setFilterType] = useState<
    "all" | "residential" | "commercial" | "industrial"
  >("all");

  const calculatePortfolioMetrics = (props: Property[]): PortfolioMetrics => {
    return {
      totalValue: props.reduce((sum, p) => sum + p.currentValue, 0),
      totalEquity: props.reduce(
        (sum, p) => sum + (p.currentValue - p.purchasePrice),
        0
      ),
      monthlyIncome: props.reduce((sum, p) => sum + p.monthlyRent, 0),
      monthlyExpenses: props.reduce(
        (sum, p) => sum + Object.values(p.expenses).reduce((a, b) => a + b, 0),
        0
      ),
      netOperatingIncome: props.reduce((sum, p) => sum + p.metrics.cashFlow, 0),
      totalAppreciation:
        props.reduce((sum, p) => sum + p.metrics.appreciation, 0) /
        props.length,
      averageOccupancy:
        props.reduce((sum, p) => sum + p.occupancyRate, 0) / props.length,
    };
  };

  const portfolioMetrics = calculatePortfolioMetrics(properties);

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const propertyTypeColors = {
    residential: "#3b82f6",
    commercial: "#10b981",
    industrial: "#6366f1",
  };

  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold">Portfolio</h1>

      {/* Actions and Filters */}
      <div className="flex flex-wrap justify-between gap-4">
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            <Plus className="h-5 w-5" />
            Add Property
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
            <Filter className="h-5 w-5" />
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
            <Download className="h-5 w-5" />
            Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
            <Printer className="h-5 w-5" />
            Print
          </button>
        </div>

        <div className="flex gap-2">
          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value as "name" | "value" | "roi")
            }
            className="px-4 py-2 border rounded-lg"
          >
            <option value="name">Sort by Name</option>
            <option value="value">Sort by Value</option>
            <option value="roi">Sort by ROI</option>
          </select>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <Card key={property.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="bg-gray-50">
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-blue-600" />
                  {property.name}
                </span>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <MoreVertical className="h-5 w-5 text-gray-500" />
                </button>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Current Value</p>
                    <p className="text-lg font-semibold">
                      {formatCurrency(property.currentValue)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Monthly Income</p>
                    <p className="text-lg font-semibold">
                      {formatCurrency(property.monthlyRent)}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">ROI</p>
                    <p className="text-lg font-semibold">
                      {property.metrics.roi}%
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Occupancy</p>
                    <p className="text-lg font-semibold">
                      {property.occupancyRate}%
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200">
                    <Eye className="h-4 w-4" />
                    View
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 text-gray-600 rounded hover:bg-gray-200">
                    <Edit2 className="h-4 w-4" />
                    Edit
                  </button>
                  <button className="flex items-center justify-center gap-2 px-3 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Portfolio Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Analysis</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Property Type Distribution */}
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: "Residential", value: 60 },
                      { name: "Commercial", value: 30 },
                      { name: "Industrial", value: 10 },
                    ]}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {Object.values(propertyTypeColors).map((color, index) => (
                      <Cell key={`cell-${index}`} fill={color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Monthly Performance */}
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={[
                    { month: "Jan", income: 50000, expenses: 30000 },
                    { month: "Feb", income: 52000, expenses: 31000 },
                    { month: "Mar", income: 51000, expenses: 30500 },
                    { month: "Apr", income: 53000, expenses: 31500 },
                    { month: "May", income: 54000, expenses: 31000 },
                    { month: "Jun", income: 55000, expenses: 32000 },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip
                    formatter={(value) => formatCurrency(Number(value))}
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="income"
                    stroke="#10b981"
                    name="Income"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="expenses"
                    stroke="#ef4444"
                    name="Expenses"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Maintenance Schedule */}
      <Card>
        <CardHeader>
          <CardTitle>Maintenance Schedule</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Property
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Task
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Due Date
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Status
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">
                    Est. Cost
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {properties.flatMap((property) =>
                  property.maintenanceSchedule.map((task) => (
                    <tr key={task.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {property.name}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {task.task}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {task.dueDate}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${
                            task.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : task.status === "overdue"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {task.status.charAt(0).toUpperCase() +
                            task.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-gray-900">
                        {formatCurrency(task.estimatedCost)}
                      </td>
                      <td className="px-4 py-3 text-sm text-right">
                        <div className="flex justify-end gap-2">
                          <button className="p-1 hover:bg-gray-100 rounded">
                            <Edit2 className="h-4 w-4 text-gray-500" />
                          </button>
                          <button className="p-1 hover:bg-gray-100 rounded">
                            <Trash2 className="h-4 w-4 text-gray-500" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Document Management */}
      <Card>
        <CardHeader>
          <CardTitle>Important Documents</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {properties.flatMap((property) =>
              property.documents.map((doc) => (
                <div
                  key={doc.id}
                  className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium text-gray-900">{doc.name}</h4>
                      <p className="text-sm text-gray-500">{property.name}</p>
                    </div>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${
                        doc.status === "valid"
                          ? "bg-green-100 text-green-800"
                          : doc.status === "expired"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Last updated: {doc.date}</span>
                    <div className="flex gap-2">
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PortfolioContent;