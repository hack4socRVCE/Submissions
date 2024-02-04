const User = require('../models/UserModel');

const getUsersByAddictType = async (req, res) => {
  const { addictType } = req.params;

  try {
    // Find all users with the specified addictType
    const users = await User.find({ addictType });

    if (!users || users.length === 0) {
      return res.status(404).json({ message: 'No users found for the given addictType' });
    }

    return res.status(200).json({
      message: 'Users retrieved successfully',
      users,
    });
  } catch (error) {
    console.error('Error retrieving users:', error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = getUsersByAddictType

