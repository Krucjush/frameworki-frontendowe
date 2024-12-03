import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AlbumCard from '../components/AlbumCard';

interface Photo {
  id: number;
  title: string;
  url: string;
  albumId: number;
  thumbnailUrl: string;
  userId: number;
}

interface Album {
  id: number;
  title: string;
  userId: number;
  photos?: Photo[];
}

const UserPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem('user') || '{}');
  });

  const [albums, setAlbums] = useState<Album[]>([]);
  const [newUsername, setNewUsername] = useState(user.username || '');
  const [expandedAlbumIds, setExpandedAlbumIds] = useState<Set<number>>(new Set());
  const [newAlbumTitle, setNewAlbumTitle] = useState('');
  const [showAddAlbumForm, setShowAddAlbumForm] = useState(false);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUsername(e.target.value);
  };

  const handleSave = () => {
    const updatedUser = { ...user, username: newUsername };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    alert('Username updated successfully!');
    navigate('/user');
  };

  useEffect(() => {
    const savedAlbums = JSON.parse(localStorage.getItem('albums') || '[]');
    setAlbums(savedAlbums.filter((album: Album) => album.userId === user.id));
  }, [user.id]);

  const handleToggleExpand = (albumId: number) => {
    setExpandedAlbumIds((prevExpandedAlbumIds) => {
      const updatedExpandedAlbumIds = new Set(prevExpandedAlbumIds);
      if (updatedExpandedAlbumIds.has(albumId)) {
        updatedExpandedAlbumIds.delete(albumId);
      } else {
        updatedExpandedAlbumIds.add(albumId);
      }
      return updatedExpandedAlbumIds;
    });
  };

  const handleAddPhoto = (albumId: number, newPhoto: Photo) => {
    setAlbums((prevAlbums) => {
      const updatedAlbums = prevAlbums.map((album) => {
        if (album.id === albumId) {
          const updatedPhotos = album.photos ? [...album.photos, newPhoto] : [newPhoto];
          return { ...album, photos: updatedPhotos };
        }
        return album;
      });

      const allAlbums = JSON.parse(localStorage.getItem('albums') || '[]');
      const otherUsersAlbums = allAlbums.filter((album: Album) => album.userId !== user.id);
      localStorage.setItem('albums', JSON.stringify([...otherUsersAlbums, ...updatedAlbums]));

      return updatedAlbums;
    });
  };

  const handleDeletePhoto = (albumId: number, photoId: number) => {
    setAlbums((prevAlbums) => {
      const updatedAlbums = prevAlbums.map((album) => {
        if (album.id === albumId) {
          const updatedPhotos = album.photos ? album.photos.filter((photo) => photo.id !== photoId) : [];
          return { ...album, photos: updatedPhotos };
        }
        return album;
      });

      const allAlbums = JSON.parse(localStorage.getItem('albums') || '[]');
      const otherUsersAlbums = allAlbums.filter((album: Album) => album.userId !== user.id);
      localStorage.setItem('albums', JSON.stringify([...otherUsersAlbums, ...updatedAlbums]));

      return updatedAlbums;
    });
  };

  const handleAddAlbum = () => {
    if (!newAlbumTitle.trim()) {
      alert('Album title cannot be empty!');
      return;
    }

    const newAlbum: Album = {
      id: Date.now(),
      title: newAlbumTitle,
      userId: user.id,
      photos: [],
    };

    const updatedAlbums = [...albums, newAlbum];
    setAlbums(updatedAlbums);

    const allAlbums = JSON.parse(localStorage.getItem('albums') || '[]');
    localStorage.setItem('albums', JSON.stringify([...allAlbums, newAlbum]));

    setNewAlbumTitle('');
    setShowAddAlbumForm(false);
  };

  return (
    <div className="container">
      <h1>User Profile</h1>
      <div className="user-card">
        <p>
          <strong>User ID:</strong> {user.id}
        </p>
        <div className="user-edit">
          <label htmlFor="username">
            <strong>Username:</strong>
          </label>
          <input
            id="username"
            type="text"
            value={newUsername}
            onChange={handleUsernameChange}
          />
        </div>
        <button onClick={handleSave} className="save-button">
          Save Changes
        </button>
      </div>

      <h2>Your Albums</h2>
      {albums.length > 0 ? (
        albums.map((album) => (
          <AlbumCard
            key={album.id}
            album={album}
            onAddPhoto={(photo) => handleAddPhoto(album.id, photo)}
            onDeletePhoto={(photoId) => handleDeletePhoto(album.id, photoId)}
            currentUserId={user.id}
            onToggleExpand={() => handleToggleExpand(album.id)}
            isExpanded={expandedAlbumIds.has(album.id)}
          />
        ))
      ) : (
        <p>No albums available.</p>
      )}
      <button onClick={() => setShowAddAlbumForm(true)} className="add-album-button">
        Add Album
      </button>
      {showAddAlbumForm && (
        <div className="add-album-form">
          <input
            type="text"
            value={newAlbumTitle}
            placeholder="Enter album title"
            onChange={(e) => setNewAlbumTitle(e.target.value)}
          />
          <button onClick={handleAddAlbum}>Add</button>
          <button onClick={() => setShowAddAlbumForm(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default UserPage;
