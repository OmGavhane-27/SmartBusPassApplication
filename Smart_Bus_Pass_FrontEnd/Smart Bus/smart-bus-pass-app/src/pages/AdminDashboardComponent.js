import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import { simulatedWallets } from "../data/simulatedData";
import UserFormModal from "../components/UserFormModal";
import Modal from "../components/Modal";

const AdminDashboardComponent = () => {
  const { logout } = useAuth();
  const { theme } = useTheme();

  const [users, setUsers] = useState([]);
  const [passes, setPasses] = useState([]);
  const [wallets, setWallets] = useState(simulatedWallets);
  const [error, setError] = useState("");

  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const [isConfirmDeletePassModalOpen, setIsConfirmDeletePassModalOpen] =
    useState(false);
  const [passToDelete, setPassToDelete] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [passSearchQuery, setPassSearchQuery] = useState("");
  const [selectedPassType, setSelectedPassType] = useState("All");
  const [showAllPasses, setShowAllPasses] = useState(false);
  const [routes, setRoutes] = useState([]);
  const [routeSearchQuery, setRouteSearchQuery] = useState("");
  const [showAllRoutes, setShowAllRoutes] = useState(false);


  const [selectedRoute, setSelectedRoute] = useState(null);
  const [isRouteEditModalOpen, setIsRouteEditModalOpen] = useState(false);

  const [isConfirmDeleteRouteModalOpen, setIsConfirmDeleteRouteModalOpen] =
    useState(false);
  const [routeToDelete, setRouteToDelete] = useState(null);


  const [newAdmin, setNewAdmin] = useState({
    username: "",
    password: "",
    confirmPassword: "", 
    email: "",
    adminType: "",
  });



  const [showRouteForm, setShowRouteForm] = useState(false);
  const [showEditRouteForm, setShowEditRouteForm] = useState(false);

  const [newRoute, setNewRoute] = useState({
    routeNumber: "",
    source: "",
    destination: "",
    distanceKm: "",
  });

  const [routeMessage, setRouteMessage] = useState("");



  const [adminCreationMessage, setAdminCreationMessage] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Admin token not found. Please login again.");
          return;
        }

        const response = await axios.get(
          "http://localhost:8080/api/users/getAllUsers",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUsers(response.data);
      } catch (err) {
        console.error("Failed to fetch users:", err);
        setError("Failed to fetch users. Check server or token.");
      }
    };

    const fetchPasses = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Admin token not found. Please login again.");
          return;
        }

        const response = await axios.get(
          "http://localhost:8080/api/passes/getAllPasses",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setPasses(response.data);
        console.log("Passes fetched:", response.data);
      } catch (err) {
        console.error("Failed to fetch passes:", err);
        setError("Failed to fetch passes. Check server or token.");
      }
    };

    const fetchRoutes = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Admin token not found. Please login again.");
          return;
        }
        const response = await axios.get(
          "http://localhost:8080/api/admin/routes",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setRoutes(response.data);
      } catch (err) {
        console.error("Failed to fetch routes:", err);
        setError("Failed to fetch routes. Please try again.");
      }
    };

    // fetchUsers();
    // fetchPasses();

    fetchUsers();
    fetchPasses();
    fetchRoutes(); // 👈 Add this line
  }, []);

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsUserModalOpen(true);
  };

  const handleSaveUser = (editedUser) => {
    const updatedUsers = users.map((user) =>
      user.user_id === editedUser.user_id ? { ...user, ...editedUser } : user
    );
    setUsers(updatedUsers);
  };

  const handleDeleteUserConfirm = (user) => {
    setUserToDelete(user);
    setIsConfirmDeleteModalOpen(true);
  };

  const handleDeleteUser = async () => {
    if (!userToDelete) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Admin token not found. Please login again.");
        return;
      }

      await axios.delete(
        `http://localhost:8080/api/users/${userToDelete.user_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedUsers = users.filter(
        (u) => u.user_id !== userToDelete.user_id
      );
      setUsers(updatedUsers);

      const updatedPasses = passes.filter(
        (p) => p.userid !== userToDelete.user_id
      );
      setPasses(updatedPasses);

      const updatedWallets = { ...wallets };
      delete updatedWallets[userToDelete.user_id];
      setWallets(updatedWallets);

      setIsConfirmDeleteModalOpen(false);
      setUserToDelete(null);
    } catch (err) {
      console.error("Failed to delete user:", err);
      setError("Failed to delete user. Please try again.");
    }
  };


  const handleEditRoute = (route) => {
    setSelectedRoute(route);
    setShowEditRouteForm(true);
    setNewRoute({
      routeNumber: route.routeNumber,
      source: route.source,
      destination: route.destination,
      distanceKm: route.distanceKm,
    });
  };

  const handleDeleteRouteConfirm = (route) => {
    setRouteToDelete(route);
    setIsConfirmDeleteRouteModalOpen(true);
  };


  const handleDeleteRoute = async () => {
    if (!routeToDelete) return;
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Admin token not found. Please login again.");
        return;
      }

      await axios.delete(
        `http://localhost:8080/api/admin/routes/${routeToDelete.routeId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedRoutes = routes.filter(
        (r) => r.routeId !== routeToDelete.routeId
      );
      setRoutes(updatedRoutes);

      setIsConfirmDeleteRouteModalOpen(false);
      setRouteToDelete(null);
    } catch (err) {
      console.error("Failed to delete route:", err);
      setError("Failed to delete route. Please try again.");
    }
  };



  const handleDeletePassConfirm = (pass) => {
    setPassToDelete(pass);
    setIsConfirmDeletePassModalOpen(true);
  };

  const handleDeletePass = async () => {
    if (!passToDelete) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Admin token not found. Please login again.");
        return;
      }

      await axios.delete(
        `http://localhost:8080/api/passes/${passToDelete.passId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedPasses = passes.filter(
        (p) => p.passId !== passToDelete.passId
      );
      setPasses(updatedPasses);

      setIsConfirmDeletePassModalOpen(false);
      setPassToDelete(null);
    } catch (err) {
      console.error("Failed to delete pass:", err);
      setError("Failed to delete pass. Please try again.");
    }
  };

  const handleAdminInputChange = (e) => {
    const { name, value } = e.target;
    setNewAdmin((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateAdmin = async (e) => {
    e.preventDefault();

    if (newAdmin.password !== newAdmin.confirmPassword) {
      setAdminCreationMessage("Passwords do not match.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setAdminCreationMessage("Admin token not found. Please login again.");
        return;
      }

      const { confirmPassword, ...adminPayload } = newAdmin; // 🔥 Exclude confirmPassword

      const response = await axios.post(
        "http://localhost:8080/api/admin",
        adminPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setAdminCreationMessage("Admin created successfully!");
      setNewAdmin({
        username: "",
        password: "",
        confirmPassword: "",
        email: "",
        adminType: "",
      });
      setTimeout(() => {
        setAdminCreationMessage("");
      }, 5000);
    } catch (err) {
      console.error("Failed to create admin:", err);
      setAdminCreationMessage("Failed to create admin. Try again.");
      setTimeout(() => {
        setAdminCreationMessage("");
      }, 5000);

    }
  };



  const handleRouteInputChange = (e) => {
    const { name, value } = e.target;
    setNewRoute((prev) => ({ ...prev, [name]: value }));
  };

  // const handleAddRoute = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const token = localStorage.getItem("token");
  //     if (!token) {
  //       setRouteMessage("Admin token not found. Please login again.");
  //       return;
  //     }

  //     const response = await axios.post(
  //       "http://localhost:8080/api/admin/routes", // Replace with your actual endpoint
  //       newRoute,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     setRouteMessage("Route added successfully!");
  //     setNewRoute({
  //       routeNumber: "",
  //       source: "",
  //       destination: "",
  //       distanceKm: "",
  //     });
  //     setShowRouteForm(false); // close the modal

  //     setTimeout(() => setRouteMessage(""), 5000); // clear message
  //   } catch (err) {
  //     console.error("Failed to add route:", err);
  //     setRouteMessage("Failed to add route. Try again.");
  //     setTimeout(() => setRouteMessage(""), 5000);
  //   }
  // };

  


  const handleAddRoute = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setRouteMessage("Admin token not found. Please login again.");
        return;
      }

      if (selectedRoute) {
        // UPDATE route
        await axios.put(
          `http://localhost:8080/api/admin/routes/${selectedRoute.routeId}`,
          newRoute,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setRouteMessage("Route updated successfully!");
      } else {
        // CREATE new route
        await axios.post("http://localhost:8080/api/admin/routes", newRoute, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setRouteMessage("Route added successfully!");
      }

      // Refresh routes list
      const updatedRoutes = await axios.get(
        "http://localhost:8080/api/admin/routes",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setRoutes(updatedRoutes.data);

      // Reset form
      setNewRoute({
        routeNumber: "",
        source: "",
        destination: "",
        distanceKm: "",
      });
      setSelectedRoute(null);
      setShowRouteForm(false);

      setTimeout(() => setRouteMessage(""), 5000);
    } catch (err) {
      console.error("Failed to submit route:", err);
      setRouteMessage("Failed to process route. Try again.");
      setTimeout(() => setRouteMessage(""), 5000);
    }
  };



  const filteredRoutes = routes.filter((route) =>
    String(route.routeId).includes(routeSearchQuery.trim())
  );

  const displayedRoutes = showAllRoutes
    ? filteredRoutes
    : filteredRoutes.slice(0, 3);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPasses = passes.filter((pass) => {
    const matchUserId =
      passSearchQuery === "" ||
      String(pass.userId).includes(passSearchQuery.trim());
    const matchPassType =
      selectedPassType === "All" ||
      pass.passType?.toLowerCase() === selectedPassType.toLowerCase();
    return matchUserId && matchPassType;
  });

  const displayedPasses = showAllPasses
    ? filteredPasses
    : filteredPasses.slice(0, 3);

  return (
    <div className='min-h-screen bg-gray-100 p-4 pt-16 font-inter dark:bg-gray-900'>
      <header className='flex justify-between items-center bg-white p-6 rounded-lg shadow-md mb-6 dark:bg-gray-800 dark:text-gray-100 dark:shadow-none dark:border dark:border-gray-700'>
        <h1 className='text-3xl font-bold text-gray-800 dark:text-gray-100'>
          Admin Dashboard
        </h1>
      </header>

      {error && (
        <p className='text-red-500 text-center mb-4 font-semibold'>{error}</p>
      )}

      <main className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* Users Table */}
        <section className='bg-white p-6 rounded-lg shadow-md dark:bg-gray-800 dark:text-gray-100 dark:shadow-none dark:border dark:border-gray-700'>
          <div className='flex justify-between items-center mb-4'>
            <h2 className='text-2xl font-semibold'>Users</h2>
            <input
              type='text'
              placeholder='Search by name'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='w-48 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white'
            />
          </div>
          <div className='overflow-y-auto max-h-96 border border-gray-200 rounded-lg dark:border-gray-600'>
            <table className='min-w-full bg-white dark:bg-gray-700 dark:text-gray-100'>
              <thead className='bg-gray-200 dark:bg-gray-600'>
                <tr>
                  <th className='py-3 px-4 text-left text-sm font-semibold'>
                    User ID
                  </th>
                  <th className='py-3 px-4 text-left text-sm font-semibold'>
                    Name
                  </th>
                  <th className='py-3 px-4 text-left text-sm font-semibold'>
                    Email
                  </th>
                  <th className='py-3 px-4 text-left text-sm font-semibold'>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan='4' className='text-center py-4 text-gray-500'>
                      No users found.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.slice(0, 3).map((user) => (
                    <tr
                      key={user.user_id}
                      className='border-b dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                    >
                      <td className='py-3 px-4 text-sm'>{user.user_id}</td>
                      <td className='py-3 px-4 text-sm'>{user.name}</td>
                      <td className='py-3 px-4 text-sm'>{user.email}</td>
                      <td className='py-3 px-4 text-sm space-x-2'>
                        <button
                          onClick={() => handleEditUser(user)}
                          className='px-3 py-1 bg-blue-500 text-white rounded-md text-xs hover:bg-blue-600 transition'
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteUserConfirm(user)}
                          className='px-3 py-1 bg-red-500 text-white rounded-md text-xs hover:bg-red-600 transition'
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Passes Table */}
        <section className='bg-white p-6 rounded-lg shadow-md dark:bg-gray-800 dark:text-gray-100 dark:shadow-none dark:border dark:border-gray-700'>
          <div className='flex justify-between items-center mb-4'>
            <h2 className='text-2xl font-semibold'>Passes</h2>
            <div className='flex space-x-4'>
              <input
                type='text'
                placeholder='Search by User ID'
                value={passSearchQuery}
                onChange={(e) => setPassSearchQuery(e.target.value)}
                className='w-48 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white'
              />
              <select
                value={selectedPassType}
                onChange={(e) => setSelectedPassType(e.target.value)}
                className='w-40 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white'
              >
                <option value='All'>All Types</option>
                <option value='DAILY PASS'>DAILY PASS</option>
                <option value='STUDENT PASS'>STUDENT PASS</option>
                <option value='MONTHLY PASS'>MONTHLY PASS</option>
              </select>
            </div>
          </div>

          <div className='overflow-y-auto max-h-96 border border-gray-200 rounded-lg dark:border-gray-600'>
            <table className='min-w-full bg-white dark:bg-gray-700 dark:text-gray-100'>
              <thead className='bg-gray-200 dark:bg-gray-600'>
                <tr>
                  <th className='py-3 px-4 text-left text-sm font-semibold'>
                    Pass ID
                  </th>
                  <th className='py-3 px-4 text-left text-sm font-semibold'>
                    User ID
                  </th>
                  <th className='py-3 px-4 text-left text-sm font-semibold'>
                    Type
                  </th>
                  <th className='py-3 px-4 text-left text-sm font-semibold'>
                    Valid Till
                  </th>
                  <th className='py-3 px-4 text-left text-sm font-semibold'>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {displayedPasses.length === 0 ? (
                  <tr>
                    <td colSpan='5' className='text-center py-4 text-gray-500'>
                      No passes found.
                    </td>
                  </tr>
                ) : (
                  displayedPasses.map((pass) => (
                    <tr
                      key={pass.passId}
                      className='border-b dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                    >
                      <td className='py-3 px-4 text-sm'>{pass.passId}</td>
                      <td className='py-3 px-4 text-sm'>
                        {pass.userId || "N/A"}
                      </td>
                      <td className='py-3 px-4 text-sm'>{pass.passType}</td>
                      <td className='py-3 px-4 text-sm'>
                        {pass.expiryDate
                          ? new Date(pass.expiryDate).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td className='py-3 px-4 text-sm'>
                        <button
                          onClick={() => handleDeletePassConfirm(pass)}
                          className='px-3 py-1 bg-red-500 text-white rounded-md text-xs hover:bg-red-600 transition'
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {filteredPasses.length > 3 && (
            <div className='mt-4 text-right'>
              <button
                onClick={() => setShowAllPasses((prev) => !prev)}
                className='px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500'
              >
                {showAllPasses ? "Show Less" : "Show More"}
              </button>
            </div>
          )}
        </section>
        {/* Routes List - Full width below */}
        <section className='lg:col-span-1 bg-white p-6 rounded-lg shadow-md dark:bg-gray-800 dark:text-gray-100 dark:shadow-none dark:border dark:border-gray-700'>
          <div className='flex justify-between items-center mb-4'>
            <h2 className='text-2xl font-semibold'>Routes</h2>
            <input
              type='text'
              placeholder='Search by Route ID'
              value={routeSearchQuery}
              onChange={(e) => setRouteSearchQuery(e.target.value)}
              className='w-48 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white'
            />
          </div>

          <div className='overflow-y-auto max-h-96 border border-gray-200 rounded-lg dark:border-gray-600'>
            <table className='min-w-full bg-white dark:bg-gray-700 dark:text-gray-100'>
              {/* <thead className='bg-gray-200 dark:bg-gray-600'>
                <tr>
                  <th className='py-3 px-4 text-left text-sm font-semibold'>
                    Route ID
                  </th>
                  <th className='py-3 px-4 text-left text-sm font-semibold'>
                    Route No
                  </th>
                  <th className='py-3 px-4 text-left text-sm font-semibold'>
                    Source
                  </th>
                  <th className='py-3 px-4 text-left text-sm font-semibold'>
                    Destination
                  </th>
                  <th className='py-3 px-4 text-left text-sm font-semibold'>
                    Distance (Km)
                  </th>
                </tr>
              </thead> */}
              <thead className='bg-gray-200 dark:bg-gray-600'>
                <tr>
                  <th className='py-3 px-4 text-left text-sm font-semibold'>
                    Route ID
                  </th>
                  <th className='py-3 px-4 text-left text-sm font-semibold'>
                    Route No
                  </th>
                  <th className='py-3 px-4 text-left text-sm font-semibold'>
                    Source
                  </th>
                  <th className='py-3 px-4 text-left text-sm font-semibold'>
                    Destination
                  </th>
                  <th className='py-3 px-4 text-left text-sm font-semibold'>
                    Distance (Km)
                  </th>
                  <th className='py-3 px-4 text-left text-sm font-semibold'>
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {displayedRoutes.length === 0 ? (
                  <tr>
                    <td colSpan='6' className='text-center py-4 text-gray-500'>
                      No routes found.
                    </td>
                  </tr>
                ) : (
                  displayedRoutes.map((route) => (
                    <tr
                      key={route.routeId}
                      className='border-b dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                    >
                      <td className='py-3 px-4 text-sm'>{route.routeId}</td>
                      <td className='py-3 px-4 text-sm'>{route.routeNumber}</td>
                      <td className='py-3 px-4 text-sm'>{route.source}</td>
                      <td className='py-3 px-4 text-sm'>{route.destination}</td>
                      <td className='py-3 px-4 text-sm'>{route.distanceKm}</td>
                     
                      <td className='py-3 px-4 text-sm'>
  <div className='flex gap-2'>
    <button
      onClick={() => handleEditRoute(route)}
      className='flex-1 px-3 py-1 bg-blue-500 text-white rounded-md text-xs hover:bg-blue-600 transition whitespace-nowrap'
    >
      Edit
    </button>
    <button
      onClick={() => handleDeleteRouteConfirm(route)}
      className='flex-1 px-3 py-1 bg-red-500 text-white rounded-md text-xs hover:bg-red-600 transition whitespace-nowrap'
    >
      Delete
    </button>
  </div>
</td>

                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {/* Add Route Button */}
          <div className='mt-6'>
            <button
              onClick={() => setShowRouteForm(true)}
              className='py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition'
            >
              Add Route
            </button>
            {routeMessage && (
              <div className='mt-4 text-center'>
                <span
                  className={`text-sm font-medium ${
                    routeMessage.includes("success")
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {routeMessage}
                </span>
              </div>
            )}
          </div>

          {/* Route Creation Modal */}
          {showRouteForm && (
            <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
              <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md'>
                <h2 className='text-xl font-semibold mb-4'>Add New Route</h2>

                <form onSubmit={handleAddRoute} className='space-y-4'>
                  <div>
                    <label className='block text-sm mb-1'>Route Number</label>
                    <input
                      type='text'
                      name='routeNumber'
                      value={newRoute.routeNumber}
                      onChange={handleRouteInputChange}
                      required
                      className='w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white'
                    />
                  </div>

                  <div>
                    <label className='block text-sm mb-1'>Source</label>
                    <input
                      type='text'
                      name='source'
                      value={newRoute.source}
                      onChange={handleRouteInputChange}
                      required
                      className='w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white'
                    />
                  </div>

                  <div>
                    <label className='block text-sm mb-1'>Destination</label>
                    <input
                      type='text'
                      name='destination'
                      value={newRoute.destination}
                      onChange={handleRouteInputChange}
                      required
                      className='w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white'
                    />
                  </div>

                  <div>
                    <label className='block text-sm mb-1'>Distance (km)</label>
                    <input
                      type='number'
                      name='distanceKm'
                      step='0.1'
                      value={newRoute.distanceKm}
                      onChange={handleRouteInputChange}
                      required
                      className='w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white'
                    />
                  </div>

                  <div className='flex justify-between'>
                    <button
                      type='submit'
                      className='py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition'
                    >
                      Submit
                    </button>
                    <button
                      type='button'
                      onClick={() => setShowRouteForm(false)}
                      className='py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition'
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

           {showEditRouteForm && (
            <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
              <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md'>
                <h2 className='text-xl font-semibold mb-4'>Edit Route</h2>

                <form onSubmit={handleAddRoute} className='space-y-4'>
                  <div>
                    <label className='block text-sm mb-1'>Route Number</label>
                    <input
                      type='text'
                      name='routeNumber'
                      value={newRoute.routeNumber}
                      onChange={handleRouteInputChange}
                      required
                      className='w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white'
                    />
                  </div>

                  <div>
                    <label className='block text-sm mb-1'>Source</label>
                    <input
                      type='text'
                      name='source'
                      value={newRoute.source}
                      onChange={handleRouteInputChange}
                      required
                      className='w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white'
                    />
                  </div>

                  <div>
                    <label className='block text-sm mb-1'>Destination</label>
                    <input
                      type='text'
                      name='destination'
                      value={newRoute.destination}
                      onChange={handleRouteInputChange}
                      required
                      className='w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white'
                    />
                  </div>

                  <div>
                    <label className='block text-sm mb-1'>Distance (km)</label>
                    <input
                      type='number'
                      name='distanceKm'
                      step='0.1'
                      value={newRoute.distanceKm}
                      onChange={handleRouteInputChange}
                      required
                      className='w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white'
                    />
                  </div>

                  <div className='flex justify-between'>
                    <button
                      type='submit'
                      className='py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition'
                    >
                      Submit
                    </button>
                    <button
                      type='button'
                      onClick={() => setShowEditRouteForm(false)}
                      className='py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition'
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </section>

        <section className='lg:col-span-1 grid grid-cols-1 lg:grid-cols-1 gap-6'>
          {/* Create Admin Section */}
          <div className='bg-white p-6 rounded-lg shadow-md dark:bg-gray-800 dark:text-gray-100 dark:shadow-none dark:border dark:border-gray-700'>
            <h2 className='text-2xl font-semibold mb-4'>Create New Admin</h2>

            {adminCreationMessage && (
              <p className='mb-4 text-sm text-center text-blue-500'>
                {adminCreationMessage}
              </p>
            )}

            <form onSubmit={handleCreateAdmin} className='space-y-4'>
              <div>
                <label className='block text-sm mb-1'>Username</label>
                <input
                  type='text'
                  name='username'
                  value={newAdmin.username}
                  onChange={handleAdminInputChange}
                  required
                  className='w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white'
                />
              </div>

              <div>
                <label className='block text-sm mb-1'>Email</label>
                <input
                  type='email'
                  name='email'
                  value={newAdmin.email}
                  onChange={handleAdminInputChange}
                  required
                  className='w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white'
                />
              </div>
              <div>
                <label className='block text-sm mb-1'>Admin Type</label>
                <input
                  type='text'
                  name='adminType'
                  value={newAdmin.adminType}
                  onChange={handleAdminInputChange}
                  required
                  className='w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white'
                />
              </div>

              <div>
                <label className='block text-sm mb-1'>Password</label>
                <input
                  type='password'
                  name='password'
                  value={newAdmin.password}
                  onChange={handleAdminInputChange}
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
                  onChange={handleAdminInputChange}
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

      {/* User Modal */}
      {selectedUser && (
        <UserFormModal
          isOpen={isUserModalOpen}
          onClose={() => setIsUserModalOpen(false)}
          user={selectedUser}
          onSave={handleSaveUser}
        />
      )}

      <Modal
        isOpen={isConfirmDeleteRouteModalOpen}
        onClose={() => setIsConfirmDeleteRouteModalOpen(false)}
        title='Confirm Delete Route'
      >
        <p className='text-gray-700 dark:text-gray-300'>
          Are you sure you want to delete route ID "
          <span className='font-bold'>{routeToDelete?.routeId}</span>"? This
          action cannot be undone.
        </p>
        <div className='flex justify-end space-x-2 mt-4'>
          <button
            onClick={() => setIsConfirmDeleteRouteModalOpen(false)}
            className='px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500'
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteRoute}
            className='px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700'
          >
            Delete
          </button>
        </div>
      </Modal>

      {/* User Delete Modal */}
      <Modal
        isOpen={isConfirmDeleteModalOpen}
        onClose={() => setIsConfirmDeleteModalOpen(false)}
        title='Confirm Delete User'
      >
        <p className='text-gray-700 dark:text-gray-300'>
          Are you sure you want to delete user "
          <span className='font-bold'>{userToDelete?.name}</span>"? This action
          cannot be undone.
        </p>
        <div className='flex justify-end space-x-2 mt-4'>
          <button
            onClick={() => setIsConfirmDeleteModalOpen(false)}
            className='px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500'
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteUser}
            className='px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700'
          >
            Delete
          </button>
        </div>
      </Modal>

      {/* Pass Delete Modal */}
      <Modal
        isOpen={isConfirmDeletePassModalOpen}
        onClose={() => setIsConfirmDeletePassModalOpen(false)}
        title='Confirm Delete Pass'
      >
        <p className='text-gray-700 dark:text-gray-300'>
          Are you sure you want to delete pass ID "
          <span className='font-bold'>{passToDelete?.passId}</span>"? This
          action cannot be undone.
        </p>
        <div className='flex justify-end space-x-2 mt-4'>
          <button
            onClick={() => setIsConfirmDeletePassModalOpen(false)}
            className='px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500'
          >
            Cancel
          </button>
          <button
            onClick={handleDeletePass}
            className='px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700'
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default AdminDashboardComponent;
