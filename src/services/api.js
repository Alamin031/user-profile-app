import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000/';

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}api/register`, userData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to register user');
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}api/login`, userData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to login user');
  }
};

export const getUserProfile = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Token not found in local storage');
  }

  try {
    const response = await axios.get(`${API_URL}api/users/getUserProfile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch user profile');
  }
};

export const updateUserProfile = async (userData) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Token not found in local storage');
  }

  try {
    const response = await axios.put(`${API_URL}api/users/updateUserProfile/${userData._id}`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to update user profile');
  }
};

export const deleteUserProfile = async (userId) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Token not found in local storage');
  }

  try {
    const response = await axios.delete(`${API_URL}api/users/deleteUser/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to delete user profile');
  }
};
