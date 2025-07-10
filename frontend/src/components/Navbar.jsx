import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";


function Navbar() {
  // const { isAuthenticated, logout, user, loading } = useAuth();






  return (
    <nav className="bg-zinc-800 my-3 flex justify-between py-5 px-10 rounded-lg dark:bg-white dark:text-black">
      <Link to={"/"}>
        <h1 className="text-2xl font-bold">Nutridash</h1>
      </Link>
      <ul className="flex gap-x-5 text-white">
        <button
          onClick={() => setIsLightMode(!isLightMode)}
          className="text-sm bg-zinc-700 text-white px-4 py-2 rounded"
        >
          {isLightMode ? 'Modo oscuro' : 'Modo claro'}
        </button>
        {/* {isAuthenticated ? (
          <>

            {user && !user.is_verified && (
              <li>
                <span className="text-red-500">User not verified</span>
              </li>
            )}
            {user && !user.completado && (
              <li>
                <span className="text-red-500">Complete your profile</span>
              </li>
            )}
            {user.is_admin && (
              <li>
                <Link to={"/admin_page"}>Admin panel</Link>
              </li>
            )}
            {user && !user.is_admin && (
              <>
                <li>
                  <Link to={"/create-affiliate-link"}>Create affiliate</Link>
                </li>
                <li>
                  <Link to={"/my-affiliates"}>Affiliations</Link>
                </li>
              </>
            )}
            <li>
              <Link to={"/profile"}>Profile</Link>
            </li>
            <li>
              <Link
                to="/"
                onClick={() => {
                  logout();
                }}
              >
                Log out
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to={"/login"}>Login</Link>
            </li>
            <li>
              <Link to={"/register"}>Register</Link>
            </li>
          </>
        )} */}
      </ul>
    </nav>
  );
}

export default Navbar;
