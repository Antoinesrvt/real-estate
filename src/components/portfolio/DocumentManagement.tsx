 import React from "react";
 import {
   Card,
   CardHeader,
   CardTitle,
   CardContent,
 } from "@/components/ui/card";
 import { Eye, Download } from "lucide-react";
 import { Property } from "@/types/portfolio";

 interface DocumentManagementProps {
   properties: Property[];
   onViewDocument: (propertyId: string, documentId: string) => void;
   onDownloadDocument: (propertyId: string, documentId: string) => void;
 }

 const DocumentManagement: React.FC<DocumentManagementProps> = ({
   properties,
   onViewDocument,
   onDownloadDocument,
 }) => {
   return (
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
                     <button
                       onClick={() => onViewDocument(property.id, doc.id)}
                       className="p-1 hover:bg-gray-100 rounded"
                     >
                       <Eye className="h-4 w-4" />
                     </button>
                     <button
                       onClick={() => onDownloadDocument(property.id, doc.id)}
                       className="p-1 hover:bg-gray-100 rounded"
                     >
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
   );
 };

 export default DocumentManagement;