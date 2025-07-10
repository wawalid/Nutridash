import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {



  return (
    <nav className="bg-zinc-800 my-3 flex justify-between py-5 px-10 rounded-lg">
      <Link to={"/"}>
        <h1 className="text-2xl font-bold">Nutridash</h1>
      </Link>
      </nav>
      <div>
      <ul className="flex gap-x-5 text-white">
      <div className="container-columnas">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <p>columna donde ira los macros</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <p>columna donde ira las calorias</p>
          </div>
      </div>
      <div className="container-historial bg-white shadow p-4 rounded-xl">

      </div>
      
    </ul>
      </div>
      
    
  );
}

export default Dashboard;
