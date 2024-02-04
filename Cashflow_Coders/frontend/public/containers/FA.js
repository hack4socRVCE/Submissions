import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import backgroundImage from '../assets/img/blurred-image-1.jpg'; // Import the background image

const FA = () => {
  const [sections, setSections] = useState([]);
  const [fixedIndex, setFixedIndex] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Adjust the threshold value based on your layout
      setFixedIndex(scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    fetch('Funda.txt') // Update the path to your text file
      .then(response => response.text())
      .then(text => {
        const sectionsArray = text.split('## ');
        const filteredSections = sectionsArray.filter(section => section.trim() !== '');

        setSections(filteredSections.map(section => {
          const [heading, ...contentLines] = section.split('\n');
          const content = contentLines.join(' ');
          return { heading, content };
        }));
      })
      .catch(error => console.error('Error fetching the text file:', error));
  }, []);

  return (
    <div style={{ display: 'flex', backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', minHeight: '100vh' }}>
      <div style={{ flex: 1, paddingRight: '20px', maxHeight: '100vh', overflowY: 'auto' }}>
        <h1 style={{ fontSize: 'calc(12px + 2vw)' }}>Understanding Stock Markets for Beginners</h1>
        <ul style={{ position: fixedIndex ? 'fixed' : 'static', top: '100px' }}>
          {sections.map((section, index) => (
            <li key={index}>
              <a href={`#section-${index + 1}`}>{section.heading}</a>
            </li>
          ))}
        </ul>
        {/* Button to navigate to Level 3 */}
        <Link to="/TA">
          <button style={{ marginTop: '20px', borderRadius: '20px', padding: '10px 20px', background: '#007bff', color: '#fff', border: 'none' }}>Technical Analysis</button>
        </Link>
      </div>
      <div style={{ flex: 2, paddingLeft: '20px' }}>
        {sections.map((section, index) => (
          <div key={index} id={`section-${index + 1}`} style={{ marginBottom: '30px' }}>
            <h2 style={{ fontSize: 'calc(10px + 1.5vw)' }}>{section.heading}</h2>
            <p style={{ fontSize: 'calc(8px + 1vw)' }}>{section.content}</p>
          </div>
        ))}
        <div>
          <h3>Additional Resources:</h3>
          <p>
            For additional, more detailed learning, you can refer to{' '}
            <a href="https://zerodha.com/varsity/module/introduction-to-stock-markets/">Zerodha Varsity</a>.
          </p>
          <p>
            Watch <a href="https://www.youtube.com/watch?v=A7fZp9dwELo">How does the stock market work?</a> on YouTube for a visual explanation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FA;
