const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const directorSchema = new Schema({
  firstName: { type:String, required: true },
  lastName: { type:String, required: true },
});

directorSchema.virtual('fullName').get(() => (this.firstName+ ' '+ this.lastName));

module.exports = mongoose.model('Director', directorSchema);
