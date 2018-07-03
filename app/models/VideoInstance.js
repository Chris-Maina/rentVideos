const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoInstanceSchema = new Schema({
  video: {
    type: Schema.Types.ObjectId,
    ref: 'Video',
    required: true
  },
  status: {
    type: String ,
    required: true ,
    enum: ['Available', 'Rented']
  },
  due_back: { type: Date },
});

module.exports = mongoose.model('VideoInstance', videoInstanceSchema);
