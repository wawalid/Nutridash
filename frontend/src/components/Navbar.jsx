import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-zinc-800 text-white my-3 flex justify-between py-5 px-10 rounded-lg">
      <h1 className="text-2xl font-bold">Nutridash</h1>
      <ul className="flex gap-x-5">
        {/* Aquí podrías poner enlaces o botones si los necesitas */}
      </ul>
    </nav>
  );
}

export default Navbar;
