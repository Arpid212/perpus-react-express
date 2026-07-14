require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { errorHandler } = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

//Middlewares 
app.use(cors());
app.use(express.json()); // Agar bisa menerima format JSON dari frontend
app.use(express.urlencoded({ extended: true })); // Agar bisa menerima data form (termasuk upload KTP nanti)

//Routes Utama
app.use('/api/books', require('./routes/bookRoutes'));

//Fallback Route (404 Not Found)
app.use('*', (req, res) => {
    res.status(404);
    throw new Error('Endpoint tidak ditemukan');
});

//  Error Handler Middleware 
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
});