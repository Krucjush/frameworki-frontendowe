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
}

const CommentList: React.FC<CommentListProps> = ({ postId, comments }) => {
  return (
    <div className="comment-list" style={{ marginTop: '16px', paddingLeft: '16px' }}>
      <h4>Comments</h4>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.id} style={{ marginBottom: '12px' }}>
            <strong>{comment.name}</strong> ({comment.email})
            <p>{comment.body}</p>
          </div>
        ))
      ) : (
        <p>No comments yet. Be the first to add one!</p>
      )}
    </div>
  );
};

export default CommentList;
