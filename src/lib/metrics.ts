import { addDays } from "date-fns";
import { format } from "date-fns";
import { HistoricalData, Prediction } from "@/app/tracker/types/metrics";

export function calculatePredictions(historicalData: HistoricalData): Prediction {
  // Guard clause for empty data
  if (!historicalData || historicalData.length === 0) {
    return {
      time: {
        trend: 0,
        estimatedCompletion: new Date().toISOString(),
        predictedTotal: 0
      },
      budget: {
        trend: 0,
        predictedTotal: 0,
        burndownRate: 0
      },
      tasks: {
        trend: 0,
        completionRate: 0,
        predictedEndDate: new Date().toISOString()
      }
    };
  }

  // Fonction utilitaire pour calculer la tendance
  const calculateTrend = (data: number[]): number => {
    if (data.length < 2) return 0;
    const recentData = data.slice(-7);
    const averageChange =
      recentData.reduce((acc, curr, i) => {
        if (i === 0) return acc;
        const change = ((curr - recentData[i - 1]) / recentData[i - 1]) * 100;
        return acc + change;
      }, 0) / (recentData.length - 1);

    return Number(averageChange.toFixed(1));
  };

  // Fonction utilitaire pour la régression linéaire simple
  const linearRegression = (data: Array<{ x: number; y: number }>) => {
    const n = data.length;
    if (n < 2) return { slope: 0, intercept: 0, r2: 0 };

    let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0, sumYY = 0;

    data.forEach((point) => {
      sumX += point.x;
      sumY += point.y;
      sumXY += point.x * point.y;
      sumXX += point.x * point.x;
      sumYY += point.y * point.y;
    });

    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    // Calcul du coefficient de détermination (R²)
    const yMean = sumY / n;
    const totalSS = data.reduce((acc, point) => acc + Math.pow(point.y - yMean, 2), 0);
    const resSS = data.reduce((acc, point) => acc + Math.pow(point.y - (slope * point.x + intercept), 2), 0);
    const r2 = 1 - resSS / totalSS;

    return { slope, intercept, r2 };
  };

  // Analyse des données temporelles
  const timeAnalysis = () => {
    const timeData = historicalData.map((entry, index) => ({
      x: index,
      y: (entry.metrics.time.timeSpent / entry.metrics.time.estimated) * 100,
    }));

    const regression = linearRegression(timeData);
    const trend = calculateTrend(timeData.map(d => d.y));

    const currentRate = regression.slope;
    const daysToCompletion = currentRate !== 0
      ? Math.ceil((100 - timeData[timeData.length - 1].y) / currentRate)
      : 0;

    return {
      trend,
      estimatedCompletion: format(addDays(new Date(), daysToCompletion), "yyyy-MM-dd"),
      predictedTotal: Math.round(timeData[timeData.length - 1].y + currentRate * daysToCompletion),
    };
  };

  // Analyse du budget
  const budgetAnalysis = () => {
    const budgetData = historicalData.map((entry, index) => ({
      x: index,
      y: (entry.metrics.budget.spent / entry.metrics.budget.allocated) * 100,
    }));

    const regression = linearRegression(budgetData);
    const trend = calculateTrend(budgetData.map(d => d.y));
    const burndownRate = regression.slope > 0 ? regression.slope : 0;

    return {
      trend,
      predictedTotal: Math.round(budgetData[budgetData.length - 1].y + burndownRate * 30),
      burndownRate: Math.round(burndownRate * 100) / 100,
    };
  };

  // Analyse des tâches
  const tasksAnalysis = () => {
    const taskData = historicalData.map((entry, index) => ({
      x: index,
      y: entry.metrics.performance?.efficiency || 0,
    }));

    const regression = linearRegression(taskData);
    const trend = calculateTrend(taskData.map(d => d.y));
    const completionRate = regression.slope;

    const daysToCompletion = completionRate !== 0
      ? Math.ceil((100 - taskData[taskData.length - 1].y) / completionRate)
      : 0;

    return {
      trend,
      completionRate: Math.round(completionRate * 100) / 100,
      predictedEndDate: format(addDays(new Date(), daysToCompletion), "yyyy-MM-dd"),
    };
  };

  return {
    time: timeAnalysis(),
    budget: budgetAnalysis(),
    tasks: tasksAnalysis(),
  };
}
