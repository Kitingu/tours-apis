const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const destinationRoutes = require('./routes/destinations');
const hotelRoutes = require('./routes/hotels');
const serviceRoutes = require('./routes/services');
const tourRoutes = require('./routes/tours');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Travel API is running.');
});

app.use('/api/destinations', destinationRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/tours', tourRoutes);

// 404 Not Found middleware
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});

// Global Error Handler middleware
app.use((err, req, res, next) => {
    console.error('🔥 Error:', err.stack);
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({
        message: message
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
