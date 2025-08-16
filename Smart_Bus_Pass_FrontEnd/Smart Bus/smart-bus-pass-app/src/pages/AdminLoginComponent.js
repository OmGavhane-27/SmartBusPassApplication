import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";

const AdminLoginComponent = ({ navigate }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useContext(AuthContext);

  const handleAdminLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/adminlogin",
        {
          password,
          email
        }
      );

      console.log(response.data)

      const { token } = response.data;

      // Log in using global context and assign role as 'admin'
      login({ username, token, role: "admin" });

      // Optional: Store the admin token in localStorage
      localStorage.setItem("adminToken", token);
    } catch (err) {
      setError("Invalid admin ID or password");
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <form
        onSubmit={handleAdminLogin}
        className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md'
      >
        <h2 className='text-2xl font-bold mb-6 text-center text-gray-800'>
          Admin Login
        </h2>

        {error && <p className='text-red-500 text-sm mb-4'>{error}</p>}

        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>
            Username
          </label>
          <input
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            placeholder='Enter username'
            required
          />
        </div>

        <div className='mb-6'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>
            Password
          </label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            placeholder='Enter password'
            required
          />
        </div>

        <div className='flex items-center justify-between'>
          <button
            type='submit'
            className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full'
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminLoginComponent;
