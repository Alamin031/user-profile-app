import React, { useEffect, useState } from 'react';
import { getUserProfile, deleteUserProfile } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile();
        setProfile(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

  const handleDelete = async () => {
    try {
      await deleteUserProfile(profile._id);
      localStorage.removeItem('token');
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <p>Name: {profile.name}</p>
      <p>Email: {profile.email}</p>
      <p>Profession: {profile.profession}</p>
      <p>Interests: {profile.interests.join(', ')}</p>
      <p>Bio: {profile.bio}</p>
      <button onClick={() => navigate('/edit-profile')}>Edit Profile</button>
      <button onClick={handleDelete}>Delete Profile</button>
    </div>
  );
};

export default Dashboard;
