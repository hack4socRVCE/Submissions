"use client"
import React, { useState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import axios from 'axios';

export default function Home() {
  const [text, setText] = useState('');
  const [feed, setFeed] = useState('');
  const [error, setError] = useState(null);
  const [speaking, setSpeaking] = useState(false);
  const [utterance, setUtterance] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (utterance) {
      utterance.onend = () => {
        setSpeaking(false);
      };
    }
  }, [utterance]);

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handlePlay = () => {
    if (utterance) {
      window.speechSynthesis.speak(utterance);
      setSpeaking(true);
    }
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setSpeaking(false);
  };

  const handleSubmit = async () => {
    setError(null);

    if (!text.trim()) {
      alert('Please enter a query.');
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post('https://gigagen.pythonanywhere.com//moral_to_modern_story', {
        k: 3,
        modern_values: text,
      });

      setFeed(response.data.modern_story);

      const newUtterance = new SpeechSynthesisUtterance(response.data.modern_story);
      setUtterance(newUtterance);
    } catch (error) {
      setError(error.message);
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-20">
      <textarea
        className="w-3/4 border-2 border-blue-500 p-4 h-32 mb-4"
        placeholder="Enter your query here..."
        onChange={handleInputChange}
      />

      <Button className="bg-blue-500 self-center" onClick={handleSubmit}>
        Generate
      </Button>

      {loading && <div className="mt-4">Loading...</div>}

      {feed && !loading && (
        <div>
          <div className="mt-4">{feed}</div>


          {/* Text-to-Speech Controls */}
          <div className="mt-4">
            <Button className="bg-green-500" onClick={handlePlay} disabled={speaking}>
              Play
            </Button>
            <Button className="bg-red-500 ml-2" onClick={handleStop} disabled={!speaking}>
              Stop
            </Button>
          </div>
        </div>
      )}

      {error && <div className="mt-4 text-red-500">{error}</div>}
    </div>
  );
}
