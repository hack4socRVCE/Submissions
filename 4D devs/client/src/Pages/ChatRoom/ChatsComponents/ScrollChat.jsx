import React, { useRef, useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../../../config/ChatLogic";
import { LoggedState } from "../../../context/auth";
import toast, { Toaster } from "react-hot-toast";
import "./Styles.css"; // Import CSS file for custom scrollbar

const ScrollChat = ({ messages }) => {
  const { isLoggedIn } = LoggedState();
  const CurrentUser = isLoggedIn ? JSON.parse(localStorage.getItem("user")) : 0;
  const user = CurrentUser;

  const [showReportButton, setShowReportButton] = useState(false);

  const handleContextMenu = (e) => {
    e.preventDefault();
    setShowReportButton(true);
  };

  const chatContainerRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom when messages change
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [messages]);

  return (
    <div
      className="chat-container"
      ref={chatContainerRef}
      style={{ padding: "20px" }}
    >
      <Toaster />
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex" }} key={m._id}>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <Tooltip
                title={m.sender.AgencyName}
                placement="bottom-start"
                sx={{ margin: "10px" }}
                arrow
              >
                <Avatar
                  style={{
                    marginTop: "7px",
                    marginRight: "1px",
                  }}
                  size="small"
                  onContextMenu={handleContextMenu}
                />
              </Tooltip>
            )}
            <span
              style={{
                backgroundColor: `${
                  m.sender._id === user._id ? "#5785fa" : "#B9F5D0"
                }`,
                margin: "3px",
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                borderRadius: "10px",
                padding: "4px 15px",
                maxWidth: "75%",
              }}
            >
              {m.content}
            </span>
          </div>
        ))}
    </div>
  );
};

export default ScrollChat;
