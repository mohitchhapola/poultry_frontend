import { useDispatch, useSelector } from "react-redux";
import { SET_LOGIN, SET_NAME, selectName } from "../../redux/features/auth/authSlice";
import { logoutUser } from "../../services/authServices";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const name = useSelector(selectName);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const logOut = async () => {
    await logoutUser();
    dispatch(SET_NAME(""));
    await dispatch(SET_LOGIN(false));
    navigate("/");
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="bg-gray-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 lg:px-16 py-4 flex justify-between items-center">
        {/* Desktop Section */}
        <h3 className="text-lg font-semibold">
          Welcome,{" "}
          <span className="font-bold">{name || "Guest"}</span>
        </h3>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex space-x-6">
          <Link
            to="/dashboard"
            className="text-gray-200 hover:text-gray-400 transition duration-300"
          >
            Dashboard
          </Link>
          <Link
            to="/product"
            className="text-gray-200 hover:text-gray-400 transition duration-300"
          >
            Add Product
          </Link>
        </div>

        {/* Desktop Logout Button */}
        <button
          onClick={logOut}
          className="text-gray-200 hover:text-gray-400 transition-all duration-300 py-2 px-4 rounded-lg"
        >
          Logout
        </button>

        {/* Mobile Sidebar Toggle */}
        <button
          onClick={toggleSidebar}
          className="lg:hidden text-gray-200 hover:text-gray-400 transition-all duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M4 5h12a1 1 0 110 2H4a1 1 0 110-2zm0 4h12a1 1 0 110 2H4a1 1 0 110-2zm0 4h12a1 1 0 110 2H4a1 1 0 110-2z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {/* Sidebar (Mobile) */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-75 flex justify-end lg:hidden">
          <div className="bg-white w-64 p-4 text-gray-800">
            <div className="flex justify-end">
              <button
                onClick={toggleSidebar}
                className="text-gray-600 hover:text-gray-800 transition-all duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.293 4.293a1 1 0 011.414 0L10 6.586l2.293-2.293a1 1 0 111.414 1.414L11.414 8l2.293 2.293a1 1 0 01-1.414 1.414L10 9.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 8 6.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-6">
              <Link
                to="/dashboard"
                onClick={toggleSidebar}
                className="block py-2 text-gray-800 hover:text-gray-600"
              >
                Dashboard
              </Link>
              <Link
                to="/product"
                onClick={toggleSidebar}
                className="block py-2 text-gray-800 hover:text-gray-600"
              >
                Add Product
              </Link>
              <button
                onClick={() => {
                  toggleSidebar();
                  logOut();
                }}
                className="block py-2 text-gray-800 hover:text-gray-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Header Bottom Line */}
      <hr />
    </div>
  );
}

export default Header;
