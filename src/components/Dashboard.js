import React, { useState, useEffect } from 'react';
import { getUserProfile, updateUserProfile, deleteUserProfile } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState({ name: '', email: '', profession: '', interests: [], bio: '', Number: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserProfile();
        setUser(data);
      } catch (err) {
        setError(err.response.data.error);
      }
    };
    fetchData();
  }, []);

  const handleUpdate = async () => {
    try {
      await updateUserProfile(user);
      alert('Profile updated successfully');
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteUserProfile(user._id);
      alert('Profile deleted successfully');
      navigate('/register');
    } catch (err) {
      setError(err.response.data.error);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <form className="bg-white p-6 rounded shadow-md w-80">
        <div className="mb-4">
          <label className="block text-gray-700">Name:</label>
          <input
            type="text"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email:</label>
          <input
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Profession:</label>
          <select
            value={user.profession}
            onChange={(e) => setUser({ ...user, profession: e.target.value })}
            className="mt-1 p-2 w-full border rounded"
          >
            <option value="">Select Profession</option>
            <option value="Marketing Professional">Marketing Professional</option>
            <option value="Entrepreneur">Entrepreneur</option>
            <option value="Content Creator">Content Creator</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Interests:</label>
          <select
            multiple
            value={user.interests}
            onChange={(e) => setUser({ ...user, interests: Array.from(e.target.selectedOptions, option => option.value) })}
            className="mt-1 p-2 w-full border rounded"
          >
            {user.profession === 'Marketing Professional' && (
              <>
                <option value="Growth marketing">Growth marketing</option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="Product Marketing">Product Marketing</option>
                <option value="Paid marketing">Paid marketing</option>
                <option value="Organic marketing">Organic marketing</option>
              </>
            )}
            {user.profession === 'Entrepreneur' && (
              <>
                <option value="Startup enthusiast">Startup enthusiast</option>
                <option value="SME">SME</option>
                <option value="Product enthusiast">Product enthusiast</option>
                <option value="Product Leader">Product Leader</option>
                <option value="Product owner">Product owner</option>
              </>
            )}
            {user.profession === 'Content Creator' && (
              <>
                <option value="Youtube">Youtube</option>
                <option value="Twitch">Twitch</option>
                <option value="Twitter">Twitter</option>
                <option value="Video Content">Video Content</option>
              </>
            )}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Bio:</label>
          <textarea
            value={user.bio}
            onChange={(e) => setUser({ ...user, bio: e.target.value })}
            maxLength="50"
            className="mt-1 p-2 w-full border rounded"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Number:</label>
          <input
            type="text"
            value={user.Number}
            onChange={(e) => setUser({ ...user, Number: e.target.value })}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button type="button" onClick={handleUpdate} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Update</button>
        <button type="button" onClick={handleDelete} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 mt-4">Delete</button>
        <button type="button" onClick={handleLogout} className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 mt-4">Logout</button>

      </form>
    </div>
  );
};

export default Dashboard;
