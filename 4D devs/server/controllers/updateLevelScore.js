const User = require('../models/UserModel');

const updateDailyTaskDone = async (req, res) => {
  const { userId } = req.params;
  const {level} = req.body;

  try {
    // Fetch the user by userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Calculate the updated value based on the level received by 3
    const updatedValue = user.DailyTaskDone[level] + 3;

    // Update DailyTaskDone for the specified level
    user.DailyTaskDone[level] = updatedValue;

    // Save the updated user
    const updatedUser = await user.save();

    return res.status(200).json({
      message: 'DailyTaskDone updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    console.error('Error updating DailyTaskDone:', error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = updateDailyTaskDone;

