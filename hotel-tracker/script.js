/**
 * Database of Hotels with Coordinates for Pins
 */
const hotels = [
    { name: "Boracay Beach Resort", loc: "Boracay, Aklan", price: 4500, cat: "beach", img: "boracay.jpg", subImgs: ["Boracay Beach Resort(1).jpg", "Boracay Beach Resort(2).jpg"], rate: 5, coords: [11.9674, 121.9248], desc: "A stunning beachfront escape offering crystal clear waters and white sand." },
    { name: "The Manila Hotel", loc: "One Rizal Park, Manila", price: 3200, cat: "city", img: "manila.jpg", subImgs: ["Manila City Hotel.jpg", "Manila City Hotel (2).jpg"], rate: 5, coords: [14.5895, 120.9751], desc: "Overlooking the South Harbor, this iconic luxury hotel is a refined sanctuary." },
    { name: "Baguio Mountain Lodge", loc: "Baguio City", price: 5800, cat: "mountain", img: "baguio.jpg", subImgs: ["Baguio Mountain(1).jpg", "Baguio Mountain Lodge(2).jpg"], rate: 4, coords: [16.4023, 120.5960], desc: "Nestled in the cold mountains of Baguio with a cozy stone fireplace." },
    { name: "Cebu Bay Hotel", loc: "Cebu City", price: 3800, cat: "city", img: "cebu.jpg", subImgs: ["Cebu Bay Hotel(1).jpg", "Cebu Bay Hotel(2).jpg"], rate: 4, coords: [10.3157, 123.8854], desc: "Featuring a stunning rooftop infinity pool overlooking the city skyline." },
    { name: "El Nido Island Resort", loc: "Palawan", price: 7200, cat: "beach", img: "El Nido Island Resort.jpg", subImgs: ["El Nido Island Resort(2).jpg", "El Nido Island Resort (3).jpg"], rate: 5, coords: [11.1955, 119.4140], desc: "A paradise tucked away in limestone cliffs with private villas." },
    { name: "Davao Downtown Inn", loc: "Davao City", price: 2300, cat: "city", img: "Davao Downtown Inn.jpg", subImgs: ["Davao Downtown Inn - Hop Inn Hotel Davao(1).jpg", "Davao Downtown Inn - Hop Inn Hotel Davao(2).jpg"], rate: 3, coords: [7.0707, 125.6092], desc: "Modern, clean, and perfect for business travelers in downtown Davao." }
];

let favorites = [];
let map; // Global map variable
let markers = [];

const grid = document.getElementById('hotelGrid');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

/**
 * Initialize Leaflet Map
 */
function initMap() {
    // Center of Philippines
    map = L.map('map').setView([12.8797, 121.7740], 5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Add Pins for all hotels
    hotels.forEach(hotel => {
        let marker = L.marker(hotel.coords).addTo(map)
            .bindPopup(`<b>${hotel.name}</b><br>₱${hotel.price.toLocaleString()}/night`);
        markers.push({ name: hotel.name, marker: marker });
    });
}

/**
 * Toggle Map Size (Expand/Shrink)
 */
function toggleMapSize() {
    const mapDiv = document.getElementById('map');
    mapDiv.classList.toggle('expanded');
    
    // Invalidate size to prevent gray boxes during transition
    setTimeout(() => {
        map.invalidateSize();
    }, 500);
}

/**
 * Display functionality
 */
function displayHotels(filteredList) {
    if (!grid) return;
    grid.innerHTML = "";
    filteredList.forEach(hotel => {
        const stars = "⭐".repeat(hotel.rate);
        const isFavorite = favorites.some(fav => fav.name === hotel.name);
        const card = `<div class="hotel-card" data-category="${hotel.cat}">
            <div class="img-container">
                <img src="${hotel.img}" alt="${hotel.name}">
                <button class="fav-btn" onclick="toggleFavorite('${hotel.name}')">
                    <i class="${isFavorite ? 'fa-solid' : 'fa-regular'} fa-heart" style="${isFavorite ? 'color: #2d6cdf;' : ''}"></i>
                </button>
            </div>
            <div class="card-info">
                <h3>${hotel.name}</h3>
                <p class="location">📍 ${hotel.loc}</p>
                <div class="rating">${stars}</div>
                <p class="price">₱${hotel.price.toLocaleString()} <span>/ night</span></p>
                <button class="view-details-btn" onclick="openDetails(${hotels.indexOf(hotel)})">View Details</button>
            </div>
        </div>`;
        grid.innerHTML += card;
    });
}

/**
 * Modal logic
 */
function openDetails(index) {
    const hotel = hotels[index];
    const modal = document.getElementById('hotelModal');
    
    // Move map to hotel location
    map.setView(hotel.coords, 13);
    const targetMarker = markers.find(m => m.name === hotel.name);
    if (targetMarker) targetMarker.marker.openPopup();

    document.getElementById('modalName').innerText = hotel.name;
    document.getElementById('modalLoc').innerText = hotel.loc;
    document.getElementById('modalImgMain').src = hotel.img;
    document.getElementById('modalImg1').src = hotel.subImgs[0];
    document.getElementById('modalImg2').src = hotel.subImgs[1];
    document.getElementById('modalStars').innerText = "⭐".repeat(hotel.rate);
    document.getElementById('modalRatingScore').innerText = hotel.rate + ".0";
    document.getElementById('modalDesc').innerText = hotel.desc;

    document.getElementById('bookNowBtn').onclick = function() {
        if (confirm(`Book ${hotel.name}?`)) {
            window.location.href = `bookings.html?hotel=${encodeURIComponent(hotel.name)}`;
        }
    };

    modal.style.display = "block";
    document.body.style.overflow = "hidden";
}

function closeModal() {
    document.getElementById('hotelModal').style.display = "none";
    document.body.style.overflow = "auto";
}

window.onclick = (e) => { if (e.target == document.getElementById('hotelModal')) closeModal(); };

function toggleFavorite(name) {
    const hotel = hotels.find(h => h.name === name);
    const index = favorites.findIndex(f => f.name === name);
    if (index > -1) favorites.splice(index, 1);
    else favorites.push(hotel);
    
    renderFavoritesList();
    displayHotels(hotels);
}

function renderFavoritesList() {
    const favList = document.getElementById('favoritesSidebarList');
    if (!favList) return;
    if (favorites.length === 0) favList.innerHTML = "<li>No favorites yet.</li>";
    else favList.innerHTML = favorites.map(f => `<li onclick="searchByDest('${f.name}')"><i class="fa-solid fa-heart" style="color: #2d6cdf;"></i> ${f.name}</li>`).join('');
}

function showFavoritesOnly() {
    if (favorites.length === 0) {
        alert("Empty favorites!");
        displayHotels(hotels);
    } else {
        displayHotels(favorites);
        document.querySelector('.hero h1').innerText = "Your Favorites ❤️";
    }
}

function filterHotels(category) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.innerText.toLowerCase() === category.toLowerCase()) btn.classList.add('active');
    });
    const result = category === 'all' ? hotels : hotels.filter(h => h.cat === category);
    displayHotels(result);
}

function sortHotels(order) {
    let sorted = [...hotels];
    if (order === "low") sorted.sort((a, b) => a.price - b.price);
    else if (order === "high") sorted.sort((a, b) => b.price - a.price);
    displayHotels(sorted);
}

function filterByPrice(limit) {
    if (limit === 'any') displayHotels(hotels);
    else displayHotels(hotels.filter(h => h.price <= parseInt(limit)));
}

function filterByRating(min) {
    if (min === 'any') displayHotels(hotels);
    else displayHotels(hotels.filter(h => h.rate >= parseInt(min)));
}

if (searchBtn) {
    searchBtn.addEventListener('click', () => {
        const q = searchInput.value.toLowerCase();
        displayHotels(hotels.filter(h => h.name.toLowerCase().includes(q) || h.loc.toLowerCase().includes(q)));
    });
}

function searchByDest(dest) {
    searchInput.value = dest;
    const filtered = hotels.filter(h => h.loc.toLowerCase().includes(dest.toLowerCase()) || h.name.toLowerCase().includes(dest.toLowerCase()));
    displayHotels(filtered);
}

function applyOffer(type) {
    if (type === 'promo') displayHotels(hotels.filter(h => h.rate >= 4));
    alert("Offer applied: " + type);
}

// Initial Setup
document.addEventListener("DOMContentLoaded", () => {
    initMap();
    displayHotels(hotels);
    renderFavoritesList();
});
