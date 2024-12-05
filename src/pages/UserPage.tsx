import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AlbumCard from '../components/AlbumCard';

interface Photo {
  id: number;
  title: string;
  url: string;
  albumId: number;
  thumbnailUrl: string;
}

interface Album {
  id: number;
  title: string;
  userId: number;
  photos?: Photo[];
}

const UserPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [albums, setAlbums] = useState<Album[]>([]);
  const [newUsername, setNewUsername] = useState(user?.username || '');
  const [expandedAlbumIds, setExpandedAlbumIds] = useState<Set<number>>(new Set());
  const [newAlbumTitle, setNewAlbumTitle] = useState('');
  const [showAddAlbumForm, setShowAddAlbumForm] = useState(false);

  useEffect(() => {
    const fetchAlbums = async () => {
      if (id) {
        const savedAlbums = JSON.parse(localStorage.getItem('albums') || '[]');
        setAlbums(savedAlbums.filter((album: Album) => album.userId === parseInt(id)));
      } else if (user) {
        const savedAlbums = JSON.parse(localStorage.getItem('albums') || '[]');
        setAlbums(savedAlbums.filter((album: Album) => album.userId === user.id));
      }
    };
    fetchAlbums();
  }, [id, user]);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUsername(e.target.value);
  };

  const handleSave = () => {
    if (!newUsername.trim()) {
      alert('Username cannot be empty!');
      return;
    }
    const updatedUser = { ...user, username: newUsername };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    alert('Username updated successfully!');
    navigate('/user');
  };

  const handleToggleExpand = (albumId: number) => {
    setExpandedAlbumIds((prevIds) => {
      const updatedIds = new Set(prevIds);
      updatedIds.has(albumId) ? updatedIds.delete(albumId) : updatedIds.add(albumId);
      return updatedIds;
    });
  };

  const handleAddPhoto = (albumId: number, newPhoto: Photo) => {
    const updatedAlbums = albums.map((album) => {
      if (album.id === albumId) {
        return { ...album, photos: [...(album.photos || []), newPhoto] };
      }
      return album;
    });
    setAlbums(updatedAlbums);
    saveAlbumsToStorage(updatedAlbums);
  };

  const handleDeletePhoto = (albumId: number, photoId: number) => {
    const updatedAlbums = albums.map((album) => {
      if (album.id === albumId) {
        return { ...album, photos: album.photos?.filter((photo) => photo.id !== photoId) };
      }
      return album;
    });
    setAlbums(updatedAlbums);
    saveAlbumsToStorage(updatedAlbums);
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
    saveAlbumsToStorage(updatedAlbums);
    setNewAlbumTitle('');
    setShowAddAlbumForm(false);
  };

  const saveAlbumsToStorage = (updatedAlbums: Album[]) => {
    const allAlbums = JSON.parse(localStorage.getItem('albums') || '[]');
    const otherUsersAlbums = allAlbums.filter((album: Album) => album.userId !== user.id);
    localStorage.setItem('albums', JSON.stringify([...otherUsersAlbums, ...updatedAlbums]));
  };

  if (!user && !id) {
    return <p>User not found. Please log in.</p>;
  }

  return (
    <div className="container">
      <h1>{id ? `User Profile (ID: ${id})` : 'Your Profile'}</h1>
      {id ? (
        <p>Viewing albums of user with ID: {id}</p>
      ) : (
        <div className="user-card">
          <p>
            <strong>User ID:</strong> {user?.id}
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
              placeholder="Enter new username"
            />
          </div>
          <button onClick={handleSave} className="save-button" disabled={!newUsername.trim()}>
            Save Changes
          </button>
        </div>
      )}

      <h2>{id ? 'User\'s Albums' : 'Your Albums'}</h2>
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

      {!id && (
        <button onClick={() => setShowAddAlbumForm(true)} className="add-album-button">
          Add Album
        </button>
      )}

      {showAddAlbumForm && !id && (
        <div className="add-album-form">
          <input
            type="text"
            value={newAlbumTitle}
            placeholder="Enter album title"
            onChange={(e) => setNewAlbumTitle(e.target.value)}
          />
          <button onClick={handleAddAlbum} disabled={!newAlbumTitle.trim()}>
            Add
          </button>
          <button onClick={() => setShowAddAlbumForm(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default UserPage;
