import React from "react";
import { Home, Calculator, Settings, LineChart, Globe, Briefcase } from "lucide-react";

// Define the type for the props
interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => (
  <div className="mb-6 border-b">
    <div className="flex space-x-1">
      {[
        { id: "dashboard", label: "Dashboard", icon: Home },
        { id: "analysis", label: "Property Analysis", icon: Calculator },
        { id: "market", label: "Market Research", icon: Globe },
        // { id: "financial", label: "Financial Planning", icon: LineChart },
        { id: "portfolio", label: "Portfolio", icon: Briefcase },
        { id: "settings", label: "Settings", icon: Settings },
      ].map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => setActiveTab(id)}
          className={`px-4 py-2 flex items-center gap-2 transition-colors
            ${
              activeTab === id 
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-600 hover:text-blue-500"
            }`}
        >
          <Icon className="h-4 w-4" />
          {label}
        </button>
      ))}
    </div>
  </div>
);
