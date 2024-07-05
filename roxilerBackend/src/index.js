const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/v1')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.options("*", cors());

const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;

console.log('PORT:', PORT);
console.log('MONGODB_URL:', MONGODB_URL);

const connectToDatabase = async () => {
    try {
        await mongoose.connect(MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
    }
};

app.use('/v1', routes);

connectToDatabase();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
