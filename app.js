const express = require('express');
const bodyParser = require('body-parser');
const HttpError = require('./models/http-error');

const scanRoutes = require('./routes/scan-routes');

const app = express();

app.use(bodyParser.json());

app.use('/api', scanRoutes);

app.use((req, res, next) => {
    const error = new HttpError('Route does not exist.', 404);
    throw error;
});

app.use((error, req, res, next) => {
    if(res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message: error.message || 'Error occured'});
})

app.listen(5000);