import React, { useState, useEffect } from 'react';
import Modal from './Modal';

const UserFormModal = ({ isOpen, onClose, user, onSave }) => {
  const [username, setUsername] = useState(user?.username || '');
  const [userId, setUserId] = useState(user?.user_id || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [address, setAddress] = useState(user?.address || '');
  const [gender, setGender] = useState(user?.gender || '');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setEmail(user.email);
      setPhone(user.phone);
      setAddress(user.address);
      setGender(user.gender);
      setUserId(user.user_id)
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!username || !address || !gender) {
      setError('Username, Address, and Gender are required.');
      return;
    }

    if (email && !/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (phone && !/^\d{10}$/.test(phone)) {
      setError('Phone number must be 10 digits.');
      return;
    }

    const updatedUser = {
      ...user,
      username,
      email,
      phone,
      address,
      gender,
    };
    onSave(updatedUser);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Edit User: ${user?.user_id}`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-1 dark:text-gray-300" htmlFor="edit-username">
            Username
          </label>
          <input
            type="text"
            id="edit-username"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-1 dark:text-gray-300" htmlFor="edit-email">
            Email
          </label>
          <input
            type="email"
            id="edit-email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-1 dark:text-gray-300" htmlFor="edit-phone">
            Phone
          </label>
          <input
            type="tel"
            id="edit-phone"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-1 dark:text-gray-300" htmlFor="edit-address">
            Address
          </label>
          <input
            type="text"
            id="edit-address"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-1 dark:text-gray-300" htmlFor="edit-gender">
            Gender
          </label>
          <select
            id="edit-gender"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

        <div className="flex justify-end space-x-2 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition duration-200 dark:bg-gray-600 dark:text-gray-100 dark:hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
          >
            Save Changes
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default UserFormModal;