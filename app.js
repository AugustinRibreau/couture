const express = require('express');
const cors = require('cors');
const path = require("path");
require('dotenv').config();


const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
});

app.get('/', (req, res) => {
    return res.sendFile(path.resolve('./index.html'));
});

app.get('/models/house.gltf', (req, res) => {
    return res.sendFile(path.resolve('models/house.gltf'));
});