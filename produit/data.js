const axios = require('axios');
const mongoose = require('mongoose');


// Créer le modèle Item à partir du schéma
const Item = require('./models/product');

// URI de connexion MongoDB Atlas
const uri = 'mongodb://mery2001:mery2001@ac-7cuoymw-shard-00-00.qdmhw5b.mongodb.net:27017,ac-7cuoymw-shard-00-01.qdmhw5b.mongodb.net:27017,ac-7cuoymw-shard-00-02.qdmhw5b.mongodb.net:27017/?ssl=true&replicaSet=atlas-8b81r3-shard-0&authSource=admin&retryWrites=true&w=majority';

async function importData() {
  try {
    // Effectuer une requête GET vers l'API pour obtenir les produits
    const response = await axios.get('https://fakestoreapi.com/products');
    const products = response.data;

    const batchSize = 100; // Nombre de documents à insérer par lot
    const delayBetweenBatches = 1000; // Délai en millisecondes entre chaque lot

    // Parcourir les produits et les insérer dans la base de données par lots
    for (let i = 0; i < products.length; i += batchSize) {
      const batch = products.slice(i, i + batchSize);

      // Créer un tableau de promesses pour chaque document à insérer dans le lot
      const batchPromises = batch.map(async (product) => {
        const { id, title, description, image, price, category, rating} = product;

        // Créer un nouvel objet Item en utilisant les données du produit
        const newItem = new Item({
          id,
          titre: title,
          description,
          image,
          prix: price,
          category,
          rating
        });

        // Sauvegarder le nouvel objet Item dans la base de données
        return newItem.save();
      });

      // Attendre que toutes les promesses du lot actuel soient résolues avant de passer au lot suivant
      await Promise.all(batchPromises);

      // Attendre un délai entre les lots
      await new Promise((resolve) => setTimeout(resolve, delayBetweenBatches));
    }

    console.log('Import des données terminé avec succès !');
  } catch (error) {
    console.error('Une erreur s\'est produite lors de l\'import des données :', error);
  } finally {
    // Fermer la connexion à la base de données une fois l'import terminé
    mongoose.connection.close();
  }
}

// Connexion à la base de données
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connexion réussie à la base de données');
    importData(); // Appeler la fonction d'import des données
  })
  .catch((error) => {
    console.error('Erreur lors de la connexion à la base de données:', error);
  });