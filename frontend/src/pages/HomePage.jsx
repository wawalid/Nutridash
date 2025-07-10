import { Link } from "react-router-dom";
import Dashboard from "../components/Dashboard";

function LandingPage() {


  return (
    <div className="min-h-screen bg-[#202020] text-white">
      <div className="h-screen">
        <Dashboard />
      </div>
  
    </div>
  );
}

export default LandingPage;
