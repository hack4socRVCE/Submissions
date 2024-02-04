// Home.js
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { LoggedState } from "../../context/auth";
import {
  Box,
  Button,
  Checkbox,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import toast from 'react-hot-toast';
import TaskCard from "./TaskCard";
import Sidebar from "../../components/Sidebar";
import StreakProgress from "./StreakProgress";
import axios from "axios";
import { styled } from "@mui/system";
<style>
  @import
  url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Open+Sans:wght@500&family=Rubik+Glitch+Pop&family=Ubuntu&display=swap');
</style>;

const StyledContainer = styled("div")({
  position: "relative",
  width: "100%",
});

const StyledContent = styled("div")({
  padding: "20px", // Adjust padding as needed
  // background: "#fff", // Adjust background color as needed
  background: "#43de83",
  // borderLeft: "5px solid #1c1c2c",
  // borderTop: "5px solid #1c1c2c",
  backdropFilter: "blur(10px)",
  borderRadius: "6px",
  boxShadow: "0px 0px 4px #1c1c2c",
  textAlign: "center",
});

const motivationalQuotes = [
  "RECOVERY IS NOT FOR PEOPLE WHO NEED IT, IT'S FOR PEOPLE WHO WANT IT.",
  "YOUR STRENGTH IS GREATER THAN YOUR STRUGGLE.",
  "EVERY ACCOMPLISHMENT STARTS WITH THE DECISION TO TRY.",
  "BELIEVE YOU CAN, AND YOU'RE HALFWAY THERE. - THEODORE ROOSEVELT",
  "THE FIRST STEP TOWARDS GETTING SOMEWHERE IS TO DECIDE THAT YOU ARE NOT GOING TO STAY WHERE YOU ARE.",
  "YOU DON'T HAVE TO SEE THE WHOLE STAIRCASE, JUST TAKE THE FIRST STEP. - MARTIN LUTHER KING JR.",
  "THE ROAD TO RECOVERY MAY BE TOUGH, BUT IT'S WORTH IT. YOU'RE WORTH IT.",
  "YOUR PAST DOES NOT DEFINE YOUR FUTURE. YOU HAVE THE POWER TO CHANGE YOUR STORY.",
  "STRENGTH GROWS IN THE MOMENTS WHEN YOU THINK YOU CAN'T GO ON BUT YOU KEEP GOING ANYWAY.",
  "THE ONLY PERSON YOU ARE DESTINED TO BECOME IS THE PERSON YOU DECIDE TO BE. - RALPH WALDO EMERSON",
];

function getRandomQuote() {
  const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
  return motivationalQuotes[randomIndex];
}

const Home = () => {
  const isLoggedIn = LoggedState();
  const currentUser = isLoggedIn ? JSON.parse(localStorage.getItem("user")) : 0;

  const dailyTasks = currentUser.DailyTasks.tasks;
  console.log(dailyTasks);
  const [checkedTasks, setCheckedTasks] = useState([]);


  //console.log(currentUser);

  // useEffect(()=>{
  //   const call = async () => {
  //     if(onetime) {
  //       const data = await axios.post('/api/emergencyCall',{username: currentUser.username});
  //       console.log(data);
  //       setOneTime(0);
  //     }
  //   }
  //   call();
  // },[currentUser])

  // const handlecall = async () => {
  //       const data = await axios.post('/api/emergencyCall',{username: currentUser.username});
  //       console.log(data);
  // }

  useEffect(() => {
    const storedCheckedTasks = JSON.parse(localStorage.getItem('checkedTasks')) || [];
    setCheckedTasks(storedCheckedTasks);
  }, []);


  const handleCompleteDay = () => {
    // Check if all tasks are marked as done
    const allDone = checkedTasks.every((isDone) => isDone);

    if (allDone) {
      fetch(`/api/updateTaskScore/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({newTaskScore: currentUser.TaskScore + 1}) ,
      })
        .then((response) => response.json())
        .then((data) => {
          const updatedUser = { ...currentUser, ...data.user };
          localStorage.setItem('user', JSON.stringify(updatedUser));
          // Reset the checked state
          setCheckedTasks(Array(dailyTasks.length).fill(false));
          localStorage.setItem('checkedTasks', JSON.stringify(Array(dailyTasks.length).fill(false)));
          console.log('TaskScore updated:', data);
          toast.success('TaskScore updated successfully!');

          // Make a POST request to update DailyTaskDone based on the level
        })
        .catch((error) => {
          console.error('Error updating TaskScore:', error.message);
          toast.error('Error updating TaskScore. Please try again.');
        })


        toast.loading("Please Wait Untill the AI process the Next Day Tasks",{
          id:'100',});
        // update the User Tasks for Next Day
        fetch(`/api/updateNextDay`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(
            {
              email:currentUser.email,
              tasks:dailyTasks,
              addictType:currentUser.addictType,
              PerDay:currentUser.AddictionDetails.PerDay,
              years:currentUser.AddictionDetails.years,
              triedToGiveUp:currentUser.AddictionDetails.triedToGiveUp,
              reason:currentUser.AddictionDetails.reason
            }
            )
        })
        .then((response) => response.json())
        .then((data) => {
          const updatedUser = { ...currentUser, ...data.user };
          localStorage.setItem('user', JSON.stringify(updatedUser));
          // Reset the checked state
          toast.success('Tasks Treated For next day updated successfully!');
          toast.dismiss('100');
          window.location.reload();
          // Make a POST request to update DailyTaskDone based on the level
        })
        .catch((error) => {
          //console.error('Error updating TaskScore:', error.message);
          toast.error('Error updating Next Day. Please try again.');
        })

      
    } else {
      toast.error('Please mark all tasks as done before completing the day.');
    }
  };

  const handleTaskDone = (index) => {
    const newCheckedTasks = [...checkedTasks];
    newCheckedTasks[index] = !newCheckedTasks[index]; // Toggle the state
    setCheckedTasks(newCheckedTasks);
    localStorage.setItem('checkedTasks', JSON.stringify(newCheckedTasks));
  }




  const [quote, setQuote] = useState("");
  useEffect(() => {
    // Generate a random quote when the component mounts
    const randomQuote = getRandomQuote();
    setQuote(randomQuote);
  }, []);

  return (
    <Layout title={"DashBoard | Reconnect"}>
      <Grid
        container
        spacing={1}
        sx={{
          width: "100vw",
          paddingLeft: "-5vw",
          paddingRight: "5vw",
          paddingTop: "5vh",
          paddingBottom: "5vh",
          background: "#F3F8FF",
        }}
      >
        {/* Sidebar */}
        <Grid item xs={12} md={3} width={20}>
          <Sidebar />
        </Grid>

        {/* Main Content */}
        <Grid item xs={12} md={9}>
          <Grid container spacing={5} justifyContent="center">
            <Grid item xs={12}>
              <StreakProgress currentUser={currentUser} />
              <StyledContainer>
                <StyledContent>"{quote}"</StyledContent>
              </StyledContainer>
            </Grid>
            {/* Display Daily Tasks */}
            <Grid item xs={12}>
              <Typography
                style={{
                  fontSize: "2rem",
                  fontWeight: 800,
                  fontFamily: "-moz-initial",
                  color: "#0d3464",
                }}
              >
                Today Tasks Set by Using AI based on Previous inputs :
              </Typography>
              <div style={{ marginTop: "20px" }}>
                <List>
                  {dailyTasks.map((task, index) => (
                    <ListItem
                      key={task._id}
                      disableGutters
                      style={{ marginBottom: "10px" }}
                    >
                      <ListItemText
                        primary={
                          <Typography variant="h6">{task.title}</Typography>
                        }
                        secondary={
                          <Typography variant="body1">
                            {task.description}
                          </Typography>
                        }
                      />
                      <Button
                        color="primary"
                        variant="contained"
                        onClick={() => handleTaskDone(index)}
                        sx={{
                          mr: "15vw",
                          backgroundColor: checkedTasks[index] ? "#4CAF50" : undefined,
                          color: checkedTasks[index] ? "white" : undefined,
                        }}
                      >
                        Done
                      </Button>
                    </ListItem>
                  ))}
                </List>
              </div>
              {/* Completed the Day button */}
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={handleCompleteDay}
                sx={{
                  margin: "20px",
                  padding: "15px 0",
                  backgroundColor: "#0d3464",
                  color: "white",
                  borderRadius: "10px",
                  boxShadow: "0px 0px 10px #102f54",
                  ":hover": {
                    backgroundColor: "#43de83",
                    color: "black",
                  },
                }}
              >
                Completed the Day
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Home;
