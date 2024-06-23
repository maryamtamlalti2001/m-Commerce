const express = require('express');
const mongoose = require('mongoose');

const items = require('./routes/api/products');

const app = express();

app.use(express.json());
require("dotenv").config()

//version 1.0.3 de l'image docker
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
  })
  .then(() => {
    console.log('Connected to MongoDB');
    // Continue with your code here
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
// Add the CORS headers middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use('/api/products', items);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));