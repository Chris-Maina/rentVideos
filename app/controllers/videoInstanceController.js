const VideoInstance = require('../models/VideoInstance');
const Video = require('../models/Video');
const User = require('../models/User');

/**
 * GETs all the video instances
 * @param {Object} req 
 * @param {Object} res 
 */
exports.getVideoInstances = async (req, res, next) => {
  try {
    const videoInstances = await VideoInstance.find({}).populate('video', 'name').populate('user', 'email');
    if (!videoInstances.length) return res.status(404).json({ status: 'failure', message: 'There are no videos at this time'});
    return res.status(200).json({ status: 'success', data: videoInstances });
  } catch (error) {
    next(error);
  }
}

exports.rentVideo = async (req, res, next) => {
  const { status, due_back } = req.body;
  const { slug } = req.value;
  try {
    const video = await Video.findOne({ slug });
    if (!video) return res.status(404).json({ status: 'failure', message: 'Video you want to rent is unavailable.' });
    const user = await User.findOne({ email: req.loggedInUser });
    if (!user) return res.status(404).json({ status: 'failure', message: 'Please login to be able to rent the video.' });
    const videoInstance = new VideoInstance({
      video,
      status,
      due_back,
      rented_by: user
    });
    const result  = await videoInstance.save();
    return res.status(201).json({ status: 'success', message: result });
  } catch (error) {
    next(error);
  }
}
