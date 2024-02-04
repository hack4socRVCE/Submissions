const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  addictType: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
},{timestamps:true});

module.exports = mongoose.model('Blog', blogSchema);