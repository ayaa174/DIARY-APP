const mongoose = require('mongoose');

const diarySchema = mongoose.Schema({
    title: String,
    content: String,
    date: { type: Date, default: Date.now},
  });

// Create a diary entry model
const Diary = mongoose.model('Diary', diarySchema);

module.exports = Diary;