const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoSchema = new Schema({
  createdAt: { type: Date, default: Date.now() },
  modifiedAt: Date,
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
});

module.exports = mongoose.model('Videos', videoSchema);
