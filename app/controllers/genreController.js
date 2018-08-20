const Genre = require('../models/Genre');
const { slugify } = require('../helpers/generateSlug');

/**
 * get all genres
 * create a genre
 * edit a genre
 * delete a genre
 * get videos for a particular genre
 */

exports.getGenres = async (req, res, next) => {
  try {
    const genres = await Genre.find({});
    if (!genres.length) return res.status(404).json({
      status: 'failure',
      message: 'There are no genres at this time.',
    });
    return res.status(200).json({ status: 'success', data: genres });
  } catch (error) {
    next(error);
  }
}

exports.createGenre = async (req, res, next) => {
  const { name } = req.body;
  try {
    const slug = slugify(name);
    const genre = await Genre.create({ name, slug });
    return res.status(201).json({ status: 'success', data: genre });
  } catch (error) {
    next(error);
  }
}

exports.updateGenre = async (req, res, next) => {
  const { slug } = req.value;
  try {
    const genre = await Genre.findOneAndUpdate({ slug }, req.body);
    if (!genre) return res.status(404).json({ status: 'failure', message: 'Could not find your genre. Please check the URL you are referencing.' });
    return res.status(200).json({ status: 'success', message: `Successfully edited genre` });
  } catch (error) {
    next(error);
  }
};

exports.deleteGenre = async (req, res, next) => {
  const { slug } = req.value;
  try {
    const genre = await Genre.findOneAndRemove({ slug });
    if (!genre) return res.status(404).json({ status: 'failure', message: 'Could not find your genre. Please check the URL you are referencing.' })
    return res.status(200).json({ status: 'success', data: genre, message: `Successfully deleted ${genre.name}` });
  } catch (error) {
    next(error);
  }
};

exports.getGenre = async (req, res, next) => {
  const { slug } = req.value;
  try {
    const genre = await Genre.findOne({ slug });
    if (!genre) return res.status(404).json({
      status: 'failure',
      message: 'Genre not found.',
    })
    return res.status(200).json({ status: 'success', data: genre });
  } catch (error) {
    next(error);
  }
}
