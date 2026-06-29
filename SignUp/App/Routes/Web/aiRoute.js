const express = require('express');
const router = express.Router();
const aiController = require('../../Controller/Web/aiController'); // path sahi check karlein

// Agar multer use kar rahe hain toh upload middleware yahan bypass hoga
// router.post('/tryon', upload.fields([{ name: 'personImage' }, { name: 'clothImage' }]), aiController.processVirtualTryOn);

router.post('/tryon', aiController.processVirtualTryOn);

module.exports = router;