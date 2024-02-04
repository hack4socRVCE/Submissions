import React, { useState, useEffect } from "react";
import { TextField, Button, Grid, Typography } from "@mui/material";
import Layout from "../../components/Layout/Layout";
import Sidebar from "../../components/Sidebar";
import { LoggedState } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const HostWebinar = () => {
  const isLoggedIn = LoggedState();
  const currentUser = isLoggedIn
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  const isCounselor = currentUser.isCounselor;
  const [roomName, setRoomName] = useState([]);
  const [time, setTime] = useState([]);
  const [date, setDate] = useState([]);
  const [liveMeetingsData, setLiveMeetingData] = useState([]);
  const Navigate = useNavigate();

  // create live stream
  const handleCreateLiveStream = async () => {
    // Perform actions to create the live stream
    const currentTime = new Date();
    const newTime = currentTime.toISOString();
    try {
      const response = await fetch("http://localhost:5000/api/addLiveMeeting", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roomName: roomName,
          liveUrl:
            "http://localhost:3000/webinars/" + { roomName } + "?roomID=abcde",
          time: newTime,
        }),
      });
      console.log("scheduled a meeting");

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.log("Error during fetch:", error);
    }

    Navigate("/webinars/" + roomName + "?roomID=abcde");
    console.log("Creating live stream");
  };

  // fetch live meetings
  useEffect(() => {
    // Fetch live meetings based on the current user's addictType
    const fetchLiveMeetings = async () => {
      try {
        const response = await fetch(`/api/getLiveMeetings`);
        const data = await response.json();

        // Sort live meetings based on created time (assuming 'time' is the creation time)
        const sortedLiveMeetings = data.existingMeeting.sort((a, b) => {
          return new Date(b.time) - new Date(a.time);
        });

        setLiveMeetingData(sortedLiveMeetings);
      } catch (error) {
        console.error("Error fetching live meetings:", error.message);
      }
    };

    if (currentUser) {
      fetchLiveMeetings();
    }
  }, []);


  // schedule meetings
  const scheduleMeeting = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/scheduleMeeting",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            roomName: roomName,
            time: time,
            date: date,
          }),
        }
      );
      window.location.reload();
      console.log("scheduled a meeting");

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.log("Error during fetch:", error);
    }
  };

  // displaying scheduled meetings
  const [scheduledMeetings, setScheduledMeetings] = useState([]);

  // getScheduledMeetings function
  const getScheduledMeetings = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/getScheduledMeetings`
      );
      const data = await response.json();
      console.log("====================================");
      console.log(data.existingMeeting);
      console.log("====================================");
      setScheduledMeetings(data.existingMeeting);
    } catch (error) {
      console.error("Error fetching scheduled meetings:", error.message);
    }
  };

  // Fetch scheduled meetings on component mount
  useEffect(() => {
    if (roomName) {
      getScheduledMeetings(roomName);
    }
  }, [roomName]);

  return (
    <Layout title={"Webinars | Reconnect"}>
      <Grid container spacing={1} sx={{ width: "100%", marginLeft: "-5vw",marginTop:'2vh' }}>
        {/* Sidebar */}
        <Grid item xs={12} md={3}>
          <Sidebar />
        </Grid>

        {/* Main Content */}


        <Grid item xs={12} md={9}>

          {isCounselor && (
            <>
              <Typography variant="h6" gutterBottom>
                Start a Webinar Instantly
              </Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                name="roomName"
                label="roomName"
                type="roomName"
                id="roomName"
                onChange={(e) => setRoomName(e.target.value)}
              />
            </>
          )}
          <Grid item xs={12} md={9}>
            {isCounselor && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleCreateLiveStream}
                style={{ margin: "5px", marginBottom: "2vh" }}
              >
                Host Meeting
              </Button>
            )}

            {/* scheduleMeetings */}
            {isCounselor && (
              <>
                <Typography variant="h6" gutterBottom>
                  Schedule a Webinar
                </Typography>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="roomName"
                  label="roomName"
                  type="roomName"
                  id="roomName"
                  onChange={(e) => setRoomName(e.target.value)}
                />
              </>
            )}
            {isCounselor && (
              <TextField
                margin="normal"
                required
                fullWidth
                name="time"
                label="Time"
                type="time"
                id="time"
                onChange={(e) => setTime(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
            {isCounselor && (
              <TextField
                margin="normal"
                required
                fullWidth
                name="date"

                type="date"
                id="date"
                onChange={(e) => setDate(e.target.value)}
              />
            )}
            {isCounselor && (
              <Button
                variant="contained"
                color="primary"
                onClick={scheduleMeeting}
                style={{ margin: "5px", marginBottom: "3vh" }}
              >
                Schedule Meeting
              </Button>
            )}




            {scheduledMeetings.length > 0 && (
              <>
                <Typography variant="h5" gutterBottom>
                  Scheduled Meetings
                </Typography>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Meeting Name</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Time</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {scheduledMeetings.map((data) => (
                        <TableRow key={data._id}>
                          <TableCell>{data.roomName}</TableCell>
                          <TableCell>{data.date.substr(0, 10)}</TableCell>
                          <TableCell>{data.time}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            )}

            {/* Live Meetings Table */}
            {liveMeetingsData.length > 0 && (
              <>
                <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
                  Live Meetings
                </Typography>
                <TableContainer component={Paper} sx={{ width: "100%" }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Meeting Name</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {liveMeetingsData.map((data) => (
                        <TableRow key={data._id}>
                          <TableCell>{data.roomName}</TableCell>
                          <TableCell>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => Navigate(`/webinars/${data.roomName}?roomID=abcde`)}
                            >
                              Join
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default HostWebinar;
