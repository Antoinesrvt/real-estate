import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import TabNavigation from './TabNavigation';
import { ProjectDetail } from '@/types/project';
import {
  Users,
  MessageCircle,
  Leaf,
  Euro,
  TrendingUp,
  Building2,
  FileText,
  Download,
  ThumbsUp,
} from "lucide-react";
import { ProjectCharts } from './Charts';
import PlanningTab from './TabContentRenderers/PlanningTab';

interface MainContentProps {
  project: ProjectDetail;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const MainContent = ({ project, activeTab, setActiveTab }: MainContentProps) => {
    const renderTab = () => {
      switch (activeTab) {
        case "apercu":
          return (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Objectifs du projet
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-4 space-y-2">
                      {project.objectifs.map((objectif, index) => (
                        <li key={index}>{objectif}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Impacts prévus</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-4 space-y-2">
                      {project.impactPrevus.map((impact, index) => (
                        <li key={index}>{impact}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Scores */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Scores d'impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4">
                      <Leaf className="w-8 h-8 mx-auto text-green-500 mb-2" />
                      <div className="text-2xl font-bold text-green-500">
                        {project.scores.environnemental}%
                      </div>
                      <div className="text-sm text-gray-500">
                        Environnemental
                      </div>
                    </div>
                    <div className="text-center p-4">
                      <Users className="w-8 h-8 mx-auto text-blue-500 mb-2" />
                      <div className="text-2xl font-bold text-blue-500">
                        {project.scores.social}%
                      </div>
                      <div className="text-sm text-gray-500">Social</div>
                    </div>
                    <div className="text-center p-4">
                      <Euro className="w-8 h-8 mx-auto text-yellow-500 mb-2" />
                      <div className="text-2xl font-bold text-yellow-500">
                        {project.scores.economique}%
                      </div>
                      <div className="text-sm text-gray-500">Économique</div>
                    </div>
                    <div className="text-center p-4">
                      <TrendingUp className="w-8 h-8 mx-auto text-purple-500 mb-2" />
                      <div className="text-2xl font-bold text-purple-500">
                        {project.scores.innovation}%
                      </div>
                      <div className="text-sm text-gray-500">Innovation</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <ProjectCharts
                budgetData={project.budgetData}
                impactData={project.impactData}
              />
            </div>
          );

        case "planning":
          return <PlanningTab project={project}/>

        case "acteurs":
          return (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">Intervenants du projet</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.acteurs.map((acteur, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
                  >
                    <div className="flex-shrink-0">
                      <Building2 className="w-10 h-10 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{acteur.nom}</div>
                      <div className="text-sm text-gray-500">{acteur.role}</div>
                      {/* <div className="text-sm text-gray-500 mt-1">{acteur.email}</div>
                      <div className="text-sm text-gray-500">{acteur.telephone}</div> */}
                    </div>
                    <div className="flex items-center">
                      <button className="text-blue-600 hover:underline text-sm">
                        Contacter
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );

        case "documents":
          return (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">Documents publics</h2>
              <div className="space-y-4">
                {project.documents.map((doc, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <FileText className="w-6 h-6 text-blue-500" />
                      <div>
                        <div className="font-medium">{doc.titre}</div>
                        <div className="text-sm text-gray-500">
                          {doc.type} • {doc.taille}
                        </div>
                      </div>
                    </div>
                    <button className="p-2 hover:bg-gray-100 rounded-full">
                      <Download className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );

        case "participation":
          return (
            <div className="space-y-6">
              <Card className="bg-white/80 backdrop-blur-sm shadow-md border-gray-100">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Consultation publique</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="text-center p-4 border rounded-lg hover:shadow-lg transition-shadow">
                      <Users className="w-8 h-8 mx-auto text-blue-500 mb-2" />
                      <div className="text-2xl font-bold">
                        {project.consultationPublique.participants}
                      </div>
                      <div className="text-sm text-gray-500">Participants</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg hover:shadow-lg transition-shadow">
                      <ThumbsUp className="w-8 h-8 mx-auto text-green-500 mb-2" />
                      <div className="text-2xl font-bold">
                        {project.consultationPublique.avisPositifs}
                      </div>
                      <div className="text-sm text-gray-500">Avis positifs</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg hover:shadow-lg transition-shadow">
                      <MessageCircle className="w-8 h-8 mx-auto text-purple-500 mb-2" />
                      <div className="text-2xl font-bold">
                        {project.consultationPublique.commentaires}
                      </div>
                      <div className="text-sm text-gray-500">Commentaires</div>
                    </div>
                  </div>

                  {/* Comments Section */}
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-4">Commentaires des participants</h3>
                    <div className="space-y-4">
                      {project.consultationPublique.commentairesList.map((comment, index) => (
                        <div key={index} className="p-4 border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                          <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0">
                              <Users className="w-6 h-6 text-blue-500" />
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-gray-900">{comment.nom}</div>
                              <div className="text-sm text-gray-500">{new Date(comment.date).toLocaleDateString("fr-FR")}</div>
                              <p className="mt-1 text-gray-700">{comment.contenu}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          );
      }
    };

  return (
    <Card className="bg-white/80 backdrop-blur-sm shadow-md border-gray-100">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <div className="px-6 pt-4">
          <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        <div className="animate-fadeIn">{renderTab()}</div>
      </div>
    </Card>
  );
};

export default MainContent; 