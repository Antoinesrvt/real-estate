import {
  AlertCircle,
  HelpCircle,
  Bell,
  MessageCircle,
  Share,
  Clock,
  FileText,
  Github,
} from "lucide-react";
import { Download } from 'lucide-react';
import React from 'react'
import Link from 'next/link';
import { Badge } from "@/components/ui/badge";

const Footer = () => {
  return (
    <footer className="mt-16 border-t border-gray-200 bg-white/50 backdrop-blur-sm">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Quick Actions Section */}
        <div className="py-8 grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-gray-200">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900">
              Actions rapides
            </h3>
            <div className="flex flex-col space-y-2">
              <button className="flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors">
                <Download className="w-4 h-4 mr-2" />
                Télécharger le rapport PDF
              </button>
              <button className="flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors">
                <Share className="w-4 h-4 mr-2" />
                Partager le projet
              </button>
              <button className="flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors">
                <Bell className="w-4 h-4 mr-2" />
                Activer les notifications
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900">
              Informations légales
            </h3>
            <div className="flex flex-col space-y-2">
              <Link
                href="#"
                className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
              >
                Mentions légales
              </Link>
              <Link
                href="#"
                className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
              >
                Politique de confidentialité
              </Link>
              <Link
                href="#"
                className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
              >
                Conditions d'utilisation
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900">
              Contact & Support
            </h3>
            <div className="flex flex-col space-y-2">
              <Link
                href="#"
                className="flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Contacter l'équipe projet
              </Link>
              <button className="flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors">
                <AlertCircle className="w-4 h-4 mr-2" />
                Signaler une erreur
              </button>
              <Link
                href="#"
                className="flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors"
              >
                <HelpCircle className="w-4 h-4 mr-2" />
                FAQ
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            <span>
              Dernière mise à jour: {new Date().toLocaleDateString("fr-FR")}
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 text-sm text-gray-600">
              <Badge
                variant="outline"
                className="bg-green-50 text-green-700 border-green-200"
              >
                Version 2.1.0
              </Badge>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <Link
                href="#"
                className="hover:text-blue-600 transition-colors flex items-center"
              >
                <Github className="w-4 h-4 mr-1" />
                GitHub
              </Link>
              <Link
                href="#"
                className="hover:text-blue-600 transition-colors flex items-center"
              >
                <FileText className="w-4 h-4 mr-1" />
                Documentation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer