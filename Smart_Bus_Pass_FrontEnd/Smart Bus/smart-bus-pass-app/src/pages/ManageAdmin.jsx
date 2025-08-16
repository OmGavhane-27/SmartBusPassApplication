import React, { useState } from "react";
import axios from "axios";

const ManageAdmin = () => {
  const [newAdmin, setNewAdmin] = useState({
    username: "",
    email: "",
    adminType: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAdmin((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateAdmin = async (e) => {
    e.preventDefault();

    if (newAdmin.password !== newAdmin.confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    const token = localStorage.getItem("adminToken");
    if (!token) {
      setMessage("Admin token not found. Please login again.");
      return;
    }

    try {
      const { confirmPassword, ...adminPayload } = newAdmin;

      await axios.post("http://localhost:8080/api/admin", adminPayload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setMessage("Admin created successfully!");
      setNewAdmin({
        username: "",
        email: "",
        adminType: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      console.error("Failed to create admin:", err);
      setMessage("Failed to create admin. Try again.");
    }

    setTimeout(() => setMessage(""), 4000);
  };

  return (
    <main>
      <section>
        <div className='bg-white p-6 rounded-lg shadow-md dark:bg-gray-800 dark:text-gray-100 dark:shadow-none dark:border dark:border-gray-700'>
          <h2 className='text-2xl font-semibold mb-4'>Create New Admin</h2>

          {message && (
            <p className='mb-4 text-sm text-center text-blue-500'>{message}</p>
          )}

          <form onSubmit={handleCreateAdmin} className='space-y-4'>
            {["username", "email", "adminType"].map((field) => (
              <div key={field}>
                <label className='block text-sm mb-1 capitalize'>
                  {field}
                </label>
                <input
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  value={newAdmin[field]}
                  onChange={handleInputChange}
                  required
                  className='w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white'
                />
              </div>
            ))}

            <div>
              <label className='block text-sm mb-1'>Password</label>
              <input
                type='password'
                name='password'
                value={newAdmin.password}
                onChange={handleInputChange}
                required
                className='w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white'
              />
            </div>

            <div>
              <label className='block text-sm mb-1'>Confirm Password</label>
              <input
                type='password'
                name='confirmPassword'
                value={newAdmin.confirmPassword}
                onChange={handleInputChange}
                required
                className='w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white'
              />
            </div>

            <button
              type='submit'
              className='w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition'
            >
              Create Admin
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default ManageAdmin;
