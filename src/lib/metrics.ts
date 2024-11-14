import { addDays } from "date-fns";

import { HistoricalData, Prediction } from "@/app/tracker/types";
import { format } from "date-fns";

export function calculatePredictions(historicalData: HistoricalData): Prediction {
  // Fonction utilitaire pour calculer la tendance
  const calculateTrend = (data: number[]): number => {
    if (data.length < 2) return 0;

    // Utilise les 7 derniers points de données ou moins si pas assez de données
    const recentData = data.slice(-7);
    const averageChange =
      recentData.reduce((acc, curr, i) => {
        if (i === 0) return acc;
        const change = ((curr - recentData[i - 1]) / recentData[i - 1]) * 100;
        return acc + change;
      }, 0) /
      (recentData.length - 1);

    return Number(averageChange.toFixed(1));
  };

  // Fonction utilitaire pour la régression linéaire simple
  const linearRegression = (data: Array<{ x: number; y: number }>) => {
    const n = data.length;
    if (n < 2) return { slope: 0, intercept: 0, r2: 0 };

    let sumX = 0;
    let sumY = 0;
    let sumXY = 0;
    let sumXX = 0;
    let sumYY = 0;

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
    const totalSS = data.reduce(
      (acc, point) => acc + Math.pow(point.y - yMean, 2),
      0
    );
    const resSS = data.reduce(
      (acc, point) =>
        acc + Math.pow(point.y - (slope * point.x + intercept), 2),
      0
    );
    const r2 = 1 - resSS / totalSS;

    return { slope, intercept, r2 };
  };

  // Analyse des données temporelles
  const timeAnalysis = () => {
    const timeData = historicalData.time.map((entry, index) => ({
      x: index,
      y: entry.spent,
    }));

    const regression = linearRegression(timeData);
    const trend = calculateTrend(historicalData.time.map((t) => t.spent));

    // Prédiction de la date de fin basée sur le taux actuel
    const currentRate = regression.slope;
    const daysToCompletion =
      currentRate !== 0
        ? Math.ceil((100 - timeData[timeData.length - 1].y) / currentRate)
        : 0;

    const estimatedCompletion = format(
      addDays(new Date(), daysToCompletion),
      "yyyy-MM-dd"
    );

    return {
      trend,
      estimatedCompletion,
      predictedTotal:
        timeData[timeData.length - 1].y + currentRate * daysToCompletion,
    };
  };

  // Analyse du budget
  const budgetAnalysis = () => {
    const budgetData = historicalData.budget.map((entry, index) => ({
      x: index,
      y: entry.spent,
    }));

    const regression = linearRegression(budgetData);
    const trend = calculateTrend(historicalData.budget.map((b) => b.spent));

    // Taux de consommation du budget (burndown rate)
    const burndownRate = regression.slope > 0 ? regression.slope : 0;

    return {
      trend,
      predictedTotal:
        budgetData[budgetData.length - 1].y +
        burndownRate * (30 - budgetData.length), // Projection sur 30 jours
      burndownRate,
    };
  };

  // Analyse des tâches
  const tasksAnalysis = () => {
    const taskCompletionData = historicalData.tasks.map((entry, index) => ({
      x: index,
      y: (entry.completed / entry.total) * 100,
    }));

    const regression = linearRegression(taskCompletionData);
    const trend = calculateTrend(
      historicalData.tasks.map((t) => (t.completed / t.total) * 100)
    );

    // Taux de complétion et date de fin estimée
    const completionRate = regression.slope;
    const currentCompletion =
      taskCompletionData[taskCompletionData.length - 1].y;
    const daysToCompletion =
      completionRate !== 0
        ? Math.ceil((100 - currentCompletion) / completionRate)
        : 0;

    return {
      trend,
      completionRate,
      predictedEndDate: format(
        addDays(new Date(), daysToCompletion),
        "yyyy-MM-dd"
      ),
    };
  };

  return {
    time: timeAnalysis(),
    budget: budgetAnalysis(),
    tasks: tasksAnalysis(),
  };
}
