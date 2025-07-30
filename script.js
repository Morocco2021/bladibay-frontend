// ===== BLADIBAY JAVASCRIPT =====

// Configuration
const CONFIG = {
    VERSION: '1.0.0',
    NOTIFICATION_TIMEOUT: 3000
};

// État de l'application
let favorites = [];

// === SYSTÈME DE NOTIFICATIONS ===
function showNotification(message, type = 'success') {
    // Créer la div de notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between;">
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; color: white; margin-left: 10px; cursor: pointer;">
                ✕
            </button>
        </div>
    `;
    
    // Ajouter au DOM
    let container = document.getElementById('notifications');
    if (!container) {
        container = document.createElement('div');
        container.id = 'notifications';
        container.style.cssText = 'position: fixed; top: 5rem; right: 1rem; z-index: 1000;';
        document.body.appendChild(container);
    }
    
    container.appendChild(notification);
    
    // Animation d'entrée
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Suppression automatique
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, CONFIG.NOTIFICATION_TIMEOUT);
}

// === GESTION DES FAVORIS ===
function loadFavorites() {
    try {
        favorites = JSON.parse(localStorage.getItem('bladibay_favorites') || '[]');
        updateFavoriteCount();
    } catch (e) {
        console.log('Erreur chargement favoris');
        favorites = [];
    }
}

function saveFavorites() {
    try {
        localStorage.setItem('bladibay_favorites', JSON.stringify(favorites));
    } catch (e) {
        console.log('Erreur sauvegarde favoris');
    }
}

function toggleFavorite(productId) {
    const index = favorites.indexOf(productId);
    
    if (index > -1) {
        favorites.splice(index, 1);
        showNotification('Retiré des favoris', 'info');
    } else {
        favorites.push(productId);
        showNotification('Ajouté aux favoris ❤️', 'success');
    }
    
    saveFavorites();
    updateFavoriteCount();
}

function updateFavoriteCount() {
    const countElements = document.querySelectorAll('#favCount');
    countElements.forEach(el => {
        el.textContent = favorites.length;
        el.style.display = favorites.length > 0 ? 'flex' : 'none';
    });
}

// === RECHERCHE ===
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const citySelect = document.getElementById('citySelect');

    function performSearch() {
        const query = searchInput ? searchInput.value.trim() : '';
        const city = citySelect ? citySelect.value : '';
        
        if (!query) {
            showNotification('Veuillez saisir un terme de recherche', 'error');
            return;
        }
        
        const searchMessage = `Recherche pour "${query}"${city ? ` à ${city}` : ''}...`;
        showNotification(searchMessage, 'info');
        
        // Simulation de recherche
        setTimeout(() => {
            const resultCount = Math.floor(Math.random() * 50) + 10;
            showNotification(`${resultCount} résultats trouvés !`, 'success');
        }, 1000);
    }

    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') performSearch();
        });
    }
}

// === FILTRES ===
function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Mise à jour des boutons actifs
            filterButtons.forEach(b => {
                b.classList.remove('bg-blue-600', 'text-white');
                b.classList.add('bg-gray-200', 'text-gray-700');
            });
            
            btn.classList.remove('bg-gray-200', 'text-gray-700');
            btn.classList.add('bg-blue-600', 'text-white');
            
            const filter = btn.dataset.filter;
            applyFilter(filter);
            
            showNotification(`Filtre "${btn.textContent}" appliqué`, 'info');
        });
    });
}

function applyFilter(filter) {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// === GESTION DES COEURS ===
function setupHeartIcons() {
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('fa-heart')) {
            e.preventDefault();
            
            const isLiked = e.target.classList.contains('fas');
            
            if (isLiked) {
                e.target.classList.remove('fas', 'text-red-500');
                e.target.classList.add('far', 'text-gray-600');
            } else {
                e.target.classList.remove('far', 'text-gray-600');
                e.target.classList.add('fas', 'text-red-500');
            }
            
            // Générer un ID unique pour le produit
            const productId = Math.floor(Math.random() * 1000);
            toggleFavorite(productId);
        }
    });
}

// === CHAT ===
function setupChat() {
    const chatBtn = document.getElementById('chatBtn');
    if (chatBtn) {
        chatBtn.addEventListener('click', () => {
            showNotification('Chat en ligne bientôt disponible ! 💬', 'info');
        });
    }
}

// === RECHERCHES POPULAIRES ===
function setupPopularSearches() {
    const badges = document.querySelectorAll('.badge.cursor-pointer');
    
    badges.forEach(badge => {
        badge.addEventListener('click', () => {
            const searchTerm = badge.textContent.replace(/[🔥💰⭐✓💎]/g, '').trim();
            const searchInput = document.getElementById('searchInput');
            
            if (searchInput) {
                searchInput.value = searchTerm;
                searchInput.focus();
            }
            
            showNotification(`Recherche pour "${searchTerm}" ajoutée`, 'info');
        });
    });
}

// === NAVIGATION MOBILE ===
function setupMobileNav() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Retirer la classe active de tous
            navItems.forEach(nav => {
                nav.classList.remove('text-blue-600');
                nav.classList.add('text-gray-600');
            });
            
            // Ajouter la classe active à l'élément cliqué
            item.classList.remove('text-gray-600');
            item.classList.add('text-blue-600');
        });
    });
}

// === INITIALISATION ===
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 BladiBay chargé !');
    
    // Charger les favoris
    loadFavorites();
    
    // Initialiser tous les composants
    setupSearch();
    setupFilters();
    setupHeartIcons();
    setupChat();
    setupPopularSearches();
    setupMobileNav();
    
    // Message de bienvenue
    setTimeout(() => {
        showNotification('Bienvenue sur BladiBay ! 🎉', 'success');
    }, 1000);
});
