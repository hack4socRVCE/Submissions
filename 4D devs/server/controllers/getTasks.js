const AddictTask = require('../models/addictTasks');

const getTasks = async(req,res)=>{

  const { addictType } = req.query;

  try {
    const addictTask = await AddictTask.findOne({ addictType });
    if (addictTask) {
      return res.status(200).json({
        message: 'Tasks retrieved successfully',
        addictTask,
      });
    } else {
      return res.status(404).json({
        message: 'No tasks found for the specified addictType',
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
}

module.exports = getTasks;

