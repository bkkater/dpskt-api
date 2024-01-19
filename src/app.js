const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// DB Connection
const connection = require('./db/connect');
connection();

// Routes
const routes = require('./routes/router');
app.use('/api', routes);

app.listen(8080, () => console.log('Listening on port 8080'));
