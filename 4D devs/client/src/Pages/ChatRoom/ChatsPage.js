import React from "react";
import Box from "@mui/material/Box";
import ChatBox from "./ChatsComponents/ChatBox";
import { LoggedState } from "../../context/auth";

const ChatsPage = () => {
  const isLoggedIn = LoggedState();
  const CurrentUser = isLoggedIn ? JSON.parse(localStorage.getItem("user")) : 0;

  return (
    <div
      style={{
        width: "100%",
        margin: "0 auto",
        backgroundColor: "",
        height: "110vh",
        paddingBottom: "80px",
        overflow: "hidden",
        paddingRight: "60px",
      }}
    >
      <Box
        display="flex"
        justifyContent="flex-end"
        paddingTop={5}
        width="100%"
        height="95%"
      >
        {CurrentUser && <ChatBox />}
      </Box>
    </div>
  );
};

export default ChatsPage;
