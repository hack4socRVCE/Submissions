// Sidebar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import EventIcon from "@mui/icons-material/Event";
import ChatIcon from "@mui/icons-material/Chat";
import StarIcon from "@mui/icons-material/Star";
import PeopleIcon from "@mui/icons-material/People";
import TimelineIcon from "@mui/icons-material/Timeline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const Sidebar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/login");
    // Implement your logout logic here
  };

  return (
    <Drawer
      anchor="left"
      variant="permanent"
      sx={{
        width: "240px", // Adjust the width as needed
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: "240px", // Adjust the width as needed
          backgroundColor: "#0d3464",
          color: "#fff",
        },
      }}
    >
      <List
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <div>
          <ListItem
            button
            component={Link}
            to="/"
            sx={{ ":hover": { filter: "invert()" } }}
          >
            <ListItemIcon sx={{ color: "white" }}>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>

          <ListItem
            button
            component={Link}
            to="/webinars"
            sx={{ ":hover": { filter: "invert()" } }}
          >
            <ListItemIcon sx={{ color: "white" }}>
              <EventIcon />
            </ListItemIcon>
            <ListItemText primary="Webinars" />
          </ListItem>

          <ListItem
            button
            component={Link}
            to="/communitychat"
            sx={{ ":hover": { filter: "invert()" } }}
          >
            <ListItemIcon sx={{ color: "white" }}>
              <ChatIcon />
            </ListItemIcon>
            <ListItemText primary="Community Chat" />
          </ListItem>

          <ListItem
            button
            component={Link}
            to="/success-stories"
            sx={{ ":hover": { filter: "invert()" } }}
          >
            <ListItemIcon sx={{ color: "white" }}>
              <StarIcon />
            </ListItemIcon>
            <ListItemText primary="Success Stories" />
          </ListItem>

          <ListItem
            button
            component={Link}
            to="/rewards"
            sx={{
              ":hover": { filter: "invert()" },
            }}
          >
            <ListItemIcon sx={{ color: "white" }}>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Rewards" />
          </ListItem>

          {/* <ListItem button component={Link} to="/tracker">
            <ListItemIcon>
              <TimelineIcon />
            </ListItemIcon>
            <ListItemText primary="Tracker" />
          </ListItem> */}
        </div>

        {/* Logout Button */}

        <ListItem>
          <Divider />
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<ExitToAppIcon />}
            fullWidth
            onClick={handleLogout}
            sx={{
              color: "black",
              backgroundColor: "#0bf",
              ":hover": {
                backgroundColor: "red",
                color: "white",
              },
            }}
          >
            Logout
          </Button>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
