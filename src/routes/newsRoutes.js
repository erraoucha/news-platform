const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');

// TODO: Question 4 - Compléter les routes
 
// Route pour récupérer tous les articles
router.get('/', newsController.getAllNews);

// Route pour récupérer un article par son ID
router.get('/:id', newsController.getNewsById);

// Route pour créer un nouvel article
router.post('/', newsController.createNews);

// Route pour mettre à jour un article existant
router.put('/:id', newsController.updateNews);

// Route pour supprimer un article
router.delete('/:id', newsController.deleteNews);


module.exports = router;