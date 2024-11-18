import { useEffect, useState } from 'react';
import { getPosts, deletePost } from '../api/postsApi';
import PostCard from '../components/PostCard';
import AddPost from '../components/AddPost';

const FeedPage = () => {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    getPosts()
      .then((response) => setPosts(response.data))
      .catch((error) => console.error('Error fetching posts:', error));
  }, []);

  const handlePostAdded = (newPost: any) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  const handleDelete = (id: number) => {
    deletePost(id)
      .then(() => {
        setPosts((prev) => prev.filter((post) => post.id !== id));
      })
      .catch((error) => console.error('Error deleting post:', error));
  };

  return (
    <div>
      <h1>Feed</h1>
      <AddPost onPostAdded={handlePostAdded} />
      {posts.map((post) => (
        <PostCard key={post.id} post={post} onDelete={handleDelete} />
      ))}
    </div>
  );
};

export default FeedPage;
