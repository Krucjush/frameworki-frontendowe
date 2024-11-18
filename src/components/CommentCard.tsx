import React from 'react';

interface CommentCardProps {
  comment: any;
  onDelete: (id: number) => void;
  isOwner: boolean;
}

const CommentCard: React.FC<CommentCardProps> = ({ comment, onDelete, isOwner }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
      <h4>{comment.name}</h4>
      <p>{comment.body}</p>
      {isOwner && (
        <button onClick={() => onDelete(comment.id)}>Delete</button>
      )}
    </div>
  );
};

export default CommentCard;
