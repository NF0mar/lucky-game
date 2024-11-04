import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';

const UserForm = () => {
    const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
    const [editId, setEditId] = useState(null);
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setMessage(''), 3000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validate = () => {
        const errors = {};

        if (!formData.name || formData.name.length < 3) {
            errors.name = "Name must be at least 3 characters long.";
        }

        const phoneRegex = /^[0-9-]+$/; // Accepts numbers and dashes
        if (!formData.phone || !phoneRegex.test(formData.phone)) {
            errors.phone = "Phone must be a valid phone number.";
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex
        if (!formData.email || !emailRegex.test(formData.email)) {
            errors.email = "Email must be a valid email address.";
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const addUser = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            await axios.post('http://localhost:5000/api/users', formData);
            setMessage('User added successfully');
            setFormData({ name: '', phone: '', email: '' });
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    const updateUser = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            await axios.put(`http://localhost:5000/api/users/${editId}`, formData);
            setMessage('User updated successfully');
            setFormData({ name: '', phone: '', email: '' });
            setEditId(null);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleDelete = async () => {
        if (editId) {
            try {
                await axios.delete(`http://localhost:5000/api/users/${editId}`);
                setMessage('User deleted successfully');
                setFormData({ name: '', phone: '', email: '' });
                setEditId(null);
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        } else {
            setMessage('Please select a user to delete');
        }
    };

    const handleEdit = (user) => {
        setFormData({ name: user.name, phone: user.phone, email: user.email });
        setEditId(user._id);
        setMessage('Editing user...');
    };

    const handleCancel = () => {
        setFormData({ name: '', phone: '', email: '' });
        setEditId(null);
        navigate('/dashboard');
    };

    return (
        <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg transition-shadow hover:shadow-2xl transform hover:-translate-y-1 duration-300 mt-20">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
                {editId ? 'Edit User' : 'Add User'}
            </h2>
            <form className="space-y-6" onSubmit={editId ? updateUser : addUser}>
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full p-3 border ${
                            errors.name ? 'border-red-500' : 'border-gray-300'
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150`}
                        placeholder="Enter user name"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Phone</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full p-3 border ${
                            errors.phone ? 'border-red-500' : 'border-gray-300'
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150`}
                        placeholder="Enter phone number"
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full p-3 border ${
                            errors.email ? 'border-red-500' : 'border-gray-300'
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150`}
                        placeholder="Enter email"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                <div className="flex space-x-3">
                    {editId ? (
                        <button
                            type="submit"
                            className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200 transform hover:scale-105 shadow-md"
                        >
                            Update User
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200 transform hover:scale-105 shadow-md"
                        >
                            Add User
                        </button>
                    )}
                    <button
                        type="button"
                        onClick={handleDelete}
                        className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200 transform hover:scale-105 shadow-md"
                    >
                        Delete
                    </button>
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="w-full bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition duration-200 transform hover:scale-105 shadow-md"
                    >
                        Cancel
                    </button>
                </div>
            </form>

            {message && (
                <div className={`mt-6 flex items-center space-x-2 ${message.includes('deleted') ? 'text-red-600' : 'text-green-600'}`}>
                    {message.includes('deleted') ? (
                        <AiOutlineCloseCircle size={20} />
                    ) : (
                        <AiOutlineCheckCircle size={20} />
                    )}
                    <p>{message}</p>
                </div>
            )}
        </div>
    );
};

export default UserForm;
