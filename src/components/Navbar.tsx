import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { searchUsers } from '../api/usersApi';
import { getPhotoById } from '../api/photosApi'; // Import the function to fetch photos

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isLoggedIn = !!user?.id;
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [photoSearchQuery, setPhotoSearchQuery] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleUserPageRedirect = () => {
    navigate('/user');
  };

  const handleSearchUser = async () => {
    if (!searchQuery.trim()) {
      alert('Please enter a name to search.');
      return;
    }

    try {
      console.log('Searching for:', searchQuery);
      const response = await searchUsers(searchQuery);
      console.log('Search response:', response);
      if (response.data.length === 0) {
        alert('No user found.');
      } else {
        navigate(`/user/${response.data[0].id}`);
      }
    } catch (error) {
      console.error('Error searching for users:', error);
      alert('Failed to search for users.');
    }
  };

  const handleSearchPhoto = async () => {
    if (!photoSearchQuery.trim()) {
      alert('Please enter a photo ID to search.');
      return;
    }

    try {
      const photoId = parseInt(photoSearchQuery, 10);
      if (isNaN(photoId)) {
        alert('Invalid photo ID. Please enter a number.');
        return;
      }

      const response = await getPhotoById(photoId);
      if (!response.data) {
        alert('No photo found with this ID.');
      } else {
        navigate(`/photo/${photoId}`);
      }
    } catch (error) {
      console.error('Error searching for photo:', error);
      alert('Failed to search for photo.');
    }
  };

  return (
    <header className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-home">Home</Link>
      </div>
      <div className="navbar-right">
        <div className="navbar-search">
          <input
            type="text"
            value={searchQuery}
            placeholder="Search users..."
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearchUser}>Search</button>
        </div>
        <div className="navbar-search">
          <input
            type="text"
            value={photoSearchQuery}
            placeholder="Search photo by ID..."
            onChange={(e) => setPhotoSearchQuery(e.target.value)}
          />
          <button onClick={handleSearchPhoto}>Search Photo</button>
        </div>
        {isLoggedIn ? (
          <>
            <button onClick={handleUserPageRedirect} className="navbar-welcome-button">Welcome, {user.username}</button>
            <button onClick={handleLogout} className="navbar-logout">Logout</button>
          </>
        ) : (
          <Link to="/login" className="navbar-login">Login</Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;
