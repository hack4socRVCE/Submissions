import React from "react";
import { Paper, Box, Typography, CircularProgress } from "@mui/material";
import { styled } from "@mui/system";
import FireIcon from "@mui/icons-material/Whatshot";
import Image from "../images/meditation1.png";

// const StyledCircularProgress = styled(CircularProgress)({
//   position: "relative",
//   "& .MuiCircularProgress-svg": {
//     transform: "rotate(-90deg)", // Rotate to start from the top
//   },
//   "& .MuiCircularProgress-circle": {
//     strokeLinecap: "round",
//   },
//   "& .progress-mark": {
//     position: "absolute",
//     width: "100%",
//     height: "100%",
//     borderRadius: "50%",
//     clip: "rect(0, 50%, 100%, 0)",
//     animation: "$rotate 1.5s linear infinite",
//   },
//   "@keyframes rotate": {
//     "0%": { transform: "rotate(0deg)" },
//     "100%": { transform: "rotate(360deg)" },
//   },
// });

const StyledCircularProgress = styled(CircularProgress)(({ theme }) => ({
  position: "relative",

  "& .MuiCircularProgress-svg": {
    transform: "rotate(-90deg)", // Rotate to start from the top
  },
  "& .MuiCircularProgress-circle": {
    strokeLinecap: "round",
  },
  "& .progress-mark": {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    clip: "rect(0, 50%, 100%, 0)",
    animation: "$rotate 1.5s linear infinite",
  },
  "@keyframes rotate": {
    "0%": { transform: "rotate(0deg)" },
    "100%": { transform: "rotate(360deg)" },
  },
  color: "#ffffff", // Set the color to gold
}));

const StreakProgress = ({ currentUser }) => {
  const totalDays = 21; // Fixed total days
  const streakDays = currentUser.TaskScore || 0; // Streak days based on TaskScore
  const remainingDays = totalDays - streakDays;

  const progress = (streakDays / totalDays) * 100;

  return (
    <Paper
      elevation={3}
      sx={{
        p: 6,
        mb: 3,
        backgroundColor: "#0d3464",
        color: "white",
        backdropFilter: "blur(10px)",
        borderRadius: "10px",
        boxShadow: "0px 0px 10px #102f54",
        fontFamily: "Poppins,Montserrat, sans-serif",
      }}
    >
      <Box
        sx={{
          backgroundImage: `url(${Image})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "left",
        }}
      >
        <Box textAlign="center">
          <Typography variant="h5" gutterBottom>
            Task Completion Progress
          </Typography>
          <StyledCircularProgress
            variant="determinate"
            value={progress}
            size={100}
          >
            <div
              className="progress-mark"
              style={{ border: "2px solid #7E30E1" }}
            />
          </StyledCircularProgress>
          <Box position="relative" top="-10vh">
            <FireIcon
              fontSize="large"
              style={{ color: "gold", fontSize: 40 }}
            />
          </Box>
          <Typography mb={5} fontWeight="bold">{`${progress.toFixed(
            2
          )}% completed`}</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: 2,
          padding: " 15px 40px",
          backgroundColor: "#0bf",
          backdropFilter: "blur(10px)",
          borderRadius: "10px",
          boxShadow: "0px 0px 10px #102f54",
          color: "#333333",
        }}
      >
        <div>
          <Typography
            variant="subtitle1"
            fontWeight="bold"
          >{`${streakDays} Days Streak`}</Typography>
        </div>

        {/* Skipping Days info removed from here */}

        <div>
          <Typography
            variant="subtitle1"
            fontWeight="bold"
          >{`${remainingDays} Days Remaining`}</Typography>
        </div>

        <div>
          <Typography
            variant="subtitle1"
            fontWeight="bold"
          >{`${totalDays} Total Days`}</Typography>
        </div>
      </Box>
    </Paper>
  );
};

export default StreakProgress;
