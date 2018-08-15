const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const directorSchema = new Schema({
  fullName: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model('Director', directorSchema);
