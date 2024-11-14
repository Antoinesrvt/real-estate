import { Goal } from "../app/tracker/new/page";

export const goalsData: Goal[] = [
  {
    id: 1,
    title: "Site E-commerce",
    type: "fondation",
    level: 0,
    progress: 90,
    connections: [5],
    description: "Développement Frontend",
  },
  {
    id: 2,
    title: "Base de données",
    type: "fondation",
    level: 0,
    progress: 75,
    connections: [5],
    description: "Architecture Backend",
  },
  {
    id: 5,
    title: "MVP Application",
    type: "action",
    level: 1,
    progress: 60,
    connections: [8],
    description: "Version Beta",
  },
  {
    id: 8,
    title: "Startup Tech",
    type: "strategie",
    level: 2,
    progress: 45,
    connections: [10],
    description: "Lancement Entreprise",
  },
  {
    id: 10,
    title: "Liberté Financière",
    type: "vision",
    level: 3,
    progress: 30,
    connections: [],
    description: "Objectif Final",
  },
];