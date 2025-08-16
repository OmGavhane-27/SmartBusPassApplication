import React, { useState, useEffect } from "react";
import axios from "axios";
import UserFormModal from "../components/UserFormModal";
import Modal from "../components/Modal";

const ManageRoutes = () => {

    const [error, setError] = useState("");
    const [routes, setRoutes] = useState([]);
    const [routeSearchQuery, setRouteSearchQuery] = useState("");
    const [showAllRoutes, setShowAllRoutes] = useState(false);
    const [selectedRoute, setSelectedRoute] = useState(null);
    const [isRouteEditModalOpen, setIsRouteEditModalOpen] = useState(false);

    const [isConfirmDeleteRouteModalOpen, setIsConfirmDeleteRouteModalOpen] =
        useState(false);
    const [routeToDelete, setRouteToDelete] = useState(null);

    const [showRouteForm, setShowRouteForm] = useState(false);

    const [newRoute, setNewRoute] = useState({
        routeNumber: "",
        source: "",
        destination: "",
        distanceKm: "",
    });

    const [routeMessage, setRouteMessage] = useState("");


    useEffect(() => {
        const fetchRoutes = async () => {
            try {
                const token = localStorage.getItem("adminToken");
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

        fetchRoutes();
    }, [])


    const handleEditRoute = (route) => {
        setSelectedRoute(route);
        setShowRouteForm(true);
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
            const token = localStorage.getItem("adminToken");
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


    const handleRouteInputChange = (e) => {
        const { name, value } = e.target;
        setNewRoute((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddRoute = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("adminToken");
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





    return (
        <main className='grid grid-cols-1 lg:grid-cols-2 gap-6'>

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
                                        <td className='py-3 px-4 text-sm space-x-2'>
                                            <button
                                                onClick={() => handleEditRoute(route)}
                                                className='px-3 py-1 bg-blue-500 text-white rounded-md text-xs hover:bg-blue-600 transition'
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteRouteConfirm(route)}
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
                                className={`text-sm font-medium ${routeMessage.includes("success")
                                    ? "text-green-600"
                                    : "text-red-600"
                                    }`}
                            >
                                {routeMessage}
                            </span>
                        </div>
                    )}
                </div>

                
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
            </section>

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

        </main>
    );

}

export default ManageRoutes;