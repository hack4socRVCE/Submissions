"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button'; // Ensure this path matches your button component

export default function Home() {
  const [text, setText] = useState('');
  const [feed, setFeed] = useState('');
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState(''); // State to store the generated image URL
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
    setFeed('');
    setTitle('');
    setImageUrl(''); // Reset image URL before new operation

    if (!text.trim()) {
      alert("Please enter a query.");
      setLoading(false);
      return;
    }

    try {
      const storyResponse = await axios.post('https://gigagen.pythonanywhere.com/children_stories', {
        query: text,
      });

      if (storyResponse.data && storyResponse.data.paragraph) {
        setFeed(storyResponse.data.paragraph);
        const newUtterance = new SpeechSynthesisUtterance(storyResponse.data.paragraph);
        setUtterance(newUtterance);

        const titleResponse = await axios.post('https://gigagen.pythonanywhere.com/story_title_generation', {
          story: storyResponse.data.paragraph,
        });

        if (titleResponse.data && titleResponse.data.title) {
          setTitle(titleResponse.data.title);

          // Image generation logic should be here, after title generation succeeds
          const imageResponse = await axios.post('https://gigagen.pythonanywhere.com/generate_image', {
            prompt: titleResponse.data.title, // Using the generated title as the prompt
          });

          if (imageResponse.data && imageResponse.data.image_url) {
            setImageUrl(imageResponse.data.image_url);
          } else {
            setError("Invalid response from the server for image generation");
          }

        } else {
          setError("Invalid response from the server for title generation");
        }
      } else {
        setError("Invalid response from the server for story generation");
      }
    } catch (error) {
      setError(error.toString());
    } finally {
      setLoading(false);
    }
  };

  // Your handlePlayPause and handleStop functions remain unchanged
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
    <div className="flex flex-col items-center mt-20 space-y-4">
      <textarea
        className="w-3/4 border border-gray-300 p-4 h-32 rounded-lg shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-300"
        placeholder="Enter your query here..."
        value={text}
        onChange={handleInputChange}
      />
  
      <button 
        className="bg-blue-500 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-2xl px-4 py-2 rounded-lg transition ease-in-out duration-150"
        onClick={handleSubmit} 
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Generate'}
      </button>
  
      {title && (
        <div className="text-lg font-bold text-gray-800 w-3/4 text-center border border-gray-300 bg-gray-300 p-2 rounded-lg shadow-2xl">
          {title}
        </div>
      )}
      {imageUrl && (
        <img src={imageUrl} alt="Generated" className="mt-2 max-w-xs mx-auto rounded-lg shadow-2xl" />
      )}
      {feed && (
        <div className="w-3/4 border border-gray-300 bg-gray-300 p-4 rounded-lg shadow-2xl text-gray-800">
          {feed}
          <div className="flex justify-center mt-4 space-x-4">
            <button 
              className="bg-green-500 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300 shadow-2xl px-4 py-2 rounded-lg transition ease-in-out duration-150"
              onClick={handlePlayPause} 
              disabled={!utterance || loading}
            >
              {paused ? 'Resume' : 'Play/Pause'}
            </button>
            <button 
              className="bg-red-500 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 shadow-2xl px-4 py-2 rounded-lg transition ease-in-out duration-150"
              onClick={handleStop} 
              disabled={!speaking && !paused}
            >
              Stop
            </button>
          </div>
        </div>
      )}
      {error && (
        <div className="text-red-500 bg-red-100 p-4 rounded-lg shadow-2xl w-3/4">
          {error}
        </div>
      )}
    </div>
  )};
  