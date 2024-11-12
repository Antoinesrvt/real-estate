 import { Property, PortfolioMetrics } from "@/types/portfolio";

 export const calculatePortfolioMetrics = (
   props: Property[]
 ): PortfolioMetrics => {
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
       props.reduce((sum, p) => sum + p.metrics.appreciation, 0) / props.length,
     averageOccupancy:
       props.reduce((sum, p) => sum + p.occupancyRate, 0) / props.length,
   };
 };