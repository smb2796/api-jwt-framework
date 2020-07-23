const express = require('express');

const scanControllers = require('../controllers/scan-controller');
const router = express.Router();

router.get('/scans', scanControllers.getScans);

router.get('/scan/:scanId', scanControllers.getScansById);

router.post('/', scanControllers.createScan);

router.patch('/scan/:scanId', scanControllers.updateScanById)
module.exports = router;