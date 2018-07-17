const Video = require('../models/Video');
const Genre = require('../models/Genre');
const Director = require('../models/Director');

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
  const { name, description, genre, director, price } = req.body;

  const genreIDs = genre.map(async name => {
    const item = await Genre.create({ name, });
    if (!item) return res.status(400).json({ status: 'failure', message: 'Genre name(s) required'});
    return item._id;
  });
  const directorIDs = director.map(async fullName => {
    const item = await Director.create({ fullName, });
    console.log('director>>', item._id);
    if (!item) return res.status(400).json({ status: 'failure', message: 'Director(s) full name required'});
    return item._id;
  });
  console.log('fullname>>', directorIDs);
  const slug = createSlug(name);
  try {
    const video = await Video.create({
      name,
      description,
      slug: slug,
      genre: genreIDs,
      director: directorIDs,
      price,
    });
    if (!video) return res.status(400).json({ status: 'failure', message: 'There was an erro encountered while creating your video' });
    return res.status(201).json({ status: 'success', data: video });
  } catch (error) {
    return res.status(400).json({ status: 'failure', message: 'There was an error encountered while creating your video' });
  }
}

exports.updateVideo = async (req, res) => {
  try {
    const video = await Video.findOneAndUpdate({ slug: req.params.slug }, req.body);
    if (!video) return res.status(404).json({ status: 'failure', message: 'Could not find a video.' });
    return res.status(200).json({ status: 'success', data: video, message: `Successfully edited video` });
  } catch (error) {
    return res.status(400).json({ status: 'failure', message: 'There was an error updating your video. Try again later' });
  }
};

exports.deleteVideo = async (req, res) => {
  const video = await Video.findOneAndRemove({ slug: req.params.slug });
  if (!video) return res.status(400).json({ status: 'failure', message: 'There was an error deleting your video' })
  return res.status(200).json({ status: 'success', data: video, message: `Successfully deleted ${video.name}` });
};
