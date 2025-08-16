import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import { simulatedWallets } from "../data/simulatedData";
import UserFormModal from "../components/UserFormModal";
import Modal from "../components/Modal";

const ManageUsers = () => {

    const [users, setUsers] = useState([]);
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
        useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");



    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem("adminToken");
                console.log("Hello Ji", token)
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

        fetchUsers();
    }, [])

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
            const token = localStorage.getItem("adminToken");
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

    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );



    return (
        <main className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
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
            {selectedUser && (
                <UserFormModal
                    isOpen={isUserModalOpen}
                    onClose={() => setIsUserModalOpen(false)}
                    user={selectedUser}
                    onSave={handleSaveUser}
                />


            )}
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
        </main>
    )


}

export default ManageUsers;