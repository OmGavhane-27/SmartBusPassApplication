import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext";
import { ThemeContext } from "./contexts/ThemeContext";
import { WalletContext } from "./contexts/WalletContext";
import { simulatedWallets } from "./data/simulatedData";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ThemeToggleButton from "./components/ThemeToggleButton";

import HomeComponent from "./pages/HomeComponent";
import LoginComponent from "./pages/LoginComponent";
import AdminLoginComponent from "./pages/AdminLoginComponent";
import RegisterComponent from "./pages/RegisterComponent";
import UserDashboardComponent from "./pages/UserDashboardComponent";
import AdminDashboardComponent from "./pages/AdminDashboardComponent";
import CreatePassComponent from "./pages/CreatePassComponent";
import SupportComponent from "./components/SupportComponent";
import ScanPassComponent from "./components/ScanPassComponent";
import AboutUs from "./pages/AboutUs";
import Unauthorized from "./pages/Unauthorized";
import ManagePasses from "./pages/ManagePasses";
import ManageRoutes from "./pages/ManageRoutes";
import ManageUsers from "./pages/ManageUsers";
import ManageAdmin from "./pages/ManageAdmin";

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [walletBalance, setWalletBalance] = useState(0);
  const [theme, setTheme] = useState("light");
  const user = localStorage.getItem("user");

  console.log(user);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.add(savedTheme);
    } else if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.add("light");
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const login = (user) => {
    setCurrentUser(user);
    setWalletBalance(simulatedWallets[user.id] || 0);
  };

  const logout = () => {
    setCurrentUser(null);
    setWalletBalance(0);
  };

  const addFunds = (userId, amount) => {
    simulatedWallets[userId] = (simulatedWallets[userId] || 0) + amount;
    setWalletBalance(simulatedWallets[userId]);
  };

  const deductFunds = (userId, amount) => {
    simulatedWallets[userId] = (simulatedWallets[userId] || 0) - amount;
    setWalletBalance(simulatedWallets[userId]);
  };

  const authContextValue = { user: currentUser, login, logout };
  const themeContextValue = { theme, toggleTheme };
  const walletContextValue = { walletBalance, addFunds, deductFunds };

  return (
    <AuthContext.Provider value={authContextValue}>
      <ThemeContext.Provider value={themeContextValue}>
        <WalletContext.Provider value={walletContextValue}>
          <Router>
            <div className="min-h-screen flex flex-col font-sans antialiased">
              <Navbar logout={logout} />
              <div className="flex-grow">
                <Routes>
                  <Route path="/" element={<HomeComponent />} />
                  <Route path="/home" element={<HomeComponent />} />
                  <Route path="/login" element={<LoginComponent />} />
                  <Route path="/register" element={<RegisterComponent />} />
                  <Route path="/adminlogin" element={<AdminLoginComponent />} />
                  <Route path="/support" element={<SupportComponent />} />
                  <Route path="/about" element={<AboutUs />} />
                  <Route path="/scan-pass" element={<ScanPassComponent />} />
                  <Route path = "/admin-passes" element={<ManagePasses/>}/>
                  <Route path = "/admin-routes" element={<ManageRoutes/>}/>
                  <Route path = "/admin-users" element={<ManageUsers/>}/>
                  <Route path = "/admin-create" element={<ManageAdmin/>}/>

                  <Route path="/unauthorized" element={<Unauthorized />} />

                  <Route
                    path="/dashboard"
                    element={
                      
                      <UserDashboardComponent />
                      
                    }
                  />

                  <Route
                    path="/create-pass"
                    element={
                      // user?.role === "user" ? (
                      <CreatePassComponent
                        user={currentUser}
                        onPassCreated={() => { }}
                      />
                      
                    }
                  />

                  
                  <Route
                    path="/admin-dashboard"
                    element={
                      
                      <AdminDashboardComponent />
                      
                    }
                  />

                
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </div>
              <Footer />
              <ThemeToggleButton />
            </div>
          </Router>
        </WalletContext.Provider>
      </ThemeContext.Provider>
    </AuthContext.Provider>
  );
};

export default App;
