import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AlbumCard from '../components/AlbumCard';
import { getUserById } from '../api/usersApi';

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

const SearchedUserPage = () => {
  const { userId } = useParams<{ userId?: string }>();
  const [user, setUser] = useState<any>(null);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [expandedAlbumIds, setExpandedAlbumIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    const fetchUser = async () => {
      if (userId) {
        try {
          const response = await getUserById(Number(userId));
          setUser(response.data);
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }
    };

    const fetchAlbums = async () => {
      if (userId) {
        const savedAlbums = JSON.parse(localStorage.getItem('albums') || '[]');
        setAlbums(savedAlbums.filter((album: Album) => album.userId === parseInt(userId)));
      }
    };

    fetchUser();
    fetchAlbums();
  }, [userId]);

  const handleToggleExpand = (albumId: number) => {
    setExpandedAlbumIds((prevIds) => {
      const updatedIds = new Set(prevIds);
      updatedIds.has(albumId) ? updatedIds.delete(albumId) : updatedIds.add(albumId);
      return updatedIds;
    });
  };

  const handleAddPhoto = (newPhoto: Photo) => {
    const updatedAlbums = albums.map((album) => {
      if (album.id === newPhoto.albumId) {
        return { ...album, photos: [...(album.photos || []), newPhoto] };
      }
      return album;
    });
    setAlbums(updatedAlbums);
    localStorage.setItem('albums', JSON.stringify(updatedAlbums));
  };

  const handleDeletePhoto = (photoId: number) => {
    const updatedAlbums = albums.map((album) => {
      return {
        ...album,
        photos: album.photos?.filter((photo) => photo.id !== photoId),
      };
    });
    setAlbums(updatedAlbums);
    localStorage.setItem('albums', JSON.stringify(updatedAlbums));
  };

  if (!user) {
    return <p>Loading user data...</p>;
  }

  return (
    <div className="container">
      <h1>Profile of User {user.username}</h1>

      <h2>Albums</h2>
      {albums.length > 0 ? (
        albums.map((album) => (
          <AlbumCard
            key={album.id}
            album={album}
            onAddPhoto={handleAddPhoto}
            onDeletePhoto={handleDeletePhoto}
            currentUserId={user.id}
            onToggleExpand={() => handleToggleExpand(album.id)}
            isExpanded={expandedAlbumIds.has(album.id)}
          />
        ))
      ) : (
        <p>No albums available.</p>
      )}
    </div>
  );
};

export default SearchedUserPage;
