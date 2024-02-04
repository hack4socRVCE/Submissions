import React from "react";
import { Grid } from "@mui/material";
import Sidebar from "../../../components/Sidebar";
import SingleChat from "./SingleChat";

const ChatBox = () => {
  return (
    <Grid container spacing={0}>
      {/* Sidebar */}
      <Grid item xs={12} md={3} style={{ padding: 0 }}>
        <Sidebar />
      </Grid>

      {/* Chat Page */}
      <Grid item xs={12} md={9} style={{ padding: 0 }}>
        <SingleChat />
      </Grid>
    </Grid>
  );
};

export default ChatBox;
