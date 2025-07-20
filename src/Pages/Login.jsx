import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppContext } from "../context/useAppContext";

function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
    role: "User",
  });
  const [loading, setLoading] = useState(false);
  const { setUser } = useAppContext();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setLoginInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const validateForm = () => {
    if (!loginInfo.email || !loginInfo.password) {
      toast.error("Please enter both email and password.");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginInfo.email)) {
      toast.error("Please enter a valid email address.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      const response = await axios.post(
        "https://voyagerserver.onrender.com/api/users/login",
        loginInfo,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const { token, user } = response.data;
      if (!token || !user) throw new Error("Invalid login response.");

      localStorage.setItem("authToken", token);
      localStorage.setItem("userRole", user.role);
      localStorage.setItem("userEmail", user.email);
      localStorage.setItem("userName", user.name);

      setUser({ token, role: user.role, email: user.email, name: user.name });
      toast.success("Login Successful!");

      if (user.role === "Vendor") {
        navigate("/vendorApp");
      } else {
        navigate("/");
      }
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        (error.response?.status === 401
          ? "Invalid email or password."
          : "Login failed. Try again.");
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg px-8 py-10 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            name="role"
            value={loginInfo.role}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-md"
            disabled={loading}
          >
            <option value="User">User</option>
            <option value="Vendor">Vendor</option>
          </select>

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={loginInfo.email}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-md"
            disabled={loading}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginInfo.password}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-md"
            disabled={loading}
          />

          <button
            type="submit"
            className={`w-full py-2 rounded-md text-white ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 transition"
            }`}
            disabled={loading}
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>

      {/* <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        closeOnClick
        draggable
        pauseOnFocusLoss
        theme="light"
      /> */}
    </div>
  );
}

export default Login;
