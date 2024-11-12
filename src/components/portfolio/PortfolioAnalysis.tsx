 import React from "react";
 import {
   Card,
   CardHeader,
   CardTitle,
   CardContent,
 } from "@/components/ui/card";
 import {
   PieChart,
   Pie,
   Cell,
   ResponsiveContainer,
   LineChart,
   Line,
   XAxis,
   YAxis,
   CartesianGrid,
   Tooltip,
   Legend,
 } from "recharts";
 import { formatCurrency } from "@/utils/formatters";

 interface PortfolioAnalysisProps {
   propertyTypeDistribution: { name: string; value: number }[];
   monthlyPerformance: { month: string; income: number; expenses: number }[];
 }

 const propertyTypeColors = {
   residential: "#3b82f6",
   commercial: "#10b981",
   industrial: "#6366f1",
 };

 const PortfolioAnalysis: React.FC<PortfolioAnalysisProps> = ({
   propertyTypeDistribution,
   monthlyPerformance,
 }) => {
   return (
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
                   data={propertyTypeDistribution}
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
               <LineChart data={monthlyPerformance}>
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
   );
 };

 export default PortfolioAnalysis;