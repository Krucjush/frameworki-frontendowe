import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getUserById, updateUserById } from '../api/usersApi';

const UserPage = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState<any>(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (user) {
      getUserById(user.id)
        .then((response) => setUserData(response.data))
        .catch((error) => console.error('Error fetching user:', error));
    }
  }, [user]);

  const handleEdit = () => setEditing(true);

  const handleSave = () => {
    if (userData) {
      updateUserById(user.id, userData)
        .then(() => setEditing(false))
        .catch((error) => console.error('Error updating user:', error));
    }
  };

  return (
    <div>
      <h1>Your Profile</h1>
      {userData && (
        <div>
          <label>Name:</label>
          {editing ? (
            <input
              type="text"
              value={userData.name}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
            />
          ) : (
            <p>{userData.name}</p>
          )}
          <label>Email:</label>
          {editing ? (
            <input
              type="email"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
          ) : (
            <p>{userData.email}</p>
          )}
          <button onClick={editing ? handleSave : handleEdit}>
            {editing ? 'Save' : 'Edit'}
          </button>
        </div>
      )}
    </div>
  );
};

export default UserPage;
