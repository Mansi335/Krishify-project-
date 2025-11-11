"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState } from "react";

// Mock crops data
const mockCrops = [
  { id: 1, name: "Wheat", icon: "🌾" },
  { id: 2, name: "Rice", icon: "🌾" },
  { id: 3, name: "Corn", icon: "🌽" },
  { id: 4, name: "Soybean", icon: "🫘" },
  { id: 5, name: "Cotton", icon: "🌿" },
  { id: 6, name: "Potato", icon: "🥔" },
];

export default function BenefitsPage() {
  const [activeTab, setActiveTab] = useState(1);

  // Feature 1: Soil Yield Prediction State
  const [soilYield, setSoilYield] = useState({
    area: "",
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    pH: "",
  });
  const [soilYieldResult, setSoilYieldResult] = useState<any>(null);

  // Feature 2: Crop Recommendation State
  const [cropRec, setCropRec] = useState({
    soilType: "Loamy",
    temperature: "",
    rainfall: "",
    nitrogen: "",
    phosphorus: "",
    potassium: "",
  });
  const [cropRecResult, setCropRecResult] = useState<any>(null);

  // Feature 3: Fertilizer Optimization State
  const [fertilizer, setFertilizer] = useState({
    crop: "",
    availableN: "",
    availableP: "",
    availableK: "",
    organicMatter: "",
  });
  const [fertilizerResult, setFertilizerResult] = useState<any>(null);

  // Feature 4: Water Requirement State
  const [waterReq, setWaterReq] = useState({
    crop: "",
    soilMoisture: "",
    temperature: "",
    area: "",
  });
  const [waterReqResult, setWaterReqResult] = useState<any>(null);

  // Mock function for Soil Yield Prediction
  const predictSoilYield = () => {
    const n = parseFloat(soilYield.nitrogen) || 0;
    const p = parseFloat(soilYield.phosphorus) || 0;
    const k = parseFloat(soilYield.potassium) || 0;
    const ph = parseFloat(soilYield.pH) || 7;
    const area = parseFloat(soilYield.area) || 1;

    // Mock calculation
    const baseYield = 2.5;
    const nFactor = (n / 50) * 0.3;
    const pFactor = (p / 30) * 0.25;
    const kFactor = (k / 40) * 0.25;
    const phFactor = ph >= 6 && ph <= 7.5 ? 1.2 : 0.9;
    const predictedYield = (baseYield + nFactor + pFactor + kFactor) * phFactor;

    setSoilYieldResult({
      yieldPerAcre: predictedYield.toFixed(2),
      totalYield: (predictedYield * area).toFixed(2),
      confidence: 92,
      soilHealth: n > 40 && p > 25 && k > 35 ? "Excellent" : n > 30 && p > 20 && k > 30 ? "Good" : "Needs Improvement",
      recommendations: [
        ph < 6 ? "Add lime to increase pH" : ph > 7.5 ? "Add sulfur to decrease pH" : "pH is optimal",
        n < 40 ? `Add ${(40 - n).toFixed(1)} kg/acre of Nitrogen` : "Nitrogen levels are adequate",
        p < 25 ? `Add ${(25 - p).toFixed(1)} kg/acre of Phosphorus` : "Phosphorus levels are adequate",
        k < 35 ? `Add ${(35 - k).toFixed(1)} kg/acre of Potassium` : "Potassium levels are adequate",
      ],
    });
  };

  // Mock function for Crop Recommendation
  const recommendCrop = () => {
    const temp = parseFloat(cropRec.temperature) || 25;
    const rain = parseFloat(cropRec.rainfall) || 800;
    const n = parseFloat(cropRec.nitrogen) || 0;
    const p = parseFloat(cropRec.phosphorus) || 0;
    const k = parseFloat(cropRec.potassium) || 0;

    // Mock recommendation logic
    let recommendedCrops = [];
    
    if (temp >= 20 && temp <= 35 && rain >= 1000) {
      recommendedCrops.push({ crop: "Rice", score: 95, reason: "Optimal temperature and rainfall for rice cultivation" });
    }
    if (temp >= 15 && temp <= 25 && rain >= 400 && rain <= 800) {
      recommendedCrops.push({ crop: "Wheat", score: 90, reason: "Ideal conditions for wheat with moderate rainfall" });
    }
    if (temp >= 18 && temp <= 27 && rain >= 500 && rain <= 1000) {
      recommendedCrops.push({ crop: "Corn", score: 88, reason: "Good temperature range and adequate rainfall" });
    }
    if (temp >= 20 && temp <= 30 && rain >= 450 && rain <= 700) {
      recommendedCrops.push({ crop: "Soybean", score: 85, reason: "Suitable temperature and moderate water requirement" });
    }
    if (temp >= 15 && temp <= 20 && rain >= 500 && rain <= 700) {
      recommendedCrops.push({ crop: "Potato", score: 87, reason: "Cool temperature and moderate rainfall ideal" });
    }
    if (temp >= 21 && temp <= 30 && rain >= 600 && rain <= 1200) {
      recommendedCrops.push({ crop: "Cotton", score: 82, reason: "Warm conditions with good rainfall support" });
    }

    // Sort by score
    recommendedCrops.sort((a, b) => b.score - a.score);

    setCropRecResult({
      recommendations: recommendedCrops.slice(0, 3),
      bestMatch: recommendedCrops[0] || { crop: "Wheat", score: 75, reason: "General recommendation" },
      soilAnalysis: {
        type: cropRec.soilType,
        npkStatus: n > 30 && p > 20 && k > 30 ? "Adequate" : "Needs improvement",
      },
    });
  };

  // Mock function for Fertilizer Optimization
  const optimizeFertilizer = () => {
    const crop = fertilizer.crop;
    const availableN = parseFloat(fertilizer.availableN) || 0;
    const availableP = parseFloat(fertilizer.availableP) || 0;
    const availableK = parseFloat(fertilizer.availableK) || 0;
    const organicMatter = parseFloat(fertilizer.organicMatter) || 0;

    // Mock crop requirements (kg/acre)
    const cropRequirements: Record<string, { n: number; p: number; k: number }> = {
      "Wheat": { n: 120, p: 60, k: 40 },
      "Rice": { n: 150, p: 70, k: 60 },
      "Corn": { n: 180, p: 80, k: 100 },
      "Soybean": { n: 0, p: 0, k: 50 },
      "Cotton": { n: 100, p: 61, k: 0 },
      "Potato": { n: 150, p: 100, k: 150 },
    };

    const requirements = cropRequirements[crop] || { n: 120, p: 60, k: 40 };
    
    const nNeeded = Math.max(0, requirements.n - availableN);
    const pNeeded = Math.max(0, requirements.p - availableP);
    const kNeeded = Math.max(0, requirements.k - availableK);

    // Calculate NPK ratio
    const total = nNeeded + pNeeded + kNeeded;
    const nRatio = total > 0 ? Math.round((nNeeded / total) * 100) : 0;
    const pRatio = total > 0 ? Math.round((pNeeded / total) * 100) : 0;
    const kRatio = total > 0 ? Math.round((kNeeded / total) * 100) : 0;

    setFertilizerResult({
      recommendedNPK: `${nRatio}-${pRatio}-${kRatio}`,
      dosage: {
        nitrogen: nNeeded.toFixed(1),
        phosphorus: pNeeded.toFixed(1),
        potassium: kNeeded.toFixed(1),
        total: total.toFixed(1),
      },
      organicMatterStatus: organicMatter >= 2 ? "Adequate" : "Low - Add organic compost",
      applicationSchedule: [
        "Apply 40% at planting",
        "Apply 30% at 30 days",
        "Apply 30% at 60 days",
      ],
      costEstimate: `₹${(total * 25).toFixed(0)} per acre`,
    });
  };

  // Mock function for Water Requirement
  const predictWaterRequirement = () => {
    const crop = waterReq.crop;
    const soilMoisture = parseFloat(waterReq.soilMoisture) || 50;
    const temp = parseFloat(waterReq.temperature) || 25;
    const area = parseFloat(waterReq.area) || 1;

    // Mock crop water requirements (mm per day)
    const cropWaterNeeds: Record<string, number> = {
      "Wheat": 4.5,
      "Rice": 6.0,
      "Corn": 5.5,
      "Soybean": 4.0,
      "Cotton": 5.0,
      "Potato": 4.8,
    };

    const dailyNeed = cropWaterNeeds[crop] || 5.0;
    const tempFactor = temp > 30 ? 1.2 : temp < 20 ? 0.9 : 1.0;
    const adjustedDaily = dailyNeed * tempFactor;

    // Calculate days until next irrigation (assuming 50% is optimal)
    const moistureDeficit = 50 - soilMoisture;
    const daysUntilIrrigation = moistureDeficit > 0 ? (moistureDeficit / adjustedDaily).toFixed(1) : "0";

    const waterNeeded = adjustedDaily * area * 10; // Convert to liters (1mm = 10L per sq meter, 1 acre ≈ 4047 sq meters)

    setWaterReqResult({
      dailyRequirement: adjustedDaily.toFixed(2),
      totalDailyWater: (waterNeeded / 1000).toFixed(2), // Convert to cubic meters
      nextIrrigation: daysUntilIrrigation === "0" ? "Not needed" : `In ${daysUntilIrrigation} days`,
      soilMoistureStatus: soilMoisture >= 45 && soilMoisture <= 55 ? "Optimal" : soilMoisture < 45 ? "Low - Irrigation needed" : "High - Reduce irrigation",
      weeklyRequirement: (adjustedDaily * 7).toFixed(1),
      irrigationMethod: crop === "Rice" ? "Flooding" : "Drip/Sprinkler",
    });
  };

  const tabs = [
    { id: 1, name: "Soil Yield Prediction", icon: "🌱" },
    { id: 2, name: "Crop Recommendation", icon: "🌾" },
    { id: 3, name: "Fertilizer Optimization", icon: "🧪" },
    { id: 4, name: "Water Requirement", icon: "💧" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-black mb-4">
            AI-Powered <span className="text-yellow-600">Farm Intelligence</span>
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Get intelligent predictions and recommendations for better crop management, 
            optimized resource usage, and maximum yield.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-semibold transition-all border-b-2 ${
                activeTab === tab.id
                  ? "border-yellow-500 text-yellow-600 bg-yellow-50"
                  : "border-transparent text-gray-600 hover:text-yellow-600"
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </div>

        {/* Feature 1: Soil Yield Prediction */}
        {activeTab === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-2xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-black mb-6">Soil Yield Prediction</h2>
              <p className="text-gray-600 mb-6">
                Predict crop yield based on soil nutrients, pH levels, and land area.
              </p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Land Area (Acres)
                  </label>
                  <input
                    type="number"
                    value={soilYield.area}
                    onChange={(e) => setSoilYield({ ...soilYield, area: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
                    placeholder="Enter area in acres"
                    step="0.1"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nitrogen (N) - kg/acre
                  </label>
                  <input
                    type="number"
                    value={soilYield.nitrogen}
                    onChange={(e) => setSoilYield({ ...soilYield, nitrogen: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
                    placeholder="Enter nitrogen level"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phosphorus (P) - kg/acre
                  </label>
                  <input
                    type="number"
                    value={soilYield.phosphorus}
                    onChange={(e) => setSoilYield({ ...soilYield, phosphorus: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
                    placeholder="Enter phosphorus level"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Potassium (K) - kg/acre
                  </label>
                  <input
                    type="number"
                    value={soilYield.potassium}
                    onChange={(e) => setSoilYield({ ...soilYield, potassium: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
                    placeholder="Enter potassium level"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Soil pH
                  </label>
                  <input
                    type="number"
                    value={soilYield.pH}
                    onChange={(e) => setSoilYield({ ...soilYield, pH: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
                    placeholder="Enter pH (6.0-7.5 optimal)"
                    step="0.1"
                    min="4"
                    max="9"
                  />
                </div>
                
                <button
                  onClick={predictSoilYield}
                  className="w-full py-3 bg-yellow-400 text-black rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
                >
                  Predict Yield
                </button>
              </div>
            </div>

            <div>
              {soilYieldResult ? (
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl p-6 text-white shadow-lg">
                    <div className="text-sm font-medium opacity-90 mb-2">Predicted Yield</div>
                    <div className="text-4xl font-bold mb-1">{soilYieldResult.yieldPerAcre} tons/acre</div>
                    <div className="text-sm opacity-80">Total: {soilYieldResult.totalYield} tons</div>
                  </div>
                  
                  <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-sm">
                    <h3 className="text-xl font-bold text-black mb-4">Soil Health Analysis</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Overall Status</div>
                        <div className={`text-lg font-semibold ${
                          soilYieldResult.soilHealth === "Excellent" ? "text-green-600" :
                          soilYieldResult.soilHealth === "Good" ? "text-yellow-600" : "text-orange-600"
                        }`}>
                          {soilYieldResult.soilHealth}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Confidence Score</div>
                        <div className="text-lg font-semibold text-blue-600">{soilYieldResult.confidence}%</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6 shadow-sm">
                    <h3 className="text-xl font-bold text-black mb-4">Recommendations</h3>
                    <ul className="space-y-2">
                      {soilYieldResult.recommendations.map((rec: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="text-yellow-600 mt-1">✓</span>
                          <span className="text-gray-700">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-2xl p-12 text-center border-2 border-dashed border-gray-300">
                  <div className="text-6xl mb-4">🌱</div>
                  <h3 className="text-2xl font-bold text-gray-700 mb-2">Enter Soil Data</h3>
                  <p className="text-gray-600">Fill in the form to get yield predictions</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Feature 2: Crop Recommendation */}
        {activeTab === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-2xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-black mb-6">Crop Recommendation System</h2>
              <p className="text-gray-600 mb-6">
                Get crop recommendations based on soil type, weather conditions, and nutrient levels.
              </p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Soil Type
                  </label>
                  <select
                    value={cropRec.soilType}
                    onChange={(e) => setCropRec({ ...cropRec, soilType: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
                  >
                    <option value="Loamy">Loamy</option>
                    <option value="Clay">Clay</option>
                    <option value="Sandy">Sandy</option>
                    <option value="Silty">Silty</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Temperature (°C)
                  </label>
                  <input
                    type="number"
                    value={cropRec.temperature}
                    onChange={(e) => setCropRec({ ...cropRec, temperature: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
                    placeholder="Enter average temperature"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rainfall (mm/year)
                  </label>
                  <input
                    type="number"
                    value={cropRec.rainfall}
                    onChange={(e) => setCropRec({ ...cropRec, rainfall: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
                    placeholder="Enter annual rainfall"
                  />
                </div>
                
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">N (kg/acre)</label>
                    <input
                      type="number"
                      value={cropRec.nitrogen}
                      onChange={(e) => setCropRec({ ...cropRec, nitrogen: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">P (kg/acre)</label>
                    <input
                      type="number"
                      value={cropRec.phosphorus}
                      onChange={(e) => setCropRec({ ...cropRec, phosphorus: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">K (kg/acre)</label>
                    <input
                      type="number"
                      value={cropRec.potassium}
                      onChange={(e) => setCropRec({ ...cropRec, potassium: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
                    />
                  </div>
                </div>
                
                <button
                  onClick={recommendCrop}
                  className="w-full py-3 bg-yellow-400 text-black rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
                >
                  Get Recommendations
                </button>
              </div>
            </div>

            <div>
              {cropRecResult ? (
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-2xl p-6 text-white shadow-lg">
                    <div className="text-sm font-medium opacity-90 mb-2">Best Match</div>
                    <div className="text-4xl font-bold mb-1">{cropRecResult.bestMatch.crop}</div>
                    <div className="text-sm opacity-80">Match Score: {cropRecResult.bestMatch.score}%</div>
                  </div>

                  <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-sm">
                    <h3 className="text-xl font-bold text-black mb-4">Top Recommendations</h3>
                    <div className="space-y-3">
                      {cropRecResult.recommendations.map((rec: any, idx: number) => (
                        <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-semibold text-gray-800">{rec.crop}</span>
                            <span className="text-yellow-600 font-bold">{rec.score}%</span>
                          </div>
                          <p className="text-sm text-gray-600">{rec.reason}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 shadow-sm">
                    <h3 className="text-xl font-bold text-black mb-4">Soil Analysis</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-700">Soil Type:</span>
                        <span className="font-semibold">{cropRecResult.soilAnalysis.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">NPK Status:</span>
                        <span className={`font-semibold ${
                          cropRecResult.soilAnalysis.npkStatus === "Adequate" ? "text-green-600" : "text-orange-600"
                        }`}>
                          {cropRecResult.soilAnalysis.npkStatus}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-2xl p-12 text-center border-2 border-dashed border-gray-300">
                  <div className="text-6xl mb-4">🌾</div>
                  <h3 className="text-2xl font-bold text-gray-700 mb-2">Enter Conditions</h3>
                  <p className="text-gray-600">Fill in the form to get crop recommendations</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Feature 3: Fertilizer Optimization */}
        {activeTab === 3 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-2xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-black mb-6">Fertilizer Optimization</h2>
              <p className="text-gray-600 mb-6">
                Calculate optimal fertilizer mix based on crop requirements and available nutrients.
              </p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Crop Type
                  </label>
                  <select
                    value={fertilizer.crop}
                    onChange={(e) => setFertilizer({ ...fertilizer, crop: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
                  >
                    <option value="">Select Crop</option>
                    {mockCrops.map((crop) => (
                      <option key={crop.id} value={crop.name}>{crop.name}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Available Nitrogen (N) - kg/acre
                  </label>
                  <input
                    type="number"
                    value={fertilizer.availableN}
                    onChange={(e) => setFertilizer({ ...fertilizer, availableN: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
                    placeholder="Enter available N"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Available Phosphorus (P) - kg/acre
                  </label>
                  <input
                    type="number"
                    value={fertilizer.availableP}
                    onChange={(e) => setFertilizer({ ...fertilizer, availableP: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
                    placeholder="Enter available P"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Available Potassium (K) - kg/acre
                  </label>
                  <input
                    type="number"
                    value={fertilizer.availableK}
                    onChange={(e) => setFertilizer({ ...fertilizer, availableK: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
                    placeholder="Enter available K"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Soil Organic Matter (%)
                  </label>
                  <input
                    type="number"
                    value={fertilizer.organicMatter}
                    onChange={(e) => setFertilizer({ ...fertilizer, organicMatter: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
                    placeholder="Enter organic matter %"
                    step="0.1"
                  />
                </div>
                
                <button
                  onClick={optimizeFertilizer}
                  disabled={!fertilizer.crop}
                  className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                    fertilizer.crop
                      ? "bg-yellow-400 text-black hover:bg-yellow-500"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Optimize Fertilizer
                </button>
              </div>
            </div>

            <div>
              {fertilizerResult ? (
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
                    <div className="text-sm font-medium opacity-90 mb-2">Recommended NPK Ratio</div>
                    <div className="text-4xl font-bold mb-1">{fertilizerResult.recommendedNPK}</div>
                    <div className="text-sm opacity-80">Total: {fertilizerResult.dosage.total} kg/acre</div>
                  </div>

                  <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-sm">
                    <h3 className="text-xl font-bold text-black mb-4">Dosage Breakdown</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                        <span className="text-gray-700">Nitrogen (N)</span>
                        <span className="font-bold text-blue-600">{fertilizerResult.dosage.nitrogen} kg/acre</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                        <span className="text-gray-700">Phosphorus (P)</span>
                        <span className="font-bold text-green-600">{fertilizerResult.dosage.phosphorus} kg/acre</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                        <span className="text-gray-700">Potassium (K)</span>
                        <span className="font-bold text-yellow-600">{fertilizerResult.dosage.potassium} kg/acre</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6 shadow-sm">
                    <h3 className="text-xl font-bold text-black mb-4">Application Schedule</h3>
                    <ul className="space-y-2">
                      {fertilizerResult.applicationSchedule.map((schedule: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="text-yellow-600 mt-1">✓</span>
                          <span className="text-gray-700">{schedule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6 shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700">Organic Matter Status:</span>
                      <span className={`font-semibold ${
                        fertilizerResult.organicMatterStatus.includes("Adequate") ? "text-green-600" : "text-orange-600"
                      }`}>
                        {fertilizerResult.organicMatterStatus}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-green-300">
                      <span className="text-gray-700 font-medium">Estimated Cost:</span>
                      <span className="text-2xl font-bold text-green-600">{fertilizerResult.costEstimate}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-2xl p-12 text-center border-2 border-dashed border-gray-300">
                  <div className="text-6xl mb-4">🧪</div>
                  <h3 className="text-2xl font-bold text-gray-700 mb-2">Enter Crop & Soil Data</h3>
                  <p className="text-gray-600">Fill in the form to get fertilizer recommendations</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Feature 4: Water Requirement */}
        {activeTab === 4 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-2xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-black mb-6">Water Requirement Prediction</h2>
              <p className="text-gray-600 mb-6">
                Predict irrigation needs based on crop type, soil moisture, and weather conditions.
              </p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Crop Type
                  </label>
                  <select
                    value={waterReq.crop}
                    onChange={(e) => setWaterReq({ ...waterReq, crop: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
                  >
                    <option value="">Select Crop</option>
                    {mockCrops.map((crop) => (
                      <option key={crop.id} value={crop.name}>{crop.name}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Soil Moisture Level (%)
                  </label>
                  <input
                    type="number"
                    value={waterReq.soilMoisture}
                    onChange={(e) => setWaterReq({ ...waterReq, soilMoisture: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
                    placeholder="Enter current moisture %"
                    min="0"
                    max="100"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Temperature (°C)
                  </label>
                  <input
                    type="number"
                    value={waterReq.temperature}
                    onChange={(e) => setWaterReq({ ...waterReq, temperature: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
                    placeholder="Enter current temperature"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Farm Area (Acres)
                  </label>
                  <input
                    type="number"
                    value={waterReq.area}
                    onChange={(e) => setWaterReq({ ...waterReq, area: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
                    placeholder="Enter area in acres"
                    step="0.1"
                  />
                </div>
                
                <button
                  onClick={predictWaterRequirement}
                  disabled={!waterReq.crop}
                  className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                    waterReq.crop
                      ? "bg-yellow-400 text-black hover:bg-yellow-500"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Predict Water Needs
                </button>
              </div>
            </div>

            <div>
              {waterReqResult ? (
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
                    <div className="text-sm font-medium opacity-90 mb-2">Daily Water Requirement</div>
                    <div className="text-4xl font-bold mb-1">{waterReqResult.dailyRequirement} mm/day</div>
                    <div className="text-sm opacity-80">Total: {waterReqResult.totalDailyWater} m³/day</div>
                  </div>

                  <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-sm">
                    <h3 className="text-xl font-bold text-black mb-4">Irrigation Schedule</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Next Irrigation</div>
                        <div className="text-lg font-semibold text-blue-600">{waterReqResult.nextIrrigation}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Weekly Requirement</div>
                        <div className="text-lg font-semibold text-gray-800">{waterReqResult.weeklyRequirement} mm/week</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Recommended Method</div>
                        <div className="text-lg font-semibold text-gray-800">{waterReqResult.irrigationMethod}</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 shadow-sm">
                    <h3 className="text-xl font-bold text-black mb-4">Soil Moisture Status</h3>
                    <div className={`p-4 rounded-lg ${
                      waterReqResult.soilMoistureStatus.includes("Optimal") ? "bg-green-100" :
                      waterReqResult.soilMoistureStatus.includes("Low") ? "bg-orange-100" : "bg-yellow-100"
                    }`}>
                      <div className={`font-semibold ${
                        waterReqResult.soilMoistureStatus.includes("Optimal") ? "text-green-700" :
                        waterReqResult.soilMoistureStatus.includes("Low") ? "text-orange-700" : "text-yellow-700"
                      }`}>
                        {waterReqResult.soilMoistureStatus}
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6 shadow-sm">
                    <h3 className="text-xl font-bold text-black mb-4">Water Management Tips</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-3">
                        <span className="text-yellow-600 mt-1">💧</span>
                        <span>Monitor soil moisture daily during peak growth</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-yellow-600 mt-1">🌡️</span>
                        <span>Adjust irrigation based on temperature changes</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-yellow-600 mt-1">⏰</span>
                        <span>Water early morning or evening to reduce evaporation</span>
                      </li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-2xl p-12 text-center border-2 border-dashed border-gray-300">
                  <div className="text-6xl mb-4">💧</div>
                  <h3 className="text-2xl font-bold text-gray-700 mb-2">Enter Crop & Conditions</h3>
                  <p className="text-gray-600">Fill in the form to get water requirement predictions</p>
                </div>
              )}
            </div>
          </div>
        )}

       
      </main>
      
      <Footer />
    </div>
  );
}
