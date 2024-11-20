import React from "react";
import Link from "next/link";
import {
  MapPin,
  Leaf,
  Users,
  Euro,
  Calendar,
  Building2,
  ArrowRight,
} from "lucide-react";
import type { Project } from "@/types/project";

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const getPhaseColor = (phase: string) => {
    const colors = {
      "En cours": "bg-blue-100 text-blue-700",
      Planification: "bg-yellow-100 text-yellow-700",
      Terminé: "bg-green-100 text-green-700",
      "En pause": "bg-red-100 text-red-700",
    };
    return colors[phase as keyof typeof colors] || "bg-gray-100 text-gray-700";
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${getPhaseColor(
              project.phase
            )}`}
          >
            {project.phase}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {project.title}
            </h3>
            <div className="flex items-center text-gray-600 text-sm">
              <MapPin className="w-4 h-4 mr-2" />
              {project.location}
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-sm text-gray-500">Type</span>
            <span className="text-sm font-medium text-gray-700">
              {project.type}
            </span>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-6 line-clamp-2">
          {project.description}
        </p>

        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Progression</span>
            <span className="font-medium">{project.progress}%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${project.progress}%` }}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="flex items-center space-x-2">
              <Euro className="w-4 h-4 text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">Budget prévu</p>
                <p className="font-semibold text-sm">{project.plannedCost}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Euro className="w-4 h-4 text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">Coût actuel</p>
                <p className="font-semibold text-sm">{project.currentCost}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Leaf className="w-4 h-4 text-green-500" />
              <div>
                <p className="text-xs text-gray-500">Impact environnemental</p>
                <p className="font-semibold text-sm">
                  {project.environmentalScore}/100
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-purple-500" />
              <div>
                <p className="text-xs text-gray-500">Impact social</p>
                <p className="font-semibold text-sm">
                  {project.socialScore}/100
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-gray-100">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Building2 className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">
                  {project.contractor}
                </span>
              </div>
              <Link
                href={`/projects/details/${project.id}`}
                className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Voir détails
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
