import { useEffect, useState } from 'react';
import { getAlbums, getPhotos, deletePhoto } from '../api/albumsApi';
import AlbumCard from '../components/AlbumCard';
import AddPhoto from '../components/AddPhoto';

const FeedPage = () => {
  const [albums, setAlbums] = useState<any[]>([]);
  const currentUserId = JSON.parse(localStorage.getItem('user') || '{}').id;

  useEffect(() => {
    Promise.all([getAlbums(), getPhotos()])
      .then(([albumsResponse, photosResponse]) => {
        const albumsData = albumsResponse || [];
        const photosData = photosResponse || [];
  
        const albumsWithPhotos = albumsData.map((album: any) => ({
          ...album,
          photos: photosData.filter((photo: any) => photo.albumId === album.id),
        }));
  
        console.log(albumsWithPhotos);  // Check the data here
  
        setAlbums(albumsWithPhotos);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleAddPhoto = (newPhoto: any) => {
    setAlbums((prevAlbums) =>
      prevAlbums.map((album) =>
        album.id === newPhoto.albumId
          ? { ...album, photos: [...album.photos, newPhoto] }
          : album
      )
    );
  };

  const handleDeletePhoto = (photoId: number) => {
    deletePhoto(photoId)
      .then(() => {
        setAlbums((prevAlbums) =>
          prevAlbums.map((album) => ({
            ...album,
            photos: album.photos.filter((photo: any) => photo.id !== photoId),
          }))
        );
      })
      .catch((error) => console.error('Error deleting photo:', error));
  };

  return (
    <div>
      <h1>Albums</h1>
      <AddPhoto currentUserId={currentUserId} onPhotoAdded={handleAddPhoto} />
      {albums.map((album) => (
        <AlbumCard
          key={album.id}
          album={album}
          onAddPhoto={handleAddPhoto}
          onDeletePhoto={handleDeletePhoto}
          currentUserId={currentUserId}
        />
      ))}
    </div>
  );
};

export default FeedPage;
