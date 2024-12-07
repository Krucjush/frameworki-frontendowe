import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPhotoById } from '../api/photosApi';

const PhotoDetailsPage = () => {
  const { photoId } = useParams<{ photoId?: string }>();
  const [photo, setPhoto] = useState<any>(null);

  useEffect(() => {
    const fetchPhoto = async () => {
      if (photoId) {
        try {
          const response = await getPhotoById(Number(photoId));
          setPhoto(response.data);
        } catch (error) {
          console.error('Error fetching photo:', error);
          setPhoto(null);
        }
      }
    };

    fetchPhoto();
  }, [photoId]);

  if (!photo) {
    return <p>Loading photo details...</p>;
  }

  return (
    <div className="photo-details-container">
      <h1>Photo Details</h1>
      <div>
        <img src={photo.url} alt={photo.title} />
        <h2>{photo.title}</h2>
        <p>Album ID: {photo.albumId}</p>
      </div>
    </div>
  );
};

export default PhotoDetailsPage;
