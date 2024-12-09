import React from 'react';
import { deletePost } from '../api/postsApi';

interface PostCardProps {
  id: number;
  title: string;
  body: string;
  userId: number;
  currentUserId: number;
  onDelete: (id: number) => void;
}

const PostCard: React.FC<PostCardProps> = ({ id, title, body, userId, currentUserId, onDelete }) => {
  const handleDelete = async () => {
    try {
      await deletePost(id);
      onDelete(id);
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div className="post-card">
      <h3>{title}</h3>
      <p>{body}</p>
      <small>Posted by User {userId}</small>
      {userId === currentUserId && (
        <button className="delete-button" onClick={handleDelete}>
          Delete
        </button>
      )}
    </div>
  );
};

export default PostCard;
