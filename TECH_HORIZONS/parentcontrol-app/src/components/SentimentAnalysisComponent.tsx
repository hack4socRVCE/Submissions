// SentimentAnalysisComponent.tsx
import React, { useState } from 'react';
import { getSentiment } from '../services/SentimentService';

interface SentimentAnalysisProps {
  text: string;
}

const SentimentAnalysisComponent: React.FC<SentimentAnalysisProps> = ({ text }) => {
  const [predictedSentiment, setPredictedSentiment] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const analyzeSentiment = async () => {
    try {
      setIsLoading(true);

      const sentiment = await getSentiment(text);
      setPredictedSentiment(sentiment);
    } catch (error) {
      // Handle error, e.g., show an error message to the user
      console.error('Error in sentiment analysis:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', background: '#f59760' }}>
      <textarea
        value={text}
        readOnly
        style={{ width: '100%', minHeight: '100px', padding: '10px', borderRadius: '4px', marginBottom: '15px' }}
      />
      <button
        onClick={analyzeSentiment}
        disabled={isLoading}
        style={{ width: '100%', padding: '10px', backgroundColor: '#f5400', color: 'white', borderRadius: '4px', cursor: 'pointer' }}
      >
        {isLoading ? 'Analyzing...' : 'Analyze Sentiment'}
      </button>

      {isLoading && <p style={{ marginTop: '10px' }}>Loading...</p>}

      {predictedSentiment && (
        <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#f59760', borderRadius: '4px' }}>
          <p style={{ marginBottom: '0', fontWeight: 'bold' }}>Predicted Sentiment:</p>
          <p>{predictedSentiment}</p>
        </div>
      )}
    </div>
  );
};

export default SentimentAnalysisComponent;
