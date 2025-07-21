import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./Pages/protectedRoute";
import SouBooking_App from "./Pages/SouBooking_App";
import { useAppContext } from "./context/useAppContext";
import VendorApp from "./vendorsec/lib/VendorApp";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Navbar from "./Pages/Navbar";

const App = () => {
  const { user } = useAppContext();
  const location = useLocation();

  const isVendor = user && user.role === "Vendor";
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      
      {/* ✅ Render Navbar only if logged in AND not on /login or /signup */}
      { !isAuthPage && <Navbar />}

      <Routes>
        {isVendor ? (
          <>
            <Route path="/" element={<Navigate to="/vendorApp" />} />
            <Route
              path="/vendorApp"
              element={<ProtectedRoute element={VendorApp} allowedRoles={["Vendor"]} />}
            />
          </>
        ) : (
          <>
            <Route path="/" element={<SouBooking_App />} />
          </>
        )}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
};

export default App;
