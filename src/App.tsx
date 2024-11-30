import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import FeedPage from './pages/FeedPage';
import UserPage from './pages/UserPage';
import PostPage from './pages/PostPage';
import SearchPage from './pages/SearchPage';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <AuthProvider>
      <Navbar />
      <main style={{ paddingTop: '70px' }}> {/* Increased padding for navbar space */}
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<FeedPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </main>
    </AuthProvider>
  );
};

export default App;
