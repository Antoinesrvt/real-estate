export interface Project {
  id: string;
  title: string;
  location: string;
  phase: string;
  progress: number;
  plannedCost: string;
  currentCost: string;
  environmentalScore: number;
  socialScore: number;
  description: string;
  detailedDescription?: string;
  startDate: string;
  endDate: string;
  contractor: string;
  type: string;
  imageUrl: string;
  coordinates: [number, number];
  objectives?: string[];
  milestones: Array<{
    date: string;
    title: string;
    status: "completed" | "in-progress" | "planned";
    progress: number;
    budget: number;
  }>;
  budgetData: Array<{
    name: string;
    value: number;
  }>;
  impactData: Array<{
    subject: string;
    value: number;
    fullMark: number;
  }>;
  gallery?: string[];
}

export interface ProjectDetail {
  id: string;
  titre: string;
  lieu: string;
  phase: string;
  progression: number;
  coutPrevu: string;
  coutActuel: string;
  dateDebut: string;
  dateFin: string;
  description: string;
  objectifs: string[];
  impactPrevus: string[];
  scores: {
    environnemental: number;
    social: number;
    economique: number;
    innovation: number;
  };
  acteurs: {
    nom: string;
    role: string;
  }[];
  jalons: {
    date: string;
    titre: string;
    statut: string;
  }[];
  documents: {
    titre: string;
    type: string;
    taille: string;
  }[];
  actualites: {
    date: string;
    titre: string;
    contenu: string;
  }[];
  consultationPublique: {
    participants: number;
    avisPositifs: number;
    commentaires: number;
    commentairesList: {
      nom: string;
      date: string;
      contenu: string;
    }[];  
  };
  budgetData: {
    name: string;
    value: number
  }[];
  impactData: {
    subject: string;
    value: number;
    fullMark: number
  }[];
};