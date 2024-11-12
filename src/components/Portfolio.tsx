import React, { useState } from 'react';
import { Plus, Download, Printer } from 'lucide-react';
import { Property } from "@/types/portfolio";
import PropertyCard from "./portfolio/PropertyCard";
import PortfolioAnalysis from "./portfolio/PortfolioAnalysis";
import MaintenanceSchedule from "./portfolio/MaintenanceSchedule";
import DocumentManagement from "./portfolio/DocumentManagement";
// import { calculatePortfolioMetrics } from "@/utils/portfolioCalculations";
import { useRouter } from "next/navigation";
import { LayoutGrid, List } from "lucide-react"; // Add these imports
import PropertyList from "@/components/portfolio/PropertyList";

const Portfolio: React.FC = () => {
    const router = useRouter();

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
  ]);

  const [activeView, setActiveView] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"name" | "value" | "roi">("value");
  const [filterType, setFilterType] = useState<
    "all" | "residential" | "commercial" | "industrial"
  >("all");

  // const portfolioMetrics = calculatePortfolioMetrics(properties);

  const handleAddProperty = () => {
    router.push("/dashboard/properties/add");
  };

  const handleViewProperty = (id: string) => {
    router.push(`/dashboard/properties/${id}`);
  };

  const handleEditProperty = (id: string) => {
    router.push(`/dashboard/properties/${id}/edit`);
  };

  const handleDeleteProperty = (id: string) => {
    // Implement delete confirmation dialog and deletion logic
    if (window.confirm("Are you sure you want to delete this property?")) {
      setProperties(properties.filter((p) => p.id !== id));
    }
  };

  const handleEditTask = (propertyId: string, taskId: string) => {
    console.log("Editing task:", taskId, propertyId);
  };

  const handleDeleteTask = (propertyId: string, taskId: string) => {
    console.log("Deleting task:", taskId, propertyId);
  };

  const handleViewDocument = (propertyId: string, documentId: string) => {
    console.log("Viewing document:", documentId, propertyId);
  };

  const handleDownloadDocument = (propertyId: string, documentId: string) => {
    console.log("Downloading document:", documentId, propertyId);
  };

  const propertyTypeDistribution = [
    { name: "Residential", value: 60 },
    { name: "Commercial", value: 30 },
    { name: "Industrial", value: 10 },
  ];

  const monthlyPerformance = [
    { month: "Jan", income: 50000, expenses: 30000 },
    { month: "Feb", income: 52000, expenses: 31000 },
    { month: "Mar", income: 51000, expenses: 30500 },
    { month: "Apr", income: 53000, expenses: 31500 },
    { month: "May", income: 54000, expenses: 31000 },
    { month: "Jun", income: 55000, expenses: 32000 },
  ];

    const filteredProperties = properties.filter((property) => {
      if (filterType === "all") return true;
      return property.type === filterType;
    });

    // Add sorting
    const sortedProperties = [...filteredProperties].sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "value":
          return b.currentValue - a.currentValue;
        case "roi":
          return b.metrics.roi - a.metrics.roi;
        default:
          return 0;
      }
    });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Portfolio</h1>

      {/* Actions and Filters */}
      <div className="flex flex-wrap justify-between gap-4">
        <div className="flex gap-2">
          <button
            onClick={handleAddProperty}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            <Plus className="h-5 w-5" />
            Add Property
          </button>
          <div className="flex border rounded-lg overflow-hidden">
            <button
              onClick={() => setActiveView("grid")}
              className={`flex items-center gap-2 px-4 py-2 ${
                activeView === "grid"
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <LayoutGrid className="h-5 w-5" />
            </button>
            <button
              onClick={() => setActiveView("list")}
              className={`flex items-center gap-2 px-4 py-2 ${
                activeView === "list"
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <List className="h-5 w-5" />
            </button>
          </div>
          <select
            value={filterType}
            onChange={(e) =>
              setFilterType(
                e.target.value as
                  | "all"
                  | "residential"
                  | "commercial"
                  | "industrial"
              )
            }
            className="px-4 py-2 border rounded-lg"
          >
            <option value="all">All Properties</option>
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
            <option value="industrial">Industrial</option>
          </select>
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

      {/* Properties View */}
      {activeView === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onView={handleViewProperty}
              onEdit={handleEditProperty}
              onDelete={handleDeleteProperty}
            />
          ))}
        </div>
      ) : (
        <PropertyList
          properties={sortedProperties}
          onView={handleViewProperty}
          onEdit={handleEditProperty}
          onDelete={handleDeleteProperty}
        />
      )}

      {/* Portfolio Analysis */}
      <PortfolioAnalysis
        propertyTypeDistribution={propertyTypeDistribution}
        monthlyPerformance={monthlyPerformance}
      />

      {/* Maintenance Schedule */}
      <MaintenanceSchedule
        properties={properties}
        onEditTask={handleEditTask}
        onDeleteTask={handleDeleteTask}
      />

      {/* Document Management */}
      <DocumentManagement
        properties={properties}
        onViewDocument={handleViewDocument}
        onDownloadDocument={handleDownloadDocument}
      />
    </div>
  );
};

export default Portfolio;