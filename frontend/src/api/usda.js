const API_KEY = "AchMOrpXTuvCgwd1vLki7Zoy2kmaaPsPWpBhyZIF";

export async function fetchFoodData(query) {
  const url = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${encodeURIComponent(query)}&api_key=${API_KEY}`;

  const res = await fetch(url);
  const data = await res.json();

  if (!data.foods || data.foods.length === 0) return null;

  const first = data.foods[0]; // el más relevante

  return {
    name: first.description,
    calories: first.foodNutrients.find(n => n.nutrientName === "Energy")?.value || 0,
    protein: first.foodNutrients.find(n => n.nutrientName === "Protein")?.value || 0,
    carbs: first.foodNutrients.find(n => n.nutrientName === "Carbohydrate, by difference")?.value || 0,
    fat: first.foodNutrients.find(n => n.nutrientName === "Total lipid (fat)")?.value || 0,
    date: new Date().toISOString().split("T")[0],
    healthStatus: "healthy", // temporal, puedes mejorarlo según calorías o grasa
  };
}
