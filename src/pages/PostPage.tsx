import React, { useEffect, useState } from 'react';
import { getPosts } from '../api/postsApi';
import PostCard from '../components/PostCard';

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
    const fetchPosts = async () => {
      try {
        const response = await getPosts();
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleDeletePost = (id: number) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
  };

  return (
    <div className="posts-page" style={{ padding: '16px' }}>
      <h1>Posts</h1>
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