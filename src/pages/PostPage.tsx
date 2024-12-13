import React, { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';
import PostForm from '../components/PostForm';

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

const PostsPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    const initializeData = async () => {
      const localPosts = JSON.parse(localStorage.getItem('posts') || '[]');
      if (localPosts.length > 0) {
        setPosts(localPosts);
      } else {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const fetchedPosts = await response.json();
        localStorage.setItem('posts', JSON.stringify(fetchedPosts));
        setPosts(fetchedPosts);
      }

      const localComments = JSON.parse(localStorage.getItem('comments') || '[]');
      if (localComments.length > 0) {
        setComments(localComments);
      } else {
        const response = await fetch('https://jsonplaceholder.typicode.com/comments');
        const fetchedComments = await response.json();
        localStorage.setItem('comments', JSON.stringify(fetchedComments));
        setComments(fetchedComments);
      }
    };

    initializeData();
  }, []);

  const handleAddComment = (newComment: Comment) => {
    const updatedComments = [newComment, ...comments];
    setComments(updatedComments);
    localStorage.setItem('comments', JSON.stringify(updatedComments));
  };

  const handleDeleteComment = (commentId: number) => {
    const updatedComments = comments.filter((comment) => comment.id !== commentId);
    setComments(updatedComments);
    localStorage.setItem('comments', JSON.stringify(updatedComments));
  };

  const handleAddPost = (newPost: Post) => {
    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
  };

  const handleDeletePost = (id: number) => {
    const updatedPosts = posts.filter((post) => post.id !== id);
    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
  };

  return (
    <div className="posts-page" style={{ padding: '16px' }}>
      <h1>Posts</h1>
      <PostForm currentUserId={currentUser.id} onAddPost={handleAddPost} />
      {posts.map((post) => (
        <div key={post.id} style={{ marginBottom: '24px' }}>
          <PostCard
            id={post.id}
            title={post.title}
            body={post.body}
            userId={post.userId}
            currentUserId={currentUser.id}
            onDelete={handleDeletePost}
          />
          <CommentList
            postId={post.id}
            comments={comments.filter((comment) => comment.postId === post.id)}
            currentUserEmail={currentUser.email}
            onDeleteComment={handleDeleteComment}
          />
          <CommentForm postId={post.id} onAddComment={handleAddComment} />
        </div>
      ))}
    </div>
  );
};

export default PostsPage;
