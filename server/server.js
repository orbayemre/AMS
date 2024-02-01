const express = require('express');
const cors = require('cors');
const database = require('./db');
const app = express();
const port = 8000;
const db = database.connect();

app.use(cors());
app.use(express.json());

app.get('/message', (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.listen(port, () => {
    console.log(`Server is running on port : ${port}`);
});
