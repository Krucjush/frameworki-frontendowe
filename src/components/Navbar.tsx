import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isLoggedIn = !!user?.id;
  const navigate = useNavigate(); // Hook for navigation

  const handleLogout = () => {
    localStorage.removeItem('user'); // Remove user from localStorage
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <header style={headerStyle}>
      <div style={leftStyle}>
        <Link to="/" style={homeButtonStyle}>Home</Link>
      </div>
      <div style={rightStyle}>
        {isLoggedIn ? (
          <>
            <span style={welcomeTextStyle}>Welcome {user.username}</span>
            <button onClick={handleLogout} style={logoutButtonStyle}>Logout</button>
          </>
        ) : (
          <Link to="/login" style={loginButtonStyle}>Login</Link>
        )}
      </div>
    </header>
  );
};

const headerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 20px',
  backgroundColor: '#fff',
  borderBottom: '2px solid #ccc',
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  zIndex: 1000,
  boxSizing: 'border-box', // Ensures padding is included in the total width
};

const leftStyle: React.CSSProperties = {
  fontSize: '1.5rem',
  flexGrow: 1,  // Allow the left side to take up available space
};

const rightStyle: React.CSSProperties = {
  fontSize: '1rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end', // Align the content to the right
  flexShrink: 0,  // Prevent shrinking of the right section
  minWidth: '120px',  // Ensure enough space for the welcome text or login button
  overflow: 'hidden',  // Prevent text from overflowing
  textOverflow: 'ellipsis',  // Add ellipsis if the content is too long
};

const homeButtonStyle: React.CSSProperties = {
  fontSize: '2rem',
  fontWeight: 'bold',
  color: '#333',
  textDecoration: 'none',
  cursor: 'pointer',
};

const loginButtonStyle: React.CSSProperties = {
  fontSize: '1rem',
  color: '#007bff',
  textDecoration: 'none',
};

const welcomeTextStyle: React.CSSProperties = {
  fontSize: '1rem',
  fontWeight: 'bold',
  marginRight: '10px', // Add spacing between the username and the logout button
};

const logoutButtonStyle: React.CSSProperties = {
  fontSize: '1rem',
  color: '#d9534f', // Bootstrap danger color (red)
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  padding: '5px 10px',
  textDecoration: 'none',
};

export default Navbar;
