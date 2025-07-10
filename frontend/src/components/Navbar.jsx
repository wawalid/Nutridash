import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";



function Navbar({ isLightMode, setIsLightMode }) {
  return (
    <nav className="bg-zinc-800 my-3 flex justify-between py-5 px-10 rounded-lg dark:bg-white dark:text-black">
      <h1 className="text-2xl font-bold">Nutridash</h1>
      <ul className="flex gap-x-5">
        <button
          onClick={() => setIsLightMode(!isLightMode)}
          className="text-sm bg-zinc-700 text-white px-4 py-2 rounded dark:bg-gray-300 dark:text-black"
        >
          {isLightMode ? "Modo oscuro" : "Modo claro"}
        </button>
      </ul>
    </nav>
  );
}


export default Navbar;
