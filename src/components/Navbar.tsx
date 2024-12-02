import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isLoggedIn = !!user?.id;
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleUserPageRedirect = () => {
    navigate('/user');
  };

  return (
    <header className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-home">Home</Link>
      </div>
      <div className="navbar-right">
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
