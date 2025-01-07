const axios = require('axios');

const DUMMY_JSON_URL = 'https://dummyjson.com/posts';

const newsController = {
    // Récupérer tous les articles
    async getAllNews(req, res, next) {
        try {
            const response = await axios.get(DUMMY_JSON_URL);
            res.status(200).json({
                success: true,
                data: response.data.posts,
            });
        } catch (error) {
            console.error('Erreur lors de la récupération des articles:', error.message);
            next(error);
        }
    },

    // Récupérer un article par son ID
    async getNewsById(req, res, next) {
        const { id } = req.params;

        try {
            const response = await axios.get(`${DUMMY_JSON_URL}/${id}`);
            res.status(200).json({
                success: true,
                data: response.data,
            });
        } catch (error) {
            console.error(`Erreur lors de la récupération de l'article avec l'ID ${id}:`, error.message);
            if (error.response && error.response.status === 404) {
                res.status(404).json({
                    success: false,
                    message: `Article avec l'ID ${id} non trouvé`,
                });
            } else {
                next(error);
            }
        }
    },

    // Créer un nouvel article
    async createNews(req, res, next) {
        const { title, body, userId } = req.body;

        if (!title || !body || !userId) {
            return res.status(400).json({
                success: false,
                message: 'Les champs title, body et userId sont requis',
            });
        }

        try {
            const response = await axios.post(DUMMY_JSON_URL, {
                title,
                body,
                userId,
            });

            res.status(201).json({
                success: true,
                data: response.data,
            });
        } catch (error) {
            console.error('Erreur lors de la création de l\'article:', error.message);
            next(error);
        }
    },

    // Modifier un article existant
    async updateNews(req, res, next) {
        const { id } = req.params;
        const { title, body } = req.body;

        if (!title && !body) {
            return res.status(400).json({
                success: false,
                message: 'Au moins un champ (title ou body) doit être fourni pour la mise à jour',
            });
        }

        try {
            const response = await axios.put(`${DUMMY_JSON_URL}/${id}`, {
                title,
                body,
            });

            res.status(200).json({
                success: true,
                data: response.data,
            });
        } catch (error) {
            console.error(`Erreur lors de la mise à jour de l'article avec l'ID ${id}:`, error.message);
            if (error.response && error.response.status === 404) {
                res.status(404).json({
                    success: false,
                    message: `Article avec l'ID ${id} non trouvé`,
                });
            } else {
                next(error);
            }
        }
    },

    // Supprimer un article existant
    async deleteNews(req, res, next) {
        const { id } = req.params;

        try {
            const response = await axios.delete(`${DUMMY_JSON_URL}/${id}`);

            res.status(200).json({
                success: true,
                message: `Article avec l'ID ${id} supprimé avec succès`,
                data: response.data,
            });
        } catch (error) {
            console.error(`Erreur lors de la suppression de l'article avec l'ID ${id}:`, error.message);
            if (error.response && error.response.status === 404) {
                res.status(404).json({
                    success: false,
                    message: `Article avec l'ID ${id} non trouvé`,
                });
            } else {
                next(error);
            }
        }
    },
};

module.exports = newsController;
