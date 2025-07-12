import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { LineChart, PieChart, Pie, Line, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { fetchFoodData } from "../api/usda";




function Dashboard() {

  const [foods, setFoods] = useState([]);
  const [newFoodName, setNewFoodName] = useState(""); // input controlado


  // una lista temporal de posibles comidas
  const mockFoods = [
    {
      name: "Manzana",
      calories: 95,
      protein: 0.5,
      carbs: 25,
      fat: 0.3,
      date: "2025-07-09",
      healthStatus: "healthy",
    },
    {
      name: "Kebab",
      calories: 800,
      protein: 31.5,
      carbs: 7.9,
      fat: 23.7,
      date: "2025-07-09",
      healthStatus: "unhealthy",
    },
    {
      name: "Mango",
      calories: 99,
      protein: 1.4,
      carbs: 25,
      fat: 0.6,
      date: "2025-08-09",
      healthStatus: "healthy",
    },
    {
      name: "Banana",
      calories: 100,
      protein: 1.1,
      carbs: 27,
      fat: 0.3,
      date: "2025-09-09",
      healthStatus: "healthy",
    },
    {
      name: "Ensalada césar",
      calories: 800,
      protein: 7,
      carbs: 18,
      fat: 29,
      date: "2025-09-09",
      healthStatus: "moderate",
    }

  ];
  // sumatorio de los macros
  const totalProtein = foods.reduce((sum, f) => sum + f.protein, 0);
  const totalCarbs = foods.reduce((sum, f) => sum + f.carbs, 0);
  const totalFat = foods.reduce((sum, f) => sum + f.fat, 0);
  // objetos que salen en el grafico de pastel
  const pieData = [
    { name: "Proteínas", value: totalProtein },
    { name: "Carbohidratos", value: totalCarbs },
    { name: "Grasas", value: totalFat },
  ];
  // sumatorio de calorias diarias para ponerlo en un grafico
  const groupedCalories = {};

  foods.forEach(food => {
    if (!groupedCalories[food.date]) {
      groupedCalories[food.date] = 0;
    }
    groupedCalories[food.date] += food.calories;
  });

  const lineData = Object.entries(groupedCalories).map(([date, calories]) => ({
    date,
    calories,
  }));
  // establecer una fecha inicial para empezar con el historial de comidas
  const today = new Date().toISOString().split("T")[0];
  const todaysFoods = foods.filter(f => f.date === today);


  async function handleAddFood() {
    if (!newFoodName.trim()) return;

    const foodData = await fetchFoodData(newFoodName);
    console.log(foodData);
    if (foodData) {
      setFoods((prev) => [...prev, foodData]);
      setNewFoodName(""); // limpia el input
    } else {
      alert("No se encontró ese alimento en la base de datos.");
    }
  }

  async function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("http://localhost:3001/api/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.analysis) {
        // Puedes parsear la respuesta y añadir el alimento estimado
        console.log("Respuesta de Gemini:", data.analysis);

        const estimatedFood = {
          name: "Comida analizada",
          calories: extraerNumero(data.analysis, "calorías"),
          protein: extraerNumero(data.analysis, "proteínas"),
          carbs: extraerNumero(data.analysis, "carbohidratos"),
          fat: extraerNumero(data.analysis, "grasas"),
          date: today,
          healthStatus: "moderate", // esto podrías inferirlo también con lógica más avanzada
        };

        setFoods((prev) => [...prev, estimatedFood]);

      } else {
        alert("No se pudo analizar la imagen.");
      }

    } catch (err) {
      console.error("Error al enviar imagen:", err);
      alert("Hubo un error al analizar la imagen.");
    }
  }




  return (


    <main className="p-8 space-y-8">



      <h1 className="text-2xl font-bold">Dashboard Erika y Walid</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-700 shadow p-4 rounded-xl">
          Aquí macros
          <PieChart width={300} height={300}>
            <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label />
            <Tooltip />
          </PieChart>

        </div>
        <div className="bg-gray-700 shadow p-4 rounded-xl">
          Aquí cal
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


      {/* <div className="bg-gray-800 p-4 rounded-xl">
        <h2 className="mb-2 text-lg font-bold">Añadir alimento</h2>
        <div className="flex space-x-2">
          <input
            type="text"
            className="flex-1 p-2 rounded bg-gray-900 text-white border border-gray-600"
            placeholder="Ej: manzana"
            value={newFoodName}
            onChange={(e) => setNewFoodName(e.target.value)}
          />
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            onClick={handleAddFood}
          >
            Añadir
          </button>
        </div>
      </div> */}



      <div className="mt-4 space-y-2">
        <label className="block text-white font-bold">O analiza una foto de tu comida:</label>

        {/* Botón para tomar foto con la cámara */}
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

        {/* Botón para subir desde galería */}
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



      <div className="bg-gray-700 shadow p-4 rounded-xl">
        <h2>Historial de comidas (hoy)</h2>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th>Alimento</th>
              <th>Calorías</th>
              <th>Proteínas (g)</th>
              <th>Carbohidratos (g)</th>
              <th>Grasas (g)</th>
              <th>Salud (emoji)</th>
            </tr>
          </thead>
          <tbody>
            {todaysFoods.map((food, index) => (
              <tr key={index} className="border-t border-gray-600">
                <td className="py-2 text-center">{food.name}</td>
                <td className="py-2 text-center">{food.calories}</td>
                <td className="py-2 text-center">{food.protein}</td>
                <td className="py-2 text-center">{food.carbs}</td>
                <td className="py-2 text-center">{food.fat}</td>
                <td className="py-2 text-center">{food.healthStatus === "healthy" ? "💚" : food.healthStatus === "moderate" ? "🟡" : "🔴"}</td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>
    </main>


  );
}

export default Dashboard;