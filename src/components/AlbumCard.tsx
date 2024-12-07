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

  useEffect(() => {
    setPhotos(album.photos || []);
  }, [album.photos]);

  return (
    <div className="album-card">
      <div className="album-header" onClick={onToggleExpand}>
        <span className="album-title">{album.title}</span>
        <span>{isExpanded ? '▲' : '▼'}</span>
      </div>
      {isExpanded && (
        <div>
          <div className="album-photos">
            {photos.length > 0 ? (
              photos.map((photo: any) => (
                <div key={photo.id} className="photo-card">
                  <img src={photo.thumbnailUrl} alt={photo.title} />
                  <p>{photo.title}</p>
                  {currentUserId && photo.userId === currentUserId && (
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
              onPhotoAdded={onAddPhoto}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default AlbumCard;
