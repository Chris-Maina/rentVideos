const Video = require('./models/models');

createSlug = str => (str.split(' ').join('-').toLowerCase());

module.exports = (app) => {
  // server routes
  app.get('/api/', (req, res) => {
    res.json({ message: 'Welcome to RentVideos, get entertained!' });
  });

  app.get('/api/videos', (req, res) => {
    Video.find((err, videos) => {
      if (err) res.json({
        status: res.statusCode,
        message: err.message
      })
      res.json({ status: res.statusCode, data: videos });
    });
  });

  app.get('/api/videos/:slug', (req, res) => {
    Video.findOne({slug: req.params.slug}, (err, video) => {
      if (err) res.json({
        status: res.statusCode,
        message: err.message
      })

      res.json({ status: res.statusCode, data: video });
    });
  });

  app.post('/api/videos', (req, res) => {
    const { name, description } = req.body;
    const slug = createSlug(name);
    Video.create({
      name,
      description,
      slug: slug,
    }, (err, video) => {
      if (err) res.json({
          status: res.statusCode,
          message: err.message
        })
      res.json({ status: res.statusCode, data: video });
    });
  });

  app.patch('/api/videos/:slug', (req, res) => {
    Video.findOneAndUpdate({slug: req.params.slug}, req.body, (err, video) => {
      if (err) res.json({ status: res.statusCode, message: err.message });
      res.json({ status: res.statusCode, data: video, message: `Successfully edited to ${video.name}` });
    });
  });

  app.delete('/api/videos/:slug', (req, res) => {
    Video.findOneAndRemove({slug: req.params.slug}, req.body, (err, video) => {
      if (err) res.json({ status: res.statusCode, message: err.message });
      res.json({ status: res.statusCode, data: video, message: `Successfully deleted ${video.name}` });
    });
  });
};
