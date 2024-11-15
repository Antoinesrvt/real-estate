import { addMonths, format } from "date-fns";
import { fr } from "date-fns/locale";
import { HistoricalData, Prediction } from "@/app/tracker/types/metrics";

interface PredictionPoint {
  date: string;
  budget: number;
  time: number;
  efficiency: number;
}

export function calculateFuturePredictions(
  historicalData: HistoricalData,
  predictions: Prediction,
  months: number = 12
): PredictionPoint[] {
  if (!historicalData.length) return [];

  // Get the last known values
  const lastEntry = historicalData[historicalData.length - 1];
  const lastDate = new Date(lastEntry.date);

  // Calculate monthly rates from predictions
  const monthlyRates = {
    budget: predictions.budget.burndownRate,
    time: (predictions.time.predictedTotal - lastEntry.metrics.time.timeSpent) / months,
    efficiency: predictions.tasks.trend / 12,
  };

  // Generate future points
  const futurePoints: PredictionPoint[] = [];
  
  // Add the last known point as starting point
  futurePoints.push({
    date: format(lastDate, "MMM yyyy", { locale: fr }),
    budget: (lastEntry.metrics.budget.spent / lastEntry.metrics.budget.allocated) * 100,
    time: (lastEntry.metrics.time.timeSpent / lastEntry.metrics.time.estimated) * 100,
    efficiency: lastEntry.metrics.performance?.efficiency || 0,
  });

  // Generate predictions for future months
  for (let i = 1; i <= months; i++) {
    const date = addMonths(lastDate, i);
    const previousPoint = futurePoints[i - 1];

    const point: PredictionPoint = {
      date: format(date, "MMM yyyy", { locale: fr }),
      budget: Math.min(previousPoint.budget + monthlyRates.budget, 100),
      time: Math.min(previousPoint.time + monthlyRates.time, 100),
      efficiency: Math.min(Math.max(previousPoint.efficiency + monthlyRates.efficiency, 0), 100),
    };

    futurePoints.push(point);
  }

  return futurePoints;
}

export function getPredictionConfidence(historicalData: HistoricalData): {
  budget: number;
  time: number;
  efficiency: number;
} {
  // Calculate confidence based on data consistency and trend stability
  const calculateMetricConfidence = (values: number[]): number => {
    if (values.length < 2) return 0;

    // Calculate variance
    const mean = values.reduce((a, b) => a + b) / values.length;
    const variance = values.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / values.length;
    const standardDeviation = Math.sqrt(variance);

    // Calculate trend consistency
    const changes = values.slice(1).map((v, i) => Math.abs(v - values[i]));
    const avgChange = changes.reduce((a, b) => a + b, 0) / changes.length;

    // Combine factors for confidence score (0-100)
    const variabilityScore = Math.max(0, 100 - (standardDeviation / mean) * 100);
    const consistencyScore = Math.max(0, 100 - (avgChange / mean) * 100);
    const dataPointsScore = Math.min(100, (values.length / 12) * 100); // 12 months as ideal

    return Math.round((variabilityScore + consistencyScore + dataPointsScore) / 3);
  };

  const budgetValues = historicalData.map(d => d.metrics.budget.spent);
  const timeValues = historicalData.map(d => d.metrics.time.timeSpent);
  const efficiencyValues = historicalData.map(d => d.metrics.performance?.efficiency || 0);

  return {
    budget: calculateMetricConfidence(budgetValues),
    time: calculateMetricConfidence(timeValues),
    efficiency: calculateMetricConfidence(efficiencyValues),
  };
} 