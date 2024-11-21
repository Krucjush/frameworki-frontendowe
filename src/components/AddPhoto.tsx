import { useState, useEffect } from 'react';
import { getAlbums } from '../api/albumsApi';

const AddPhoto = ({
  currentUserId,
  albumId,
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

  // Load albums if the albumId is not passed
  useEffect(() => {
    if (!albumId) {
      getAlbums()
        .then((data) => {
          const userAlbums = data.filter((album: any) => album.userId === currentUserId);
          setAlbums(userAlbums);
        })
        .catch((error) => console.error('Error fetching albums:', error));
    }
  }, [albumId, currentUserId]);

  const handleAddPhoto = () => {
    console.log("Add Photo button pressed");

    // Check if the title, file, and albumId are provided
    if (!title || !file || selectedAlbumId === null) {
      alert('Title, file, and album selection are required!');
      return; // Exit the function early if any required field is missing
    }

    // Generate a temporary photo URL
    const photoUrl = URL.createObjectURL(file);

    // Create the new photo object
    const newPhoto = {
      id: Date.now(),
      albumId: selectedAlbumId,
      title,
      url: photoUrl,
      thumbnailUrl: photoUrl,
      userId: currentUserId,
    };

    console.log("New photo details:", newPhoto);

    // Pass the new photo to the parent component via the callback function
    onPhotoAdded(newPhoto);

    // Clear the form inputs after adding the photo
    setTitle('');
    setFile(null);
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
