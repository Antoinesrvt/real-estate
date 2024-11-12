import React from "react";
import { Home, Calculator, Settings, Globe, Briefcase } from "lucide-react";

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => (
  <div className="w-64 h-screen bg-white border-r shadow-sm fixed left-0 top-0">
    <div className="p-4 border-b">
      <h1 className="text-xl font-bold text-gray-800">Real Estate</h1>
    </div>
    <nav className="p-4 space-y-2">
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
          className={`w-full px-4 py-3 flex items-center gap-3 rounded-lg transition-colors
            ${
              activeTab === id
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-gray-50 hover:text-blue-500"
            }`}
        >
          <Icon className="h-5 w-5" />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  </div>
);
