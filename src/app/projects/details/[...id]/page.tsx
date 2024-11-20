"use client";
import React, { useState } from "react";
import {
  Calendar,
  MapPin, 
  Building2, 
  Users, 
  Leaf, 
  TrendingUp, 
  AlertCircle,
  FileText,
  Link,
  Download,
  MessageCircle,
  ThumbsUp,
  Euro,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProjectDetail } from "@/types/project";
import SideBar from "../components/SideBar";
import Footer from "../components/Footer";
import Header from "../components/Header";
import TabNavigation from "../components/TabNavigation";
import MainContent from "../components/MainContent";

const ProjetDetailView = ({ projet }: { projet: any }) => {
  const [activeTab, setActiveTab] = useState("apercu");

  // Exemple de données détaillées d'un projet
 

  const projetExample: ProjectDetail = {
    id: "P2024-IDF-001",
    titre: "Extension Ligne 4 Metro",
    lieu: "Île-de-France",
    phase: "En cours",
    progression: 65,
    coutPrevu: "220M€",
    coutActuel: "198M€",
    dateDebut: "2023-03-15",
    dateFin: "2026-12-31",
    description:
      "Extension de la ligne 4 du métro parisien vers le sud pour améliorer la desserte des communes limitrophes.",
    objectifs: [
      "Désengorger le trafic routier du sud de Paris",
      "Réduire les émissions de CO2 liées au transport",
      "Améliorer l'accessibilité des communes du sud",
    ],
    impactPrevus: [
      "Réduction de 15% du trafic routier",
      "Économie de 12000 tonnes de CO2/an",
      "Gain de temps moyen de 15 minutes par trajet",
    ],
    scores: {
      environnemental: 85,
      social: 90,
      economique: 75,
      innovation: 80,
    },
    acteurs: [
      {
        nom: "RATP",
        role: "Maître d'ouvrage",
      },
      {
        nom: "Bouygues Construction",
        role: "Entreprise principale",
      },
      {
        nom: "Région Île-de-France",
        role: "Financeur principal",
      },
    ],
    jalons: [
      {
        date: "2023-03-15",
        titre: "Début des travaux",
        statut: "Complété",
      },
      {
        date: "2024-06-30",
        titre: "Fin du gros œuvre",
        statut: "En cours",
      },
      {
        date: "2025-12-31",
        titre: "Installation des équipements",
        statut: "À venir",
      },
      {
        date: "2026-12-31",
        titre: "Mise en service",
        statut: "À venir",
      },
    ],
    documents: [
      {
        titre: "Étude d'impact environnemental",
        type: "PDF",
        taille: "2.4 MB",
      },
      {
        titre: "Plan détaillé du tracé",
        type: "PDF",
        taille: "5.1 MB",
      },
    ],
    actualites: [
      {
        date: "2024-03-01",
        titre: "Phase 2 des travaux terminée avec succès",
        contenu:
          "La deuxième phase des travaux s'est achevée dans les délais prévus...",
      },
    ],
    consultationPublique: {
      participants: 1250,
      avisPositifs: 850,
      commentaires: 320,
    },
    budgetData: [
      { name: "Infrastructure", value: 120000 },
      { name: "Équipements", value: 45000 },
      { name: "Main d'œuvre", value: 35000 },
      { name: "Études", value: 20000 },
    ],
    impactData: [
      { subject: "Environnement", value: 85, fullMark: 100 },
      { subject: "Social", value: 90, fullMark: 100 },
      { subject: "Économie", value: 75, fullMark: 100 },
      { subject: "Innovation", value: 80, fullMark: 100 },
      { subject: "Accessibilité", value: 95, fullMark: 100 },
    ],
  };



  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main content */}
        {/* Modern Header Section */}
        <Header project={projetExample} />

        {/* Main Content Area */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: Tab Navigation and Content */}
          <div className="flex-1">
            <MainContent
              project={projetExample}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </div>

          {/* Right Sidebar */}
          <SideBar project={projetExample} />
        </div>
      </div>
      {/* Enhanced Footer */}
      <Footer />
    </div>
  );
};

export default ProjetDetailView;