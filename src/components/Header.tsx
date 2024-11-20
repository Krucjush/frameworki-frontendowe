import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user } = useAuth();

  return (
    <header>
      <h1>Welcome to the App</h1>
      {user ? (
        <div>
          <p>Logged in as: {user.username}</p>
        </div>
      ) : (
        <p>Not logged in</p>
      )}
    </header>
  );
};

export default Header;