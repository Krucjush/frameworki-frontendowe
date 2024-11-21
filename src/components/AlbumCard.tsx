import { useState, useEffect } from 'react';
import AddPhoto from './AddPhoto';

const AlbumCard = ({
  album,
  onAddPhoto,
  onDeletePhoto,
  currentUserId,
  onToggleExpand,
  isExpanded,
  loadPhotos,
}: {
  album: any;
  onAddPhoto: (photo: any) => void;
  onDeletePhoto: (photoId: number) => void;
  currentUserId: number;
  onToggleExpand: () => void;
  isExpanded: boolean;
  loadPhotos: () => void;
}) => {
  const [photos, setPhotos] = useState<any[]>(album.photos || []);

  // Effect to load photos when expanded
  useEffect(() => {
    if (isExpanded && album.photos?.length === 0) {
      loadPhotos();  // Load photos only if there are no photos yet
    } else {
      // If photos exist in the album, set them directly
      setPhotos(album.photos || []);
    }
  }, [isExpanded, loadPhotos, album.photos]);

  // Handle adding a new photo
  const handleAddPhoto = (newPhoto: any) => {
    setPhotos((prevPhotos) => [...prevPhotos, newPhoto]);  // Update the photos array with the new photo
  };

  return (
    <div style={{ border: '1px solid #ccc', marginBottom: '20px', padding: '10px' }}>
      <h3 onClick={onToggleExpand} style={{ cursor: 'pointer' }}>
        {album.title} {isExpanded ? '▲' : '▼'}
      </h3>
      {isExpanded && (
        <div>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {photos.map((photo: any) => (
              <div key={photo.id} style={{ margin: '10px' }}>
                <img src={photo.thumbnailUrl} alt={photo.title} />
                <p>{photo.title}</p>
                {photo.userId === currentUserId && (
                  <button onClick={() => onDeletePhoto(photo.id)}>Delete</button>
                )}
              </div>
            ))}
          </div>
          {album.userId === currentUserId && (
            <AddPhoto
              albumId={album.id}
              currentUserId={currentUserId}
              onPhotoAdded={handleAddPhoto}  // Pass the handler to the AddPhoto component
            />
          )}
        </div>
      )}
    </div>
  );
};

export default AlbumCard;
