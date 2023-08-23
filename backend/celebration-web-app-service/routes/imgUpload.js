const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

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
  try {
    const { originalname, filename, path: filePath } = req.file;

    // Save file information to the database
    console.log("this is imgUpload req.body:", req.body)
    const createdAttachment = await prisma.attachmentModel.create({
      data: {
        originalName: originalname,
        fileName: filename,
        filePath: filePath, // Connect the attachment to an event
      }
    });

    res.status(201).json(createdAttachment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

router.get('/upload/:id', async function(req, res) {
  const attachmentId = parseInt(req.params.id);

  try {
    // Retrieve attachment from the database
    const attachment = await prisma.attachmentModel.findUnique({
      where: { id: attachmentId },
    });

    if (attachment) {
      res.status(200).sendFile(attachment.filePath);
    } else {
      res.status(404).json({ error: 'Attachment not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router;
