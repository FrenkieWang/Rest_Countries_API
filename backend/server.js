const express = require('express');
const request = require('request');
const app = express();

const cors = require('cors');
app.use(cors());

app.get('/api/resolve-map-url/', (req, res) => {
    const shortUrl = req.query.url;

    request({ url: shortUrl, followRedirect: false }, (err, response, body) => {
        if (err) {
            return res.status(500).send('Error occurred');
        }

        const longUrl = response.headers.location || shortUrl; 
        const regex = /@([0-9.-]+),([0-9.-]+),/; 
        const matches = longUrl.match(regex);


        if (matches && matches.length >= 3) {
            const latLng = { lat: parseFloat(matches[1]), lng: parseFloat(matches[2]) };
            res.json(latLng);
        } else {
            res.status(404).send('Coordinates not found');
        }
    });
});

// Test the Vercel
app.get("/", (req, res) => {
	res.send("You succeeded to deploy backend to Vercel!");
});

const port = 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));