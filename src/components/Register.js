import React, { useState } from 'react';
import { registerUser } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profession, setProfession] = useState('');
  const [interests, setInterests] = useState([]);
  const [bio, setBio] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerUser({ name, email, password, profession, interests, bio });
      navigate('/login');
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  const handleProfessionChange = (e) => {
    setProfession(e.target.value);
    setInterests([]);
  };

  const handleInterestsChange = (e) => {
    const selectedInterests = Array.from(e.target.selectedOptions, option => option.value);
    setInterests(selectedInterests);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleRegister} className="bg-white p-6 rounded shadow-md w-80">
        <div className="mb-4">
          <label className="block text-gray-700">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 p-2 w-full border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 p-2 w-full border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 p-2 w-full border rounded"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700">Profession:</label>
          <select
            value={profession}
            onChange={handleProfessionChange}
            className="mt-1 p-2 w-full border rounded"
            required
          >
            <option value="">Select Profession</option>
            <option value="Marketing Professional">Marketing Professional</option>
            <option value="Entrepreneur">Entrepreneur</option>
            <option value="Content Creator">Content Creator</option>
          </select>
        </div>
        {profession && (
          <div className="mb-4">
            <label className="block text-gray-700">Interests:</label>
            <select
              multiple
              value={interests}
              onChange={handleInterestsChange}
              className="mt-1 p-2 w-full border rounded"
            >
              {profession === 'Marketing Professional' && (
                <>
                  <option value="Growth marketing">Growth marketing</option>
                  <option value="Digital Marketing">Digital Marketing</option>
                  <option value="Product Marketing">Product Marketing</option>
                  <option value="Paid marketing">Paid marketing</option>
                  <option value="Organic marketing">Organic marketing</option>
                </>
              )}
              {profession === 'Entrepreneur' && (
                <>
                  <option value="Startup enthusiast">Startup enthusiast</option>
                  <option value="SME">SME</option>
                  <option value="Product enthusiast">Product enthusiast</option>
                  <option value="Product Leader">Product Leader</option>
                  <option value="Product owner">Product owner</option>
                </>
              )}
              {profession === 'Content Creator' && (
                <>
                  <option value="Youtube">Youtube</option>
                  <option value="Twitch">Twitch</option>
                  <option value="Twitter">Twitter</option>
                  <option value="Video Content">Video Content</option>
                </>
              )}
            </select>
          </div>
        )}
        <div className="mb-4">
          <label className="block text-gray-700">Bio:</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            maxLength="50"
            className="mt-1 p-2 w-full border rounded"
            required
          ></textarea>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Register</button>
      </form>
    </div>
  );
};

export default Register;
