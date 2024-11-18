import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import FeedPage from './pages/FeedPage';
import UserPage from './pages/UserPage';
import PostPage from './pages/PostPage';
import SearchPage from './pages/SearchPage';
import { AuthProvider } from './context/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<FeedPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
