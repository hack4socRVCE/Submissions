const Blog = require('../models/addictBlogs');


const addBlog = async (req, res) => {
    const { addictType, title, content } = req.body;
  
    const blogObj = {
        addictType,
        title,
        content,
    };
    
    try {
            let existingBlog = await Blog.findOne({ title });
            if (existingBlog) {
                return res.status(200).json("Blog Title Already Exsists .!");
            }
            const newBlog = await Blog.create(blogObj);
            return res.status(201).json({
                message: 'New blog created successfully',
                blog: newBlog,
            });
    }catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    }
    
}

const getBlogs = async (req, res) => {
    const { addictType } = req.query;
  
    try {
      if (!addictType) {
        return res.status(400).json({
          message: 'Please provide an addictType in the query parameters.',
        });
      }
  
      const blogs = await Blog.find({ addictType });
  
      if (blogs.length === 0) {
        return res.status(404).json({
          message: `No blogs found for addictType: ${addictType}`,
        });
      }
  
      return res.status(200).json({
        message: 'Blogs retrieved successfully',
        blogs,
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  };
  
  module.exports = { addBlog, getBlogs };