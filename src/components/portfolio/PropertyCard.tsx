 import React from "react";
 import {
   Card,
   CardHeader,
   CardTitle,
   CardContent,
 } from "@/components/ui/card";
 import { Building2, MoreVertical, Eye, Edit2, Trash2 } from "lucide-react";
 import { Property } from "@/types/portfolio";
 import { formatCurrency } from "@/utils/formatters";

 interface PropertyCardProps {
   property: Property;
   onView: (id: string) => void;
   onEdit: (id: string) => void;
   onDelete: (id: string) => void;
 }

 const PropertyCard: React.FC<PropertyCardProps> = ({
   property,
   onView,
   onEdit,
   onDelete,
 }) => {
   return (
     <Card className="hover:shadow-lg transition-shadow">
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
               <p className="text-lg font-semibold">{property.metrics.roi}%</p>
             </div>
             <div>
               <p className="text-sm text-gray-500">Occupancy</p>
               <p className="text-lg font-semibold">
                 {property.occupancyRate}%
               </p>
             </div>
           </div>

           <div className="flex gap-2 pt-4">
             <button
               onClick={() => onView(property.id)}
               className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
             >
               <Eye className="h-4 w-4" />
               View
             </button>
             <button
               onClick={() => onEdit(property.id)}
               className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 text-gray-600 rounded hover:bg-gray-200"
             >
               <Edit2 className="h-4 w-4" />
               Edit
             </button>
             <button
               onClick={() => onDelete(property.id)}
               className="flex items-center justify-center gap-2 px-3 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200"
             >
               <Trash2 className="h-4 w-4" />
             </button>
           </div>
         </div>
       </CardContent>
     </Card>
   );
 };

 export default PropertyCard;