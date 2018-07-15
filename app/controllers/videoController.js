const Video = require('../models/Video');

createSlug = str => (str.split(' ').join('-').toLowerCase());

exports.index = (req, res) => (
  res.json({ message: 'Welcome to RentVideos, get entertained!' })
);

exports.getVideos = async (req, res) => {
  try {
    const videos = await Video.find({});
    if (!videos) res.status(404).json({
      status: 'failure',
      message: 'There are no videos at this time.',
    })
    return res.status(200).json({ status: 'success', data: videos });
  } catch (error) {
    return res.status(400).json({ status: 'failure', message: 'There was a problem fetching videos' })
  }
};

exports.getVideo = async (req, res) => {
  const video = await Video.findOne({ slug: req.params.slug });
  if (!video) return res.status(404).json({
    status: 'failure',
    message: 'Video not found',
  })
  return res.status(200).json({ status: res.statusCode, data: video });
}

exports.createVideo = async (req, res) => {
  const { name, description, genre, director } = req.body;
  const slug = createSlug(name);

  const video = await Video.create({
    name,
    description,
    slug: slug,
    genre,
    director,
    price,
  })

  if (!video) return res.status(400).json({ status: 'failure', message: 'There was an erro encountered while creating your video' });
  return res.status(201).json({ status: 'success', data: video });
}

exports.updateVideo = async (req, res) => {
  const video = await Video.findOneAndUpdate({ slug: req.params.slug }, req.body);
  if (!video) return res.status(400).json({ status: 'failure', message: 'There was an error updating your video. Try again later' });
  return res.status(200).json({ status: res.statusCode, data: video, message: `Successfully edited video` });
};

exports.deleteVideo = async (req, res) => {
  const video = await Video.findOneAndRemove({ slug: req.params.slug }, req.body);
  if (!video) return res.status(400).json({ status: 'failure', message: 'There was an error deleting your video' })
  return res.status(200).json({ status: 'success', data: video, message: `Successfully deleted ${video.name}` });
};
