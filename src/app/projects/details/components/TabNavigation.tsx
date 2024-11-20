import React from 'react';
import { Users, Calendar, Building2, FileText, MessageCircle, ChartBar } from 'lucide-react';

interface TabNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const tabs = [
  {
    id: 'apercu',
    label: 'Aperçu',
    icon: ChartBar,
    color: 'text-blue-600'
  },
  {
    id: 'planning',
    label: 'Planning',
    icon: Calendar,
    color: 'text-emerald-600'
  },
  {
    id: 'acteurs',
    label: 'Acteurs',
    icon: Users,
    color: 'text-purple-600'
  },
  {
    id: 'documents',
    label: 'Documents',
    icon: FileText,
    color: 'text-amber-600'
  },
  {
    id: 'participation',
    label: 'Participation',
    icon: MessageCircle,
    color: 'text-indigo-600'
  }
];

const TabNavigation = ({ activeTab, setActiveTab }: TabNavigationProps) => {
  return (
    <nav className="flex space-x-1" aria-label="Tabs">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              group relative min-w-[120px] flex-1 px-4 py-4 flex items-center justify-center gap-2
              text-sm font-medium transition-all duration-200
              hover:bg-gray-50 rounded-t-lg
              ${isActive 
                ? 'text-blue-600 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-600' 
                : 'text-gray-500 hover:text-gray-700'}
            `}
          >
            <Icon className={`w-4 h-4 ${isActive ? tab.color : 'text-gray-400 group-hover:text-gray-500'}`} />
            <span>{tab.label}</span>
            
            {/* Active Tab Indicator */}
            {isActive && (
              <span className="absolute inset-x-0 -bottom-px h-px bg-blue-600" />
            )}
          </button>
        );
      })}
    </nav>
  );
};

export default TabNavigation;