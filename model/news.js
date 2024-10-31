
const mongoose = require('mongoose');
const { Schema } = mongoose;

const articleSchema = new Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  views: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
});

// Create a model based on the schema
const Sports = mongoose.model('Sports', articleSchema);

module.exports = Sports;
