import React, { useEffect, useState } from 'react';
import { getUserById } from '../api/usersApi';

interface PostCardProps {
  title: string;
  body: string;
  userId: number;
}

const PostCard: React.FC<PostCardProps> = ({ title, body, userId }) => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUserById(userId);
        setUsername(response.data.username);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [userId]);

  return (
    <div className="post-card" style={{ border: '1px solid #ccc', padding: '16px', marginBottom: '16px' }}>
      <h3>{title}</h3>
      <p>{body}</p>
      <small>By: {username}</small>
    </div>
  );
};

export default PostCard;
