import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function MainLayout() {
  return (
    <>
      <Navbar />
      <main className="px-4">
        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;
