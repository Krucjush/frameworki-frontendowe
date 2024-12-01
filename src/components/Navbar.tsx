import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isLoggedIn = !!user?.id;
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <header className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-home">Home</Link>
      </div>
      <div className="navbar-right">
        {isLoggedIn ? (
          <>
            <span className="navbar-welcome">Welcome, {user.username}</span>
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
