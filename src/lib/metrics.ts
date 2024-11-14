import { addDays, differenceInDays, addMonths } from "date-fns";
import { format } from "date-fns";
import { HistoricalData, Prediction } from "@/app/tracker/types/metrics";

interface RegressionResult {
  slope: number;
  intercept: number;
  r2: number;
  confidence: number;
}

interface TrendAnalysis {
  shortTerm: number;  // 7 days trend
  mediumTerm: number; // 30 days trend
  longTerm: number;   // 90 days trend
  seasonality: number;
  volatility: number;
}

export function calculatePredictions(historicalData: HistoricalData): Prediction {
  if (!historicalData?.length) return getDefaultPrediction();

  // Advanced Statistical Analysis
  const timeAnalysis = analyzeTimeSeries(historicalData, 'time');
  const budgetAnalysis = analyzeTimeSeries(historicalData, 'budget');
  const efficiencyAnalysis = analyzeTimeSeries(historicalData, 'efficiency');

  return {
    time: calculateTimeProjection(timeAnalysis, historicalData),
    budget: calculateBudgetProjection(budgetAnalysis, historicalData),
    tasks: calculateTasksProjection(efficiencyAnalysis, historicalData),
  };
}

function analyzeTimeSeries(
  data: HistoricalData, 
  metric: 'time' | 'budget' | 'efficiency'
): TrendAnalysis {
  const values = extractMetricValues(data, metric);
  
  return {
    shortTerm: calculateTrend(values.slice(-7)),
    mediumTerm: calculateTrend(values.slice(-30)),
    longTerm: calculateTrend(values.slice(-90)),
    seasonality: detectSeasonality(values),
    volatility: calculateVolatility(values),
  };
}

function extractMetricValues(data: HistoricalData, metric: 'time' | 'budget' | 'efficiency'): number[] {
  return data.map(entry => {
    switch (metric) {
      case 'time':
        return (entry.metrics.time.timeSpent / entry.metrics.time.estimated) * 100;
      case 'budget':
        return (entry.metrics.budget.spent / entry.metrics.budget.allocated) * 100;
      case 'efficiency':
        return entry.metrics.performance?.efficiency || 0;
    }
  });
}

function calculateTrend(values: number[]): number {
  if (values.length < 2) return 0;
  
  const regression = performLinearRegression(
    values.map((v, i) => ({ x: i, y: v }))
  );
  
  return regression.slope * (values.length - 1) * 100 / values[0];
}

function detectSeasonality(values: number[]): number {
  if (values.length < 14) return 0;

  // Implement autocorrelation analysis
  const autocorrelation = calculateAutocorrelation(values);
  const peaks = findPeaks(autocorrelation);
  
  return peaks.length > 0 ? peaks[0] : 0;
}

function calculateVolatility(values: number[]): number {
  if (values.length < 2) return 0;

  const mean = values.reduce((a, b) => a + b) / values.length;
  const variance = values.reduce((acc, val) => 
    acc + Math.pow(val - mean, 2), 0) / values.length;
  
  return Math.sqrt(variance) / mean;
}

function performLinearRegression(data: Array<{ x: number; y: number }>): RegressionResult {
  const n = data.length;
  if (n < 2) return { slope: 0, intercept: 0, r2: 0, confidence: 0 };

  let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0, sumYY = 0;

  data.forEach(point => {
    sumX += point.x;
    sumY += point.y;
    sumXY += point.x * point.y;
    sumXX += point.x * point.x;
    sumYY += point.y * point.y;
  });

  const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  // Calculate R² and confidence
  const yMean = sumY / n;
  const totalSS = data.reduce((acc, point) => acc + Math.pow(point.y - yMean, 2), 0);
  const resSS = data.reduce((acc, point) => 
    acc + Math.pow(point.y - (slope * point.x + intercept), 2), 0);
  const r2 = 1 - resSS / totalSS;
  
  // Calculate confidence based on R² and sample size
  const confidence = Math.min(r2 * Math.log10(n) * 100, 100);

  return { slope, intercept, r2, confidence };
}

function calculateAutocorrelation(values: number[]): number[] {
  const n = values.length;
  const mean = values.reduce((a, b) => a + b) / n;
  const variance = values.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / n;
  
  return values.map((_, lag) => {
    if (lag === 0) return 1;
    
    let sum = 0;
    for (let i = 0; i < n - lag; i++) {
      sum += (values[i] - mean) * (values[i + lag] - mean);
    }
    
    return sum / (n * variance);
  });
}

function findPeaks(values: number[]): number[] {
  const peaks: number[] = [];
  for (let i = 1; i < values.length - 1; i++) {
    if (values[i] > values[i - 1] && values[i] > values[i + 1]) {
      peaks.push(i);
    }
  }
  return peaks;
}

// Projection calculations with confidence intervals
function calculateTimeProjection(analysis: TrendAnalysis, data: HistoricalData) {
  const lastEntry = data[data.length - 1];
  const currentProgress = (lastEntry.metrics.time.timeSpent / lastEntry.metrics.time.estimated) * 100;
  
  const weightedTrend = (
    analysis.shortTerm * 0.5 +
    analysis.mediumTerm * 0.3 +
    analysis.longTerm * 0.2
  ) * (1 - analysis.volatility);

  const daysToCompletion = weightedTrend !== 0
    ? Math.ceil((100 - currentProgress) / weightedTrend)
    : 0;

  return {
    trend: weightedTrend,
    estimatedCompletion: format(addDays(new Date(), daysToCompletion), "yyyy-MM-dd"),
    predictedTotal: Math.round(currentProgress + weightedTrend * daysToCompletion),
  };
}

// Similar implementations for budget and tasks projections...
// Would you like me to continue with those implementations?
