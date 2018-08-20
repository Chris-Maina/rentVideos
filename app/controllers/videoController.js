const Video = require('../models/Video');
const Genre = require('../models/Genre');
const Director = require('../models/Director');
const { slugify } = require('../helpers/generateSlug');

exports.getVideos = async (req, res, next) => {
  try {
    const videos = await Video.find({}).populate('genre', 'name').populate('director', 'fullName');
    if (!videos.length) res.status(404).json({
      status: 'failure',
      message: 'There are no videos at this time.',
    });
    return res.status(200).json({ status: 'success', data: videos });
  } catch (error) {
    next(error);
  }
};

exports.getVideo = async (req, res, next) => {
  const { slug } = req.value;
  try {
    const video = await Video.findOne({ slug });
    if (!video) return res.status(404).json({
      status: 'failure',
      message: 'Video not found',
    });
    return res.status(200).json({ status: res.statusCode, data: video });
  } catch (error) {
    next(error);
  }
}

exports.createVideo = async (req, res, next) => {
  const { name, description, price } = req.body;
  const slug = slugify(name);
  try {
    const video = await Video.create({
      name,
      description,
      slug,
      price,
    });
    if (!video) return res.status(404).json({ status: 'failure', message: 'Video was not created. Please try again.' });
    return res.status(201).json({ status: 'success', data: video });
  } catch (error) {
    next(error);
  }
}

exports.updateVideo = async (req, res, next) => {
  try {
    const video = await Video.findOneAndUpdate({ slug: req.params.slug }, req.body);
    if (!video) return res.status(404).json({ status: 'failure', message: 'Could not find your video. Please check the url you are referencing.' });
    return res.status(200).json({ status: 'success', data: video, message: `Successfully edited video` });
  } catch (error) {
    next(error);
  }
};

exports.deleteVideo = async (req, res, next) => {
  try {
    const video = await Video.findOneAndRemove({ slug: req.params.slug });
    if (!video) return res.status(404).json({ status: 'failure', message: 'Could not find your video. Please check the url you are referencing.' })
    return res.status(200).json({ status: 'success', message: `Successfully deleted ${video.name}` });
  } catch (error) {
    next(error);
  }
};

exports.getVideoGenre = async (req, res, next) => {
  const { slug } = req.params;
  try {
    const video = await Video.findOne({ slug }).populate('genre');
    if (!video) return res.status(404).json({ status: 'failure', message: 'Could not find your video. Please check the url you are referencing.' });
    return res.status(200).json({ status: 'success', data: video.genre });
  } catch (error) {
    next(error);
  }
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
      genre.slug = slugify(name);
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
    next(error);
  }
};

exports.getVideoDirector = async (req, res, next) => {
  const { slug } = req.params;
  try {
    const video = await Video.findOne({ slug }).populate('director');
    if (!video) return res.status(404).json({ status: 'failure', message: 'Could not find your video. Please check the url you are referencing.' });
    return res.status(200).json({ status: 'success', data: video.director });
  } catch (error) {
    next(error);
  }
}

exports.createVideoDirector = async (req, res, next) => {
  const { fullName } = req.body;
  const { slug } = req.params;
  try {
    let director = await Director.findOne({ fullName, });
    if (!director) {
      director = new Director({ fullName });
      director.slug = slugify(fullName);
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
    next(error);
  }
};

