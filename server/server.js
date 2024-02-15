require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const database = require('./services/db');
const userRoutes = require('./routes/userRoutes');
const businessRoutes = require('./routes/businessRoutes');

const app = express();
const port = process.env.PORT;
const db = database.connect();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use('/api/user', userRoutes);
app.use('/api/business', businessRoutes);

app.listen(port, () => {
    console.log(`Server is running on port : ${port}`);
});
