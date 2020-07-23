
const HttpError = require('../models/http-error');

const exampleScans = [
    {
        scanId: 'ex1',
        scanName: 'medicine',
        gtin: '12346123571234',
        description: {
            qty: 1325,
            color: 'blue'
        }
    }
];

const getScansById = (req, res, next) => {
    const scanId = req.params.scanId;
    const scans = exampleScans.filter(foundScan => {
        return foundScan.scanId === scanId;
    });

    if(!scans || scans.length === 0) {
        
        return next(new HttpError('Could not find scans by this id', 404));
    }
    console.log('GET scan by scan id');
    res.json({scan: scan});
}

const getScans = (req, res, next) => {
    res.json({scans: exampleScans});
}

const createScan = (req, res, next) => {
    const { scanId, scanName, gtin } = req.body;

    const createdScan = {
        scanId,
        scanName,
        gtin
    }

    exampleScans.push(createdScan);

    res.status(201).json({scan: createdScan});
}

exports.getScansById = getScansById;
exports.getScans = getScans;
exports.createScan = createScan;