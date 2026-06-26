"use client";

import { useState, useEffect } from "react";
import { X, IndianRupee, Zap, Calendar, TrendingUp, Leaf, HelpCircle } from "lucide-react";
import Image from "next/image";

interface SavingsCalculatorProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SavingsCalculator({ isOpen, onClose }: SavingsCalculatorProps) {
  const [systemSize, setSystemSize] = useState(3);
  const [monthlyBill, setMonthlyBill] = useState(2000);
  const [costPerKw, setCostPerKw] = useState(55000);
  const [results, setResults] = useState({
    yearlySaving: 0,
    monthlySaving: 0,
    paybackPeriod: 0,
    lifetimeSaving: 0,
    subsidyAmount: 0,
    netCost: 0,
    roi: 0,
    co2Reduction: 0,
    treesPlanted: 0,
  });

  // Calculate savings
  const calculateSavings = () => {
    // Constants
    const avgSunHours = 4.5; // Average sun hours per day in India
    const tariffRate = 7.5; // Average electricity rate in ₹/kWh
    const degradationRate = 0.005; // 0.5% per year
    const tariffHike = 0.05; // 5% annual tariff increase
    const years = 25;
    
    // Calculate annual generation (kWh)
    const annualGeneration = systemSize * avgSunHours * 365;
    
    // Calculate yearly savings with degradation and tariff hike
    let totalSavings = 0;
    let currentGeneration = annualGeneration;
    let currentTariff = tariffRate;
    
    for (let year = 1; year <= years; year++) {
      const yearlySaving = currentGeneration * currentTariff;
      totalSavings += yearlySaving;
      currentGeneration *= (1 - degradationRate);
      currentTariff *= (1 + tariffHike);
    }
    
    // Calculate subsidy (PM Surya Ghar Yojana)
    let subsidyAmount = 0;
    if (systemSize <= 2) {
      subsidyAmount = systemSize * 30000;
    } else if (systemSize <= 3) {
      subsidyAmount = 60000;
    } else {
      subsidyAmount = 78000;
    }
    
    // Calculate costs
    const grossCost = systemSize * costPerKw;
    const netCost = grossCost - subsidyAmount;
    const yearlySavingFirst = annualGeneration * tariffRate;
    const monthlySavingFirst = yearlySavingFirst / 12;
    
    // Calculate payback period
    const paybackPeriod = netCost / yearlySavingFirst;
    
    // Calculate lifetime saving
    const lifetimeSaving = totalSavings - netCost;
    
    // Calculate ROI
    const roi = (lifetimeSaving / netCost) * 100;
    
    // Environmental impact
    const co2Reduction = annualGeneration * 0.82; // 0.82 kg CO2 per kWh
    const treesPlanted = co2Reduction / 25; // One tree absorbs ~25kg CO2 per year
    
    setResults({
      yearlySaving: Math.round(yearlySavingFirst),
      monthlySaving: Math.round(monthlySavingFirst),
      paybackPeriod: Math.round(paybackPeriod * 10) / 10,
      lifetimeSaving: Math.round(lifetimeSaving),
      subsidyAmount: Math.round(subsidyAmount),
      netCost: Math.round(netCost),
      roi: Math.round(roi),
      co2Reduction: Math.round(co2Reduction),
      treesPlanted: Math.round(treesPlanted),
    });
  };

  useEffect(() => {
    if (isOpen) {
      calculateSavings();
    }
  }, [systemSize, monthlyBill, costPerKw, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      {/* Modal */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-[#6544A6] to-[#6544A6] text-white rounded-t-2xl px-6 py-4 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Solar Savings Calculator</h2>
              <p className="text-white/80 text-sm mt-1">Calculate your potential savings with PM Surya Ghar Yojana</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg transition">
              <X size={24} />
            </button>
          </div>
          
          {/* Content */}
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-8">
              
              {/* Left Side - Inputs */}
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Solar System Size (kWp)
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="0.5"
                    value={systemSize}
                    onChange={(e) => setSystemSize(parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#5B3DF5]"
                  />
                  <div className="flex justify-between mt-2">
                    <span className="text-xs text-gray-500">1 kW</span>
                    <span className="text-sm font-bold text-[#5B3DF5]">{systemSize} kW</span>
                    <span className="text-xs text-gray-500">10 kW</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    Typical home: 3-5 kW | Large home: 5-10 kW
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Monthly Electricity Bill (₹)
                  </label>
                  <div className="relative">
                    <IndianRupee size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="number"
                      value={monthlyBill}
                      onChange={(e) => setMonthlyBill(parseFloat(e.target.value) || 0)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#5B3DF5]"
                      placeholder="Enter your monthly bill"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Cost per kWp (₹)
                  </label>
                  <div className="relative">
                    <IndianRupee size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="number"
                      value={costPerKw}
                      onChange={(e) => setCostPerKw(parseFloat(e.target.value) || 0)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#5B3DF5]"
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Average market rate: ₹45,000 - ₹65,000 per kWp</p>
                </div>
                
                <div className="bg-gradient-to-r from-orange-50 to-purple-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <HelpCircle size={16} className="text-[#5B3DF5]" />
                    <p className="text-xs font-semibold text-gray-700">PM Surya Ghar Yojana Subsidy</p>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>• Up to 2 kW: ₹30,000 per kW</p>
                    <p>• 2-3 kW: ₹60,000 fixed</p>
                    <p>• Above 3 kW: ₹78,000 fixed</p>
                  </div>
                </div>
              </div>
              
              {/* Right Side - Results */}
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-[#6544A6] to-[#6544A6] rounded-xl p-5 text-white">
                  <p className="text-sm opacity-90">Your Estimated Monthly Savings</p>
                  <p className="text-3xl font-bold mt-1">₹{results.monthlySaving.toLocaleString()}</p>
                  <p className="text-xs opacity-80 mt-1">per month on electricity bills</p>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs text-gray-500">Yearly Savings</p>
                    <p className="text-lg font-bold text-green-600">₹{results.yearlySaving.toLocaleString()}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs text-gray-500">Payback Period</p>
                    <p className="text-lg font-bold text-orange-600">{results.paybackPeriod} years</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs text-gray-500">25-Year Savings</p>
                    <p className="text-lg font-bold text-[#5B3DF5]">₹{results.lifetimeSaving.toLocaleString()}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs text-gray-500">ROI</p>
                    <p className="text-lg font-bold text-green-600">{results.roi}%</p>
                  </div>
                </div>
                
                <div className="border-t border-gray-100 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">System Cost (before subsidy)</span>
                    <span className="font-semibold">₹{(systemSize * costPerKw).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Government Subsidy</span>
                    <span className="font-semibold text-green-600">- ₹{results.subsidyAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm pt-2 border-t border-gray-100">
                    <span className="font-semibold">Net Investment</span>
                    <span className="font-bold text-[#5B3DF5]">₹{results.netCost.toLocaleString()}</span>
                  </div>
                </div>
                
                {/* Environmental Impact */}
                <div className="bg-green-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Leaf size={16} className="text-green-600" />
                    <p className="text-sm font-semibold text-green-800">Environmental Impact</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div>
                      <p className="text-xs text-green-600">CO₂ Reduction/Year</p>
                      <p className="text-sm font-bold text-green-700">{results.co2Reduction.toLocaleString()} kg</p>
                    </div>
                    <div>
                      <p className="text-xs text-green-600">Equivalent Trees Planted</p>
                      <p className="text-sm font-bold text-green-700">{results.treesPlanted.toLocaleString()} trees</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-3 mt-8 pt-4 border-t border-gray-100">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition"
              >
                Close
              </button>
              <button
                onClick={() => {
                  onClose();
                  // Scroll to contact form
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-[#6544A6] to-[#6544A6] text-white rounded-lg font-semibold hover:opacity-90 transition"
              >
                Get Free Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}