 import React from "react";
 import { Property } from "@/types/portfolio";
 import { formatCurrency } from "@/utils/formatters";
 import { Eye, Edit2, Trash2, Building2 } from "lucide-react";

 interface PropertyListProps {
   properties: Property[];
   onView: (id: string) => void;
   onEdit: (id: string) => void;
   onDelete: (id: string) => void;
 }

 const PropertyList: React.FC<PropertyListProps> = ({
   properties,
   onView,
   onEdit,
   onDelete,
 }) => {
   return (
     <div className="overflow-x-auto">
       <table className="w-full">
         <thead className="bg-gray-50">
           <tr>
             <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
               Property
             </th>
             <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
               Type
             </th>
             <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">
               Current Value
             </th>
             <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">
               Monthly Rent
             </th>
             <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">
               ROI
             </th>
             <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">
               Occupancy
             </th>
             <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">
               Actions
             </th>
           </tr>
         </thead>
         <tbody className="divide-y divide-gray-200">
           {properties.map((property) => (
             <tr key={property.id} className="hover:bg-gray-50">
               <td className="px-4 py-4">
                 <div className="flex items-center gap-2">
                   <Building2 className="h-5 w-5 text-blue-600" />
                   <div>
                     <div className="font-medium text-gray-900">
                       {property.name}
                     </div>
                     <div className="text-sm text-gray-500">
                       {property.address}
                     </div>
                   </div>
                 </div>
               </td>
               <td className="px-4 py-4 text-sm">
                 <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                   {property.type.charAt(0).toUpperCase() +
                     property.type.slice(1)}
                 </span>
               </td>
               <td className="px-4 py-4 text-right text-sm text-gray-900">
                 {formatCurrency(property.currentValue)}
               </td>
               <td className="px-4 py-4 text-right text-sm text-gray-900">
                 {formatCurrency(property.monthlyRent)}
               </td>
               <td className="px-4 py-4 text-right text-sm text-gray-900">
                 {property.metrics.roi}%
               </td>
               <td className="px-4 py-4 text-center text-sm text-gray-900">
                 {property.occupancyRate}%
               </td>
               <td className="px-4 py-4 text-right">
                 <div className="flex justify-end gap-2">
                   <button
                     onClick={() => onView(property.id)}
                     className="p-1 hover:bg-blue-100 rounded text-blue-600"
                   >
                     <Eye className="h-4 w-4" />
                   </button>
                   <button
                     onClick={() => onEdit(property.id)}
                     className="p-1 hover:bg-gray-100 rounded text-gray-600"
                   >
                     <Edit2 className="h-4 w-4" />
                   </button>
                   <button
                     onClick={() => onDelete(property.id)}
                     className="p-1 hover:bg-red-100 rounded text-red-600"
                   >
                     <Trash2 className="h-4 w-4" />
                   </button>
                 </div>
               </td>
             </tr>
           ))}
         </tbody>
       </table>
     </div>
   );
 };

 export default PropertyList;