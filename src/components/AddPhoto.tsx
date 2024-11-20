import { useState, useEffect } from 'react';
import { getAlbums, addPhoto } from '../api/albumsApi';

const AddPhoto = ({
  currentUserId,
  albumId, // Optional prop for preselected album
  onPhotoAdded,
}: {
  currentUserId: number;
  albumId?: number;
  onPhotoAdded: (photo: any) => void;
}) => {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [selectedAlbumId, setSelectedAlbumId] = useState<number | null>(albumId || null);
  const [albums, setAlbums] = useState<any[]>([]);

  useEffect(() => {
    if (!albumId) {
      // Fetch albums only if albumId is not preselected
      getAlbums()
        .then((data) => {
          // Filter to only show albums belonging to the current user
          const userAlbums = data.filter((album: any) => album.userId === currentUserId);
          setAlbums(userAlbums);
        })
        .catch((error) => console.error('Error fetching albums:', error));
    }
  }, [albumId, currentUserId]);

  const handleAddPhoto = () => {
    if (!title || !file || selectedAlbumId === null) {
      alert('Title, file, and album selection are required!');
      return;
    }

    // Simulate file upload (replace this with actual upload logic)
    const photoUrl = URL.createObjectURL(file);

    const newPhoto = {
      id: Date.now(), // Unique ID
      albumId: selectedAlbumId,
      title,
      url: photoUrl,
      thumbnailUrl: photoUrl, // Use same URL for simplicity
      userId: currentUserId,
    };

    addPhoto(newPhoto)
      .then(() => {
        onPhotoAdded(newPhoto);
        setTitle('');
        setFile(null);
        setSelectedAlbumId(albumId || null); // Reset to albumId if provided
      })
      .catch((error) => console.error('Error adding photo:', error));
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <h2>Add Photo</h2>
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
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <button onClick={handleAddPhoto}>Add Photo</button>
    </div>
  );
};

export default AddPhoto;
