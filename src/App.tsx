import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import FeedPage from './pages/FeedPage';
import UserPage from './pages/UserPage';
import PostPage from './pages/PostPage';
import SearchPage from './pages/SearchPage';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import SearchedUserPage from './pages/SearchedUserPage';
import PhotoDetailsPage from './pages/PhotoDetailsPage';
import AlbumPage from './pages/AlbumPage';

const App = () => {
  return (
    <AuthProvider>
      <Navbar />
      <main style={{ paddingTop: '70px' }}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<FeedPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/user/:userId" element={<SearchedUserPage />} />
          <Route path="/posts" element={<PostPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/photo/:photoId" element={<PhotoDetailsPage />} />
          <Route path="/album/:albumId" element={<AlbumPage />} />
        </Routes>
      </main>
    </AuthProvider>
  );
};

export default App;
