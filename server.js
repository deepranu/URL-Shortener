const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const QRCode = require('qrcode');
const { nanoid } = require('nanoid');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost/urlshortener', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ MongoDB connected');
}).catch((err) => {
  console.log('❌ MongoDB connection error:', err);
});

// Define a simple URL schema and model
const urlSchema = new mongoose.Schema({
  originalUrl: String,
  shortId: String,
  shortUrl: String
});

const Url = mongoose.model('Url', urlSchema);

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Middleware to parse request body
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (CSS, JS, etc.)
app.use(express.static('public'));

// Render the main page (GET /)
app.get('/', (req, res) => {
  res.render('index', { shortUrl: null, qrCode: null });
});

// Handle URL shortening (POST /shorten)
app.post('/shorten', async (req, res) => {
  const { originalUrl } = req.body;

  if (!originalUrl) {
    return res.status(400).send('URL is required');
  }

  // Generate a shortId using nanoid
  const shortId = nanoid(7);
  const shortUrl = `http://localhost:5000/${shortId}`; // Construct the full short URL

  try {
    // Check if the shortUrl already exists
    const existingUrl = await Url.findOne({ shortUrl });

    if (existingUrl) {
      return res.status(400).send('Short URL already exists');
    }

    // Create a new URL document
    const newUrl = new Url({
      originalUrl,
      shortId,
      shortUrl,
    });

    // Save to MongoDB
    await newUrl.save();

    // Generate a QR code for the short URL
    const qr = await QRCode.toDataURL(shortUrl);

    // Send the response with the short URL and QR code
    res.render('index', { shortUrl, qrCode: qr }); // Pass shortUrl and qrCode to the template
  } catch (err) {
    console.error('❌ Error while shortening:', err);
    res.status(500).send('Server error');
  }
});

// Handle redirecting to the original URL (GET /:shortId)
app.get('/:shortId', async (req, res) => {
  const { shortId } = req.params;

  try {
    const url = await Url.findOne({ shortId });

    if (url) {
      return res.redirect(url.originalUrl); // Redirect to the original URL
    }

    res.status(404).send('URL not found');
  } catch (err) {
    console.error('❌ Error while redirecting:', err);
    res.status(500).send('Server error');
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
