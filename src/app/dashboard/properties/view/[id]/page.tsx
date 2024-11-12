import React from "react";
import { notFound } from "next/navigation";
import { Property } from "@/types/portfolio";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCurrency } from "@/utils/formatters";

type Params = Promise<{ id: string }>;


export default async function PropertyDetails({ params }: { params: Params }) {
  const { id } = await params;

  // In a real application, you would fetch this data from your API
  // This is just a mock implementation
  const getProperty = async (id: string): Promise<Property | null> => {
    // Mock data - replace with actual API call
    const mockProperty: Property = {
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
      ],
      maintenanceSchedule: [
        {
          id: "m1",
          task: "HVAC Inspection",
          dueDate: "2024-12-01",
          status: "pending",
          estimatedCost: 500,
        },
      ],
    };

    return id === "1" ? mockProperty : null;
  };

  const property = await getProperty(id);

  if (!property) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{property.name}</h1>
        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
          {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
        </span>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Financial Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-4">
              <div className="flex justify-between">
                <dt className="text-gray-500">Purchase Price</dt>
                <dd className="font-semibold">
                  {formatCurrency(property.purchasePrice)}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Current Value</dt>
                <dd className="font-semibold">
                  {formatCurrency(property.currentValue)}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Monthly Rent</dt>
                <dd className="font-semibold">
                  {formatCurrency(property.monthlyRent)}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Occupancy Rate</dt>
                <dd className="font-semibold">{property.occupancyRate}%</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-4">
              {Object.entries(property.expenses).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <dt className="text-gray-500">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </dt>
                  <dd className="font-semibold">{formatCurrency(value)}</dd>
                </div>
              ))}
            </dl>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}