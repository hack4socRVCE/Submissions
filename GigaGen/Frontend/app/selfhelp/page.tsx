"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button'; // Adjust according to your project structure

export default function Home() {
  const [text, setText] = useState('');
  const [feed, setFeed] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [paused, setPaused] = useState(false);
  const [utterance, setUtterance] = useState(null);

  useEffect(() => {
    if (utterance) {
      utterance.onend = () => {
        setSpeaking(false);
        setPaused(false);
      };
    }
  }, [utterance]);

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async () => {
    setError(null);
    setLoading(true);
    setFeed(''); // Clear previous feed

    if (!text.trim()) {
      alert("Please enter a query.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('https://gigagen.pythonanywhere.com/ancient_help', {
        k: 3,
        query: text,
      });
      setFeed(response.data.problem_solution);
      const newUtterance = new SpeechSynthesisUtterance(response.data.problem_solution);
      setUtterance(newUtterance);
    } catch (error) {
      setError(error.message);
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePlayPause = () => {
    if (utterance) {
      if (!window.speechSynthesis.speaking && !paused) {
        window.speechSynthesis.speak(utterance);
        setSpeaking(true);
        setPaused(false);
      } else if (window.speechSynthesis.speaking && !paused) {
        window.speechSynthesis.pause();
        setPaused(true);
      } else if (paused) {
        window.speechSynthesis.resume();
        setPaused(false);
      }
    }
  };

  const handleStop = () => {
    if (window.speechSynthesis.speaking || paused) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      setPaused(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-20">
      <textarea
        className="w-3/4 border border-gray-300 p-4 h-32 mb-4 rounded-lg shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-300"
        placeholder="Enter your query here..."
        value={text}
        onChange={handleInputChange}
      />

      <button
        className="bg-blue-500 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-2xl px-4 py-2 rounded-lg mb-4"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Generate'}
      </button>

      {feed && (
        <div className="w-3/4 border border-gray-300 bg-gray-100 p-4 rounded-lg shadow-2xl">
          {feed}
          <div className="flex justify-center mt-4 space-x-4">
            <button
              className="bg-green-500 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300 shadow-2xl px-4 py-2 rounded-lg"
              onClick={handlePlayPause}
              disabled={!utterance || loading}
            >
              {paused ? 'Resume' : 'Play/Pause'}
            </button>
            <button
              className="bg-red-500 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 shadow-2xl px-4 py-2 rounded-lg"
              onClick={handleStop}
              disabled={!speaking && !paused}
            >
              Stop
            </button>
          </div>
        </div>
      )}
      {error && <div className="text-red-500 bg-red-100 p-4 rounded-lg shadow-2xl w-3/4 mt-4">{error}</div>}
    </div>
  );
}