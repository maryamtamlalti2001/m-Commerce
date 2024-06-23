const express = require('express');
const router = express.Router();
const Item = require('../../models/product'); // Mettez le chemin approprié vers votre modèle

// Définissez vos routes ici
router.get('/', async (req, res) => {
  try {
    const products = await Item.find(); // Utilisation de l'opération de recherche avec une fonction asynchrone
    res.json(products);
  } catch (error) {
    console.error('Une erreur s\'est produite lors de la recherche des produits:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des produits' });
  }
});
  
router.get('/:id', async (req, res) => {
  try {
    const product = await Item.findById(req.params.id, 'titre image prix description');
    if (!product) {
      return res.status(404).json({ error: 'Produit non trouvé.' });
    }
    res.json(product);
  } catch (error) {
    console.error('Une erreur s\'est produite lors de la récupération du produit :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération du produit.' });
  }
});

  
module.exports = router;

