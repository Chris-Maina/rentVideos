const Genre = require('../models/Genre');
const Video = require('../models/Video');
/**
 * get all genres
 * create a genre
 * edit a genre
 * delete a genre
 * get videos for a particular genre
 */

exports.getGenres = async (req, res) => {
  try {
    const genres = await Genre.find({});
    if (!genres) res.status(404).json({
      status: 'failure',
      message: 'There are no genres at this time.',
    })
    return res.status(200).json({ status: 'success', data: genres });
  } catch (error) {
    return res.status(400).json({ status: 'failure', message: 'There was a problem fetching genres' })
  }
}

exports.createGenre = async (req, res) => {
  const { name } = req.body;
  try {
    const genre = await Genre.create({ name, });
    if (!genre) return res.status(400).json({ status: 'failure', message: 'Genre name is required'});
    return res.status(201).json({ status: 'success', data: genre });
  } catch (error) {
    return res.status(400).json({ status: 'failure', message: 'There was an error encountered while creating your genre' });
  }
}

exports.updateGenre = async (req, res) => {
  try {
    const genre = await Genre.findOneAndUpdate({ id: req.params.id }, req.body);
    if (!genre) return res.status(404).json({ status: 'failure', message: 'Genre not found.' });
    return res.status(200).json({ status: 'success', data: genre, message: `Successfully edited genre` });
  } catch (error) {
    return res.status(400).json({ status: 'failure', message: 'There was an error updating your genre. Try again later' });
  }
};

exports.deleteGenre = async (req, res) => {
  try {
    const genre = await Genre.findOneAndRemove({ _id: req.params.id });
    if (!genre) return res.status(404).json({ status: 'failure', message: 'Could not find the genre.' })
    return res.status(200).json({ status: 'success', data: genre, message: `Successfully deleted ${genre.name}` });
  } catch (error) {
    return res.status(400).json({ status: 'failure', message: 'There was an error deleting your genre. Try again later' });
  }
};

exports.getGenre = async (req, res) => {
  try {
    const genre = await Genre.findById(req.params.id);
    if (!genre) res.status(404).json({
      status: 'failure',
      message: 'Genre not found.',
    })
    return res.status(200).json({ status: 'success', data: genre });
  } catch (error) {
    return res.status(400).json({ status: 'failure', message: 'There was a problem fetching that genre' })
  }
}
