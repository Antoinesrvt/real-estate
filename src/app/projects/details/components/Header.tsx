import { AlertCircle, Calendar, MapPin, Clock, TrendingUp, Target } from 'lucide-react';
import React from 'react'
import { ProjectDetail } from '@/types/project';
import { Card } from '@/components/ui/card';

const Header = ({ project }: { project: ProjectDetail }) => {
  const getPhaseColor = (phase: string) => {
    switch (phase.toLowerCase()) {
      case 'en cours':
        return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'terminé':
        return 'bg-green-50 text-green-700 border-green-100';
      case 'en attente':
        return 'bg-amber-50 text-amber-700 border-amber-100';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-100';
    }
  };

  const formatDateRange = (start: string, end: string) => {
    const startDate = new Date(start).toLocaleDateString("fr-FR", {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
    const endDate = new Date(end).toLocaleDateString("fr-FR", {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
    return `${startDate} - ${endDate}`;
  };

  return (
    <Card className="bg-gradient-to-br from-gray-50 via-white to-gray-50 shadow-md hover:shadow-lg transition-shadow duration-300 mb-12">
      <div className="p-8 space-y-8">
        {/* Title and Status Section */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getPhaseColor(project.phase)}`}>
                {project.phase}
              </span>
              <span className="text-sm text-gray-500 font-medium">
                ID: {project.id}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 leading-tight">
              {project.titre}
            </h1>
          </div>
          
          {/* Progress Circle */}
          <div className="flex flex-col items-center">
            <div className="relative w-20 h-20">
              <svg className="w-20 h-20 transform -rotate-90">
                <circle
                  className="text-gray-200"
                  strokeWidth="5"
                  stroke="currentColor"
                  fill="transparent"
                  r="35"
                  cx="40"
                  cy="40"
                />
                <circle
                  className="text-blue-600"
                  strokeWidth="5"
                  strokeDasharray={220}
                  strokeDashoffset={220 - (220 * project.progression) / 100}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="35"
                  cx="40"
                  cy="40"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-blue-600">{project.progression}%</span>
              </div>
            </div>
            <span className="text-sm font-medium text-gray-600 mt-2">Progression</span>
          </div>
        </div>

        {/* Project Meta Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-gray-100 hover:border-blue-100 transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <MapPin className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Localisation</p>
                <p className="font-medium text-gray-900">{project.lieu}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-gray-100 hover:border-blue-100 transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Période</p>
                <p className="font-medium text-gray-900">{formatDateRange(project.dateDebut, project.dateFin)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-gray-100 hover:border-blue-100 transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Target className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Budget prévu</p>
                <p className="font-medium text-gray-900">{project.coutPrevu}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-gray-100 hover:border-blue-100 transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Coût actuel</p>
                <p className="font-medium text-gray-900">{project.coutActuel}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default Header;