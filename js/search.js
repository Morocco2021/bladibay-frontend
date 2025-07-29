// Données d'exemple d'annonces
const sampleAds = [
    {
        id: 1,
        title: { ar: "تويوتا كورولا 2020", fr: "Toyota Corolla 2020" },
        price: 180000,
        location: { ar: "الدار البيضاء", fr: "Casablanca" },
        category: "cars",
        image: "🚗",
        time: { ar: "منذ ساعتين", fr: "il y a 2h" }
    },
    {
        id: 2,
        title: { ar: "شقة للبيع - 3 غرف", fr: "Appartement à vendre - 3 chambres" },
        price: 850000,
        location: { ar: "الرباط", fr: "Rabat" },
        category: "realestate",
        image: "🏠",
        time: { ar: "منذ 5 ساعات", fr: "il y a 5h" }
    },
    {
        id: 3,
        title: { ar: "آيفون 14 برو", fr: "iPhone 14 Pro" },
        price: 12000,
        location: { ar: "فاس", fr: "Fès" },
        category: "electronics",
        image: "📱",
        time: { ar: "منذ يوم", fr: "il y a 1 jour" }
    },
    {
        id: 4,
        title: { ar: "فستان زفاف أبيض", fr: "Robe de mariée blanche" },
        price: 3500,
        location: { ar: "مراكش", fr: "Marrakech" },
        category: "fashion",
        image: "👕",
        time: { ar: "منذ 3 أيام", fr: "il y a 3 jours" }
    },
    {
        id: 5,
        title: { ar: "مرسيدس بنز E200", fr: "Mercedes Benz E200" },
        price: 320000,
        location: { ar: "الدار البيضاء", fr: "Casablanca" },
        category: "cars",
        image: "🚗",
        time: { ar: "منذ 6 ساعات", fr: "il y a 6h" }
    }
];

// Variables globales
let filteredAds = [...sampleAds];
let currentSearchTerm = '';

// Fonction de recherche
function performSearch() {
    const searchInput = document.getElementById('search-input');
    const searchTerm = searchInput.value.toLowerCase().trim();
    currentSearchTerm = searchTerm;
    
    if (searchTerm === '') {
        filteredAds = [...sampleAds];
    } else {
        filteredAds = sampleAds.filter(ad => {
            const currentLang = getCurrentLanguage();
            const title = ad.title[currentLang].toLowerCase();
            const location = ad.location[currentLang].toLowerCase();
            
            return title.includes(searchTerm) || 
                   location.includes(searchTerm) ||
                   ad.price.toString().includes(searchTerm);
        });
    }
    
    displaySearchResults();
}

// Afficher les résultats de recherche
function displaySearchResults() {
    const recentAdsContainer = document.getElementById('recent-ads');
    const recentTitle = document.getElementById('recent-title');
    const currentLang = getCurrentLanguage();
    
    // Mettre à jour le titre
    if (currentSearchTerm === '') {
        recentTitle.textContent = currentLang === 'ar' ? 'آخر الإعلانات' : 'Annonces récentes';
    } else {
        const resultsCount = filteredAds.length;
        recentTitle.textContent = currentLang === 'ar' 
            ? `${resultsCount} نتيجة للبحث "${currentSearchTerm}"`
            : `${resultsCount} résultats pour "${currentSearchTerm}"`;
    }
    
    // Vider le conteneur
    recentAdsContainer.innerHTML = '';
    
    if (filteredAds.length === 0) {
        recentAdsContainer.innerHTML = `
            <div class="text-center py-8">
                <div class="text-6xl mb-4">🔍</div>
                <h3 class="text-xl font-bold text-gray-800 mb-2">
                    ${currentLang === 'ar' ? 'لا توجد نتائج' : 'Aucun résultat'}
                </h3>
                <p class="text-gray-500">
                    ${currentLang === 'ar' ? 'جرب البحث بكلمات أخرى' : 'Essayez avec d\'autres mots-clés'}
                </p>
            </div>
        `;
        return;
    }
    
    // Afficher les annonces filtrées
    filteredAds.forEach(ad => {
        const adElement = createAdElement(ad);
        recentAdsContainer.appendChild(adElement);
    });
}

// Créer un élément d'annonce
function createAdElement(ad) {
    const currentLang = getCurrentLanguage();
    const adDiv = document.createElement('div');
    adDiv.className = 'bg-white rounded-xl shadow-lg p-4 hover:shadow-xl transition-all cursor-pointer mb-4';
    
    adDiv.innerHTML = `
        <div class="flex">
            <div class="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center text-2xl text-white">
                ${ad.image}
            </div>
            <div class="${currentLang === 'ar' ? 'mr-4' : 'ml-4'} flex-1">
                <h4 class="font-bold text-gray-800">${ad.title[currentLang]}</h4>
                <p class="text-orange-500 font-bold text-lg">${ad.price.toLocaleString()} ${currentLang === 'ar' ? 'درهم' : 'DH'}</p>
                <p class="text-sm text-gray-500">📍 ${ad.location[currentLang]} • ${ad.time[currentLang]}</p>
                <div class="flex mt-2 space-x-2">
                    <button class="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full hover:bg-blue-200 transition-colors">
                        ${currentLang === 'ar' ? '📞 اتصل' : '📞 Appeler'}
                    </button>
                    <button class="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full hover:bg-green-200 transition-colors">
                        ${currentLang === 'ar' ? '💬 رسالة' : '💬 Message'}
                    </button>
                    <button class="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full hover:bg-red-200 transition-colors" onclick="toggleFavorite(${ad.id})">
                        ❤️
                    </button>
                </div>
            </div>
        </div>
    `;
    
    return adDiv;
}

// Obtenir la langue actuelle
function getCurrentLanguage() {
    return localStorage.getItem('bladibay-lang') || 'ar';
}

// Fonction pour basculer les favoris
function toggleFavorite(adId) {
    const favorites = JSON.parse(localStorage.getItem('bladibay-favorites') || '[]');
    const index = favorites.indexOf(adId);
    
    if (index === -1) {
        favorites.push(adId);
        showNotification(getCurrentLanguage() === 'ar' ? 'تمت الإضافة للمفضلة' : 'Ajouté aux favoris', 'success');
    } else {
        favorites.splice(index, 1);
        showNotification(getCurrentLanguage() === 'ar' ? 'تم الحذف من المفضلة' : 'Retiré des favoris', 'info');
    }
    
    localStorage.setItem('bladibay-favorites', JSON.stringify(favorites));
}

// Afficher une notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 px-4 py-2 rounded-lg text-white font-semibold shadow-lg transform translate-x-full transition-transform duration-300 ${
        type === 'success' ? 'bg-green-500' : 
        type === 'error' ? 'bg-red-500' : 'bg-blue-500'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animation d'entrée
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Suppression automatique
    setTimeout(() => {
        notification.style.transform = 'translateX(full)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Initialiser la recherche au chargement
document.addEventListener('DOMContentLoaded', function() {
    // Attacher l'événement de recherche
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    
    if (searchInput && searchButton) {
        searchInput.addEventListener('input', performSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
        searchButton.addEventListener('click', performSearch);
        
        // Charger les annonces initiales
        displaySearchResults();
    }
});
