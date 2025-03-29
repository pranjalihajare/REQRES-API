import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pagination,  Modal, Box, TextField, Button } from "@mui/material";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ first_name: "", last_name: "", email: "" });

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const fetchUsers = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
      setUsers(response.data.data);
      setTotalPages(response.data.total_pages);
      setError(null);
    } catch (err) {
      setError("Failed to fetch users. Please try again later.");
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`https://reqres.in/api/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
      alert("User deleted successfully.");
    } catch (err) {
      alert("Failed to delete user.");
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({ first_name: user.first_name, last_name: user.last_name, email: user.email });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`https://reqres.in/api/users/${editingUser.id}`, formData);
      setUsers(users.map((user) => (user.id === editingUser.id ? { ...user, ...formData } : user)));
      setEditingUser(null);
      alert("User updated successfully.");
    } catch (err) {
      alert("Failed to update user.");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-4xl font-extrabold text-center mb-6 text-[#4a148c] font-sans">User List</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 text-left rounded-lg">
            <thead>
              <tr className="bg-[#9c27b0] text-white rounded-t-lg">
                <th className="border p-3 rounded-tl-lg">Avatar</th>
                <th className="border p-3">First Name</th>
                <th className="border p-3">Last Name</th>
                <th className="border p-3 rounded-tr-lg">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border bg-[#f3e5f5] hover:bg-[#ce93d8] transition">
                  <td className="p-3">
                    <img 
                      src={user.avatar} 
                      alt={user.first_name} 
                      className="w-12 h-12 rounded-full transition-transform transform hover:scale-110 hover:shadow-lg" 
                    />
                  </td>
                  <td className="p-3">{user.first_name}</td>
                  <td className="p-3">{user.last_name}</td>
                  <td className="p-3 flex gap-2">
                  <button
                       className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700"
                       onClick={() => handleEdit(user)}
                     >
                       Edit
                     </button>
                     <button
                       className="bg-purple-800 text-white px-3 py-1 rounded hover:bg-purple-900"
                       onClick={() => handleDelete(user.id)}
                     >
                       Delete
                     </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-6 flex justify-center">
        <Pagination count={totalPages} page={page} onChange={(e, value) => setPage(value)} color="secondary" />
      </div>

      <Modal open={!!editingUser} onClose={() => setEditingUser(null)}>
        <Box className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto mt-20" >
          <h2 className="text-xl font-bold mb-4 text-[#4a148c]">Edit User</h2>
          <TextField
            label="First Name"
            fullWidth
            value={formData.first_name}
            onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
            className="mb-5 " style={{ marginBottom:"10px" }}
          />
          <TextField
            label="Last Name"
            fullWidth
            value={formData.last_name}
            onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
            className="mb-5" style={{ marginBottom:"10px" }}
          />
          <TextField
            label="Email"
            fullWidth
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="mb-4" style={{ marginBottom:"10px" }}
          />
          <div className="flex justify-end gap-2">
            <Button variant="contained" color="secondary" onClick={handleUpdate}>Update</Button>
            <Button variant="outlined" color="primary" onClick={() => setEditingUser(null)}>Cancel</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default UsersList;
