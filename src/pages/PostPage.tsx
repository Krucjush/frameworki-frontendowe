import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPostById, getCommentsByPostId, addComment, deleteCommentById } from '../api/postsApi';
import CommentCard from '../components/CommentCard';
import { useAuth } from '../context/AuthContext';

const PostPage = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    if (id) {
      getPostById(Number(id))
        .then((response) => setPost(response.data))
        .catch((error) => console.error('Error fetching post:', error));

      getCommentsByPostId(Number(id))
        .then((response) => setComments(response.data))
        .catch((error) => console.error('Error fetching comments:', error));
    }
  }, [id]);

  const handleAddComment = () => {
    if (newComment.trim() === '') return;

    const comment = {
      postId: post.id,
      name: 'My Comment',
      email: user.email,
      body: newComment,
    };

    addComment(comment)
      .then((response) => {
        setComments((prev) => [response.data, ...prev]);
        setNewComment('');
      })
      .catch((error) => console.error('Error adding comment:', error));
  };

  const handleDeleteComment = (commentId: number) => {
    deleteCommentById(commentId)
      .then(() => {
        setComments((prev) => prev.filter((comment) => comment.id !== commentId));
      })
      .catch((error) => console.error('Error deleting comment:', error));
  };

  return (
    <div>
      {post && (
        <>
          <h1>{post.title}</h1>
          <p>{post.body}</p>
          <h3>Comments</h3>
          <div>
            <input
              type="text"
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button onClick={handleAddComment}>Add Comment</button>
          </div>
          <div>
            {comments.map((comment) => (
              <CommentCard
                key={comment.id}
                comment={comment}
                onDelete={handleDeleteComment}
                isOwner={comment.email === user.email}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PostPage;
