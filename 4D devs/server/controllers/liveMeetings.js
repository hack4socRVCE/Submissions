const live = require("../models/liveMeeting");

const addLiveMeetings = async (req, res) => {
  const { roomName, time, liveUrl ,addictType } = req.body;
  const meeting = {
    roomName,
    time,
    liveUrl,
    addictType
  };
  try {
    const newMeeting = await live.create(meeting);
    return res.status(201).json({
      message: "New meeting is live",
      meeting: newMeeting,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

const getLiveMeetings = async (req, res) => {
  try {
    let existingMeeting = await live.find({});
    if (!existingMeeting) {
      return res.status(201).json({
        message: `no meetings are scheduled`,
      });
    }
    if (existingMeeting) {
      return res.status(200).json({
        message: "meetings retrieved successfully",
        existingMeeting,
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = { addLiveMeetings, getLiveMeetings };
