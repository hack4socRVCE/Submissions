"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [text, setText] = useState('');
  const [feed, setFeed] = useState('');
  const [title, setTitle] = useState(''); // State to store the generated title
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [paused, setPaused] = useState(false);
  const [utterance, setUtterance] = useState(null);
  const [imageUrl, setImageUrl] = useState('');


  const handleInputChange = (e) => {
    setText(e.target.value);
  };
  const handleSubmit = async () => {
    setError(null);
    setFeed('');
    setTitle('');
    setImageUrl(''); // Ensure this is reset at the start
    setLoading(true);

    if (!text.trim()) {
      alert("Please enter a query.");
      setLoading(false);
      return;
    }

    try {
      const moralResponse = await axios.post('https://gigagen.pythonanywhere.com/story_to_moral', {
        story: text,
      });

      if (moralResponse.data && moralResponse.data.moral_values) {
        const modernStoryResponse = await axios.post('https://gigagen.pythonanywhere.com/moral_to_modern_story', {
          moral_values: moralResponse.data.moral_values,
        });

        if (modernStoryResponse.data && modernStoryResponse.data.modern_story) {
          setFeed(modernStoryResponse.data.modern_story);

          // Correctly create a new SpeechSynthesisUtterance with the modern story
          const newUtterance = new SpeechSynthesisUtterance(modernStoryResponse.data.modern_story);
          setUtterance(newUtterance);

          // Fetch the title for the modern story
          const titleResponse = await axios.post('https://gigagen.pythonanywhere.com/story_title_generation', {
            story: modernStoryResponse.data.modern_story, // Ensure you're using the modern story for title generation
          });

          if (titleResponse.data && titleResponse.data.title) {
            setTitle(titleResponse.data.title);

            // Now fetch the image URL using the generated title
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
          setError("Invalid response from the server for the modern story");
        }
      } else {
        setError("Invalid response from the server for moral values");
      }
    } catch (error) {
      setError(error.toString());
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
  