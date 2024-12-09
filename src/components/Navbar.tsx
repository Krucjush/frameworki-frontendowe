import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { searchUsers } from '../api/usersApi';

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isLoggedIn = !!user?.id;
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [photoSearchQuery, setPhotoSearchQuery] = useState('');
  const [albumSearchQuery, setAlbumSearchQuery] = useState('');

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
      const response = await searchUsers(searchQuery);
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

      navigate(`/photo/${photoId}`);
    } catch (error) {
      console.error('Error searching for photo:', error);
      alert('Failed to search for photo.');
    }
  };

  const handleSearchAlbum = async () => {
    if (!albumSearchQuery.trim()) {
      alert('Please enter an album ID to search.');
      return;
    }

    try {
      const albumId = parseInt(albumSearchQuery, 10);
      if (isNaN(albumId)) {
        alert('Invalid album ID. Please enter a number.');
        return;
      }

      navigate(`/album/${albumId}`);
    } catch (error) {
      console.error('Error searching for album:', error);
      alert('Failed to search for album.');
    }
  };

  return (
    <header className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-home">Home</Link>
        <Link to="/posts" className="navbar-posts">Posts</Link>
      </div>
      <div className="navbar-right">
        <div className="navbar-search">
          <input
            type="text"
            value={searchQuery}
            placeholder="Search users..."
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearchUser}>Search User</button>
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
        <div className="navbar-search">
          <input
            type="text"
            value={albumSearchQuery}
            placeholder="Search album by ID..."
            onChange={(e) => setAlbumSearchQuery(e.target.value)}
          />
          <button onClick={handleSearchAlbum}>Search Album</button>
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
