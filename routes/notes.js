const express = require('express');
const router = express.Router();
const Notes = require('../model/notes.js');

router.post('/', async (req, res) => {
  try {
    const { heading, description,email } = req.body;
    const newNote = new Notes({
      heading,
      description,
      email
    });
    await newNote.save();
    

    res.status(200).json({ message: 'Note saved successfully', note: newNote });
  } catch (error) {
    console.error('Error saving note:', error);
    res.status(500).json({ message: 'Error saving note', error });
  }
});

router.post('/data', async (req, res) => {
  const { email } = req.body;

  // Check if email is provided
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {

    const notes = await Notes.find({ email:email }); 

   console.log(notes);
 
    res.json(notes);
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).json({ message: 'Failed to fetch notes', error });
  }
});
module.exports = router;
