import { useEffect, useState } from 'react';
import { getAlbums, createAlbum, getPhotos } from '../api/albumsApi';
import AlbumCard from '../components/AlbumCard';
import '../styles.css'

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

const FeedPage = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [filteredAlbums, setFilteredAlbums] = useState<Album[]>([]);
  const [newAlbumTitle, setNewAlbumTitle] = useState('');
  const [expandedAlbumIds, setExpandedAlbumIds] = useState<Set<number>>(new Set());
  const [selectedUserId, setSelectedUserId] = useState<number | 'all'>('all');
  const currentUserId = JSON.parse(localStorage.getItem('user') || '{}').id;

  const getAlbumsFromLocalStorage = (): Album[] => {
    return JSON.parse(localStorage.getItem('albums') || '[]');
  };

  const saveAlbumsToLocalStorage = (albums: Album[]) => {
    localStorage.setItem('albums', JSON.stringify(albums));
  };

  useEffect(() => {
    const fetchAlbumsAndPhotos = async () => {
      try {
        const savedAlbums = getAlbumsFromLocalStorage();
        if (savedAlbums.length > 0) {
          setAlbums(savedAlbums);
        } else {
          const albumsResponse = await getAlbums();
          const photosResponse = await getPhotos();
  
          const albumsWithPhotos = albumsResponse.map((album: Album) => ({
            ...album,
            photos: photosResponse.filter((photo: Photo) => photo.albumId === album.id),
          }));
  
          setAlbums(albumsWithPhotos);
          saveAlbumsToLocalStorage(albumsWithPhotos);
        }
      } catch (error) {
        console.error('Error fetching albums and photos:', error);
      }
    };
  
    fetchAlbumsAndPhotos();
  }, []);

  useEffect(() => {
    if (selectedUserId === 'all') {
      setFilteredAlbums(albums);
    } else {
      setFilteredAlbums(albums.filter((album) => album.userId === selectedUserId));
    }
  }, [albums, selectedUserId]);

  const uniqueUserIds = Array.from(new Set(albums.map((album) => album.userId)));

  const handleAddPhoto = (albumId: number, newPhoto: Photo) => {
    setAlbums((prevAlbums) => {
      const updatedAlbums = prevAlbums.map((album) => {
        if (album.id === albumId) {
          const updatedPhotos = album.photos ? [...album.photos, newPhoto] : [newPhoto];
          return { ...album, photos: updatedPhotos };
        }
        return album;
      });

      saveAlbumsToLocalStorage(updatedAlbums);
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

      saveAlbumsToLocalStorage(updatedAlbums);
      return updatedAlbums;
    });
  };

  const handleCreateAlbum = () => {
    if (!currentUserId) {
      alert('Please log in to create an album.');
      return;
    }

    if (newAlbumTitle.trim() !== '') {
      const newAlbum = {
        id: Date.now(),
        userId: currentUserId,
        title: newAlbumTitle,
        photos: [],
      };

      setAlbums((prevAlbums) => {
        const updatedAlbums = [...prevAlbums, newAlbum];
        saveAlbumsToLocalStorage(updatedAlbums);
        return updatedAlbums;
      });

      createAlbum(newAlbum)
        .then(() => {
          setNewAlbumTitle('');
        })
        .catch((error) => console.error('Error creating album:', error));
    }
  };

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

  return (
    <div className="container">
      <h1>Albums</h1>
  
      <div>
        <label htmlFor="userFilter">Filter by User:</label>
        <select
          id="userFilter"
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value === 'all' ? 'all' : Number(e.target.value))}
        >
          <option value="all">All Users</option>
          {uniqueUserIds.map((userId) => (
            <option key={userId} value={userId}>
              User {userId}
            </option>
          ))}
        </select>
      </div>
  
      {currentUserId ? (
        <div style={{ margin: '20px 0' }}>
          <input
            type="text"
            value={newAlbumTitle}
            onChange={(e) => setNewAlbumTitle(e.target.value)}
            placeholder="Enter album title"
          />
          <button onClick={handleCreateAlbum}>Create Album</button>
        </div>
      ) : (
        <p style={{ color: 'red' }}>Please log in to create albums.</p>
      )}
  
      {filteredAlbums.map((album) => (
        <AlbumCard
          key={album.id}
          album={album}
          onAddPhoto={(photo) => handleAddPhoto(album.id, photo)}
          onDeletePhoto={(photoId) => handleDeletePhoto(album.id, photoId)}
          currentUserId={currentUserId}
          onToggleExpand={() => handleToggleExpand(album.id)}
          isExpanded={expandedAlbumIds.has(album.id)}
        />
      ))}
    </div>
  );
};

export default FeedPage;
