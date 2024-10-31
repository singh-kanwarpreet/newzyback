
const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
});

const Notes = mongoose.model('Notes', notesSchema);
module.exports = Notes;
