require('dotenv').config();
const express = require('express');
const cors = require('cors');
const newsRoutes = require('./routes/newsRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Routes
app.use('/api/news', newsRoutes);

// Middleware de logging
app.use((req, res, next) => {
  const now = new Date().toISOString(); // Date et heure actuelles
  const method = req.method; // Méthode HTTP (GET, POST, etc.)
  const url = req.url; // URL demandée
  const ip = req.ip; // Adresse IP du client

  // Affichage dans la console
  console.log(`[${now}] ${method} ${url} - IP: ${ip}`);

  next(); // Passer au middleware suivant ou à la route
});


// TODO: Question 3 - Ajouter un middleware pour gérer les erreurs
app.use((err, req, res, next) => {
  console.error(err.stack); // Log de l'erreur pour le débogage
  res.status(err.status || 500).json({
      success: false,
      message: err.message || 'Une erreur interne est survenue.',
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});