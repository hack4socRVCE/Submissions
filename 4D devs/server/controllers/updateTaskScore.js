const User = require('../models/UserModel');

const updateTaskScore = async (req, res) => {
  const { userId } = req.params;
  const { newTaskScore } = req.body;

  //console.log(userId, newTaskScore);

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update the TaskScore
    user.TaskScore = newTaskScore;

    // Save the updated user
    await user.save();

    return res.status(200).json({ message: 'TaskScore updated successfully', user });
  } catch (error) {
    console.error('Error updating TaskScore:', error.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  updateTaskScore,
};
