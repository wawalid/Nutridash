import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {



  return (
   

    <main className="p-8 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-700 shadow p-4 rounded-xl">
          Aquí macros
            </div>
          <div className="bg-gray-700 shadow p-4 rounded-xl">
            Aquí cal
              </div>
            </div>
            <div className="bg-gray-700 shadow p-4 rounded-xl">
            Historial de comidas
            </div>
      </main>
      
    
  );
}

export default Dashboard;
