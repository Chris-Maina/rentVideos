if (process.env.NODE_ENV !== 'production') require('dotenv').load();
const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

let videos = [
  {id: 1, name: 'Spiderman'},
  {id: 2, name: 'Infinity War'},
  {id: 3, name: 'Jurasic Park'},
];

/**
 * @name findVideo
 * @summary Finds the video requested
 * @param {String} id - id for requested video
 */
const findVideo = id => videos.find(video => video.id === parseInt(id));

/**
 * @name validateInput
 * @summary validates inout
 * @param {Object} data - name of the video supplied
 */
const validateInput = (data) => {
  const schema = {
    name: Joi.string().min(3).required(),
  }

  const { error } = Joi.validate(data, schema);
  if (error) return res.status(400).send({ message: error.details[0].message});
}

app.get('/', (req, res) => {
  res.send('Welcome to RentVideos, get entertained!');
});

app.get('/api/videos', (req, res) => {
  res.send({ data: videos, message: 'Successfully fetched all the videos'});
});

app.get('/api/videos/:id', (req, res) => {
  /**
   * Find the video
   * IF it does not exist, 404(NOT found)
   * ELSE 200, with video
   */
  const video = findVideo(req.params.id);
  if (!video) return res.status(404).send({ message: 'The video with the given Id does not exist'});
  res.send({ data: video, message: 'Successfully fetched video requested'});
});

app.post('/api/videos', (req, res) => {
  /**
   * Validate the input
   * IF error, 400(BAD REQUEST)
   * ELSE 200(OK)
   */
  validateInput(req.body);

  const video = {
    id: videos.length +1,
    name: req.body.name
  }
  videos = [...videos, video];
  res.send({ data: video, message: `Successfully added ${video.name}`});
});

app.put('/api/videos/:id', (req, res) => {
  /**
   * Look up the video with id,
   * IF not found 404
   * 
   * Validate the input
   * IF invalid, 400
   * 
   * Update videos with input
   */
  let video = findVideo(req.params.id);
  if (!video) return res.status(404).send({ message: 'The video with the given Id does not exist'});

  validateInput(req.body);

  video.name = req.body.name;
  videos = [...videos, video];
  res.send({ data: video, message: `Successfully edited ${video.name}`});
});

const port = process.env.PORT;
app.listen(port, () => console.log(`Listening on port ${port}...`));
