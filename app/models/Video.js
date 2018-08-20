const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoSchema = new Schema({
  createdAt: { type: Date, default: Date.now() },
  modifiedAt: { type: Date, default: Date.now() },
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  description: {
    type: String,
    default: '',
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  price: {
    type: String,
  },
  genre: [{ type: Schema.Types.ObjectId, ref: 'Genre' }],
  director: [{ type: Schema.Types.ObjectId, ref: 'Director' }],
});

module.exports = mongoose.model('Video', videoSchema);
