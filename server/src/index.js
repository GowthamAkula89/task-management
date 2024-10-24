const mongoose = require('mongoose');
require('dotenv').config();
const PORT = process.env.PORT || 3001
const DB_URL = process.env.DB_URL;
const app = require('./app')

mongoose.connect(DB_URL)
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
})
.catch((err) => {
    console.log("Failed to connect db", err);
})
