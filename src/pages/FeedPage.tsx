import { useEffect, useState } from 'react';
import { getAlbums, createAlbum } from '../api/albumsApi';
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
  photos?: Photo[]; // Photos are part of the album
}

const FeedPage = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [newAlbumTitle, setNewAlbumTitle] = useState('');
  const [expandedAlbumIds, setExpandedAlbumIds] = useState<Set<number>>(new Set());
  const currentUserId = JSON.parse(localStorage.getItem('user') || '{}').id;

  // Helper functions for LocalStorage
  const getAlbumsFromLocalStorage = (): Album[] => {
    return JSON.parse(localStorage.getItem('albums') || '[]');
  };

  const saveAlbumsToLocalStorage = (albums: Album[]) => {
    localStorage.setItem('albums', JSON.stringify(albums));
  };

  // Fetch albums initially and sync with localStorage
  useEffect(() => {
    const savedAlbums = getAlbumsFromLocalStorage();
    if (savedAlbums.length > 0) {
      setAlbums(savedAlbums); // Use saved albums if available
    } else {
      getAlbums()
        .then((albumsResponse) => {
          setAlbums(albumsResponse || []);
          saveAlbumsToLocalStorage(albumsResponse || []); // Save to LocalStorage
        })
        .catch((error) => console.error('Error fetching albums:', error));
    }
  }, []);

  // Appends photo to the appropriate album's photos in localStorage
  const handleAddPhoto = (albumId: number, newPhoto: Photo) => {
    setAlbums((prevAlbums) => {
      const updatedAlbums = prevAlbums.map((album) => {
        if (album.id === albumId) {
          // Append the new photo to the album's photos array
          const updatedPhotos = album.photos ? [...album.photos, newPhoto] : [newPhoto];
          return { ...album, photos: updatedPhotos };
        }
        return album;
      });

      saveAlbumsToLocalStorage(updatedAlbums); // Save updated albums to localStorage
      return updatedAlbums;
    });
  };

  // Removes a photo from the album and saves to localStorage
  const handleDeletePhoto = (albumId: number, photoId: number) => {
    setAlbums((prevAlbums) => {
      const updatedAlbums = prevAlbums.map((album) => {
        if (album.id === albumId) {
          // Filter photos, and ensure updatedPhotos is not undefined
          const updatedPhotos = album.photos ? album.photos.filter((photo) => photo.id !== photoId) : [];
  
          // Return a new album object with updated photos (could be an empty array)
          return {
            ...album,
            photos: updatedPhotos.length > 0 ? updatedPhotos : [], // Ensure we return an empty array if no photos left
          };
        }
        return album;
      });
  
      saveAlbumsToLocalStorage(updatedAlbums);
      return updatedAlbums; // Return updated state
    });
  };
  
  

  // Creates a new album and saves it to LocalStorage
  const handleCreateAlbum = () => {
    if (!currentUserId) {
      alert('Please log in to create an album.');
      return;
    }

    if (newAlbumTitle.trim() !== '') {
      const newAlbum = {
        id: Date.now(), // Temporarily use current timestamp as album ID
        userId: currentUserId,
        title: newAlbumTitle,
        photos: [],
      };

      setAlbums((prevAlbums) => {
        const updatedAlbums = [...prevAlbums, newAlbum];
        saveAlbumsToLocalStorage(updatedAlbums); // Save to LocalStorage
        return updatedAlbums;
      });

      createAlbum(newAlbum)
        .then(() => {
          setNewAlbumTitle(''); // Reset album title input
        })
        .catch((error) => console.error('Error creating album:', error));
    }
  };

  // Expands or collapses album view
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
    <div>
      <h1>Albums</h1>
      {currentUserId ? (
        <div>
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

      {albums.map((album) => (
        <AlbumCard
          key={album.id}
          album={album}
          onAddPhoto={(photo) => handleAddPhoto(album.id, photo)} // Add photo to album
          onDeletePhoto={(photoId) => handleDeletePhoto(album.id, photoId)} // Delete photo from album
          currentUserId={currentUserId}
          onToggleExpand={() => handleToggleExpand(album.id)}
          isExpanded={expandedAlbumIds.has(album.id)}
        />
      ))}
    </div>
  );
};

export default FeedPage;
