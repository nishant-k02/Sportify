import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:8000/getUsers");
        setUsers(res.data.data);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };
    fetchUsers();
  }, []);

  const handleDeleteClick = (userId) => {
    setSelectedUser(userId);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem("token"); // Make sure you store the token here after login

      if (!token) {
        alert("Unauthorized! No token found.");
        return;
      }

      await axios.post(
        "http://localhost:8000/delete-user",
        { deleteUserId: selectedUser },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUsers((prev) => prev.filter((user) => user._id !== selectedUser));
      setShowModal(false);
      setSelectedUser(null);
    } catch (err) {
      console.error("Failed to delete user:", err);
      alert("Failed to delete user. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">👥 Manage Users</h1>

        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="min-w-full table-auto bg-white border border-gray-200 rounded-lg">
            <thead className="bg-[#f9fafb] sticky top-0 z-10">
              <tr>
                <th className="p-3 text-sm font-semibold text-left border-b border-gray-300">
                  User ID
                </th>
                <th className="p-3 text-sm font-semibold text-left border-b border-gray-300">
                  Name
                </th>
                <th className="p-3 text-sm font-semibold text-left border-b border-gray-300">
                  Email
                </th>
                <th className="p-3 text-sm font-semibold text-left border-b border-gray-300">
                  Contact
                </th>
                <th className="p-3 text-sm font-semibold text-center border-b border-gray-300">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="hover:bg-gray-50 transition duration-150"
                >
                  <td className="p-3 text-sm text-gray-700">{user._id}</td>
                  <td className="p-3 text-sm text-gray-800 font-medium">
                    {user.username || "N/A"}
                  </td>
                  <td className="p-3 text-sm text-gray-700">{user.email}</td>
                  <td className="p-3 text-sm text-gray-700">{user.phone}</td>
                  <td className="p-3 text-sm text-center">
                    <button
                      onClick={() => handleDeleteClick(user._id)}
                      className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Single Delete Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-lg max-w-sm text-center">
              <h2 className="text-lg font-semibold mb-4">Are you sure?</h2>
              <p className="mb-6 text-gray-700">
                This will permanently delete the selected user.
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={confirmDelete}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Confirm
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ManageUsers;
