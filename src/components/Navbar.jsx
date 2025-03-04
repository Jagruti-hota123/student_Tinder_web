import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      // Add token for the logout request if present
      const token = localStorage.getItem("token");
      if (token) {
        await axios.post(
          BASE_URL + "/logout",
          {},
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
      }

      // Remove token from localStorage and dispatch the removeUser action
      localStorage.removeItem("token");
      dispatch(removeUser()); // Clear user state in Redux
      setTimeout(() => {
        navigate("/login"); // Navigate to the login page after clearing user state
      }, 500); // Small delay to ensure state updates properly
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="navbar bg-base-300 shadow-md">
      {/* Logo Section */}
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          📚 StudentTinder
        </Link>
      </div>

      {/* Profile Section */}
      {user && (
        <div className="flex gap-2">
          <div className="hidden md:block text-sm font-semibold lg:flex lg:flex-row lg:gap-2 lg:items-center lg:justify-center">
            Welcome, {user?.firstName}
            <div className="flex-none gap-2">
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full">
                      <img
                        alt="Profile"
                        src={user?.photoUrl || "/placeholder-profile.png"}
                        className="rounded-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Dropdown Menu */}
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow-lg"
                >
                  <li>
                    <Link to="/profile" className="justify-between">
                      Profile
                      <span className="badge">New</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/connections">Connections</Link>
                  </li>
                  <li>
                    <Link to="/requests"> Requests</Link>
                  </li>
                  <li>
                    <button onClick={handleLogout} className="text-left">
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
