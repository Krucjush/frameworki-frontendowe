import { useState, useEffect } from 'react';
import { getAlbums } from '../api/albumsApi';

const AddPhoto = ({
  currentUserId,
  albumId,
  onPhotoAdded,
}: {
  currentUserId: number | null;
  albumId?: number;
  onPhotoAdded: (photo: any) => void;
}) => {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [selectedAlbumId, setSelectedAlbumId] = useState<number | null>(albumId || null);
  const [albums, setAlbums] = useState<any[]>([]);

  useEffect(() => {
    if (!albumId && currentUserId) {
      getAlbums()
        .then((data) => {
          const userAlbums = data.filter((album: any) => album.userId === currentUserId);
          setAlbums(userAlbums);
        })
        .catch((error) => console.error('Error fetching albums:', error));
    }
  }, [albumId, currentUserId]);

  const handleAddPhoto = () => {
    if (!currentUserId) {
      alert('Please log in to add photos.');
      return;
    }

    if (!title || !file || selectedAlbumId === null) {
      alert('Title, file, and album selection are required!');
      return;
    }

    const photoUrl = URL.createObjectURL(file);

    const newPhoto = {
      id: Date.now(),
      albumId: selectedAlbumId,
      title,
      url: photoUrl,
      thumbnailUrl: photoUrl,
      userId: currentUserId,
    };

    onPhotoAdded(newPhoto);
    setTitle('');
    setFile(null);
  };

  return (
    <div className="add-photo-form">
      <h2>Add Photo</h2>
      {currentUserId ? (
        <>
          {!albumId && (
            <select
              onChange={(e) => setSelectedAlbumId(Number(e.target.value))}
              value={selectedAlbumId || ''}
            >
              <option value="" disabled>
                Select Album
              </option>
              {albums.map((album) => (
                <option key={album.id} value={album.id}>
                  {album.title} (Created by User {album.userId})
                </option>
              ))}
            </select>
          )}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter photo title"
          />
          <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
          <button onClick={handleAddPhoto}>Add Photo</button>
        </>
      ) : (
        <p style={{ color: 'red' }}>Please log in to add photos.</p>
      )}
    </div>
  );
};


export default AddPhoto;
