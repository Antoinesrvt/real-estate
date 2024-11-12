"use client"
import React, { useState } from 'react';
import { PlusCircle, Trash2, Calculator, Building2, DollarSign, Copy, Edit2, Check, X, Home } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Types and Interfaces
interface RentalUnit {
  id: number;
  name: string;
  monthlyReturn: string;
  recurringCosts: string;
  isLocked: boolean;
}

interface NewUnit {
  name: string;
  monthlyReturn: string;
  recurringCosts: string;
}

interface ChartDataPoint {
  month: number;
  investment: number;
  returns: number;
}

interface CalculationResult {
  totalInvestment: number;
  monthlyNetReturn: number;
  yearlyReturn: number;
  roi: number;
  breakEvenMonths: number;
  chartData: ChartDataPoint[];
}

const RealEstateCalculator: React.FC = () => {
  // State with type annotations
  const [baseInvestment, setBaseInvestment] = useState<string>('');
  const [renovationCost, setRenovationCost] = useState<string>('');
  const [units, setUnits] = useState<RentalUnit[]>([]);
  const [editingUnit, setEditingUnit] = useState<RentalUnit | null>(null);
  const [calculationResult, setCalculationResult] = useState<CalculationResult | null>(null);
  const [newUnit, setNewUnit] = useState<NewUnit>({
    name: '',
    monthlyReturn: '',
    recurringCosts: ''
  });

  // Type-safe functions
  const resetNewUnit = (): void => {
    setNewUnit({
      name: '',
      monthlyReturn: '',
      recurringCosts: ''
    });
  };

  const addUnit = (): void => {
    if (newUnit.name && newUnit.monthlyReturn) {
      setUnits([...units, {
        ...newUnit,
        id: Date.now(),
        isLocked: true
      }]);
      resetNewUnit();
    }
  };

  const duplicateUnit = (unit: RentalUnit): void => {
    const duplicatedUnit: RentalUnit = {
      ...unit,
      id: Date.now(),
      name: `${unit.name} (Copy)`,
    };
    setUnits([...units, duplicatedUnit]);
  };

  const removeUnit = (id: number): void => {
    setUnits(units.filter(unit => unit.id !== id));
  };

  const startEditing = (unit: RentalUnit): void => {
    setEditingUnit({ ...unit });
  };

  const saveEdit = (): void => {
    if (editingUnit) {
      setUnits(units.map(unit => 
        unit.id === editingUnit.id ? editingUnit : unit
      ));
      setEditingUnit(null);
    }
  };

  const calculateReturn = (): void => {
    const totalInvestment: number = Number(baseInvestment) + Number(renovationCost);
    const monthlyNetReturn: number = units.reduce((acc, unit) => {
      return acc + (Number(unit.monthlyReturn) - Number(unit.recurringCosts));
    }, 0);
    const yearlyReturn: number = monthlyNetReturn * 12;
    const roi: number = (yearlyReturn / totalInvestment) * 100;
    const breakEvenMonths: number = totalInvestment / monthlyNetReturn;
    
    const chartData: ChartDataPoint[] = Array.from({ length: 121 }, (_, i) => ({
      month: i,
      investment: totalInvestment,
      returns: monthlyNetReturn * i
    }));

    setCalculationResult({
      totalInvestment,
      monthlyNetReturn,
      yearlyReturn,
      roi,
      breakEvenMonths,
      chartData
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8 bg-gray-50 min-h-screen">
      {/* Initial Investment Section */}
      <Card className="shadow-lg">
        <CardHeader className="bg-blue-50">
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <Building2 className="h-6 w-6" />
            Property Investment Details
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Base Investment ($)</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  value={baseInvestment}
                  onChange={(e) => setBaseInvestment(e.target.value)}
                  className="w-full pl-10 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter property cost"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Renovation Cost ($)</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  value={renovationCost}
                  onChange={(e) => setRenovationCost(e.target.value)}
                  className="w-full pl-10 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter renovation cost"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add New Unit Section */}
      <Card className="shadow-lg">
        <CardHeader className="bg-green-50">
          <CardTitle className="flex items-center gap-2 text-green-800">
            <Home className="h-6 w-6" />
            Add New Rental Unit
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Unit Name</label>
              <input
                type="text"
                value={newUnit.name}
                onChange={(e) => setNewUnit({...newUnit, name: e.target.value})}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder="e.g., Apartment 1A"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Monthly Return ($)</label>
              <input
                type="number"
                value={newUnit.monthlyReturn}
                onChange={(e) => setNewUnit({...newUnit, monthlyReturn: e.target.value})}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder="Monthly rental income"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Monthly Costs ($)</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={newUnit.recurringCosts}
                  onChange={(e) => setNewUnit({...newUnit, recurringCosts: e.target.value})}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="Monthly expenses"
                />
                <button
                  onClick={addUnit}
                  disabled={!newUnit.name || !newUnit.monthlyReturn}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  <PlusCircle className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Units Display Section */}
      {units.length > 0 && (
        <div className="grid md:grid-cols-3 gap-6">
          {units.map((unit) => (
            <Card key={unit.id} className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className={`bg-blue-50 ${editingUnit?.id === unit.id ? 'bg-yellow-50' : ''}`}>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Home className="h-5 w-5 text-blue-600" />
                    {editingUnit?.id === unit.id ? (
                      <input
                        type="text"
                        value={editingUnit.name}
                        onChange={(e) => setEditingUnit({...editingUnit, name: e.target.value})}
                        className="p-1 border rounded"
                      />
                    ) : (
                      unit.name
                    )}
                  </span>
                  <div className="flex gap-2">
                    {editingUnit?.id === unit.id ? (
                      <>
                        <button onClick={saveEdit} className="p-1 text-green-600 hover:text-green-700">
                          <Check className="h-5 w-5" />
                        </button>
                        <button onClick={() => setEditingUnit(null)} className="p-1 text-red-600 hover:text-red-700">
                          <X className="h-5 w-5" />
                        </button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => startEditing(unit)} className="p-1 text-blue-600 hover:text-blue-700">
                          <Edit2 className="h-5 w-5" />
                        </button>
                        <button onClick={() => duplicateUnit(unit)} className="p-1 text-green-600 hover:text-green-700">
                          <Copy className="h-5 w-5" />
                        </button>
                        <button onClick={() => removeUnit(unit.id)} className="p-1 text-red-600 hover:text-red-700">
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </>
                    )}
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Monthly Return</p>
                      {editingUnit?.id === unit.id ? (
                        <input
                          type="number"
                          value={editingUnit.monthlyReturn}
                          onChange={(e) => setEditingUnit({...editingUnit, monthlyReturn: e.target.value})}
                          className="p-1 border rounded w-full"
                        />
                      ) : (
                        <p className="text-lg font-semibold text-green-600">${Number(unit.monthlyReturn).toLocaleString()}</p>
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Monthly Costs</p>
                      {editingUnit?.id === unit.id ? (
                        <input
                          type="number"
                          value={editingUnit.recurringCosts}
                          onChange={(e) => setEditingUnit({...editingUnit, recurringCosts: e.target.value})}
                          className="p-1 border rounded w-full"
                        />
                      ) : (
                        <p className="text-lg font-semibold text-red-600">${Number(unit.recurringCosts || 0).toLocaleString()}</p>
                      )}
                    </div>
                  </div>
                  <div className="pt-2 border-t">
                    <p className="text-sm text-gray-500">Net Monthly Income</p>
                    <p className="text-xl font-bold text-blue-600">
                      ${(Number(unit.monthlyReturn) - Number(unit.recurringCosts || 0)).toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Calculate Button */}
      {units.length > 0 && (
        <button
          onClick={calculateReturn}
          disabled={!baseInvestment || !units.length}
          className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all text-lg font-semibold"
        >
          <Calculator className="h-6 w-6" />
          Calculate Investment Return
        </button>
      )}

      {/* Results Section */}
      {calculationResult && (
        <Card className="shadow-lg">
          <CardHeader className="bg-purple-50">
            <CardTitle className="flex items-center gap-2 text-purple-800">
              <DollarSign className="h-6 w-6" />
              Investment Analysis Results
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-green-50">
                <CardContent className="p-4">
                  <p className="text-sm text-gray-600">Total Investment</p>
                  <p className="text-2xl font-bold text-green-700">${calculationResult.totalInvestment.toLocaleString()}</p>
                </CardContent>
              </Card>
              <Card className="bg-blue-50">
                <CardContent className="p-4">
                  <p className="text-sm text-gray-600">Monthly Net Return</p>
                  <p className="text-2xl font-bold text-blue-700">${calculationResult.monthlyNetReturn.toLocaleString()}</p>
                </CardContent>
              </Card>
              <Card className="bg-purple-50">
                <CardContent className="p-4">
                  <p className="text-sm text-gray-600">Yearly Return</p>
                  <p className="text-2xl font-bold text-purple-700">${calculationResult.yearlyReturn.toLocaleString()}</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-yellow-50">
                <CardContent className="p-4">
                  <p className="text-sm text-gray-600">Return on Investment (ROI)</p>
                  <p className="text-2xl font-bold text-yellow-700">{calculationResult.roi.toFixed(2)}%</p>
                </CardContent>
              </Card>
              <Card className="bg-orange-50">
                <CardContent className="p-4">
                  <p className="text-sm text-gray-600">Break-even Point</p>
                  <p className="text-2xl font-bold text-orange-700">{Math.ceil(calculationResult.breakEvenMonths)} months</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardContent className="p-4">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={calculationResult.chartData}>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-50" />
                      <XAxis 
                        dataKey="month" 
                        label={{ 
                          value: 'Months', 
                          position: 'bottom',
                          style: { fill: '#666' }
                        }}
                        tick={{ fill: '#666' }}
                      />
                      <YAxis 
                        label={{ 
                          value: 'Amount ($)', 
                          angle: -90, 
                          position: 'left',
                          style: { fill: '#666' }
                        }}
                        tick={{ fill: '#666' }}
                        tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                      />
                      <Tooltip 
                        formatter={(value) => [`$${value.toLocaleString()}`, '']}
                        labelFormatter={(label) => `Month ${label}`}
                        contentStyle={{
                          backgroundColor: 'rgba(255, 255, 255, 0.9)',
                          border: '1px solid #ccc',
                          borderRadius: '4px',
                          padding: '8px'
                        }}
                      />
                      <Legend 
                        verticalAlign="top" 
                        height={36}
                        formatter={(value: string) => <span style={{ color: '#666', marginLeft: '8px' }}>{value}</span>}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="investment" 
                        stroke="#ef4444" 
                        name="Total Investment"
                        strokeWidth={2}
                        dot={false}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="returns" 
                        stroke="#22c55e" 
                        name="Cumulative Returns"
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Investment Analysis</h4>
                  <p className="text-sm text-gray-600">
                    Based on your current returns, you'll break even on your investment in approximately{' '}
                    <span className="font-semibold text-blue-600">
                      {Math.ceil(calculationResult.breakEvenMonths)} months
                    </span>
                    {' '}({(calculationResult.breakEvenMonths / 12).toFixed(1)} years).
                    The annual ROI of {calculationResult.roi.toFixed(2)}% indicates a
                    {calculationResult.roi > 10 ? ' strong' : calculationResult.roi > 5 ? ' moderate' : ' conservative'} 
                    {' '}return on your investment.
                  </p>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {units.length === 0 && (
        <Alert className="bg-blue-50 border-blue-200">
          <AlertDescription className="text-center py-8 text-gray-600">
            Start by adding your first rental unit using the form above.
            <br />
            You can add multiple units and customize their details later.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default RealEstateCalculator;