import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

function Signup() {
  const navigate = useNavigate();
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "User", // default role
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setSignupInfo({ ...signupInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, phone, password } = signupInfo;
    if (!name || !email || !phone || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      await axios.post("https://voyagerserver.onrender.com/api/users/register", signupInfo, {
        headers: { "Content-Type": "application/json" },
      });
       
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg px-8 py-10 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Create an Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-md"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-md"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-md"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-md"
          />
          <select
            name="role"
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-md"
          >
            <option value="User">User</option>
            <option value="Vendor">Vendor</option>
            <option value="Owner">Owner</option>
          </select>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            {loading ? "Signing up..." : "Signup"}
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
       {/* <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss
        theme="light"
      /> */}
    </div>
  );
}

export default Signup;
