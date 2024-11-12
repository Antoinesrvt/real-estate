 "use client";

 import React from "react";
 import { useRouter } from "next/navigation";
 import {
   Card,
   CardContent,
   CardHeader,
   CardTitle,
 } from "@/components/ui/card";

 const AddProperty: React.FC = () => {
   const router = useRouter();

   const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
     // Implement form submission logic here
     // After successful submission, redirect to the portfolio page
     router.push("/dashboard/properties");
   };

   return (
     <div className="space-y-6">
       <h1 className="text-2xl font-bold">Add New Property</h1>

       <Card>
         <CardHeader>
           <CardTitle>Property Details</CardTitle>
         </CardHeader>
         <CardContent>
           <form onSubmit={handleSubmit} className="space-y-6">
             <div className="grid md:grid-cols-2 gap-6">
               <div className="space-y-2">
                 <label className="text-sm font-medium text-gray-700">
                   Property Name
                 </label>
                 <input
                   type="text"
                   required
                   className="w-full px-3 py-2 border rounded-md"
                 />
               </div>

               <div className="space-y-2">
                 <label className="text-sm font-medium text-gray-700">
                   Property Type
                 </label>
                 <select className="w-full px-3 py-2 border rounded-md">
                   <option value="residential">Residential</option>
                   <option value="commercial">Commercial</option>
                   <option value="industrial">Industrial</option>
                 </select>
               </div>

               <div className="space-y-2">
                 <label className="text-sm font-medium text-gray-700">
                   Purchase Price
                 </label>
                 <input
                   type="number"
                   required
                   className="w-full px-3 py-2 border rounded-md"
                 />
               </div>

               <div className="space-y-2">
                 <label className="text-sm font-medium text-gray-700">
                   Monthly Rent
                 </label>
                 <input
                   type="number"
                   required
                   className="w-full px-3 py-2 border rounded-md"
                 />
               </div>

               {/* Add more form fields as needed */}
             </div>

             <div className="flex justify-end gap-4">
               <button
                 type="button"
                 onClick={() => router.back()}
                 className="px-4 py-2 border rounded-md hover:bg-gray-50"
               >
                 Cancel
               </button>
               <button
                 type="submit"
                 className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
               >
                 Add Property
               </button>
             </div>
           </form>
         </CardContent>
       </Card>
     </div>
   );
 };

 export default AddProperty;