
import UserFormModal from "../components/UserFormModal";
import Modal from "../components/Modal";
import React, { useState, useEffect } from "react";
import axios from "axios";
const ManagePasses = () => {

    const [passes, setPasses] = useState([]);
    const [error, setError] = useState("");
    const [isConfirmDeletePassModalOpen, setIsConfirmDeletePassModalOpen] =
        useState(false);
    const [passToDelete, setPassToDelete] = useState(null);
    const [passSearchQuery, setPassSearchQuery] = useState("");
    const [selectedPassType, setSelectedPassType] = useState("All");
    const [showAllPasses, setShowAllPasses] = useState(false);

    useEffect(() => {
        const fetchPasses = async () => {
            try {
                const token = localStorage.getItem("adminToken");
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
        fetchPasses();
    }, []);

    const handleDeletePassConfirm = (pass) => {
        setPassToDelete(pass);
        setIsConfirmDeletePassModalOpen(true);
    };

    const handleDeletePass = async () => {
        if (!passToDelete) return;

        try {
            const token = localStorage.getItem("adminToken");
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
        <main className='grid grid-cols-1 lg:grid-cols-2 gap-6'>

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
        </main>
    )
}

export default ManagePasses;