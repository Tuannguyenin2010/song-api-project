const express = require('express');
const fs = require ('fs');
const path = require ('path');
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.static(path.join(__dirname)));

//Load songs from songs.json
const songsFile = path.join(__dirname, 'songs.json')
const songs = JSON.parse(fs.readFileSync(songsFile, 'utf8'));

// // Welcome message 
// app.get('/', (req, res) => {
//     res.send('Welcome to the Songs API!');
// });

// Get all songs
app.get('/api/songs', (req, res) => {
    res.json(songs);
});

// Get song by ID
app.get('/api/songs/:id', (req, res) => {
    const song = songs.find((s) => s.songId === parseInt(req.params.id));
    if (song) {
      res.json(song);
    } else {
      res.status(404).json({ error: 'Song not found' });
    }
});

// Get songs by artist name
  app.get('/api/songs/artist/:name', (req, res) => {
    const artistSongs = songs.filter((s) => s.artistData.name.toLowerCase() === req.params.name.toLowerCase());
    if (artistSongs.length) {
      res.json(artistSongs);
    } else {
      res.status(404).json({ error: 'No songs found for this artist' });
    }
});

// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`)); 