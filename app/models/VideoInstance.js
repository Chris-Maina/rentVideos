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
    enum: ['available', 'rented'],
    default: 'available'
  },
  due_back: { type: Date, default: Date.now() },
  rented_by: { type: Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('VideoInstance', videoInstanceSchema);
