const PhotoCard = ({ photo }: { photo: any }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', width: '150px' }}>
      <img src={photo.thumbnailUrl} alt={photo.title} />
      <p>{photo.title}</p>
    </div>
  );
};

export default PhotoCard;
