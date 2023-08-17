const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '/upload/'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Create the multer instance
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB in bytes
  }
});

// Set up a route for file uploads
router.post('/upload', upload.single('file'), async function(req, res) {
    // Handle the uploaded file
    res.send("File uploaded successfully!");
});

router.get('/upload', async function(req, res) {
    // Handle the uploaded file
    res.send("File uploaded successfully!");
});

module.exports = router;
