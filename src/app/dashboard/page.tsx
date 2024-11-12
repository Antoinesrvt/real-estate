"use client";
import React, { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { GlobalSettings } from "@/components/GlobalSettings";
import PropertyAnalysis from "@/components/PropertyAnalysis";
import Dashboard from "@/components/Dashboard";
import FinancialPlanning from "@/components/FinancialPlanning";
import MarketResearch from "@/components/MarketResearchContent";
import Portfolio from "@/components/Portfolio";

const RealEstateCalculator: React.FC = () => {
  // Add new state variables
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [currency, setCurrency] = useState<string>('USD');
  const [country, setCountry] = useState<string>('US');
  
  // ... (existing state variables)

  // Add currency conversion helper
  // const formatMoney = (amount: number): string => {
  //   return new Intl.NumberFormat(undefined, {
  //     style: "currency",
  //     currency: currency,
  //   }).format(amount);
  // };

  // Render different content based on active tab
  const renderContent = (): JSX.Element | null => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard portfolioData={[]} marketData={[]} />;
      case "analysis":
        return <PropertyAnalysis />;
      case "market":
        return <MarketResearch />;
      case "financial":
        return <FinancialPlanning />;
      case "portfolio":
        return <Portfolio />;
      case "settings":
        return (
          <GlobalSettings
            currency={currency}
            setCurrency={setCurrency}
            country={country}
            setCountry={setCountry}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      {renderContent()}
    </div>
  );
};

export default RealEstateCalculator;