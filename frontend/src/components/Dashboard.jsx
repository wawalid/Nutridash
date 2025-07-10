import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {



  return (
    <><nav className="bg-zinc-800 my-3 flex justify-between py-5 px-10 rounded-lg">
      <Link to={"/"}>
        <h1 className="text-2xl font-bold">Nutridash</h1>
      </Link>
    </nav>

    <main className="p-8 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white shadow p-4 rounded-xl">
          Aquí macros
            </div>
          <div className="bg-white shadow p-4 rounded-xl">
            Aquí cal
              </div>
            </div>
            <div className="bg-white shadow p-4 rounded-xl">
            Historial de comidas
            </div>
      </main></>
      
    
  );
}

export default Dashboard;
