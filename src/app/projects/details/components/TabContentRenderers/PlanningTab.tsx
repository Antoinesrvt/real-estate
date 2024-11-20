 import React, { useState } from "react";
 import {
   Card,
   CardHeader,
   CardTitle,
   CardContent,
 } from "@/components/ui/card";
 import { ProjectDetail } from "@/types/project";
 import { List, History, CheckCircle2, Circle, Clock } from "lucide-react";
 import { Toggle } from "@/components/ui/toggle";

 interface PlanningTabProps {
   project: ProjectDetail;
 }

 const PlanningTab = ({ project }: PlanningTabProps) => {
   const [viewMode, setViewMode] = useState<"list" | "timeline">("list");

   const getStatusIcon = (status: string) => {
     switch (status) {
       case "Complété":
         return <CheckCircle2 className="w-5 h-5 text-green-500" />;
       case "En cours":
         return <Clock className="w-5 h-5 text-blue-500" />;
       default:
         return <Circle className="w-5 h-5 text-gray-300" />;
     }
   };

   const getStatusColor = (status: string) => {
     switch (status) {
       case "Complété":
         return "text-green-500 bg-green-50 border-green-100";
       case "En cours":
         return "text-blue-500 bg-blue-50 border-blue-100";
       default:
         return "text-gray-500 bg-gray-50 border-gray-100";
     }
   };

   return (
     <div className="space-y-6">
       {/* View Toggle */}
       <div className="flex justify-between items-center">
         <h2 className="text-lg font-semibold text-gray-900">Jalons clés</h2>
         <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
           <Toggle
             pressed={viewMode === "list"}
             onPressedChange={() => setViewMode("list")}
             className={`${
               viewMode === "list" ? "bg-white shadow-sm" : ""
             } p-2 rounded-md`}
             aria-label="Vue liste"
           >
             <List className="w-4 h-4" />
           </Toggle>
           <Toggle
             pressed={viewMode === "timeline"}
             onPressedChange={() => setViewMode("timeline")}
             className={`${
               viewMode === "timeline" ? "bg-white shadow-sm" : ""
             } p-2 rounded-md`}
             aria-label="Vue chronologique"
           >
             <History className="w-4 h-4" />
           </Toggle>
         </div>
       </div>

       <Card>
         <CardContent className="p-6">
           {viewMode === "list" ? (
             // List View
             <div className="space-y-4">
               {project.jalons.map((jalon, index) => (
                 <div
                   key={index}
                   className="flex items-center p-4 bg-white rounded-lg border border-gray-100 hover:border-blue-100 transition-colors"
                 >
                   {getStatusIcon(jalon.statut)}
                   <div className="ml-4 flex-1">
                     <div className="font-medium text-gray-900">
                       {jalon.titre}
                     </div>
                     <div className="text-sm text-gray-500">
                       {new Date(jalon.date).toLocaleDateString("fr-FR", {
                         day: "numeric",
                         month: "long",
                         year: "numeric",
                       })}
                     </div>
                   </div>
                   <span
                     className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                       jalon.statut
                     )}`}
                   >
                     {jalon.statut}
                   </span>
                 </div>
               ))}
             </div>
           ) : (
             // Timeline View
             <div className="relative">
               <div className="absolute left-9 top-0 bottom-0 w-px bg-gray-200" />
               <div className="space-y-8">
                 {project.jalons.map((jalon, index) => (
                   <div key={index} className="relative flex items-start group">
                     <div className="absolute left-9 top-5 h-full w-px bg-gray-200 group-last:hidden" />
                     <div className="flex items-center justify-center w-20 pt-1">
                       <span className="text-sm font-medium text-gray-500">
                         {new Date(jalon.date).toLocaleDateString("fr-FR", {
                           month: "short",
                           year: "2-digit",
                         })}
                       </span>
                     </div>
                     <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-white border-2 border-gray-200 z-10">
                       {getStatusIcon(jalon.statut)}
                     </div>
                     <div className="ml-6 p-4 bg-white rounded-lg border border-gray-100 hover:border-blue-100 transition-all duration-200 flex-1 shadow-sm hover:shadow-md">
                       <div className="flex justify-between items-start">
                         <div>
                           <h3 className="font-medium text-gray-900">
                             {jalon.titre}
                           </h3>
                           <p className="text-sm text-gray-500 mt-1">
                             {new Date(jalon.date).toLocaleDateString("fr-FR", {
                               day: "numeric",
                               month: "long",
                               year: "numeric",
                             })}
                           </p>
                         </div>
                         <span
                           className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                             jalon.statut
                           )}`}
                         >
                           {jalon.statut}
                         </span>
                       </div>
                     </div>
                   </div>
                 ))}
               </div>
             </div>

            //   <div className="flex items-center space-x-8">
            //   {project.jalons.map((jalon, index) => (
            //     <div key={index} className="flex flex-col items-center">
            //       <div className="flex items-center">
            //         <div
            //           className={`w-3 h-3 rounded-full ${
            //             jalon.statut === "Complété"
            //               ? "bg-green-500"
            //               : jalon.statut === "En cours"
            //               ? "bg-blue-500"
            //               : "bg-gray-300"
            //           }`}
            //         />
            //         <div className={`h-1 w-20 ${index < project.jalons.length - 1 ? 'bg-gray-200' : ''}`} />
            //       </div>
            //       <div className="mt-2 text-center">
            //         <div className="font-medium text-gray-900">{jalon.titre}</div>
            //         <div className="text-sm text-gray-500">
            //           {new Date(jalon.date).toLocaleDateString("fr-FR", {
            //             day: 'numeric',
            //             month: 'long',
            //             year: 'numeric'
            //           })}
            //         </div>
            //         <span
            //           className={`mt-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(jalon.statut)}`}
            //         >
            //           {jalon.statut}
            //         </span>
            //       </div>
            //     </div>
            //   ))}
            // </div>
           )}
         </CardContent>
       </Card>
     </div>
   );
 };

 export default PlanningTab;