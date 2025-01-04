 
// Fonction pour récupérer et afficher les derniers articles
async function fetchLatestNews() {
    try {
        const response = await fetch('/api/news');
        const data = await response.json();
        await displayNews(data.posts); // Attendre que tous les posts soient affichés
    } catch (error) {
        console.error('Erreur:', error);
        showError('Impossible de charger les articles.');
    }
}

// Fonction pour récupérer les informations d'un utilisateur
async function fetchUser(userId) {
    try {
        const response = await fetch(`/api/news/${userId}`);
        const data = await response.json();
        return data; // Retourne les données de l'utilisateur
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'utilisateur:', error);
        return null; // Retourne null en cas d'erreur
    }
}

// Fonction pour afficher les articles avec les informations des utilisateurs
async function displayNews(news) {
    const container = document.getElementById('news-container');
    container.innerHTML = ''; // Vider le conteneur avant d'ajouter de nouveaux articles

    for (const article of news) {
        // Récupérer les informations de l'utilisateur pour chaque article
        const user = await fetchUser(article.userId);

        // Créer une card Bootstrap pour chaque article
        const card = document.createElement('div');
        card.className = 'card mb-3 shadow-sm'; // Classes Bootstrap pour une mise en forme élégante
        card.style.maxWidth = '600px';

        card.innerHTML = `
            <div class="row g-0 align-items-center">
                <div class="col-md-3 text-center p-3">
                    <!-- Image de profil -->
                    <img 
                        src="${user?.image || 'https://via.placeholder.com/100'}" 
                        class="rounded-circle img-fluid" 
                        alt="${user?.firstName || 'Utilisateur inconnu'}" 
                        style="width: 100px; height: 100px; object-fit: cover;">
                </div>
                <div class="col-md-9">
                    <div class="card-body">
                        <!-- Nom complet -->
                        <h5 class="card-title mb-0">${user?.firstName || 'Utilisateur'} ${user?.lastName || ''}</h5>
                        <!-- Username -->
                        <p class="text-muted">@${user?.username || 'anonyme'}</p>
                        <!-- Contenu de l'article -->
                        <h6>${article.title}</h6>
                        <p class="card-text">${article.body}</p>
                        <!-- Réactions -->
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <span class="me-2"><i class="bi bi-hand-thumbs-up"></i> ${article.reactions.likes || 0}</span>
                                <span><i class="bi bi-chat-dots"></i> ${Math.floor(Math.random() * 20)} commentaires</span>
                            </div>
                            <div>
                                <button class="btn btn-primary btn-sm">Partager</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        container.appendChild(card); // Ajouter la card au conteneur
    }
}

// Fonction pour afficher un message d'erreur
function showError(message) {
    const container = document.getElementById('news-container');
    container.innerHTML = `
        <div class="alert alert-danger" role="alert">
            ${message}
        </div>
    `;
}

// Initialisation
document.addEventListener('DOMContentLoaded', fetchLatestNews);


 