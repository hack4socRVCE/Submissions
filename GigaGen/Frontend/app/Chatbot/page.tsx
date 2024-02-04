'use client'



// // src/components/Chatbot.js
// import React, { useState } from 'react';
// import axios from 'axios';

// const Chatbot = () => {
//   const [input, setInput] = useState('');
//   const [messages, setMessages] = useState([]);

//   const sendMessage = async () => {
//     const newMessages = [...messages, { text: input, sender: 'user' }];
//     setMessages(newMessages);
    
//     try {
//       const response = await axios.post('https://gigagen.pythonanywhere.com/website_chatbot', { query: input });
//       const botMessage = { text: response.data.reply, sender: 'bot' };
//       setMessages([...newMessages, botMessage]);
//     } catch (error) {
//       console.error('Error sending message:', error);
//     }

//     setInput('');
//   };

//   return (
//     <div className="min-h-screen flex flex-col justify-between bg-gray-90">
//       <div className="flex-1 overflow-y-scroll p-4">
//         {messages.map((message, index) => (
//           <div key={index} className={`p-2 ${message.sender === 'bot' ? 'text-blue-600 bg-blue-100' : 'text-green-600 bg-green-100'} rounded-lg mb-2`}>
//             {message.text}
//           </div>
//         ))}
//       </div>
//       <div className="flex mt-4 p-4">
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           className="flex-1 p-2 border rounded-l focus:outline-none"
//           placeholder="Type your message..."
//         />
//         <button onClick={sendMessage} className="p-2 bg-blue-500 text-white rounded-r hover:bg-blue-600">Send</button>
//       </div>
//     </div>
//   );
// };

// export default Chatbot;

// src/components/Chatbot.js
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const Chatbot = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the messages when they change
    inputRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    const newMessages = [...messages, { text: input, sender: 'user' }];
    setMessages(newMessages);
    
    try {
      const response = await axios.post('https://gigagen.pythonanywhere.com/website_chatbot', { query: input });
      const botMessage = { text: response.data.reply, sender: 'bot' };
      setMessages([...newMessages, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    }

    setInput('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-200 via-blue-300 to-blue-400">
      <div className="flex-1 overflow-y-scroll p-4">
        {messages.map((message, index) => (
          <div key={index} className={`p-2 ${message.sender === 'bot' ? 'text-blue-600 bg-blue-100' : 'text-green-600 bg-green-100'} rounded-lg mb-2`}>
            {message.text}
          </div>
        ))}
        <div ref={inputRef}></div>
      </div>
      <div className="flex p-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 border rounded-l focus:outline-none"
          placeholder="Type your message..."
        />
        <button onClick={sendMessage} className="p-2 bg-blue-500 text-white rounded-r hover:bg-blue-600">Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
