import React, { useState, useEffect } from 'react';
import { Button, Checkbox, FormControlLabel, List, ListItem, ListItemText, Paper, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import Sidebar from '../../components/Sidebar';
import toast from 'react-hot-toast';
import { LoggedState } from '../../context/auth';
import { useParams } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';

const DailyTask = () => {
  const { isLoggedIn } = LoggedState();
  const currentUser = isLoggedIn ? JSON.parse(localStorage.getItem('user')) : 0;

  const { level, addictType } = useParams();
  const [selectedDay, setSelectedDay] = useState(1);
  const [addictTask, setAddictTask] = useState(null);
  const [countdown, setCountdown] = useState(null);
  const [checkedTasks, setCheckedTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/addictTasks?addictType=${addictType}`);
        const data = await response.json();
        setAddictTask(data.addictTask[level].tasks);

        const levelScore = currentUser?.DailyTaskDone?.[level];
        if (levelScore !== undefined) {
          const unlockedDays = Math.floor(levelScore / 3) + 1;
          setSelectedDay(Math.min(unlockedDays, 5));
        }

        const storedCheckedTasks = JSON.parse(localStorage.getItem('checkedTasks')) || [];
        setCheckedTasks(storedCheckedTasks);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, [level, addictType, currentUser]);

  const handleCheckboxChange = (event, index) => {
    const newCheckedTasks = [...checkedTasks];
    newCheckedTasks[index] = event.target.checked;
    setCheckedTasks(newCheckedTasks);
    localStorage.setItem('checkedTasks', JSON.stringify(newCheckedTasks));
  };

  const handleDayToggle = (day) => {
    setSelectedDay(day);
    showStartDayNotification();
    updateCheckedTasks(day);
  };

  const updateCheckedTasks = (day) => {
    const tasksForSelectedDay = addictTask[day - 1]?.tasks || [];
    const initialCheckedState = tasksForSelectedDay.map(() => false);
    setCheckedTasks(initialCheckedState);
  };

  const showStartDayNotification = () => {
    const isReady = window.confirm(`Ready to start Day ${selectedDay}? Click OK to begin or Cancel if you're not ready.`);
  
    if (isReady) {
      setTimeout(() => {
        toast.success(`Day ${selectedDay} has started! Get ready for your tasks.`);
        startDayTimer();
      }, 1000);
    } else {
      toast.loading('Day not started. Get ready and click Start Your Day when you are prepared.',{
        duration:2000
      });
    }
  };
  

  const startDayTimer = () => {
    const endTime = Date.now() + 12 * 60 * 60 * 1000;

    const updateCountdown = () => {
      const remainingTime = endTime - Date.now();
      const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

      setCountdown(`${hours}:${minutes}:${seconds}`);

      if (remainingTime <= 0) {
        toast.success(`Day ${selectedDay} has ended.`);
        setCountdown(null);
      }
    };

    updateCountdown();

    const countdownInterval = setInterval(updateCountdown, 1000);

    setTimeout(() => {
      clearInterval(countdownInterval);
    }, 12 * 60 * 60 * 1000);
  };

  const handleStartDay = () => {
    showStartDayNotification();
  };

  const handleCompleteDay = () => {
    // Check if all checkboxes are checked
    const allChecked = checkedTasks.every((isChecked) => isChecked);
  
    if (allChecked) {
      // Make a POST request to update TaskScore
      fetch(`/api/updateTaskScore/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newTaskScore: 1 }),
      })
        .then((response) => response.json())
        .then((data) => {
          const updatedUser = { ...currentUser, ...data.user };
          localStorage.setItem('user', JSON.stringify(updatedUser));
          console.log('TaskScore updated:', data);
          toast.success('TaskScore updated successfully!');
  
          // Make a POST request to update DailyTaskDone based on the level
          fetch(`/api/users/updateDailyTaskDone/${currentUser._id}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ level }),
          })
            .then((response) => response.json())
            .then((data) => {
              const updatedUser = { ...currentUser, ...data.user };
              localStorage.setItem('user', JSON.stringify(updatedUser));
              console.log('DailyTaskDone updated:', data);
              toast.success('DailyTaskDone updated successfully!');
            })
            .catch((error) => {
              console.error('Error updating DailyTaskDone:', error.message);
              toast.error('Error updating DailyTaskDone. Please try again.');
            });
        })
        .catch((error) => {
          console.error('Error updating TaskScore:', error.message);
          toast.error('Error updating TaskScore. Please try again.');
        })
        .finally(() => {
          // Uncheck all checkboxes
          setCheckedTasks(Array(checkedTasks.length).fill(false));
  
          // Update unchecked state in local storage
          localStorage.setItem('checkedTasks', JSON.stringify(Array(checkedTasks.length).fill(false)));
        });
    } else {
      toast.error('Please complete all tasks before completing the day.');
    }
  };
  
  

  const unlockedDays = Math.min(Math.floor((currentUser?.DailyTaskDone?.[level] || 0) / 3) + 1, selectedDay);

  return (
    <Layout>
    <div style={{ display: 'flex' }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div style={{ flex: 1, padding: '20px' }}>
        <h1>Daily Tasks</h1>
        <h2>{`${level} - ${addictType}`}</h2>

        {addictTask && (
          <>
            <Button variant="contained" color="primary" onClick={handleStartDay} sx={{ marginBottom: '20px' }}>
              Start Your Day
            </Button>

            {/* Toggle buttons for each day */}
            <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
              <ToggleButtonGroup
                color="primary"
                value={selectedDay}
                exclusive
                onChange={(event, newDay) => handleDayToggle(newDay)}
              >
                {[1, 2, 3, 4, 5].map((day) => (
                  <ToggleButton
                    key={day}
                    value={day}
                    disabled={day > unlockedDays}
                    sx={{
                      backgroundColor: day > unlockedDays ? '#EF4040' : '#65B741',
                      color: day > unlockedDays ? 'black' : 'white',
                      ":hover": {
                        cursor: day > unlockedDays ? "not-allowed" : "pointer",
                      }
                    }}
                  >
                    {`Day ${day}`}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Paper>

            {/* Countdown timer */}
            {countdown && (
              <Typography variant="h6" style={{ marginBottom: '20px' }}>
                Time Remaining: {countdown}
              </Typography>
            )}

            {/* Display content for the selected day */}
            <div style={{ marginTop: '20px' }}>
              <List>
                {addictTask.map((task, index) => (
                  <ListItem key={task._id} disableGutters style={{ marginBottom: '10px' }}>
                    <ListItemText
                      primary={<Typography variant="h6">{task.title}</Typography>}
                      secondary={<Typography variant="body1">{task.description}</Typography>}
                    />
                    <Checkbox
                      color="primary"
                      checked={checkedTasks[index]}
                      onClick={(event) => handleCheckboxChange(event, index)}
                      sx={{ mr: '15vw' }}
                    />
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
              sx={{ marginTop: '20px' }}
            >
              Completed the Day
            </Button>
          </>
        )}
      </div>
    </div>
    </Layout>
  );
};

export default DailyTask;
