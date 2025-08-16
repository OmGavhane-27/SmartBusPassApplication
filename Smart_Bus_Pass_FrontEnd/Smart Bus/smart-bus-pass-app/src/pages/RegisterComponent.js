import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const RegisterComponent = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    gender: "",
    dob: "",
    address: "",
    aadharNumber: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      let data = {};
      try {
        data = await res.json();
      } catch (jsonError) {
        console.log(jsonError);
      }

      if (res.ok) {
        toast.success("Registration successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        toast.error(data.message || "Registration failed. Try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="pt-14 pb-6" style={{ backgroundColor: "#fdf4e3", minHeight: "100vh" }}>
      <ToastContainer />
      <div className="max-w-md mx-auto mt-10 bg-[#1b2a41] p-10 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-white">
          Register
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full px-4 py-2 border rounded bg-gray-200"
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            className="w-full px-4 py-2 border rounded bg-gray-200"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <div className="relative">
            <input
              className="w-full px-4 py-2 border rounded bg-gray-200 pr-10"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-sm text-blue-700"
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          <div className="relative">
            <input
              className="w-full px-4 py-2 border rounded bg-gray-200 pr-10"
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-sm text-blue-700"
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </span>
          </div>

          <input
            className="w-full px-4 py-2 border rounded bg-gray-200"
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
          />

          <select
            className="w-full px-4 py-2 border rounded bg-gray-200"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <input
            className="w-full px-4 py-2 border rounded bg-gray-200"
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
          />

          <textarea
            className="w-full px-4 py-2 border rounded bg-gray-200"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
          />

          <input
            className="w-full px-4 py-2 border rounded bg-gray-200"
            type="text"
            name="aadharNumber"
            placeholder="Aadhar Number"
            value={formData.aadharNumber}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Register
          </button>

          <div className="text-center mt-4">
            <span className="text-sm text-white">Already registered?</span>
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-blue-400 hover:underline ml-1 text-sm"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterComponent;
