 import React from "react";

 export default function PropertiesLayout({
   children,
 }: {
   children: React.ReactNode;
 }) {
  return <div className="container mx-auto px-4 py-6">{children}</div>;
}
