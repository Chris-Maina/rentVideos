const Video = require('./models/models');
const router = require('express').Router();

createSlug = str => (str.split(' ').join('-').toLowerCase());

// server routes
router.get('/', (req, res) => {
  res.json({ message: 'Welcome to RentVideos, get entertained!' });
});

router.get('/videos', (req, res) => {
  Video.find((err, videos) => {
    if (err) res.json({
      status: res.statusCode,
      message: err.message
    })
    res.json({ status: res.statusCode, data: videos });
  });
});

router.get('/videos/:slug', (req, res) => {
  Video.findOne({slug: req.params.slug}, (err, video) => {
    if (err) res.json({
      status: res.statusCode,
      message: err.message
    })

    res.json({ status: res.statusCode, data: video });
  });
});

router.post('/videos', (req, res) => {
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

router.patch('/videos/:slug', (req, res) => {
  Video.findOneAndUpdate({slug: req.params.slug}, req.body, (err, video) => {
    if (err) res.json({ status: res.statusCode, message: err.message });
    res.json({ status: res.statusCode, data: video, message: `Successfully edited to ${video.name}` });
  });
});

router.delete('/videos/:slug', (req, res) => {
  Video.findOneAndRemove({slug: req.params.slug}, req.body, (err, video) => {
    if (err) res.json({ status: res.statusCode, message: err.message });
    res.json({ status: res.statusCode, data: video, message: `Successfully deleted ${video.name}` });
  });
});

module.exports = router;
