 export interface Property {
   id: string;
   name: string;
   type: "residential" | "commercial" | "industrial";
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

 export interface Document {
   id: string;
   name: string;
   type: "contract" | "insurance" | "tax" | "inspection" | "other";
   date: string;
   status: "valid" | "expired" | "pending";
 }

 export interface MaintenanceItem {
   id: string;
   task: string;
   dueDate: string;
   status: "pending" | "completed" | "overdue";
   estimatedCost: number;
 }

 export interface PortfolioMetrics {
   totalValue: number;
   totalEquity: number;
   monthlyIncome: number;
   monthlyExpenses: number;
   netOperatingIncome: number;
   totalAppreciation: number;
   averageOccupancy: number;
 }