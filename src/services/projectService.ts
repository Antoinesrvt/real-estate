import type { Project } from "@/types/project";

const mockedProjects: Project[] = [
  {
    id: "1",
    title: "Green Park Development",
    location: "New York, USA",
    phase: "Planning",
    progress: 20,
    plannedCost: "$1,000,000",
    currentCost: "$200,000",
    environmentalScore: 85,
    socialScore: 90,
    description: "A project aimed at developing a green park in the city.",
    detailedDescription:
      "This project focuses on creating a sustainable green space that promotes biodiversity and community engagement.",
    startDate: "2023-01-01",
    endDate: "2024-12-31",
    contractor: "Green Builders Inc.",
    type: "Public",
    imageUrl: "https://example.com/images/green-park.jpg",
    coordinates: [40.7128, -74.006],
    objectives: ["Increase green space", "Enhance community engagement"],
    milestones: [
      {
        date: "2023-06-01",
        title: "Site Preparation",
        status: "completed",
        progress: 100,
        budget: 150000,
      },
      {
        date: "2023-12-01",
        title: "Planting Trees",
        status: "in-progress",
        progress: 50,
        budget: 200000,
      },
    ],
    budgetData: [
      { name: "Land Acquisition", value: 300000 },
      { name: "Construction", value: 500000 },
    ],
    impactData: [
      { subject: "Biodiversity", value: 80, fullMark: 100 },
      { subject: "Community Usage", value: 70, fullMark: 100 },
    ],
    gallery: [
      "https://example.com/images/green-park-1.jpg",
      "https://example.com/images/green-park-2.jpg",
    ],
  },
  {
    id: "2",
    title: "Solar Energy Initiative",
    location: "California, USA",
    phase: "Execution",
    progress: 60,
    plannedCost: "$2,500,000",
    currentCost: "$1,500,000",
    environmentalScore: 95,
    socialScore: 85,
    description: "A project to install solar panels across the city.",
    detailedDescription:
      "This initiative aims to reduce carbon footprint and promote renewable energy usage.",
    startDate: "2022-05-01",
    endDate: "2023-11-30",
    contractor: "Solar Solutions LLC",
    type: "Private",
    imageUrl: "https://example.com/images/solar-energy.jpg",
    coordinates: [36.7783, -119.4179],
    objectives: ["Reduce energy costs", "Promote renewable energy"],
    milestones: [
      {
        date: "2022-08-01",
        title: "Initial Installations",
        status: "completed",
        progress: 100,
        budget: 1000000,
      },
      {
        date: "2023-05-01",
        title: "Community Workshops",
        status: "planned",
        progress: 0,
        budget: 50000,
      },
    ],
    budgetData: [
      { name: "Equipment", value: 1500000 },
      { name: "Labor", value: 500000 },
    ],
    impactData: [
      { subject: "Energy Savings", value: 90, fullMark: 100 },
      { subject: "Community Awareness", value: 75, fullMark: 100 },
    ],
    gallery: [
      "https://example.com/images/solar-energy-1.jpg",
      "https://example.com/images/solar-energy-2.jpg",
    ],
  },
  {
    id: "3",
    title: "Urban Transportation Upgrade",
    location: "Chicago, USA",
    phase: "Completion",
    progress: 90,
    plannedCost: "$3,000,000",
    currentCost: "$2,700,000",
    environmentalScore: 80,
    socialScore: 88,
    description:
      "Upgrading the urban transportation system to be more efficient.",
    detailedDescription:
      "This project focuses on improving public transport and reducing traffic congestion.",
    startDate: "2021-03-01",
    endDate: "2023-09-30",
    contractor: "City Transport Co.",
    type: "Public",
    imageUrl: "https://example.com/images/transport-upgrade.jpg",
    coordinates: [41.8781, -87.6298],
    objectives: ["Reduce traffic", "Improve public transport"],
    milestones: [
      {
        date: "2022-12-01",
        title: "Phase 1 Completion",
        status: "completed",
        progress: 100,
        budget: 1500000,
      },
      {
        date: "2023-09-01",
        title: "Final Review",
        status: "in-progress",
        progress: 90,
        budget: 500000,
      },
    ],
    budgetData: [
      { name: "Infrastructure", value: 2000000 },
      { name: "Marketing", value: 300000 },
    ],
    impactData: [
      { subject: "Traffic Reduction", value: 85, fullMark: 100 },
      { subject: "Public Satisfaction", value: 80, fullMark: 100 },
    ],
    gallery: [
      "https://example.com/images/transport-upgrade-1.jpg",
      "https://example.com/images/transport-upgrade-2.jpg",
    ],
  },
];


export const getProjectById = (id: string): Project | undefined => {
  return mockedProjects.find((project) => project.id === id);
};

export const getAllProjects = (): Project[] => {
  return mockedProjects;
};
