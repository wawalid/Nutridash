import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function MainLayout({ isLightMode, setIsLightMode }) {
  return (
    <>
      <Navbar isLightMode={isLightMode} setIsLightMode={setIsLightMode} />
      <main className="px-4">
        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;
