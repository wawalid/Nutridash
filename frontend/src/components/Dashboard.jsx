import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {



 return (
  <>
    <div className="container-columnas grid grid-cols-1 md:grid-cols-2 gap-8 mb-4">
      <div className="bg-gray-700 p-4 rounded-xl shadow">
        <p>Columna donde irán los macros</p>
      </div>
      <div className="bg-gray-700 p-4 rounded-xl shadow">
        <p>Columna donde irán las calorías</p>
      </div>
    </div>

    <div className="container-historial bg-gray-700 shadow p-4 rounded-xl">
      <p>Historial de consumo / actividad</p>
    </div>
  </>
);

}

export default Dashboard;
