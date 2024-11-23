import { useState, useEffect } from 'react';
import AddPhoto from './AddPhoto';

const AlbumCard = ({
  album,
  onAddPhoto,
  onDeletePhoto,
  currentUserId,
  onToggleExpand,
  isExpanded,
}: {
  album: any;
  onAddPhoto: (photo: any) => void;
  onDeletePhoto: (photoId: number) => void;
  currentUserId: number;
  onToggleExpand: () => void;
  isExpanded: boolean;
}) => {
  const [photos, setPhotos] = useState<any[]>(album.photos || []);

  // Effect to load photos when expanded or when album.photos changes
  useEffect(() => {
    setPhotos(album.photos || []);
  }, [album.photos]); // Add album.photos as a dependency

  return (
    <div style={{ border: '1px solid #ccc', marginBottom: '20px', padding: '10px' }}>
      <h3 onClick={onToggleExpand} style={{ cursor: 'pointer' }}>
        {album.title} {isExpanded ? '▲' : '▼'}
      </h3>
      {isExpanded && (
        <div>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {photos.length > 0 ? (
              photos.map((photo: any) => (
                <div key={photo.id} style={{ margin: '10px' }}>
                  <img src={photo.thumbnailUrl} alt={photo.title} />
                  <p>{photo.title}</p>
                  {photo.userId === currentUserId && (
                    <button onClick={() => onDeletePhoto(photo.id)}>Delete</button>
                  )}
                </div>
              ))
            ) : (
              <p>No photos available</p>
            )}
          </div>
          {album.userId === currentUserId && (
            <AddPhoto
              albumId={album.id}
              currentUserId={currentUserId}
              onPhotoAdded={onAddPhoto} // Ensure this function is passed down correctly
            />
          )}
        </div>
      )}
    </div>
  );
};

export default AlbumCard;
