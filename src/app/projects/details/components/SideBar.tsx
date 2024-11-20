import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ArrowRight,
  Download,
  Euro,
  Link,
  MessageCircle,
  AlertCircle,
} from "lucide-react";
import React from 'react'
import { ProjectDetail } from '@/types/project';

const SideBar = ({ project }: { project: ProjectDetail }) => {
  return (
    <div className="lg:w-[400px] xl:w-[450px] lg:sticky lg:top-8 lg:self-start space-y-6">
      {/* Métriques Financières Card */}

      {/* Dernières actualités Card */}
      <Card className="bg-white/50 backdrop-blur-sm border-gray-100/50 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-blue-600" />
            Dernières actualités
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {project.actualites.map((actu, index) => (
              <div
                key={index}
                className="group p-4 rounded-lg hover:bg-gray-50/50 transition-colors border border-transparent hover:border-gray-100"
              >
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                      {actu.titre}
                    </h3>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                      {new Date(actu.date).toLocaleDateString("fr-FR")}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {actu.contenu}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center justify-center gap-2 py-2">
            Voir toutes les actualités
            <ArrowRight className="w-4 h-4" />
          </button>
        </CardContent>
      </Card>
      <div className="flex flex-wrap gap-4">
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Download className="w-4 h-4 mr-2" />
          Télécharger le rapport complet
        </button>
        <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
          <MessageCircle className="w-4 h-4 mr-2" />
          Participer à la consultation
        </button>
        <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
          <Link className="w-4 h-4 mr-2" />
          Partager le projet
        </button>
      </div>
    </div>
  );
}

export default SideBar