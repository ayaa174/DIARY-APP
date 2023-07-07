const express = require('express');
const mongoose = require('mongoose');
const Diary = require('./models/diary');

const app = express();
const PORT = process.env.PORT || 3000;

// Parse JSON bodies
app.use(express.json());

// Define routes
app.get('/api', (req, res) => {
  res.send('Welcome to the diary app!');
});


// Create diary entry
app.post('/api/diary', async(req, res) => {
  try{
    const diary = await Diary.create(req.body);
    res.status(200).json(diary);

  }catch (error) {
    console.log(error.message);
    res.status(500).json({message: error.message});
  }
});

// Get all diaries
app.get('/api/diaries', async(req, res) => {
  try{
    const diaries = await Diary.find({});
    res.status(200).json(diaries);

  }catch (error) {
    res.status(500).json({message: error.message});
  }
});

// Get diary by id
app.get('/api/diaries/:id', async(req, res) => {
  try{
    const {id} = req.params;
    const diary = await Diary.findById(id);
    res.status(200).json(diary);

  }catch (error) {
    res.status(500).json({message: error.message});
  }
});

// Delete diary by id
app.delete('/api/diaries/:id', async(req, res) => {
  try{
    const {id} = req.params;
    const diary = await Diary.findByIdAndDelete(id);
    if(!diary){
     return res.status(404).status({ success: false, message: "List not found" });
    }
    res.status(200).json(diary);

  }catch (error) {
    res.status(500).json({message: error.message});
  }
});


mongoose.set('strictQuery', false);
mongoose.
connect('mongodb+srv://ayasllam177:ayasllam177@diaryapp.ydpgkhv.mongodb.net/diary-API?retryWrites=true&w=majority')
.then(() => {
    console.log('connected to MongoDB')
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.log(error)
});





// Connect to MongoDB
// mongoose.connect('mongodb+srv://ayasllam177:ayasllam177@diaryapp.ydpgkhv.mongodb.net/diary-API?retryWrites=true&w=majority', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });