import React, { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const PostsPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const currentUserId = JSON.parse(localStorage.getItem('user') || '{}').id;

  useEffect(() => {
    const initializePosts = async () => {
      const localPosts = JSON.parse(localStorage.getItem('posts') || '[]');
      if (localPosts.length > 0) {
        setPosts(localPosts);
      } else {
        try {
          const response = await fetch('https://jsonplaceholder.typicode.com/posts');
          const fetchedPosts = await response.json();
          localStorage.setItem('posts', JSON.stringify(fetchedPosts));
          setPosts(fetchedPosts);
        } catch (error) {
          console.error('Error fetching posts:', error);
        }
      }
    };

    initializePosts();
  }, []);

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
      <PostForm currentUserId={currentUserId} onAddPost={handleAddPost} />
      {posts.length > 0 ? (
        posts.map((post) => (
          <PostCard
            key={post.id}
            id={post.id}
            title={post.title}
            body={post.body}
            userId={post.userId}
            currentUserId={currentUserId}
            onDelete={handleDeletePost}
          />
        ))
      ) : (
        <p>Loading posts...</p>
      )}
    </div>
  );
};

export default PostsPage;
