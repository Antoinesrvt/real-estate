"use client";
import React, { useState } from "react";
import {
  Search,
  MapPin,
  TrendingUp,
  Building2,
  Leaf,
  Users,
  Euro,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { StatsCard } from "./statCard";
import { Project } from "@/types/project";
import { getAllProjects } from "@/services/projectService";
import { ProjectCard } from "./projectCard";

const regions = [
  "Toutes les régions",
  "Île-de-France",
  "Auvergne-Rhône-Alpes",
  "Nouvelle-Aquitaine",
  "Occitanie",
  "Hauts-de-France",
  "Grand Est",
  "Provence-Alpes-Côte d'Azur",
  "Pays de la Loire",
  "Normandie",
  "Bretagne",
  "Bourgogne-Franche-Comté",
  "Centre-Val de Loire",
  "Corse",
];

const projectTypes = [
  "Tous les types",
  "Transport",
  "Énergie",
  "Urbanisme",
  "Éducation",
  "Santé",
  "Culture",
  "Sport",
  "Environnement",
];


const ProjetPublicDashboard = () => {
  const [selectedRegion, setSelectedRegion] = useState("Toutes les régions");
  const [selectedType, setSelectedType] = useState("Tous les types");
  const [searchQuery, setSearchQuery] = useState("");

  const projects = getAllProjects();
  const filteredProjects = projects.filter((project) => {
    const matchesRegion =
      selectedRegion === "Toutes les régions" ||
      project.location === selectedRegion;
    const matchesType =
      selectedType === "Tous les types" || project.type === selectedType;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRegion && matchesType && matchesSearch;
  });

  const totalBudget = projects.reduce((sum, project) => {
    const cost = parseFloat(project.plannedCost.replace("M€", "")) * 1000000;
    return sum + cost;
  }, 0);

  const stats = [
    {
      title: "Projets en cours",
      value: projects.length.toString(),
      icon: TrendingUp,
      color: "bg-blue-600",
    },
    {
      title: "Budget total",
      value: `${(totalBudget / 1000000000).toFixed(1)}Mrd€`,
      icon: Euro,
      color: "bg-green-600",
    },
    {
      title: "Impact citoyen",
      value: "15.2M",
      icon: Users,
      color: "bg-purple-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold mb-4">Projets Publics France</h1>
          <p className="text-xl mb-8">
            Découvrez et suivez les projets publics dans votre région
          </p>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 bg-white rounded-xl flex items-center p-3">
              <Search className="text-gray-500 w-5 h-5 mr-3" />
              <input
                type="text"
                placeholder="Rechercher un projet..."
                className="w-full bg-transparent text-gray-800 outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <select
              className="bg-white text-gray-800 rounded-xl p-3 outline-none min-w-[200px]"
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
            >
              {regions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
            <select
              className="bg-white text-gray-800 rounded-xl p-3 outline-none min-w-[200px]"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              {projectTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <StatsCard
              key={index}
              icon={stat.icon}
              title={stat.title}
              value={stat.value}
              color={stat.color}
            />
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucun projet trouvé
            </h3>
            <p className="text-gray-600">
              Essayez de modifier vos critères de recherche pour voir plus de
              projets.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjetPublicDashboard;
