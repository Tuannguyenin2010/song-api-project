const express = require('express');
const fs = require ('fs');
const path = require ('path');
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

//Load songs from songs.json
const songsFile = path.join(__dirname, 'songs.json')
const songs = JSON.parse(fs.readFileSync(songsFile, 'utf8'));

// Welcome message 
app.get('/', (req, res) => {
    res.send('Welcome to the Songs API!');
  });

// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`)); 