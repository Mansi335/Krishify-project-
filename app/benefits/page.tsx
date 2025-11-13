"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { getLocationBasedData } from "../utils/locationAutoFill";

export default function BenefitsPage() {
  const t = useTranslations("benefits");
  const [activeTab, setActiveTab] = useState(1);

  // Feature 1: Crop Yield Prediction State
  const [soilYield, setSoilYield] = useState({
    crop: "",
    area: "",
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    pH: "",
    humidity: "",
    rainfall: "",
  });
  const [soilYieldResult, setSoilYieldResult] = useState<{
    yieldPerAcre: string;
    totalYield: string;
    confidence: number;
    soilHealth: string;
    recommendations: string[];
  } | null>(null);

  // Feature 2: Crop Recommendation State
  const [cropRec, setCropRec] = useState({
    temperature: "",
    rainfall: "",
    pH: "",
    humidity: "",
  });
  const [cropRecResult, setCropRecResult] = useState<{
    recommendations: Array<{
      crop: string;
      displayName: string;
      score: number;
      reason: string;
    }>;
    bestMatch: {
      crop: string;
      displayName: string;
      score: number;
      reason: string;
    };
    environmentAnalysis: {
      pH: string;
      pHStatus: string;
      humidity: string;
      humidityStatus: string;
    };
  } | null>(null);

  // Feature 3: Fertilizer Optimization State
  const [fertilizer, setFertilizer] = useState({
    crop: "",
    availableN: "",
    availableP: "",
    availableK: "",
    soilType: "Loamy",
    humidity: "",
    moisture: "",
    temperature: "",
  });
  const [fertilizerResult, setFertilizerResult] = useState<{
    recommendedNPK: string;
    dosage: {
      nitrogen: string;
      phosphorus: string;
      potassium: string;
      total: string;
    };
    environment: {
      soilType: string;
      temperature: string;
      humidity: string;
      moisture: string;
    };
    applicationSchedule: string[];
    costEstimate: string;
  } | null>(null);

  // Feature 4: Water Requirement State
  const [waterReq, setWaterReq] = useState({
    crop: "",
    soilMoisture: "",
    temperature: "",
    area: "",
  });
  const [waterReqResult, setWaterReqResult] = useState<{
    dailyRequirement: string;
    totalDailyWater: string;
    nextIrrigation: string;
    soilMoistureStatus: string;
    weeklyRequirement: string;
    irrigationMethod: string;
  } | null>(null);

  // Feature 5: Crop Disease Detection State
  const [cropDisease, setCropDisease] = useState({
    crop: "",
    image: null as File | null,
    imagePreview: null as string | null,
  });
  const [cropDiseaseResult, setCropDiseaseResult] = useState<{
    healthy: boolean;
    confidence: number;
    diseaseName?: string;
    diseaseKey?: string;
    severity?: string;
    symptoms?: string;
    treatment?: string;
    prevention?: string;
  } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Auto-fill loading states
  const [autoFillLoading, setAutoFillLoading] = useState({
    soilYield: false,
    cropRec: false,
    fertilizer: false,
    waterReq: false,
  });

  // Get crops with translated names
  const getCrops = () => [
    { id: 1, name: "Wheat", displayName: t("crops.wheat"), icon: "🌾" },
    { id: 2, name: "Rice", displayName: t("crops.rice"), icon: "🌾" },
    { id: 3, name: "Corn", displayName: t("crops.corn"), icon: "🌽" },
    { id: 4, name: "Soybean", displayName: t("crops.soybean"), icon: "🫘" },
    { id: 5, name: "Cotton", displayName: t("crops.cotton"), icon: "🌿" },
    { id: 6, name: "Potato", displayName: t("crops.potato"), icon: "🥔" },
  ];

  // Get soil types with translated names
  const getSoilTypes = () => [
    { value: "Loamy", label: t("soilTypes.loamy") },
    { value: "Clay", label: t("soilTypes.clay") },
    { value: "Sandy", label: t("soilTypes.sandy") },
    { value: "Silty", label: t("soilTypes.silty") },
  ];

  // Auto-fill handlers
  const handleAutoFillSoilYield = async () => {
    setAutoFillLoading({ ...autoFillLoading, soilYield: true });
    try {
      const locationData = await getLocationBasedData();
      if (locationData) {
        setSoilYield({
          ...soilYield,
          pH: locationData.pH.toString(),
          humidity: locationData.humidity.toString(),
          rainfall: locationData.rainfall.toString(),
        });
        alert(t("soilYield.autoFillSuccess"));
      }
    } catch {
      alert(t("soilYield.autoFillError"));
    } finally {
      setAutoFillLoading({ ...autoFillLoading, soilYield: false });
    }
  };

  const handleAutoFillCropRec = async () => {
    setAutoFillLoading({ ...autoFillLoading, cropRec: true });
    try {
      const locationData = await getLocationBasedData();
      if (locationData) {
        setCropRec({
          ...cropRec,
          temperature: locationData.temperature.toString(),
          rainfall: locationData.rainfall.toString(),
          pH: locationData.pH.toString(),
          humidity: locationData.humidity.toString(),
        });
        alert(t("cropRecommendation.autoFillSuccess"));
      }
    } catch {
      alert(t("cropRecommendation.autoFillError"));
    } finally {
      setAutoFillLoading({ ...autoFillLoading, cropRec: false });
    }
  };

  const handleAutoFillFertilizer = async () => {
    setAutoFillLoading({ ...autoFillLoading, fertilizer: true });
    try {
      const locationData = await getLocationBasedData();
      if (locationData) {
        setFertilizer({
          ...fertilizer,
          humidity: locationData.humidity.toString(),
          moisture: locationData.soilMoisture.toString(),
          temperature: locationData.temperature.toString(),
        });
        alert(t("fertilizer.autoFillSuccess"));
      }
    } catch {
      alert(t("fertilizer.autoFillError"));
    } finally {
      setAutoFillLoading({ ...autoFillLoading, fertilizer: false });
    }
  };

  const handleAutoFillWaterReq = async () => {
    setAutoFillLoading({ ...autoFillLoading, waterReq: true });
    try {
      const locationData = await getLocationBasedData();
      if (locationData) {
        setWaterReq({
          ...waterReq,
          soilMoisture: locationData.soilMoisture.toString(),
          temperature: locationData.temperature.toString(),
        });
        alert(t("water.autoFillSuccess"));
      }
    } catch {
      alert(t("water.autoFillError"));
    } finally {
      setAutoFillLoading({ ...autoFillLoading, waterReq: false });
    }
  };


  // Mock function for Crop Yield Prediction
  const predictSoilYield = () => {
    const crop = soilYield.crop;
    const n = parseFloat(soilYield.nitrogen) || 0;
    const p = parseFloat(soilYield.phosphorus) || 0;
    const k = parseFloat(soilYield.potassium) || 0;
    const ph = parseFloat(soilYield.pH) || 7;
    const area = parseFloat(soilYield.area) || 1;
    const humidity = parseFloat(soilYield.humidity) || 60;
    const rainfall = parseFloat(soilYield.rainfall) || 800;

    // Base yield varies by crop type (tons/acre)
    const cropBaseYields: Record<string, number> = {
      "Wheat": 3.0,
      "Rice": 4.5,
      "Corn": 5.0,
      "Soybean": 2.5,
      "Cotton": 2.0,
      "Potato": 8.0,
    };

    const baseYield = cropBaseYields[crop] || 2.5;

    // Nutrient factors
    const nFactor = (n / 50) * 0.3;
    const pFactor = (p / 30) * 0.25;
    const kFactor = (k / 40) * 0.25;
    
    // pH factor (optimal range 6.0-7.5)
    const phFactor = ph >= 6 && ph <= 7.5 ? 1.2 : ph >= 5.5 && ph < 6 ? 1.0 : ph > 7.5 && ph <= 8 ? 1.0 : 0.8;
    
    // Humidity factor (optimal range 50-80%)
    const humidityFactor = humidity >= 50 && humidity <= 80 ? 1.1 : humidity >= 40 && humidity < 50 ? 0.95 : humidity > 80 && humidity <= 90 ? 0.95 : 0.85;
    
    // Rainfall factor (optimal varies by crop, but general range 400-1200mm)
    const rainfallFactor = rainfall >= 400 && rainfall <= 1200 ? 1.15 : rainfall >= 300 && rainfall < 400 ? 0.9 : rainfall > 1200 && rainfall <= 1500 ? 1.0 : 0.8;
    
    const predictedYield = (baseYield + nFactor + pFactor + kFactor) * phFactor * humidityFactor * rainfallFactor;

    const recommendations = [];
    if (ph < 6) {
      recommendations.push(t("soilYield.addLime"));
    } else if (ph > 7.5) {
      recommendations.push(t("soilYield.addSulfur"));
    } else {
      recommendations.push(t("soilYield.phOptimal"));
    }
    
    if (n < 40) {
      recommendations.push(t("soilYield.addNitrogen", { amount: (40 - n).toFixed(1) }));
    } else {
      recommendations.push(t("soilYield.nitrogenAdequate"));
    }
    
    if (p < 25) {
      recommendations.push(t("soilYield.addPhosphorus", { amount: (25 - p).toFixed(1) }));
    } else {
      recommendations.push(t("soilYield.phosphorusAdequate"));
    }
    
    if (k < 35) {
      recommendations.push(t("soilYield.addPotassium", { amount: (35 - k).toFixed(1) }));
    } else {
      recommendations.push(t("soilYield.potassiumAdequate"));
    }

    setSoilYieldResult({
      yieldPerAcre: predictedYield.toFixed(2),
      totalYield: (predictedYield * area).toFixed(2),
      confidence: 92,
      soilHealth: n > 40 && p > 25 && k > 35 ? t("soilYield.excellent") : n > 30 && p > 20 && k > 30 ? t("soilYield.good") : t("soilYield.needsImprovement"),
      recommendations,
    });
  };

  // Mock function for Crop Recommendation
  const recommendCrop = () => {
    const temp = parseFloat(cropRec.temperature) || 25;
    const rain = parseFloat(cropRec.rainfall) || 800;
    const ph = parseFloat(cropRec.pH) || 7;
    const humidity = parseFloat(cropRec.humidity) || 60;

    const cropMap: Record<string, { displayName: string; reasonKey: string }> = {
      "Rice": { displayName: t("crops.rice"), reasonKey: "riceReason" },
      "Wheat": { displayName: t("crops.wheat"), reasonKey: "wheatReason" },
      "Corn": { displayName: t("crops.corn"), reasonKey: "cornReason" },
      "Soybean": { displayName: t("crops.soybean"), reasonKey: "soybeanReason" },
      "Potato": { displayName: t("crops.potato"), reasonKey: "potatoReason" },
      "Cotton": { displayName: t("crops.cotton"), reasonKey: "cottonReason" },
    };

    // Mock recommendation logic based on temperature, rainfall, pH, and humidity
    const recommendedCrops: Array<{
      crop: string;
      displayName: string;
      score: number;
      reason: string;
    }> = [];
    
    // Rice: warm, high rainfall, neutral pH, high humidity
    if (temp >= 20 && temp <= 35 && rain >= 1000 && ph >= 6 && ph <= 7.5 && humidity >= 70) {
      recommendedCrops.push({ crop: "Rice", displayName: cropMap["Rice"].displayName, score: 95, reason: t(`cropRecommendation.${cropMap["Rice"].reasonKey}`) });
    }
    // Wheat: moderate temp, moderate rainfall, neutral pH, moderate humidity
    if (temp >= 15 && temp <= 25 && rain >= 400 && rain <= 800 && ph >= 6 && ph <= 7.5 && humidity >= 50 && humidity <= 70) {
      recommendedCrops.push({ crop: "Wheat", displayName: cropMap["Wheat"].displayName, score: 90, reason: t(`cropRecommendation.${cropMap["Wheat"].reasonKey}`) });
    }
    // Corn: warm, moderate to high rainfall, neutral pH, moderate humidity
    if (temp >= 18 && temp <= 27 && rain >= 500 && rain <= 1000 && ph >= 6 && ph <= 7.5 && humidity >= 50) {
      recommendedCrops.push({ crop: "Corn", displayName: cropMap["Corn"].displayName, score: 88, reason: t(`cropRecommendation.${cropMap["Corn"].reasonKey}`) });
    }
    // Soybean: warm, moderate rainfall, slightly acidic to neutral, moderate humidity
    if (temp >= 20 && temp <= 30 && rain >= 450 && rain <= 700 && ph >= 6 && ph <= 7 && humidity >= 50 && humidity <= 70) {
      recommendedCrops.push({ crop: "Soybean", displayName: cropMap["Soybean"].displayName, score: 85, reason: t(`cropRecommendation.${cropMap["Soybean"].reasonKey}`) });
    }
    // Potato: cool, moderate rainfall, slightly acidic, moderate humidity
    if (temp >= 15 && temp <= 20 && rain >= 500 && rain <= 700 && ph >= 5.5 && ph <= 6.5 && humidity >= 60 && humidity <= 80) {
      recommendedCrops.push({ crop: "Potato", displayName: cropMap["Potato"].displayName, score: 87, reason: t(`cropRecommendation.${cropMap["Potato"].reasonKey}`) });
    }
    // Cotton: warm, moderate to high rainfall, neutral pH, moderate humidity
    if (temp >= 21 && temp <= 30 && rain >= 600 && rain <= 1200 && ph >= 6 && ph <= 7.5 && humidity >= 50 && humidity <= 70) {
      recommendedCrops.push({ crop: "Cotton", displayName: cropMap["Cotton"].displayName, score: 82, reason: t(`cropRecommendation.${cropMap["Cotton"].reasonKey}`) });
    }

    // If no crops match exact conditions, provide general recommendations based on temperature and rainfall
    if (recommendedCrops.length === 0) {
      if (temp >= 20 && temp <= 35 && rain >= 1000) {
        recommendedCrops.push({ crop: "Rice", displayName: cropMap["Rice"].displayName, score: 75, reason: t(`cropRecommendation.${cropMap["Rice"].reasonKey}`) });
      }
      if (temp >= 15 && temp <= 25 && rain >= 400 && rain <= 800) {
        recommendedCrops.push({ crop: "Wheat", displayName: cropMap["Wheat"].displayName, score: 75, reason: t(`cropRecommendation.${cropMap["Wheat"].reasonKey}`) });
      }
      if (temp >= 18 && temp <= 27 && rain >= 500 && rain <= 1000) {
        recommendedCrops.push({ crop: "Corn", displayName: cropMap["Corn"].displayName, score: 75, reason: t(`cropRecommendation.${cropMap["Corn"].reasonKey}`) });
      }
    }

    // Sort by score
    recommendedCrops.sort((a, b) => b.score - a.score);

    // Determine pH and humidity status
    const pHStatus = ph >= 6 && ph <= 7.5 ? t("cropRecommendation.optimal") : t("cropRecommendation.needsImprovement");
    const humidityStatus = humidity >= 50 && humidity <= 80 ? t("cropRecommendation.adequate") : t("cropRecommendation.needsImprovement");

    setCropRecResult({
      recommendations: recommendedCrops.slice(0, 3),
      bestMatch: recommendedCrops[0] || { crop: "Wheat", displayName: t("crops.wheat"), score: 75, reason: t("cropRecommendation.generalRecommendation") },
      environmentAnalysis: {
        pH: ph.toFixed(1),
        pHStatus: pHStatus,
        humidity: humidity.toFixed(0),
        humidityStatus: humidityStatus,
      },
    });
  };

  // Mock function for Fertilizer Optimization
  const optimizeFertilizer = () => {
    const crop = fertilizer.crop;
    const availableN = parseFloat(fertilizer.availableN) || 0;
    const availableP = parseFloat(fertilizer.availableP) || 0;
    const availableK = parseFloat(fertilizer.availableK) || 0;
    const soilType = fertilizer.soilType;
    const humidity = parseFloat(fertilizer.humidity) || 60;
    const moisture = parseFloat(fertilizer.moisture) || 50;
    const temperature = parseFloat(fertilizer.temperature) || 25;

    // Mock crop requirements (kg/acre) - adjusted based on soil type
    const baseRequirements: Record<string, { n: number; p: number; k: number }> = {
      "Wheat": { n: 120, p: 60, k: 40 },
      "Rice": { n: 150, p: 70, k: 60 },
      "Corn": { n: 180, p: 80, k: 100 },
      "Soybean": { n: 0, p: 0, k: 50 },
      "Cotton": { n: 100, p: 61, k: 0 },
      "Potato": { n: 150, p: 100, k: 150 },
    };

    // Soil type adjustment factors
    const soilTypeFactors: Record<string, { n: number; p: number; k: number }> = {
      "Loamy": { n: 1.0, p: 1.0, k: 1.0 }, // Optimal
      "Clay": { n: 0.9, p: 1.1, k: 1.0 },  // Retains P better
      "Sandy": { n: 1.1, p: 0.9, k: 0.9 }, // Leaches nutrients
      "Silty": { n: 1.0, p: 1.05, k: 1.0 }, // Similar to loamy
    };

    const baseReq = baseRequirements[crop] || { n: 120, p: 60, k: 40 };
    const soilFactor = soilTypeFactors[soilType] || { n: 1.0, p: 1.0, k: 1.0 };
    
    // Adjust requirements based on soil type
    const requirements = {
      n: baseReq.n * soilFactor.n,
      p: baseReq.p * soilFactor.p,
      k: baseReq.k * soilFactor.k,
    };

    // Temperature and humidity adjustments (affect nutrient availability)
    const tempFactor = temperature >= 20 && temperature <= 30 ? 1.0 : temperature < 20 ? 1.1 : 0.95; // Cold needs more, hot needs less
    const humidityFactor = humidity >= 50 && humidity <= 80 ? 1.0 : humidity < 50 ? 1.05 : 0.98; // Low humidity needs slightly more
    const moistureFactor = moisture >= 45 && moisture <= 60 ? 1.0 : moisture < 45 ? 1.08 : 0.95; // Low moisture needs more
    
    // Apply environmental factors
    const adjustedRequirements = {
      n: requirements.n * tempFactor * humidityFactor * moistureFactor,
      p: requirements.p * tempFactor * humidityFactor * moistureFactor,
      k: requirements.k * tempFactor * humidityFactor * moistureFactor,
    };
    
    const nNeeded = Math.max(0, adjustedRequirements.n - availableN);
    const pNeeded = Math.max(0, adjustedRequirements.p - availableP);
    const kNeeded = Math.max(0, adjustedRequirements.k - availableK);

    // Calculate NPK ratio
    const total = nNeeded + pNeeded + kNeeded;
    const nRatio = total > 0 ? Math.round((nNeeded / total) * 100) : 0;
    const pRatio = total > 0 ? Math.round((pNeeded / total) * 100) : 0;
    const kRatio = total > 0 ? Math.round((kNeeded / total) * 100) : 0;

    const soilTypes = getSoilTypes();
    const currentSoilType = soilTypes.find(st => st.value === soilType)?.label || soilType;

    setFertilizerResult({
      recommendedNPK: `${nRatio}-${pRatio}-${kRatio}`,
      dosage: {
        nitrogen: nNeeded.toFixed(1),
        phosphorus: pNeeded.toFixed(1),
        potassium: kNeeded.toFixed(1),
        total: total.toFixed(1),
      },
      environment: {
        soilType: currentSoilType,
        temperature: temperature.toFixed(1),
        humidity: humidity.toFixed(0),
        moisture: moisture.toFixed(0),
      },
      applicationSchedule: [
        t("fertilizer.applyAtPlanting"),
        t("fertilizer.applyAt30Days"),
        t("fertilizer.applyAt60Days"),
      ],
      costEstimate: `₹${(total * 25).toFixed(0)} ${t("fertilizer.perAcre")}`,
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

    const waterNeeded = adjustedDaily * area * 10; // Convert to liters

    let nextIrrigationText: string;
    if (daysUntilIrrigation === "0") {
      nextIrrigationText = t("water.notNeeded");
    } else {
      nextIrrigationText = t("water.inDays", { days: daysUntilIrrigation });
    }

    let soilMoistureStatusText: string;
    if (soilMoisture >= 45 && soilMoisture <= 55) {
      soilMoistureStatusText = t("water.optimal");
    } else if (soilMoisture < 45) {
      soilMoistureStatusText = t("water.lowIrrigationNeeded");
    } else {
      soilMoistureStatusText = t("water.highReduceIrrigation");
    }

    setWaterReqResult({
      dailyRequirement: adjustedDaily.toFixed(2),
      totalDailyWater: (waterNeeded / 1000).toFixed(2),
      nextIrrigation: nextIrrigationText,
      soilMoistureStatus: soilMoistureStatusText,
      weeklyRequirement: (adjustedDaily * 7).toFixed(1),
      irrigationMethod: crop === "Rice" ? t("water.flooding") : t("water.dripSprinkler"),
    });
  };

  // Mock function for Crop Disease Detection
  const detectCropDisease = async () => {
    if (!cropDisease.image || !cropDisease.crop) {
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const crop = cropDisease.crop;
    
    // Mock disease detection results based on crop type
    const diseaseDatabase: Record<string, Array<{
      name: string;
      key: string;
      confidence: number;
      severity: string;
    }>> = {
      "Wheat": [
        { name: "Leaf Rust", key: "leafRust", confidence: 87, severity: "moderate" },
        { name: "Powdery Mildew", key: "mildew", confidence: 75, severity: "mild" },
        { name: "Leaf Spot", key: "spot", confidence: 68, severity: "mild" },
      ],
      "Rice": [
        { name: "Blight", key: "blight", confidence: 92, severity: "severe" },
        { name: "Leaf Spot", key: "spot", confidence: 80, severity: "moderate" },
      ],
      "Corn": [
        { name: "Leaf Rust", key: "leafRust", confidence: 85, severity: "moderate" },
        { name: "Blight", key: "blight", confidence: 78, severity: "moderate" },
      ],
      "Soybean": [
        { name: "Leaf Spot", key: "spot", confidence: 88, severity: "moderate" },
        { name: "Powdery Mildew", key: "mildew", confidence: 72, severity: "mild" },
      ],
      "Cotton": [
        { name: "Leaf Rust", key: "leafRust", confidence: 82, severity: "mild" },
        { name: "Blight", key: "blight", confidence: 76, severity: "moderate" },
      ],
      "Potato": [
        { name: "Blight", key: "blight", confidence: 95, severity: "severe" },
        { name: "Leaf Spot", key: "spot", confidence: 70, severity: "mild" },
      ],
    };

    const possibleDiseases = diseaseDatabase[crop] || [
      { name: "Leaf Rust", key: "leafRust", confidence: 80, severity: "moderate" },
    ];

    // Randomly select a disease (90% chance of disease, 10% chance of healthy)
    const isHealthy = Math.random() < 0.1;
    
    if (isHealthy) {
      setCropDiseaseResult({
        healthy: true,
        confidence: 95,
      });
    } else {
      const selectedDisease = possibleDiseases[Math.floor(Math.random() * possibleDiseases.length)];
      
      setCropDiseaseResult({
        healthy: false,
        diseaseName: selectedDisease.name,
        diseaseKey: selectedDisease.key,
        confidence: selectedDisease.confidence,
        severity: selectedDisease.severity,
        symptoms: t(`cropDisease.${selectedDisease.key}Symptoms`),
        treatment: t(`cropDisease.${selectedDisease.key}Treatment`),
        prevention: t(`cropDisease.${selectedDisease.key}Prevention`),
      });
    }

    setIsAnalyzing(false);
  };

  // Handle image file selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert(t("cropDisease.uploadImage") + " - " + t("cropDisease.supportedFormats"));
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB");
        return;
      }

      setCropDisease({
        ...cropDisease,
        image: file,
        imagePreview: URL.createObjectURL(file),
      });
      setCropDiseaseResult(null);
    }
  };

  // Handle drag and drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB");
        return;
      }
      setCropDisease({
        ...cropDisease,
        image: file,
        imagePreview: URL.createObjectURL(file),
      });
      setCropDiseaseResult(null);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const tabs = [
    { id: 1, name: t("tabs.soilYield"), icon: "🌱" },
    { id: 2, name: t("tabs.cropRecommendation"), icon: "🌾" },
    { id: 3, name: t("tabs.fertilizerOptimization"), icon: "🧪" },
    { id: 4, name: t("tabs.waterRequirement"), icon: "💧" },
    { id: 5, name: t("tabs.cropDisease"), icon: "🔬" },
  ];

  const crops = getCrops();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-black mb-4">
            {t("title")} <span className="text-yellow-600">{t("titleHighlight")}</span>
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            {t("subtitle")}
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

        {/* Feature 1: Crop Yield Prediction */}
        {activeTab === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-2xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-black mb-6">{t("soilYield.title")}</h2>
              <p className="text-gray-600 mb-6">
                {t("soilYield.description")}
              </p>
              
              <button
                onClick={handleAutoFillSoilYield}
                disabled={autoFillLoading.soilYield}
                className="w-full mb-4 py-2 px-4 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {autoFillLoading.soilYield ? (
                  <>
                    <span className="animate-spin">⏳</span>
                    {t("soilYield.autoFillLoading")}
                  </>
                ) : (
                  t("soilYield.autoFillButton")
                )}
              </button>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("soilYield.cropType")}
                  </label>
                  <select
                    value={soilYield.crop}
                    onChange={(e) => setSoilYield({ ...soilYield, crop: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
                  >
                    <option value="">{t("soilYield.selectCrop")}</option>
                    {crops.map((crop) => (
                      <option key={crop.id} value={crop.name}>{crop.displayName}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("soilYield.landArea")}
                  </label>
                  <input
                    type="number"
                    value={soilYield.area}
                    onChange={(e) => setSoilYield({ ...soilYield, area: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
                    placeholder={t("soilYield.landAreaPlaceholder")}
                    step="0.1"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("soilYield.nitrogen")}
                  </label>
                  <input
                    type="number"
                    value={soilYield.nitrogen}
                    onChange={(e) => setSoilYield({ ...soilYield, nitrogen: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
                    placeholder={t("soilYield.nitrogenPlaceholder")}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("soilYield.phosphorus")}
                  </label>
                  <input
                    type="number"
                    value={soilYield.phosphorus}
                    onChange={(e) => setSoilYield({ ...soilYield, phosphorus: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
                    placeholder={t("soilYield.phosphorusPlaceholder")}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("soilYield.potassium")}
                  </label>
                  <input
                    type="number"
                    value={soilYield.potassium}
                    onChange={(e) => setSoilYield({ ...soilYield, potassium: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
                    placeholder={t("soilYield.potassiumPlaceholder")}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("soilYield.pH")}
                  </label>
                  <input
                    type="number"
                    value={soilYield.pH}
                    onChange={(e) => setSoilYield({ ...soilYield, pH: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
                    placeholder={t("soilYield.pHPlaceholder")}
                    step="0.1"
                    min="4"
                    max="9"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("soilYield.humidity")}
                  </label>
                  <input
                    type="number"
                    value={soilYield.humidity}
                    onChange={(e) => setSoilYield({ ...soilYield, humidity: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
                    placeholder={t("soilYield.humidityPlaceholder")}
                    min="0"
                    max="100"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("soilYield.rainfall")}
                  </label>
                  <input
                    type="number"
                    value={soilYield.rainfall}
                    onChange={(e) => setSoilYield({ ...soilYield, rainfall: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
                    placeholder={t("soilYield.rainfallPlaceholder")}
                  />
                </div>
                
                <button
                  onClick={predictSoilYield}
                  disabled={!soilYield.crop}
                  className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                    soilYield.crop
                      ? "bg-yellow-400 text-black hover:bg-yellow-500"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {t("soilYield.predictButton")}
                </button>
              </div>
            </div>

            <div>
              {soilYieldResult ? (
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl p-6 text-white shadow-lg">
                    <div className="text-sm font-medium opacity-90 mb-2">{t("soilYield.predictedYield")}</div>
                    <div className="text-4xl font-bold mb-1">{soilYieldResult.yieldPerAcre} {t("soilYield.tonsPerAcre")}</div>
                    <div className="text-sm opacity-80">{t("soilYield.total")}: {soilYieldResult.totalYield} {t("soilYield.tons")}</div>
                  </div>
                  
                  <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-sm">
                    <h3 className="text-xl font-bold text-black mb-4">{t("soilYield.soilHealthAnalysis")}</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="text-sm text-gray-600 mb-1">{t("soilYield.overallStatus")}</div>
                        <div className={`text-lg font-semibold ${
                          soilYieldResult.soilHealth === t("soilYield.excellent") ? "text-green-600" :
                          soilYieldResult.soilHealth === t("soilYield.good") ? "text-yellow-600" : "text-orange-600"
                        }`}>
                          {soilYieldResult.soilHealth}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 mb-1">{t("soilYield.confidenceScore")}</div>
                        <div className="text-lg font-semibold text-blue-600">{soilYieldResult.confidence}%</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6 shadow-sm">
                    <h3 className="text-xl font-bold text-black mb-4">{t("soilYield.recommendations")}</h3>
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
                  <h3 className="text-2xl font-bold text-gray-700 mb-2">{t("soilYield.enterSoilData")}</h3>
                  <p className="text-gray-600">{t("soilYield.enterSoilDataDesc")}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Feature 2: Crop Recommendation */}
        {activeTab === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-2xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-black mb-6">{t("cropRecommendation.title")}</h2>
              <p className="text-gray-600 mb-6">
                {t("cropRecommendation.description")}
              </p>
              
              <button
                onClick={handleAutoFillCropRec}
                disabled={autoFillLoading.cropRec}
                className="w-full mb-4 py-2 px-4 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {autoFillLoading.cropRec ? (
                  <>
                    <span className="animate-spin">⏳</span>
                    {t("cropRecommendation.autoFillLoading")}
                  </>
                ) : (
                  t("cropRecommendation.autoFillButton")
                )}
              </button>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("cropRecommendation.temperature")}
                  </label>
                  <input
                    type="number"
                    value={cropRec.temperature}
                    onChange={(e) => setCropRec({ ...cropRec, temperature: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
                    placeholder={t("cropRecommendation.temperaturePlaceholder")}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("cropRecommendation.rainfall")}
                  </label>
                  <input
                    type="number"
                    value={cropRec.rainfall}
                    onChange={(e) => setCropRec({ ...cropRec, rainfall: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
                    placeholder={t("cropRecommendation.rainfallPlaceholder")}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("cropRecommendation.pH")}
                  </label>
                  <input
                    type="number"
                    value={cropRec.pH}
                    onChange={(e) => setCropRec({ ...cropRec, pH: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
                    placeholder={t("cropRecommendation.pHPlaceholder")}
                    step="0.1"
                    min="4"
                    max="9"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("cropRecommendation.humidity")}
                  </label>
                  <input
                    type="number"
                    value={cropRec.humidity}
                    onChange={(e) => setCropRec({ ...cropRec, humidity: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
                    placeholder={t("cropRecommendation.humidityPlaceholder")}
                    min="0"
                    max="100"
                  />
                </div>
                
                <button
                  onClick={recommendCrop}
                  className="w-full py-3 bg-yellow-400 text-black rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
                >
                  {t("cropRecommendation.getRecommendations")}
                </button>
              </div>
            </div>

            <div>
              {cropRecResult ? (
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-2xl p-6 text-white shadow-lg">
                    <div className="text-sm font-medium opacity-90 mb-2">{t("cropRecommendation.bestMatch")}</div>
                    <div className="text-4xl font-bold mb-1">{cropRecResult.bestMatch.displayName || cropRecResult.bestMatch.crop}</div>
                    <div className="text-sm opacity-80">{t("cropRecommendation.matchScore")}: {cropRecResult.bestMatch.score}%</div>
                  </div>

                  <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-sm">
                    <h3 className="text-xl font-bold text-black mb-4">{t("cropRecommendation.topRecommendations")}</h3>
                    <div className="space-y-3">
                      {cropRecResult.recommendations.map((rec, idx) => (
                        <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-semibold text-gray-800">{rec.displayName || rec.crop}</span>
                            <span className="text-yellow-600 font-bold">{rec.score}%</span>
                          </div>
                          <p className="text-sm text-gray-600">{rec.reason}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 shadow-sm">
                    <h3 className="text-xl font-bold text-black mb-4">{t("cropRecommendation.environmentAnalysis")}</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">pH:</span>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{cropRecResult.environmentAnalysis.pH}</span>
                          <span className={`font-semibold text-sm ${
                            cropRecResult.environmentAnalysis.pHStatus === t("cropRecommendation.optimal") ? "text-green-600" : "text-orange-600"
                          }`}>
                            ({cropRecResult.environmentAnalysis.pHStatus})
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">{t("cropRecommendation.humidityStatus")}:</span>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{cropRecResult.environmentAnalysis.humidity}%</span>
                          <span className={`font-semibold text-sm ${
                            cropRecResult.environmentAnalysis.humidityStatus === t("cropRecommendation.adequate") ? "text-green-600" : "text-orange-600"
                          }`}>
                            ({cropRecResult.environmentAnalysis.humidityStatus})
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-2xl p-12 text-center border-2 border-dashed border-gray-300">
                  <div className="text-6xl mb-4">🌾</div>
                  <h3 className="text-2xl font-bold text-gray-700 mb-2">{t("cropRecommendation.enterConditions")}</h3>
                  <p className="text-gray-600">{t("cropRecommendation.enterConditionsDesc")}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Feature 3: Fertilizer Optimization */}
        {activeTab === 3 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-2xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-black mb-6">{t("fertilizer.title")}</h2>
              <p className="text-gray-600 mb-6">
                {t("fertilizer.description")}
              </p>
              
              <button
                onClick={handleAutoFillFertilizer}
                disabled={autoFillLoading.fertilizer}
                className="w-full mb-4 py-2 px-4 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {autoFillLoading.fertilizer ? (
                  <>
                    <span className="animate-spin">⏳</span>
                    {t("fertilizer.autoFillLoading")}
                  </>
                ) : (
                  t("fertilizer.autoFillButton")
                )}
              </button>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("fertilizer.cropType")}
                  </label>
                  <select
                    value={fertilizer.crop}
                    onChange={(e) => setFertilizer({ ...fertilizer, crop: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
                  >
                    <option value="">{t("fertilizer.selectCrop")}</option>
                    {crops.map((crop) => (
                      <option key={crop.id} value={crop.name}>{crop.displayName}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("fertilizer.availableNitrogen")}
                  </label>
                  <input
                    type="number"
                    value={fertilizer.availableN}
                    onChange={(e) => setFertilizer({ ...fertilizer, availableN: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
                    placeholder={t("fertilizer.availableNitrogenPlaceholder")}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("fertilizer.availablePhosphorus")}
                  </label>
                  <input
                    type="number"
                    value={fertilizer.availableP}
                    onChange={(e) => setFertilizer({ ...fertilizer, availableP: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
                    placeholder={t("fertilizer.availablePhosphorusPlaceholder")}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("fertilizer.availablePotassium")}
                  </label>
                  <input
                    type="number"
                    value={fertilizer.availableK}
                    onChange={(e) => setFertilizer({ ...fertilizer, availableK: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
                    placeholder={t("fertilizer.availablePotassiumPlaceholder")}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("fertilizer.soilType")}
                  </label>
                  <select
                    value={fertilizer.soilType}
                    onChange={(e) => setFertilizer({ ...fertilizer, soilType: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
                  >
                    {getSoilTypes().map((soil) => (
                      <option key={soil.value} value={soil.value}>{soil.label}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("fertilizer.humidity")}
                  </label>
                  <input
                    type="number"
                    value={fertilizer.humidity}
                    onChange={(e) => setFertilizer({ ...fertilizer, humidity: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
                    placeholder={t("fertilizer.humidityPlaceholder")}
                    min="0"
                    max="100"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("fertilizer.moisture")}
                  </label>
                  <input
                    type="number"
                    value={fertilizer.moisture}
                    onChange={(e) => setFertilizer({ ...fertilizer, moisture: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
                    placeholder={t("fertilizer.moisturePlaceholder")}
                    min="0"
                    max="100"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("fertilizer.temperature")}
                  </label>
                  <input
                    type="number"
                    value={fertilizer.temperature}
                    onChange={(e) => setFertilizer({ ...fertilizer, temperature: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
                    placeholder={t("fertilizer.temperaturePlaceholder")}
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
                  {t("fertilizer.optimizeButton")}
                </button>
              </div>
            </div>

            <div>
              {fertilizerResult ? (
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
                    <div className="text-sm font-medium opacity-90 mb-2">{t("fertilizer.recommendedNPK")}</div>
                    <div className="text-4xl font-bold mb-1">{fertilizerResult.recommendedNPK}</div>
                    <div className="text-sm opacity-80">{t("fertilizer.total")}: {fertilizerResult.dosage.total} kg/acre</div>
                  </div>

                  <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-sm">
                    <h3 className="text-xl font-bold text-black mb-4">{t("fertilizer.dosageBreakdown")}</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                        <span className="text-gray-700">{t("soilYield.nitrogen")}</span>
                        <span className="font-bold text-blue-600">{fertilizerResult.dosage.nitrogen} kg/acre</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                        <span className="text-gray-700">{t("soilYield.phosphorus")}</span>
                        <span className="font-bold text-green-600">{fertilizerResult.dosage.phosphorus} kg/acre</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                        <span className="text-gray-700">{t("soilYield.potassium")}</span>
                        <span className="font-bold text-yellow-600">{fertilizerResult.dosage.potassium} kg/acre</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6 shadow-sm">
                    <h3 className="text-xl font-bold text-black mb-4">{t("fertilizer.applicationSchedule")}</h3>
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
                    <h3 className="text-xl font-bold text-black mb-4">{t("fertilizer.environmentInfo")}</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-700">{t("fertilizer.soilTypeLabel")}:</span>
                        <span className="font-semibold">{fertilizerResult.environment.soilType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">{t("fertilizer.temperatureLabel")}:</span>
                        <span className="font-semibold">{fertilizerResult.environment.temperature}°C</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">{t("fertilizer.humidityLabel")}:</span>
                        <span className="font-semibold">{fertilizerResult.environment.humidity}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">{t("fertilizer.moistureLabel")}:</span>
                        <span className="font-semibold">{fertilizerResult.environment.moisture}%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-green-300">
                      <span className="text-gray-700 font-medium">{t("fertilizer.estimatedCost")}:</span>
                      <span className="text-2xl font-bold text-green-600">{fertilizerResult.costEstimate}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-2xl p-12 text-center border-2 border-dashed border-gray-300">
                  <div className="text-6xl mb-4">🧪</div>
                  <h3 className="text-2xl font-bold text-gray-700 mb-2">{t("fertilizer.enterCropSoilData")}</h3>
                  <p className="text-gray-600">{t("fertilizer.enterCropSoilDataDesc")}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Feature 4: Water Requirement */}
        {activeTab === 4 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-2xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-black mb-6">{t("water.title")}</h2>
              <p className="text-gray-600 mb-6">
                {t("water.description")}
              </p>
              
              <button
                onClick={handleAutoFillWaterReq}
                disabled={autoFillLoading.waterReq}
                className="w-full mb-4 py-2 px-4 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {autoFillLoading.waterReq ? (
                  <>
                    <span className="animate-spin">⏳</span>
                    {t("water.autoFillLoading")}
                  </>
                ) : (
                  t("water.autoFillButton")
                )}
              </button>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("water.cropType")}
                  </label>
                  <select
                    value={waterReq.crop}
                    onChange={(e) => setWaterReq({ ...waterReq, crop: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
                  >
                    <option value="">{t("water.selectCrop")}</option>
                    {crops.map((crop) => (
                      <option key={crop.id} value={crop.name}>{crop.displayName}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("water.soilMoisture")}
                  </label>
                  <input
                    type="number"
                    value={waterReq.soilMoisture}
                    onChange={(e) => setWaterReq({ ...waterReq, soilMoisture: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
                    placeholder={t("water.soilMoisturePlaceholder")}
                    min="0"
                    max="100"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("water.temperature")}
                  </label>
                  <input
                    type="number"
                    value={waterReq.temperature}
                    onChange={(e) => setWaterReq({ ...waterReq, temperature: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
                    placeholder={t("water.temperaturePlaceholder")}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("water.farmArea")}
                  </label>
                  <input
                    type="number"
                    value={waterReq.area}
                    onChange={(e) => setWaterReq({ ...waterReq, area: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
                    placeholder={t("water.farmAreaPlaceholder")}
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
                  {t("water.predictButton")}
                </button>
              </div>
            </div>

            <div>
              {waterReqResult ? (
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
                    <div className="text-sm font-medium opacity-90 mb-2">{t("water.dailyRequirement")}</div>
                    <div className="text-4xl font-bold mb-1">{waterReqResult.dailyRequirement} {t("water.mmPerDay")}</div>
                    <div className="text-sm opacity-80">{t("water.totalDaily")}: {waterReqResult.totalDailyWater} {t("water.m3PerDay")}</div>
                  </div>

                  <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-sm">
                    <h3 className="text-xl font-bold text-black mb-4">{t("water.irrigationSchedule")}</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="text-sm text-gray-600 mb-1">{t("water.nextIrrigation")}</div>
                        <div className="text-lg font-semibold text-blue-600">{waterReqResult.nextIrrigation}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 mb-1">{t("water.weeklyRequirement")}</div>
                        <div className="text-lg font-semibold text-gray-800">{waterReqResult.weeklyRequirement} {t("water.mmPerWeek")}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 mb-1">{t("water.recommendedMethod")}</div>
                        <div className="text-lg font-semibold text-gray-800">{waterReqResult.irrigationMethod}</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 shadow-sm">
                    <h3 className="text-xl font-bold text-black mb-4">{t("water.soilMoistureStatus")}</h3>
                    <div className={`p-4 rounded-lg ${
                      waterReqResult.soilMoistureStatus === t("water.optimal") ? "bg-green-100" :
                      waterReqResult.soilMoistureStatus === t("water.lowIrrigationNeeded") ? "bg-orange-100" : "bg-yellow-100"
                    }`}>
                      <div className={`font-semibold ${
                        waterReqResult.soilMoistureStatus === t("water.optimal") ? "text-green-700" :
                        waterReqResult.soilMoistureStatus === t("water.lowIrrigationNeeded") ? "text-orange-700" : "text-yellow-700"
                      }`}>
                        {waterReqResult.soilMoistureStatus}
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6 shadow-sm">
                    <h3 className="text-xl font-bold text-black mb-4">{t("water.waterManagementTips")}</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-3">
                        <span className="text-yellow-600 mt-1">💧</span>
                        <span>{t("water.tip1")}</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-yellow-600 mt-1">🌡️</span>
                        <span>{t("water.tip2")}</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-yellow-600 mt-1">⏰</span>
                        <span>{t("water.tip3")}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-2xl p-12 text-center border-2 border-dashed border-gray-300">
                  <div className="text-6xl mb-4">💧</div>
                  <h3 className="text-2xl font-bold text-gray-700 mb-2">{t("water.enterCropConditions")}</h3>
                  <p className="text-gray-600">{t("water.enterCropConditionsDesc")}</p>
                </div>
              )}
            </div>
          </div>
        )}
          
          {/* Feature 5: Crop Disease Detection */}
          {activeTab === 5 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-gray-50 rounded-2xl p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-black mb-6">{t("cropDisease.title")}</h2>
                <p className="text-gray-600 mb-6">
                  {t("cropDisease.description")}
                </p>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("cropDisease.cropType")}
                    </label>
                    <select
                      value={cropDisease.crop}
                      onChange={(e) => setCropDisease({ ...cropDisease, crop: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
                    >
                      <option value="">{t("cropDisease.selectCrop")}</option>
                      {crops.map((crop) => (
                        <option key={crop.id} value={crop.name}>{crop.displayName}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("cropDisease.uploadImage")}
                    </label>
                    <div
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-yellow-500 transition-colors cursor-pointer"
                      onClick={() => document.getElementById('crop-image-upload')?.click()}
                    >
                      {cropDisease.imagePreview ? (
                        <div className="space-y-4">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={cropDisease.imagePreview}
                            alt="Crop preview"
                            className="max-w-full max-h-64 mx-auto rounded-lg object-contain"
                          />
                          <p className="text-sm text-gray-600">
                            {cropDisease.image?.name}
                          </p>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setCropDisease({ ...cropDisease, image: null, imagePreview: null });
                              setCropDiseaseResult(null);
                            }}
                            className="text-sm text-red-600 hover:text-red-700"
                          >
                            Remove Image
                          </button>
                        </div>
                      ) : (
                        <div>
                          <div className="text-5xl mb-4">📷</div>
                          <p className="text-gray-600 mb-2">{t("cropDisease.dragDrop")}</p>
                          <p className="text-sm text-gray-500">{t("cropDisease.supportedFormats")}</p>
                        </div>
                      )}
                      <input
                        id="crop-image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </div>
                  </div>
                  
                  <button
                    onClick={detectCropDisease}
                    disabled={!cropDisease.image || !cropDisease.crop || isAnalyzing}
                    className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                      cropDisease.image && cropDisease.crop && !isAnalyzing
                        ? "bg-yellow-400 text-black hover:bg-yellow-500"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    {isAnalyzing ? t("cropDisease.analyzing") : t("cropDisease.detectButton")}
                  </button>
                </div>
              </div>

              <div>
                {isAnalyzing ? (
                  <div className="bg-gray-50 rounded-2xl p-12 text-center border-2 border-dashed border-gray-300">
                    <div className="text-6xl mb-4 animate-pulse">🔬</div>
                    <h3 className="text-2xl font-bold text-gray-700 mb-2">{t("cropDisease.analyzing")}</h3>
                    <p className="text-gray-600">{t("cropDisease.analyzing")}</p>
                  </div>
                ) : cropDiseaseResult ? (
                  <div className="space-y-4">
                    {cropDiseaseResult.healthy ? (
                      <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-2xl p-6 text-white shadow-lg">
                        <div className="text-sm font-medium opacity-90 mb-2">{t("cropDisease.noDisease")}</div>
                        <div className="text-4xl font-bold mb-1">✓ {t("cropDisease.healthy")}</div>
                        <div className="text-sm opacity-80 mt-2">{t("cropDisease.noDiseaseDesc")}</div>
                        <div className="text-sm opacity-80 mt-4">
                          {t("cropDisease.confidence")}: {cropDiseaseResult.confidence}%
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className={`bg-gradient-to-br rounded-2xl p-6 text-white shadow-lg ${
                          cropDiseaseResult.severity === "severe" ? "from-red-400 to-red-600" :
                          cropDiseaseResult.severity === "moderate" ? "from-orange-400 to-orange-600" :
                          "from-yellow-400 to-yellow-600"
                        }`}>
                          <div className="text-sm font-medium opacity-90 mb-2">{t("cropDisease.detectedDisease")}</div>
                          <div className="text-4xl font-bold mb-1">{cropDiseaseResult.diseaseName}</div>
                          <div className="text-sm opacity-80 mt-2">
                            {t("cropDisease.confidence")}: {cropDiseaseResult.confidence}% | {t("cropDisease.severity")}: {t(`cropDisease.${cropDiseaseResult.severity}`)}
                          </div>
                        </div>

                        <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-sm">
                          <h3 className="text-xl font-bold text-black mb-4">{t("cropDisease.symptoms")}</h3>
                          <p className="text-gray-700">{cropDiseaseResult.symptoms}</p>
                        </div>

                        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6 shadow-sm">
                          <h3 className="text-xl font-bold text-black mb-4">{t("cropDisease.treatment")}</h3>
                          <p className="text-gray-700">{cropDiseaseResult.treatment}</p>
                        </div>

                        <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 shadow-sm">
                          <h3 className="text-xl font-bold text-black mb-4">{t("cropDisease.prevention")}</h3>
                          <p className="text-gray-700">{cropDiseaseResult.prevention}</p>
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-2xl p-12 text-center border-2 border-dashed border-gray-300">
                    <div className="text-6xl mb-4">🔬</div>
                    <h3 className="text-2xl font-bold text-gray-700 mb-2">{t("cropDisease.uploadImagePlaceholder")}</h3>
                    <p className="text-gray-600">{t("cropDisease.description")}</p>
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
