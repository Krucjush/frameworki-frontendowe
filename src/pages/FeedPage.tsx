import { useEffect, useState } from 'react';
import { getAlbums, getPhotos, createAlbum } from '../api/albumsApi';
import AlbumCard from '../components/AlbumCard';
import { addPhoto } from '../api/albumsApi';

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
  const [newAlbumTitle, setNewAlbumTitle] = useState('');
  const [expandedAlbumIds, setExpandedAlbumIds] = useState<Set<number>>(new Set());
  const currentUserId = JSON.parse(localStorage.getItem('user') || '{}').id;

  useEffect(() => {
    // Fetch albums initially
    getAlbums()
      .then((albumsResponse) => {
        setAlbums(albumsResponse || []);
      })
      .catch((error) => console.error('Error fetching albums:', error));
  }, []);

  // Appends photo to the appropriate album
  const handleAddPhoto = (newPhoto: Photo) => {
    addPhoto(newPhoto)
      .then((createdPhoto) => {
        setAlbums((prevAlbums) =>
          prevAlbums.map((album) =>
            album.id === createdPhoto.albumId
              ? {
                  ...album,
                  photos: album.photos ? [...album.photos, createdPhoto] : [createdPhoto],
                }
              : album
          )
        );
      })
      .catch((error) => console.error('Error adding photo:', error));
  };

  // Removes a photo from the album
  const handleDeletePhoto = (photoId: number) => {
    const updatedAlbums = albums.map((album) => {
      album.photos = album.photos?.filter((photo) => photo.id !== photoId);
      return album;
    });

    setAlbums(updatedAlbums);
  };

  // Creates a new album
  const handleCreateAlbum = () => {
    if (newAlbumTitle.trim() !== '') {
      const newAlbum = {
        userId: currentUserId,
        title: newAlbumTitle,
      };

      createAlbum(newAlbum)
        .then((createdAlbum) => {
          setAlbums((prevAlbums) => [...prevAlbums, createdAlbum]);
          setNewAlbumTitle('');
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
        loadPhotosForAlbum(albumId); // Fetch photos when expanding the album
      }
      return updatedExpandedAlbumIds;
    });
  };

  // Fetches photos for a specific album
  const loadPhotosForAlbum = (albumId: number) => {
    getPhotos()
      .then((photosResponse) => {
        const albumPhotos = photosResponse.filter((photo: Photo) => photo.albumId === albumId);
        setAlbums((prevAlbums) =>
          prevAlbums.map((album) =>
            album.id === albumId
              ? { ...album, photos: albumPhotos }  // Make sure to update the photos array here
              : album
          )
        );
      })
      .catch((error) => console.error('Error fetching photos:', error));
  };

  return (
    <div>
      <h1>Albums</h1>
      <div>
        <input
          type="text"
          value={newAlbumTitle}
          onChange={(e) => setNewAlbumTitle(e.target.value)}
          placeholder="Enter album title"
        />
        <button onClick={handleCreateAlbum}>Create Album</button>
      </div>

      {/* Render albums */}
      {albums.map((album) => (
        <AlbumCard
          key={album.id}
          album={album}
          onAddPhoto={handleAddPhoto}
          onDeletePhoto={handleDeletePhoto}
          currentUserId={currentUserId}
          onToggleExpand={() => handleToggleExpand(album.id)}
          isExpanded={expandedAlbumIds.has(album.id)}
          loadPhotos={() => loadPhotosForAlbum(album.id)}
        />
      ))}
    </div>
  );
};

export default FeedPage;
