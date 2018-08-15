const Director = require('../models/Director');
const Video = require('../models/Video');
/**
 * get all directors
 * create a director
 * edit a director
 * delete a director
 * get videos for a particular director
 */

exports.getDirectors = async (req, res) => {
  try {
    const directors = await Director.find({});
    if (!directors) res.status(404).json({
      status: 'failure',
      message: 'There are no directors at this time.',
    })
    return res.status(200).json({ status: 'success', data: directors });
  } catch (error) {
    return res.status(400).json({ status: 'failure', message: 'There was a problem fetching directors' })
  }
}

exports.createDirector = async (req, res) => {
  const { fullName } = req.body;
  try {
    const director = await Director.create({ fullName,});
    if (!director) return res.status(400).json({ status: 'failure', message: 'Director full name is required'});
    return res.status(201).json({ status: 'success', data: director });
  } catch (error) {
    return res.status(400).json({ status: 'failure', message: 'There was an error encountered while creating a director' });
  }
}

exports.updateDirector = async (req, res) => {
  try {
    const director = await Director.findOneAndUpdate({ id: req.params.id }, req.body);
    if (!director) return res.status(404).json({ status: 'failure', message: 'Could not find director.' });
    return res.status(200).json({ status: 'success', data: director, message: `Successfully edited director` });
  } catch (error) {
    return res.status(400).json({ status: 'failure', message: 'There was an error updating your director. Try again later' });
  }
};

exports.deleteDirector = async (req, res) => {
  try {
    const director = await Director.findOneAndRemove({ _id: req.params.id });
    if (!director) return res.status(404).json({ status: 'failure', message: 'Could not find the director.' })
    return res.status(200).json({ status: 'success', data: director, message: `Successfully deleted ${director.firstName}` });
  } catch (error) {
    return res.status(400).json({ status: 'failure', message: 'There was an error deleting your director. Try again later' });
  }
};

exports.getDirector = async (req, res) => {
  try {
    const director = await Director.findById(req.params.id)
    if (!director) res.status(404).json({
      status: 'failure',
      message: 'Director not found.',
    })
    return res.status(200).json({ status: 'success', data: director });
  } catch (error) {
    return res.status(400).json({ status: 'failure', message: 'There was a problem fetching details of that director' })
  }
}
