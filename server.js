const express = require('express');
const ytdlp = require('yt-dlp-exec');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(bodyParser.json());

// POST route to convert YouTube to MP3
app.post('/convert', (req, res) => {
    const videoUrl = req.body.url;
    const outputFilePath = path.join(__dirname, 'public', 'downloads', `${Date.now()}.mp3`);

    ytdlp(videoUrl, {
        extractAudio: true,
        audioFormat: 'mp3',
        output: outputFilePath
    }).then(() => {
        console.log(`MP3 successfully downloaded: ${outputFilePath}`);
        res.json({ success: true, downloadUrl: `/downloads/${path.basename(outputFilePath)}` });
    }).catch((err) => {
        console.error('Error during conversion:', err);
        res.status(500).json({ success: false, message: 'Error occurred during conversion.' });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
