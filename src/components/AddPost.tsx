import React, { useState } from 'react';
import { addPost } from '../api/postsApi';
import { useAuth } from '../context/AuthContext';

interface AddPostProps {
  onPostAdded: (post: any) => void;
}

const AddPost: React.FC<AddPostProps> = ({ onPostAdded }) => {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleAddPost = () => {
    if (!title || !body) {
      alert('Title and body are required!');
      return;
    }

    if (!user || !user.id) {
      alert('User is not logged in or lacks a valid id.');
      return;
    }

    const newPost = {
      id: Date.now(),
      title,
      body,
      userId: user.id,
    };

    addPost(newPost)
      .then(() => {
        onPostAdded(newPost);
        setTitle('');
        setBody('');
      })
      .catch((error) => console.error('Error adding post:', error));
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <h3>Add New Post</h3>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={4}
      ></textarea>
      <button onClick={handleAddPost}>Add Post</button>
    </div>
  );
};

export default AddPost;
