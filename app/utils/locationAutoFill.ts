// Location-based auto-fill utility
// This function gets user's location and returns climate data for auto-filling forms

export interface LocationData {
  temperature: number;
  humidity: number;
  rainfall: number;
  pH: number;
  soilMoisture: number;
  location: string;
}

// Mock climate data based on location (in production, this would call a weather API)
const getClimateDataByLocation = async (lat: number, lon: number): Promise<LocationData> => {
  // In production, you would call a weather API like OpenWeatherMap here
  // For now, we'll use mock data based on coordinates
  
  // Simple mock: vary data based on latitude (tropical vs temperate)
  const isTropical = Math.abs(lat) < 23.5;
  
  // Mock temperature based on latitude (tropical: 25-30°C, temperate: 15-25°C)
  const baseTemp = isTropical ? 27 : 20;
  const temperature = baseTemp + (Math.random() * 5 - 2.5);
  
  // Mock humidity (tropical: higher, temperate: moderate)
  const humidity = isTropical ? 70 + (Math.random() * 15) : 55 + (Math.random() * 20);
  
  // Mock rainfall (tropical: higher, temperate: moderate)
  const rainfall = isTropical ? 1200 + (Math.random() * 800) : 600 + (Math.random() * 400);
  
  // Mock pH (slightly acidic to neutral, typical for agricultural soil)
  const pH = 6.2 + (Math.random() * 1.3);
  
  // Mock soil moisture (40-60% is typical)
  const soilMoisture = 45 + (Math.random() * 15);
  
  // Get location name (in production, use reverse geocoding API)
  const location = `Location (${lat.toFixed(2)}, ${lon.toFixed(2)})`;
  
  return {
    temperature: Math.round(temperature * 10) / 10,
    humidity: Math.round(humidity),
    rainfall: Math.round(rainfall),
    pH: Math.round(pH * 10) / 10,
    soilMoisture: Math.round(soilMoisture),
    location,
  };
};

// Reverse geocoding to get location name (mock implementation)
const getLocationName = async (lat: number, lon: number): Promise<string> => {
  // In production, use a reverse geocoding API like OpenStreetMap Nominatim
  // For now, return coordinates
  return `${lat.toFixed(4)}, ${lon.toFixed(4)}`;
};

export const getLocationBasedData = async (): Promise<LocationData | null> => {
  return new Promise((resolve, reject) => {
    // Check if we're in a browser environment
    if (typeof window === 'undefined' || !navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const climateData = await getClimateDataByLocation(latitude, longitude);
          const locationName = await getLocationName(latitude, longitude);
          
          resolve({
            ...climateData,
            location: locationName,
          });
        } catch (error) {
          reject(error);
        }
      },
      (error) => {
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  });
};

