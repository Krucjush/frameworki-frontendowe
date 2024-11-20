import { useState } from 'react';
import AddPhoto from './AddPhoto';

const AlbumCard = ({
  album,
  onAddPhoto,
  onDeletePhoto,
  currentUserId,
}: {
  album: any;
  onAddPhoto: (photo: any) => void;
  onDeletePhoto: (photoId: number) => void;
  currentUserId: number;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const photos = album.photos || []; // Use photos from the album directly

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div style={{ border: '1px solid #ccc', marginBottom: '20px', padding: '10px' }}>
      <h3 onClick={handleToggleExpand} style={{ cursor: 'pointer' }}>
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
              onPhotoAdded={(newPhoto) => {
                onAddPhoto(newPhoto);
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default AlbumCard;
