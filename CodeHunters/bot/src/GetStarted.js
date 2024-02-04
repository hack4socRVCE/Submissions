// GetStarted.js
import React, { useState } from "react";
import NavBar from "./NavBar";
import "./GetStarted.css";

const GetStarted = () => {
  const [userInput, setUserInput] = useState("");
  const [step, setStep] = useState(1);
  const [conversation, setConversation] = useState([]);

  const handleUserInput = async () => {
    try {
      let message = "";
  
      switch (step) {
        case 1:
          message = "Great! Now, please provide the doctor's name.";
          break;
        case 2:
          message = "Excellent! Please provide the date for the appointment (e.g., DD-MM-YYYY).";
          break;
        case 3:
          message = "Almost there! Finally, please provide the time for the appointment (e.g., HH:MM AM/PM).";
          break;
        default:
          break;
      }
  
      setConversation((prevConversation) => [
        ...prevConversation,
        { role: "user", text: userInput },
        { role: "bot", text: message },
      ]);
  
      setUserInput("");
      if (step === 3) {
        await sendAppointmentRequest();
      } else {
        setStep(step + 1);
      }
    } catch (error) {
      console.error("Error handling user input:", error);
    }
  };
  

  const sendAppointmentRequest = async () => {
    try {
      const response = await fetch("http://localhost:5000/schedule_appointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: 1, user_input: userInput }), // Assuming you have a unique user_id
      });

      const data = await response.json();

      setConversation((prevConversation) => [
        ...prevConversation,
        { role: "user", text: userInput },
        {
          role: "bot",
          text: data.messages
            ? formatBotMessages(data.messages)
            : data.error,
        },
      ]);

      setStep(1);
    } catch (error) {
      console.error("Error fetching appointment details:", error);
    }
  };

  const parseUserInput = (input) => {
    const details = input.split(",").reduce((acc, pair) => {
      const [key, value] = pair.split(":").map((item) => item.trim());
      if (key && value) {
        acc[key.toLowerCase()] = value;
      }
      return acc;
    }, {});

    return details;
  };

  const formatBotMessages = (messages) => {
    return messages.map((message, index) => (
      <div key={index} className={message.role}>
        {message.text}
      </div>
    ));
  };

  return (
    <>
      <div className="get-started-container">
        <NavBar />
      </div>
      <div className="chat-container">
        <div className="conversation-history">
          {formatBotMessages(conversation)}
        </div>
        <div className="user-input-container">
          <input
            type="text"
            placeholder="Type your message..."
            className="input-field"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <button onClick={handleUserInput}>Send</button>
        </div>
      </div>
    </>
  );
};

export default GetStarted;
