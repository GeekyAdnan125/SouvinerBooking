 
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/useAppContext";
import { toast } from "react-toastify";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const { user, setUser } = useAppContext();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-gradient-to-r from-indigo-600 via-blue-500 to-cyan-400 shadow-md px-4 md:px-6 py-4 flex justify-between items-center">
      <Link
        to="/"
        className="text-2xl font-extrabold text-white tracking-wider hover:text-yellow-200 transition"
      >
        SouvinerBooking
      </Link>

      {/* Mobile menu icon */}
      <button onClick={toggleMenu} className="md:hidden text-white">
        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Menu items */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } absolute top-full left-0 w-full  p-4 flex flex-col gap-3 md:static md:flex md:flex-row md:gap-5 md:p-0 md:w-auto md:items-center text-white font-medium transition-all duration-300`}
      >
         


        {user && user.role === "Vendor" && (
          <Link to="/vendorApp" className="hover:text-purple-200 transition">
            Vendor Dashboard
          </Link>
        )}

        {user ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl shadow-sm transition"
          >
            Logout
          </button>
        ) : (
          <>
            <Link
              to="/login"
              className="bg-white text-blue-600 hover:bg-blue-100 px-4 py-1.5 rounded-md shadow transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-white text-green-600 hover:bg-green-100 px-4 py-1.5 rounded-md shadow transition"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
