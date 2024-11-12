 import React from "react";
 import {
   Card,
   CardHeader,
   CardTitle,
   CardContent,
 } from "@/components/ui/card";
 import { Edit2, Trash2 } from "lucide-react";
 import { Property } from "@/types/portfolio";
 import { formatCurrency } from "@/utils/formatters";

 interface MaintenanceScheduleProps {
   properties: Property[];
   onEditTask: (propertyId: string, taskId: string) => void;
   onDeleteTask: (propertyId: string, taskId: string) => void;
 }

 const MaintenanceSchedule: React.FC<MaintenanceScheduleProps> = ({
   properties,
   onEditTask,
   onDeleteTask,
 }) => {
   return (
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
                         <button
                           onClick={() => onEditTask(property.id, task.id)}
                           className="p-1 hover:bg-gray-100 rounded"
                         >
                           <Edit2 className="h-4 w-4 text-gray-500" />
                         </button>
                         <button
                           onClick={() => onDeleteTask(property.id, task.id)}
                           className="p-1 hover:bg-gray-100 rounded"
                         >
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
   );
 };

 export default MaintenanceSchedule;