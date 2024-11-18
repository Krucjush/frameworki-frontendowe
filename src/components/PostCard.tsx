const PostCard = ({ post, onDelete }: { post: any; onDelete: (id: number) => void }) => {
  return (
    <div style={{ border: '1px solid #ccc', marginBottom: '10px', padding: '10px' }}>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <button onClick={() => onDelete(post.id)}>Delete</button>
    </div>
  );
};

export default PostCard;
