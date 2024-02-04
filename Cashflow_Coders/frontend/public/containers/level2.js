import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Level2Page = () => {
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/level2-content');
        setContent(response.data.content);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchContent();
  }, []);

  return (
    <div className="container mt-5">
      <div className="text-center">
        <h1 className="font-weight-bold">Level 2</h1>
        <p>{content}</p>
      </div>
    </div>
  );
};

export default Level2Page;
