import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAlbums, getPhotos } from '../api/albumsApi';

const AlbumPage = () => {
  const { albumId } = useParams();
  const [album, setAlbum] = useState<any>(null);
  const [photos, setPhotos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlbumData = async () => {
      try {
        setLoading(true);

        const albumData = await getAlbums();
        const selectedAlbum = albumData.find((a: any) => a.id === parseInt(albumId || '', 10));
        setAlbum(selectedAlbum);

        if (selectedAlbum) {
          const photosData = await getPhotos();
          const albumPhotos = photosData.filter((photo: any) => photo.albumId === selectedAlbum.id);
          setPhotos(albumPhotos);
        }
      } catch (error) {
        console.error('Error fetching album or photos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbumData();
  }, [albumId]);

  if (loading) return <div>Loading...</div>;

  if (!album) return <div>No album found with ID {albumId}.</div>;

  return (
    <div>
      <h1>Album: {album.title}</h1>
      <div>
        <h2>Photos:</h2>
        <div className="album-photos">
          {photos.map((photo) => (
            <div key={photo.id} className="photo-card">
              <img src={photo.thumbnailUrl} alt={photo.title} />
              <p>{photo.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlbumPage;
