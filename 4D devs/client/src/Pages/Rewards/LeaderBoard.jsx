import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box } from '@mui/material';
import { LoggedState } from '../../context/auth';
import Sidebar from '../../components/Sidebar';

const LeaderBoard = () => {
    const [leaderboardData, setLeaderboardData] = useState([]);

    const isLoggedIn = LoggedState();
    const currentUser = isLoggedIn ? JSON.parse(localStorage.getItem('user')) : 0;

    useEffect(() => {
        // Fetch users based on the current user's addictType
        const fetchUsers = async () => {
            try {
                const response = await fetch(`/api/users/${currentUser?.addictType}`);
                const data = await response.json();
                setLeaderboardData(data.users);
            } catch (error) {
                console.error('Error fetching users:', error.message);
            }
        };

        if (currentUser?.addictType) {
            fetchUsers();
        }
    }, []);

    // Sort users based on TaskScore in descending order
    const sortedLeaderboard = leaderboardData.sort((a, b) => b.TaskScore - a.TaskScore);

    return (
        <Grid container spacing={3} sx={{ width: '100%', margin: '0 auto' }}>
            {/* Sidebar */}
            <Grid item xs={11} md={2}>
                <Sidebar />
            </Grid>

            
            {/* Main Content */}
            <Grid item xs={12} md={9} marginLeft={'-1%'} marginTop={'-1.8%'} sx={{
                background:"#4d7aab",
                alignItems: "center"
            }}>
                <Box className="leader board"
                sx={{
                    minHeight : "100vh",
                    minWidth: "113%",
                    backgroundColor: "#4d7aab",
                    paddingTop:"50px"
                }}>
                    <Typography variant="h4" gutterBottom color={"white"} sx={{textAlign: "center"}}>
                        Leaderboard
                    </Typography>
                    <TableContainer component={Paper} sx={{ maxHeight: '400px', width: "90%" , overflowY: 'auto' , margin: "0 auto" , borderRadius:'10px'}}>
                        <Table style={{backgroundColor:"#e8e6e6" , paddingLeft:"50px" }} >
                            <TableHead style={{borderBottom:"2px solid #1f1f1f" , fontWeight:800}}>
                                <TableRow  >
                                    <TableCell style={{fontWeight:750 , paddingLeft:"50px"}}>#Rank</TableCell>
                                    <TableCell style={{fontWeight:750}}>User</TableCell>
                                    <TableCell style={{fontWeight:750}}>Task Score</TableCell>
                                    <TableCell style={{fontWeight:750}}>Joined at</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody >
                                {sortedLeaderboard.map((user, index) => (
                                    <TableRow key={user._id} style={{borderBottom:"2px solid #D3D3D3"}}>
                                        <TableCell sx={{paddingLeft:"50px"}}>{index + 1}</TableCell>
                                        <TableCell>{user.username}</TableCell>
                                        <TableCell>{user.TaskScore}</TableCell>
                                        <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Grid>


        </Grid>
    );
};

export default LeaderBoard;
