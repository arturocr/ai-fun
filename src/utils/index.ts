// Generate clothing recommendations based on weather conditions
export function getClothingRecommendations(
  maxTemp: number,
  minTemp: number,
  precipitation: number,
  windSpeed: number,
  weatherCode: number,
): string[] {
  const recommendations: string[] = [];

  // Temperature recommendations (in Celsius)
  const avgTemp = (maxTemp + minTemp) / 2;

  // Top clothing based on temperature
  if (avgTemp < 0) {
    recommendations.push('Heavy winter coat');
    recommendations.push('Thermal layer');
    recommendations.push('Sweater');
  } else if (avgTemp < 10) {
    recommendations.push('Winter coat');
    recommendations.push('Sweater or hoodie');
  } else if (avgTemp < 15) {
    recommendations.push('Light jacket or coat');
    recommendations.push('Long sleeve shirt');
  } else if (avgTemp < 20) {
    recommendations.push('Light jacket or cardigan');
    recommendations.push('Long sleeve shirt or t-shirt');
  } else if (avgTemp < 25) {
    recommendations.push('T-shirt');
    recommendations.push('Light cardigan (for evening)');
  } else {
    recommendations.push('T-shirt or tank top');
    recommendations.push('Light, breathable fabrics');
  }

  // Bottom clothing based on temperature
  if (avgTemp < 5) {
    recommendations.push('Insulated pants');
  } else if (avgTemp < 15) {
    recommendations.push('Pants or jeans');
  } else if (avgTemp < 25) {
    recommendations.push('Pants, jeans, or skirt');
  } else {
    recommendations.push('Shorts, skirt, or light pants');
  }

  // Footwear based on temperature and precipitation
  if (avgTemp < 5) {
    recommendations.push('Insulated winter boots');
  } else if (
    precipitation > 5 ||
    [61, 63, 65, 80, 81, 82].includes(weatherCode)
  ) {
    recommendations.push('Waterproof shoes or boots');
  } else if (avgTemp > 20) {
    recommendations.push('Light shoes or sandals');
  } else {
    recommendations.push('Comfortable walking shoes');
  }

  // Accessories based on conditions
  if (avgTemp < 5) {
    recommendations.push('Hat, gloves, and scarf');
  } else if (avgTemp < 10) {
    recommendations.push('Light hat and gloves');
  }

  // Rain gear
  if (
    precipitation > 0 ||
    [51, 53, 55, 61, 63, 65, 80, 81, 82].includes(weatherCode)
  ) {
    if (precipitation > 5 || [55, 65, 82].includes(weatherCode)) {
      recommendations.push('Waterproof rain jacket');
      recommendations.push('Umbrella');
    } else {
      recommendations.push('Water-resistant jacket or umbrella');
    }
  }

  // Sun protection
  if ([0, 1].includes(weatherCode) && avgTemp > 15) {
    recommendations.push('Sunglasses');
    recommendations.push('Sunscreen');
    if (avgTemp > 25) {
      recommendations.push('Hat or cap for sun protection');
    }
  }

  // Wind protection
  if (windSpeed > 30) {
    recommendations.push('Windproof jacket');
  } else if (windSpeed > 20) {
    recommendations.push('Wind-resistant layer');
  }

  return recommendations;
}
