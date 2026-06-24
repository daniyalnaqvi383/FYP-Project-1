const express = require('express');
const router = express.Router();
const multer = require('multer');
const aiController = require('../../Controller/Web/aiController.js');

// Multer memory-allocation configuration buffer for instant streaming
const upload = multer({ storage: multer.memoryStorage() });

// POST endpoint linking core controllers action fields
router.post('/process-tryon', upload.single('user_photo'), aiController.processVirtualTryOn);

module.exports = router;