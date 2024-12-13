import React from 'react';

interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

interface CommentListProps {
  postId: number;
  comments: Comment[];
  currentUserEmail: string;
  onDeleteComment: (commentId: number) => void;
}

const CommentList: React.FC<CommentListProps> = ({ postId, comments, currentUserEmail, onDeleteComment }) => {
  return (
    <div className="comment-list" style={{ marginTop: '16px', paddingLeft: '16px' }}>
      <h4>Comments</h4>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.id} style={{ marginBottom: '12px', position: 'relative' }}>
            <strong>{comment.name}</strong> ({comment.email})
            <p>{comment.body}</p>
            {comment.email === currentUserEmail && (
              <button
                onClick={() => onDeleteComment(comment.id)}
                style={{
                  position: 'absolute',
                  top: '0',
                  right: '0',
                  backgroundColor: 'red',
                  color: 'white',
                  border: 'none',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Delete
              </button>
            )}
          </div>
        ))
      ) : (
        <p>No comments yet. Be the first to add one!</p>
      )}
    </div>
  );
};

export default CommentList;
