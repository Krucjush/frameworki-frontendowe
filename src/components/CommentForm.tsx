import React, { useState } from 'react';

interface CommentFormProps {
  postId: number;
  onAddComment: (newComment: { postId: number; id: number; name: string; email: string; body: string }) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ postId, onAddComment }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !body.trim()) {
      alert('Please fill out all fields.');
      return;
    }

    const newComment = {
      postId,
      id: Date.now(),
      name,
      email,
      body,
    };

    onAddComment(newComment);
    setName('');
    setEmail('');
    setBody('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '12px' }}>
      <h5>Add a Comment</h5>
      <input
        type="email"
        placeholder="Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ marginBottom: '8px', width: '100%', padding: '8px' }}
      />
      <input
        type="text"
        placeholder="Comment Title"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginBottom: '8px', width: '100%', padding: '8px' }}
      />
      <textarea
        placeholder="Your Comment"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={4}
        style={{ marginBottom: '8px', width: '100%', padding: '8px' }}
      />
      <button type="submit" style={{ padding: '8px 12px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>
        Add Comment
      </button>
    </form>
  );
};

export default CommentForm;
