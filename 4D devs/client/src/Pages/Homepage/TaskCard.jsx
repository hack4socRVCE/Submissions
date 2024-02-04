// LizardCard.js
import React from 'react';
import { Card, CardActionArea, CardMedia, CardContent, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { LoggedState } from '../../context/auth';
import toast from 'react-hot-toast';

const TaskCard = ({ title, description, image, locked }) => {
    const { isLoggedIn } = LoggedState();
    const currentUser = isLoggedIn ? JSON.parse(localStorage.getItem('user')) : 0;
    const taskScore = currentUser?.TaskScore || 0;

    const navigate = useNavigate();


    const handleClick = () => {
        // Navigate to Level and type of Addict Route
        navigate(`/Tasks/${title}/${currentUser.addictType}`);
    };

    const handleLockedCardClick = () => {
        toast.dismiss();
        toast.error('This level is locked. Complete the previous level first.');
    };

    return (
        <Card
            sx={{
                maxWidth: 345,
                opacity: locked ? 0.4 : 1,
                position: 'relative',
                '&:hover': {
                    cursor: locked ? 'not-allowed' : 'pointer'
                }
            }}
            onClick={locked ? handleLockedCardClick : handleClick}
        >
            { locked === 1 ? (
                <div
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        color: 'white',
                        fontSize: '4rem',
                        zIndex: 2,
                    }}
                >
                    🔒
                </div>
            ):null}
            <CardActionArea>
                <CardMedia
                    component="img"
                    image={image}
                    alt="green iguana"
                    style={{
                        backgroundSize: 'cover', width: '100%', maxHeight: '110px', '&:hover': {
                            cursor: locked ? 'not-allowed' : 'pointer'
                        }
                    }}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <Button
                fullWidth
                sx={{
                    backgroundColor: locked ? 'red' : '#7E30E1',
                    color: locked ? 'white' : 'black',
                    '&:hover': {
                        backgroundColor: locked ? '#D80032' : 'lightpink',
                        cursor: locked ? 'not-allowed' : 'pointer',
                    },
                }}
                onClick={handleClick}
                disabled={locked}
            >
                View Tasks
            </Button>
        </Card>
    );
};
export default TaskCard;
