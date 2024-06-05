import React, { useState } from 'react';
import { loginUser } from '../services/api';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser({ email, password });
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold mb-8 text-blue-600">Login</h2>
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-96">
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 p-3 w-full border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 p-3 w-full border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        {error && <p className="text-red-500 mb-6">{error}</p>}
        <button type="submit" className="bg-blue-500 text-white py-3 px-6 rounded hover:bg-blue-600 w-full">Login</button>
      </form>
      {/* Use Link for navigation */}
      <Link to="/register" className="mt-6 text-blue-600 hover:underline">Don't have an account? Sign up</Link>
    </div>
  );
};

export default Login;
