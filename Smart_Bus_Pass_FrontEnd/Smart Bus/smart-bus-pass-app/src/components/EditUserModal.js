import React, { useState, useEffect } from 'react';
import { simulatedUsers } from '../data/simulatedData';
import EditUserModal from '../components/EditUserModal';

const AdminDashboardComponent = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  useEffect(() => {
    setUsers(simulatedUsers);
  }, []);

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setIsUserModalOpen(true);
  };

  const handleDeleteClick = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    }
  };

  const handleSaveUser = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      )
    );
    setIsUserModalOpen(false);
  };

  return (
    <div className="p-8 pt-24 min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>
      
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden dark:bg-gray-800">
          <thead className="bg-gray-200 dark:bg-gray-700">
            <tr>
              <th className="py-3 px-4 text-left">Username</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Phone</th>
              <th className="py-3 px-4 text-left">Role</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t dark:border-gray-700">
                <td className="py-3 px-4">{user.username}</td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4">{user.phone}</td>
                <td className="py-3 px-4">{user.role}</td>
                <td className="py-3 px-4 space-x-2">
                  <button
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    onClick={() => handleEditClick(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => handleDeleteClick(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedUser && isUserModalOpen && (
        <EditUserModal
          user={selectedUser}
          onUpdate={handleSaveUser}
          onCancel={() => setIsUserModalOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminDashboardComponent;
