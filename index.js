const express = require('express');
const mongoose = require('mongoose');
const Script = require('./models/script.model.js');
const scriptRoute = require('./routes/script.route.js');
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use('/api/scripts', scriptRoute);

app.get('/', (req, res) => {
  res.send('Hello from Node API Server Updated');
});

mongoose
  .connect(
    'mongodb+srv://sharmabasket13:j1CPGpvyQZEqF2X2@automatordb.ic2fg.mongodb.net/Script-API?retryWrites=true&w=majority&appName=AutomatorDB'
  )
  .then(() => {
    console.log('Connected to database!');
    app.listen(3002, () => {
      console.log('Server is running on port 3002');
    });
  })
  .catch(() => {
    console.log('Connection failed!');
  });
