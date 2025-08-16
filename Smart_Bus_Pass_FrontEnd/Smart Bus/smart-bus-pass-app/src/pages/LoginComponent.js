import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { getDashboardRoute } from "../config/getDashboardRoute";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginComponent = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [loginAs, setLoginAs] = useState("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    const endpoint =
      loginAs === "admin"
        ? "http://localhost:8080/api/auth/adminlogin"
        : "http://localhost:8080/api/auth/login";

    try {
      const res = await axios.post(
        endpoint,
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const { token, username, role, userId, fname } = res.data;

      localStorage.setItem("token", token);
      const userData = { username, role: role.toLowerCase(), userId, fname };
      localStorage.setItem("user", JSON.stringify(userData));
      window.dispatchEvent(new Event("userChanged"));

      login(userData);
      toast.success("Login successful!", { autoClose: 1500 });
      navigate(getDashboardRoute(userData?.role));
    } catch (err) {
      toast.error("Invalid credentials. Please try again.", {
        autoClose: 2000,
      });
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen p-4 pt-20"
      style={{ backgroundColor: "#fdf4e3" }} 
    >
      <div className="w-full max-w-md bg-[#1b2a41] rounded-2xl shadow-2xl p-8 text-white animate-fade-in transition-all duration-500">
        <h2 className="text-3xl font-extrabold text-center mb-6 text-white">
          {loginAs === "admin" ? "Admin Login" : "User Login"}
        </h2>

       
        <div className="mb-6 text-sm font-medium">
          <label className="block mb-2 text-gray-300">Login As:</label>
          <div className="flex gap-6">
            <label className="flex items-center">
              <input
                type="radio"
                name="loginAs"
                value="user"
                checked={loginAs === "user"}
                onChange={() => setLoginAs("user")}
                className="mr-2 accent-white"
              />
              User
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="loginAs"
                value="admin"
                checked={loginAs === "admin"}
                onChange={() => setLoginAs("admin")}
                className="mr-2 accent-white"
              />
              Admin
            </label>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          
          <div>
            <label className="block text-sm mb-1 text-gray-200">Email</label>
            <input
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-500 rounded-lg bg-[#f4f4f4] text-black focus:ring-2 focus:ring-white outline-none"
              placeholder="Enter your email"
            />
          </div>

          
          <div className="relative">
            <label className="block text-sm mb-1 text-gray-200">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-500 rounded-lg bg-[#f4f4f4] text-black pr-10 focus:ring-2 focus:ring-white outline-none"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-10 text-gray-400"
              aria-label="Toggle password visibility"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

         
          <button
            type="submit"
            className="w-full bg-white hover:bg-gray-200 text-[#1b2a41] py-2.5 rounded-lg font-semibold transition duration-200"
          >
            Log In
          </button>
        </form>

        
        {loginAs === "user" && (
          <p className="text-center text-sm mt-6 text-gray-300">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-white underline hover:text-gray-200 font-medium"
            >
              Register
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginComponent;
