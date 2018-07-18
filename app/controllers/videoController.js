const Video = require('../models/Video');

createSlug = str => (str.split(' ').join('-').toLowerCase());

exports.index = (req, res) => (
  res.json({ message: 'Welcome to RentVideos, get entertained!' })
);

exports.getVideos = (req, res) => (
  Video.find((err, videos) => {
    if (err) res.json({
      status: res.statusCode,
      message: err.message,
    });
    res.json({ status: res.statusCode, data: videos });
  })
);

exports.getVideo = (req, res) => (
  Video.findOne({ slug: req.params.slug }, (err, video) => {
    if (err) res.json({
      status: res.statusCode,
      message: err.message,
    });

    res.json({ status: res.statusCode, data: video });
  })
)

exports.createVideo = (req, res) => {
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
    });
    res.json({ status: res.statusCode, data: video });
  });
}

exports.updateVideo = (req, res) => (
  Video.findOneAndUpdate({slug: req.params.slug}, req.body, (err, video) => {
    if (err) res.json({ status: res.statusCode, message: err.message });
    res.json({ status: res.statusCode, data: video, message: `Successfully edited video` });
  })
);

exports.deleteVideo = (req, res) => (
  Video.findOneAndRemove({slug: req.params.slug}, req.body, (err, video) => {
    if (err) res.json({ status: res.statusCode, message: err.message });
    res.json({ status: res.statusCode, data: video, message: `Successfully deleted ${video.name}` });
  })
);
