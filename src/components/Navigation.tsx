import React, { useState } from "react";
import { Home, Calculator, Settings, Globe, Briefcase, ChevronRight, ChevronLeft, LineChart } from "lucide-react";

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const [isCollapsed, setIsCollapsed] = useState(window.innerWidth < 768);

  return (
    <div className={`${isCollapsed ? 'w-16' : 'w-64'} h-screen bg-white border-r shadow-sm fixed left-0 top-0 transition-all duration-300`}>
      <div className={`p-4 border-b flex ${isCollapsed ? 'justify-center' : 'justify-between'} items-center`}>
        {!isCollapsed && <h1 className="text-xl font-bold text-gray-800">Real Estate</h1>}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 hover:bg-gray-100 rounded-lg"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
      <nav className="p-4 space-y-2">
        {[
          { id: "dashboard", label: "Dashboard", icon: Home },
          { id: "analysis", label: "Property Analysis", icon: Calculator },
          { id: "market", label: "Market Research", icon: Globe },
          { id: "portfolio", label: "Portfolio", icon: Briefcase },
          { id: "financial", label: "Financial Planning", icon: LineChart },
          { id: "settings", label: "Settings", icon: Settings },
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`w-full flex items-center ${isCollapsed ? 'justify-center px-2' : 'px-4'} py-3 gap-3 rounded-lg transition-colors
              ${activeTab === id
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-gray-50 hover:text-blue-500"
              }`}
            title={isCollapsed ? label : undefined}
          >
            <Icon size={20} />
            {!isCollapsed && <span>{label}</span>}
          </button>
        ))}
      </nav>
    </div>
  );
};
