if (process.env.NODE_ENV !== 'production') require('dotenv').load();
const express = require('express');
const Joi = require('joi');
const app = express();
const graphqlHTTP = require('express-graphql');
const schema = require('./app/schema/schema');

app.use(express.json());

// graphql schema
const schema = buildSchema(
  `type Query {
    video(id: String): Video
    videos: [Video]
  }
  type Mutation {
    updateVideo(id: String, name: String): Video
    createVideo(name: String, description: String): Video
    deleteVideo(id: String): Video
  }
  type Video {
    id: Int
    name: String
    description: String
  }
  `
);

let videos = [
  {id: 1, name: 'Spiderman', description: 'Awesome spiderman movie'},
  {id: 2, name: 'Infinity War', description: 'War of the avengers'},
  {id: 3, name: 'Jurasic Park', description: 'Animal movie'},
];

/**
 * @name findVideo
 * @summary gets the video with the supplied id
 * @param {String} id 
 * @returns {Object} video
 */
const findVideo = (id) => (videos.find(video => video.id === parseInt(id)));

/**
 * @name getVideo
 * @summary Gets the video requested
 * @param {Object} args 
 * @returns {Object}
 */
const getVideo = args => {
  const { id } = args;
  return findVideo(id);
}

/**
 * @name getVideos
 * @summary Gets all the videos
 * @param {Array} videos
 */
const getVideos = () => {
  return videos;
}

/**
 * @summary Updates the video requested
 * @param {Object} args
 * @returns {Object}
 */
const updateVideo = (args) => {
  const { id, name } = args;
  const video = findVideo(id);
  video.name = name;
  return video;
}

/**
 * @name validateInput
 * @summary validates inout
 * @param {Object} data - name of the video supplied
 */
const validateInput = (data) => {
  const bodySchema = Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
  });
  return Joi.validate(data, bodySchema);
}

/**
 * @summary Adds the created video to list of videos
 * @param {object} args
 * @returns {Object} newVideo 
 */
const createVideo = (args) => {
  const { error, value } = validateInput(args);
  if (error ) return error;
  if (value) {
    const newVideo = {
      id: videos.length+1,
      name: value.name,
      description: value.description
    }
    videos = [
      ...videos,
      newVideo
    ]
    return newVideo;
  }
}

/**
 * @summary Deletes a video
 * @param {Object} args
 * @returns {Object} video
 */
const deleteVideo = (args) => {
  const { id } = args;
  let video = findVideo(id);
  const index = videos.indexOf(video);
  videos.splice(index, 1);
  return video
}

// root resolver
const root = {
  video: getVideo,
  videos: getVideos,
  updateVideo,
  createVideo,
  deleteVideo,
};

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}));

const port = process.env.PORT;
app.listen(port, () => console.log(`Graphql server running on port ${port}...`));
