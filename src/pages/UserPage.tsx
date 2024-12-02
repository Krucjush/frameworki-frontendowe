import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem('user') || '{}');
  });

  const [newUsername, setNewUsername] = useState(user.username || '');

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUsername(e.target.value);
  };

  const handleSave = () => {
    const updatedUser = { ...user, username: newUsername };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    alert('Username updated successfully!');
    navigate('/user')
  };

  return (
    <div className="container">
      <h1>User Profile</h1>
      <div className="user-card">
        <p>
          <strong>User ID:</strong> {user.id}
        </p>
        <div className="user-edit">
          <label htmlFor="username">
            <strong>Username:</strong>
          </label>
          <input
            id="username"
            type="text"
            value={newUsername}
            onChange={handleUsernameChange}
          />
        </div>
        <button onClick={handleSave} className="save-button">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default UserPage;
