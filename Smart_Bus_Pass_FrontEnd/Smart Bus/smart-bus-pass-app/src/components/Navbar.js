import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { navItemsByRole } from "../config/navElements";
import { getDashboardRoute } from "../config/getDashboardRoute";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("guest");

  useEffect(() => {
    const updateUser = () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser && storedUser.role) {
        setUser(storedUser);
        setRole(storedUser.role.toLowerCase());
      } else {
        setUser(null);
        setRole("guest");
      }
    };
    window.addEventListener("userChanged", updateUser);
    updateUser();
    return () => {
      window.removeEventListener("userChanged", updateUser);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setRole("guest");
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1b2a41] dark:bg-[#0d0d0d] text-white p-4 flex items-center shadow">
      <img
        src="/images/logo-1.jpeg"
        alt="Logo"
        className="h-10 w-10 rounded cursor-pointer"
        onClick={() => navigate("/")}
      />
      <h1
        className="ml-3 text-xl font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        SmartBusPass
      </h1>
      <div className="ml-auto flex items-center space-x-4">
        {navItemsByRole[role]?.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className="hover:text-[#ffcc00] transition"
          >
            {item.label}
          </button>
        ))}
        {user && (
          <button
            onClick={logout}
            className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
