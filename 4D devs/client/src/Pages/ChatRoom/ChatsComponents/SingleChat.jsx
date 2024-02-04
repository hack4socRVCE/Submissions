import React, { useEffect, useState } from "react";
import { Box, FormControl, Input, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import ScrollChat from "./ScrollChat";
import io from "socket.io-client";
import { LoggedState } from "../../../context/auth";
const ENDPOINT = "http://localhost:5000";

var socket, selectedChatCompare;

const SingleChat = () => {
  const { isLoggedIn } = LoggedState();
  const CurrentUser = isLoggedIn ? JSON.parse(localStorage.getItem("user")) : 0;

  let selectedChat = {};

  if (CurrentUser.addictType === "Mobile") {
    selectedChat._id = "65bce83452917adafa42b390";
  } else if (CurrentUser.addictType === "Cigarettes") {
    selectedChat._id = "65bce75752917adafa42b351";
  }

  const [SocketConnected, setSocketConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      setLoading(true);

      const { data } = await axios.get(`/chatroom/getMsg/${selectedChat._id}`);

      setMessages(data);
      setLoading(false);

      socket.emit("joinchat", selectedChat._id);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", CurrentUser);
    socket.on("connected", () => setSocketConnected(true));

    return () => {
      socket.disconnect();
    };
  }, [CurrentUser]);

  useEffect(() => {
    let isMounted = true;

    if (isMounted && selectedChat._id !== selectedChatCompare?._id) {
      fetchMessages();
      selectedChatCompare = selectedChat;
    }

    return () => {
      isMounted = false;
    };
  }, [selectedChat]);

  useEffect(() => {
    socket.on("Msgrecieved", (newMessageRecieved) => {
      if (
        selectedChatCompare &&
        selectedChatCompare._id === newMessageRecieved.chat._id
      ) {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  }, [messages, selectedChatCompare]);

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      try {
        const { data } = await axios.post("/chatroom/sendMsg", {
          content: newMessage,
          chatID: selectedChat._id,
        });

        setNewMessage("");
        socket.emit("newmessage", data);
        setMessages([...messages, data]);
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  const typingHandler = async (e) => {
    setNewMessage(e.target.value);
  };

  return (
    <Box
      height={"100%"}
      width={"100%"}
      display={"flex"}
      flexDirection={"column"}
    >
      {selectedChat ? (
        <>
          <Typography
            variant="h5"
            mb={3}
            mx={2}
            width="100%"
            fontFamily="Work sans"
            display="flex"
            justifyContent="space-between"
          >
            {!selectedChat.GroupChat ? (
              <Box display="flex" sx={{ fontWeight: "800", fontSize: "40px" }}>
                {CurrentUser.addictType} Community
              </Box>
            ) : (
              <Box display="flex">{selectedChat.chatName.toUpperCase()}</Box>
            )}
          </Typography>

          <Box
            id="chatContainer"
            display="flex"
            flexDirection="column"
            justifyContent="flex-end"
            bgcolor="#E8E8E8"
            width="100%"
            height="100%"
            borderRadius="lg"
          >
            {loading ? (
              <CircularProgress size={20} thickness={4} />
            ) : (
              <div className="messages">
                <ScrollChat messages={messages} />
              </div>
            )}

            <FormControl onKeyDown={sendMessage} isRequired mt={2}>
              <Input
                variant="filled"
                bg="#E0E0E0"
                placeholder="Enter a message.."
                value={newMessage}
                onChange={typingHandler}
                sx={{
                  backgroundColor: "white",
                  padding: "10px 40px",
                  borderRadius: "50px",
                  margin: "10px",
                }}
              />
            </FormControl>
          </Box>
        </>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100%"
        >
          <Typography variant="h5" fontSize="3xl" pb={3} fontFamily="Work sans">
            Click On Chat to Communicate
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default SingleChat;
