import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { searchUsers } from '../api/usersApi';

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isLoggedIn = !!user?.id;
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleUserPageRedirect = () => {
    navigate('/user');
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      alert('Please enter a name to search.');
      return;
    }
  
    try {
      console.log("Searching for:", searchQuery);
      const response = await searchUsers(searchQuery);
      console.log("Search response:", response);
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
          <button onClick={handleSearch}>Search</button>
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
