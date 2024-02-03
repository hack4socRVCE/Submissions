import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Paper, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import Sidebar from '../../components/Sidebar';
import { LoggedState } from '../../context/auth';
import toast from 'react-hot-toast'

const Blogs = () => {
    const isLoggedIn = LoggedState();
    const currentUser = isLoggedIn ? JSON.parse(localStorage.getItem('user')) : 0;
    const addictType = currentUser.addictType;
    const [blogs, setBlogs] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [newBlog, setNewBlog] = useState({ title: '', content: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch(`api/getBlogs?addictType=${addictType}`);
                const data = await response.json();
    
                // Sort blogs by createdAt timestamp in descending order
                const sortedBlogs = data.blogs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
                setBlogs(sortedBlogs);
            } catch (error) {
                console.error('Error fetching blogs:', error.message);
            }
        };
    
        fetchBlogs();
    }, [addictType]);
    

    const handleReadMore = (title) => {
        navigate(`/blogs/${title}`);
    };

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewBlog((prevBlog) => ({ ...prevBlog, [name]: value }));
    };

    const handleUploadBlog = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/uploadBlog', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    addictType: addictType,
                    title: newBlog.title,
                    content: newBlog.content,
                }),
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            // Assuming the response includes the newly created blog
            const newBlogData = await response.json();
    
            // Update state to include the new blog
            setBlogs((prevBlogs) => [newBlogData.blog, ...prevBlogs]);
            toast.success("Blog uploaded successfully..!");
            // Close the modal after uploading
            handleCloseModal();
        } catch (error) {
            toast.error('Error uploading blog:', error.message);
        }
    };
    
    

    return (
<div style={{ display: 'flex' }}>
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div style={{ flex: 1, padding: '20px' }}>
                <div style={{ marginBottom: '20px' }}>
                    <Button onClick={handleOpenModal} variant="outlined" color="primary">
                        Upload Your Story
                    </Button>
                </div>
                <h1>Success Stories of :</h1>
                <h2>{`Addict Type: ${addictType}`}</h2>

                {blogs.map((blog) => (
                    <Paper key={blog._id} elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
                        <div style={{ marginBottom: '20px' }}>
                            <Typography variant="h5">{blog.title}</Typography>
                            <Typography>{`${blog.content.slice(0, 50)}...`}</Typography>
                        </div>
                        <Button onClick={() => handleReadMore(blog._id)} variant="outlined" color="primary">
                            Read More
                        </Button>
                    </Paper>
                ))}

                {/* Upload Blog Modal */}
                <Dialog open={openModal} onClose={handleCloseModal} fullScreen>
                    <DialogTitle>Upload Blog</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="Title"
                            name="title"
                            value={newBlog.title}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Content"
                            name="content"
                            value={newBlog.content}
                            onChange={handleInputChange}
                            multiline
                            rows={4}
                            fullWidth
                            margin="normal"
                        />
                    </DialogContent>
                    {/* Custom styles for DialogActions */}
                    <DialogActions style={{ position: 'absolute', top: 0, right: 0, padding: '10px' }}>
                        <Button onClick={handleCloseModal} color="error">
                            Cancel
                        </Button>
                        <Button onClick={handleUploadBlog} color="success">
                            Upload
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
};

export default Blogs;
