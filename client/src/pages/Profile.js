import React from 'react';

const Profile = () => {
  const name = localStorage.getItem("userName");
  const userId = localStorage.getItem("userId");

  return (
    <div className="page">
      <h2>👤 Profile</h2>
      <p><strong>Name:</strong> {name}</p>
      <p><strong>User ID:</strong> {userId}</p>
    </div>
  );
};

export default Profile;
