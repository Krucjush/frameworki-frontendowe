import React, { useState } from 'react';

interface PostFormProps {
  currentUserId: number;
  onAddPost: (newPost: { id: number; title: string; body: string; userId: number }) => void;
}

const PostForm: React.FC<PostFormProps> = ({ currentUserId, onAddPost }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !body.trim()) {
      alert('Please fill out all fields');
      return;
    }

    const newPost = {
      id: Date.now(),
      title,
      body,
      userId: currentUserId,
    };

    onAddPost(newPost);
    setTitle('');
    setBody('');
  };

  return (
    <form className="add-photo-form" onSubmit={handleSubmit}>
      <h3>Create a New Post</h3>
      <div>
        <input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ marginBottom: '10px', width: '100%', padding: '8px' }}
        />
      </div>
      <div>
        <textarea
          placeholder="Post Content"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          style={{ marginBottom: '10px', width: '100%', padding: '8px' }}
          rows={4}
        />
      </div>
      <button type="submit" className="save-button">Add Post</button>
    </form>
  );
};

export default PostForm;
