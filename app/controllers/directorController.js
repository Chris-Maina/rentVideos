const Director = require('../models/Director');
const { slugify } = require('../helpers/generateSlug');
/**
 * get all directors
 * create a director
 * edit a director
 * delete a director
 * get videos for a particular director
 */

exports.getDirectors = async (req, res, next) => {
  try {
    const directors = await Director.find({});
    if (!directors.length) return res.status(404).json({
      status: 'failure',
      message: 'There are no directors at this time.',
    })
    return res.status(200).json({ status: 'success', data: directors });
  } catch (error) {
    next(error);
  }
}

exports.createDirector = async (req, res, next) => {
  const { fullName } = req.body;
  try {
    const slug = slugify(fullName);
    const director = await Director.create({ fullName, slug });
    return res.status(201).json({ status: 'success', data: director });
  } catch (error) {
   next(error);
  }
}

exports.updateDirector = async (req, res, next) => {
  const { slug } = req.value;
  try {
    const director = await Director.findOneAndUpdate({ slug, }, req.body);
    if (!director) return res.status(404).json({ status: 'failure', message: 'Could not find director. Please check the URL you are referencing.' });
    return res.status(200).json({ status: 'success', data: director, message: `Successfully edited director` });
  } catch (error) {
    next(error);
  }
};

exports.deleteDirector = async (req, res, next) => {
  const { slug } = req.value;
  try {
    const director = await Director.findOneAndRemove({ slug, });
    if (!director) return res.status(404).json({ status: 'failure', message: 'Could not find director. Please check the URL you are referencing.' })
    return res.status(200).json({ status: 'success', data: director, message: `Successfully deleted ${director.fullName}` });
  } catch (error) {
    next(error);
  }
};

exports.getDirector = async (req, res, next) => {
  const { slug } = req.value;
  try {
    const director = await Director.findOne({ slug });
    if (!director) return res.status(404).json({
      status: 'failure',
      message: 'Director not found.',
    })
    return res.status(200).json({ status: 'success', data: director });
  } catch (error) {
    next(error);
  }
}
