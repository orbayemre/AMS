require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const database = require('./services/db');
const userRoutes = require('./routes/userRoutes');
const businessRoutes = require('./routes/businessRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const searchRoutes = require('./routes/searchRoutes');

const app = express();
const port = process.env.PORT;
const db = database.connect();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use('/api/user', userRoutes);
app.use('/api/business', businessRoutes);
app.use('/api/appointment', appointmentRoutes);
app.use('/api/search', searchRoutes);

app.listen(port, () => {
    console.log(`Server is running on port : ${port}`);
});
