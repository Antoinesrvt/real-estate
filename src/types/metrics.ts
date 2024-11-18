import { Priority } from "./common";

export interface Risk {
  severity: Priority;
  title: string;
}

export interface BudgetMetrics {
  allocated: number;
  spent: number;
  currency?: string;
  lastUpdated?: string;
  breakdown?: {
    category: string;
    amount: number;
    percentage: number;
  }[];
}

export interface TimeMetrics {
  timeSpent: number;
  estimated: number;
  estimatedTimeLeft: number;
  unit: "hours" | "days" | "weeks";
  lastUpdated?: string;
  timeline?: {
    planned: number;
    actual: number;
    variance: number;
  };
}

export interface RiskMetrics {
  risks: Risk[];
  riskScore?: number;
  lastAssessment?: string;
  mitigationPlans?: {
    riskId: string;
    plan: string;
    status: "planned" | "in_progress" | "completed";
  }[];
}

export interface KPI {
  id: string;
  name: string;
  value: number;
  target: number;
  unit: string;
  type: "percentage" | "number" | "currency" | "time";
  color?: string;
  trend?: {
    value: number;
    direction: "up" | "down" | "stable";
    isPositive: boolean;
  };
  history?: Array<{
    date: string;
    value: number;
  }>;
}

export interface PerformanceMetrics {
  kpis?: KPI[];
  qualityScore?: number;
  efficiency?: number;
}

export interface Metrics {
  time: TimeMetrics;
  budget: BudgetMetrics;
  risks: RiskMetrics;
  performance?: PerformanceMetrics;
  lastUpdated: string;
  nextReview?: string;
}

export interface HistoricalDataPoint {
  date: string;
  metrics: {
    budget: {
      spent: number;
      allocated: number;
    };
    time: {
      timeSpent: number;
      estimated: number;
    };
    performance?: {
      efficiency: number;
    };
  };
}

export type HistoricalData = HistoricalDataPoint[];

export interface Prediction {
  time: {
    trend: number;
    estimatedCompletion: string;
    predictedTotal: number;
  };
  budget: {
    trend: number;
    predictedTotal: number;
    burndownRate: number;
  };
  tasks: {
    trend: number;
    completionRate: number;
    predictedEndDate: string;
  };
}