const Video = require('../models/Video');
const Genre = require('../models/Genre');
const Director = require('../models/Director');

createSlug = str => (str.split(' ').join('-').toLowerCase());

exports.index = (req, res) => (
  res.json({ message: 'Welcome to RentVideos, get entertained!' })
);

exports.getVideos = async (req, res) => {
  try {
    const videos = await Video.find({}).populate('genre', 'name').populate('director', 'fullName');
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
  const { name, description, price } = req.body;
  const slug = createSlug(name);
  try {
    const video = await Video.create({
      name,
      description,
      slug,
      price,
    });
    if (!video) return res.status(400).json({ status: 'failure', message: 'Video was not created' });
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

exports.getVideoGenre = async (req, res, next) => {
  const { slug } = req.params;
  const video = await Video.findOne({ slug }).populate('genre');
  if(!video) return next(video);
  return res.status(200).json({ status: 'success', data: video.genre })
}

exports.createVideoGenre = async (req, res) => {
  const { name } = req.body;
  const { slug } = req.params;
  try {
    /**
     * Search for video
     * If does not exist, display error message. Else
     * Search for genre,
     * If it does not exist, create the genre
     * Check if video contains the genre
     * If it does not, push it into array of video genre
     * 
     */
    let genre = await Genre.findOne({ name, });
    if (!genre) {
      // create and save genre
      genre = new Genre({ name });
      await genre.save();
    }
    let video = await Video.find({ slug, genre });
    if (!video.length) {
      video = await Video.findOne({ slug });
      // add genre to the array
      video.genre.push(genre);
      await video.save();
      return res.status(201).json({ status: 'success', data: genre });
    }
    return res.status(200).json({ status: 'success', message: `${genre.name} already exists in the video.` });
  } catch (error) {
    return res.status(500).json({ status: 'failure', message: `There was an error populating genres for the video` });
  }
};

exports.getVideoDirector = async (req, res, next) => {
  const { slug } = req.params;
  const video = await Video.findOne({ slug }).populate('director');
  if(!video) return next(video);
  return res.status(200).json({ status: 'success', data: video.director })
}

exports.createVideoDirector = async (req, res) => {
  const { fullName } = req.body;
  const { slug } = req.params;
  try {
    let director = await Director.findOne({ fullName, });
    if (!director) {
      director = new Director({ fullName });
      await director.save();
    }
    let video = await Video.find({ slug, director });
    if (!video.length) {
      video = await Video.findOne({ slug });
      video.director.push(director);
      await video.save();
      return res.status(201).json({ status: 'success', data: director });
    }
    return res.status(200).json({ status: 'success', message: `${director.fullName} already exists in the video.` });
  } catch (error) {
    return res.status(500).json({ status: 'failure', message: `There was an error populating genres for the video ${video.name}` })
  }
};

