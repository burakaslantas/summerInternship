const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../upload');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Create the multer instance
const upload = multer({ storage: storage });

// Set up a route for file uploads
router.post('/upload', upload.single('image'), async function(req, res) {
    // Handle the uploaded file
    res.send("File uploaded successfully!");
});

router.get('/upload', async function(req, res) {
    // Handle the uploaded file
    res.file("File uploaded successfully!");
});

module.exports = router;
