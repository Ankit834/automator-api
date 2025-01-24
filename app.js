require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Script = require('./models/script.model.js');
const scriptRoute = require('./routes/script.route.js');
const app = express();

const port = process.env.PORT || 3002;

app.use(cors());
// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use('/api/scripts', scriptRoute);

app.get('/', (req, res) => {
  res.send('Hello from Node API Server Updated');
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Connected to database!');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(() => {
    console.log('Connection failed!');
  });
