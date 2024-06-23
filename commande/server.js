const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Importez le module 

const items = require('./routes/api/commandes');

const app = express();
require("dotenv").config()
app.use(express.json());

app.use(cors({
        origin: ['http://localhost:3000', 'http://localhost:5002'], // Autorisez les origines spécifiées
        methods: ['GET', 'POST', 'PUT', 'DELETE'], // Autorisez les méthodes spécifiées
        allowedHeaders: ['Content-Type', 'Authorization'], // Autorisez les en-têtes spécifiés
        credentials: true // Autorisez les cookies et les informations d'authentification
      }));




mongoose
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
app.use('/api/commandes', items);

const port = process.env.PORT || 5001;

app.listen(port, ()=> console.log(`Server started on port ${port}`));