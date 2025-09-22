import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  PieChart, Pie, Tooltip,
  LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer
} from "recharts";

function Dashboard() {
  const { analyzeMeal } = useAuth();
  const [foods, setFoods] = useState([]);

  const totalProtein = foods.reduce((sum, f) => sum + f.protein, 0);
  const totalCarbs = foods.reduce((sum, f) => sum + f.carbs, 0);
  const totalFat = foods.reduce((sum, f) => sum + f.fat, 0);

  const pieData = [
    { name: "Proteínas", value: totalProtein },
    { name: "Carbohidratos", value: totalCarbs },
    { name: "Grasas", value: totalFat },
  ];

  const groupedCalories = {};
  foods.forEach(food => {
    if (!groupedCalories[food.date]) groupedCalories[food.date] = 0;
    groupedCalories[food.date] += food.calories;
  });

  const lineData = Object.entries(groupedCalories).map(([date, calories]) => ({
    date,
    calories,
  }));

  const today = new Date().toISOString().split("T")[0];

  async function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    // Convertimos a Base64
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Data = reader.result.split(",")[1]; // Quitamos "data:image/xxx;base64,"

      try {
        const resultado_gemini = await analyzeMeal({
          imageBase64: base64Data,
          mimeType: file.type
        });
        console.log("Respuesta de Gemini:", resultado_gemini);

        if (resultado_gemini?.name) {
          setFoods(prev => [...prev, { ...resultado_gemini, date: today }]);
        }

      } catch (error) {
        console.error("Error al analizar la imagen:", error);
      }
    };
  }

  return (
    <main className="p-8 space-y-8">
      <h1 className="text-2xl font-bold">Dashboard Erika y Walid</h1>
      <p className="text-gray-400">Bienvenido al panel de control. Aquí puedes analizar tus comidas y ver tus estadísticas nutricionales.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-700 shadow p-4 rounded-xl">
          <h2>Distribución de Macronutrientes</h2>
          <PieChart width={300} height={300}>
            <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label />
            <Tooltip />
          </PieChart>
        </div>

        <div className="bg-gray-700 shadow p-4 rounded-xl">
          <h2>Calorías por Día</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="calories" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-4 space-y-4">
        <label className="block text-white font-bold">Analiza tu comida desde la cámara:</label>
        <input
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleImageUpload}
          className="block w-full text-sm text-gray-400
              file:mr-4 file:py-2 file:px-4
              file:rounded file:border-0
              file:text-sm file:font-semibold
              file:bg-green-600 file:text-white
              hover:file:bg-green-700"
        />

        <label className="block text-white font-bold">O súbela desde tu galería:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="block w-full text-sm text-gray-400
              file:mr-4 file:py-2 file:px-4
              file:rounded file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-600 file:text-white
              hover:file:bg-blue-700"
        />
      </div>
    </main>
  );
}

export default Dashboard;
