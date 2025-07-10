import React from "react";
import { Link } from "react-router-dom";
import { LineChart, PieChart, Pie, Line, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// COSAS PARA PONER EN EL FUTURO
// poner la fecha de hoy de verdad, automaticamente


function Dashboard() {
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
  const totalProtein = mockFoods.reduce((sum, f) => sum + f.protein, 0);
  const totalCarbs = mockFoods.reduce((sum, f) => sum + f.carbs, 0);
  const totalFat = mockFoods.reduce((sum, f) => sum + f.fat, 0);
  // objetos que salen en el grafico de pastel
  const pieData = [
    { name: "Proteínas", value: totalProtein },
    { name: "Carbohidratos", value: totalCarbs },
    { name: "Grasas", value: totalFat },
  ];
  // sumatorio de calorias diarias para ponerlo en un grafico
  const groupedCalories = {};

  mockFoods.forEach(food => {
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
  const today = "2025-07-09";
  const todaysFoods = mockFoods.filter(f => f.date === today);

  return (


    <main className="p-8 space-y-8">
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
        <td className="py-2">{food.name}</td>
        <td className="py-2">{food.calories}</td>
        <td className="py-2">{food.protein}</td>
        <td className="py-2">{food.carbs}</td>
        <td className="py-2">{food.fat}</td>
        <td className="py-2">{food.healthStatus === "healthy" ? "💚" : food.healthStatus === "moderate" ? "🟡" : "🔴"}</td>
      </tr>
    ))}
    
  </tbody>
        </table>
      </div>
    </main>


  );
}

export default Dashboard;