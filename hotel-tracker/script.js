// Database of hotels 
const hotels = [
    { name: "Boracay Beach Resort", loc: "Boracay, Aklan", price: 4500, cat: "beach", img: "boracay.jpg", rate: 5 },
    { name: "Manila City Hotel", loc: "Manila", price: 3200, cat: "city", img: "manila.jpg", rate: 4 },
    { name: "Baguio Mountain Lodge", loc: "Baguio", price: 5800, cat: "mountain", img: "baguio.jpg", rate: 4 },
    { name: "Cebu Bay Hotel", loc: "Cebu City", price: 3800, cat: "city", img: "cebu.jpg", rate: 4 },
    { name: "El Nido Island Resort", loc: "Palawan", price: 7200, cat: "beach", img: "El Nido Island Resort.jpg", rate: 5 },
    { name: "Davao Downtown Inn", loc: "Davao", price: 2300, cat: "city", img: "Davao Downtown Inn.jpg", rate: 3 }
];

const grid = document.getElementById('hotelGrid');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

// Function to display hotels dynamically
function displayHotels(filteredList) {
    if (!grid) return;
    grid.innerHTML = ""; 

    filteredList.forEach(hotel => {
        const stars = "⭐".repeat(hotel.rate);
        const card = `
            <div class="hotel-card" data-category="${hotel.cat}">
                <div class="img-container">
                    <img src="${hotel.img}" alt="${hotel.name}">
                    <button class="fav-btn">
                        <i class="fa-regular fa-heart"></i>
                    </button>
                </div>
                <div class="card-info">
                    <h3>${hotel.name}</h3>
                    <p class="location">📍 ${hotel.loc}</p>
                    <div class="rating">${stars}</div>
                    <p class="price">₱${hotel.price.toLocaleString()} <span>/ night</span></p>
                    <button class="view-details-btn">View Details</button>
                </div>
            </div>
        `;
        grid.innerHTML += card;
    });

    // Favorite heart toggle logic
    document.querySelectorAll('.fav-btn').forEach(btn => {
        btn.onclick = function(e) {
            e.stopPropagation();
            const icon = this.querySelector('i');
            icon.classList.toggle('fa-regular');
            icon.classList.toggle('fa-solid');
            icon.style.color = icon.classList.contains('fa-solid') ? "#2d6cdf" : "";
        };
    });
}

// Filter function for the category buttons
function filterHotels(category) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        // Check if button text matches category or use data attribute
        if(btn.innerText.toLowerCase() === category.toLowerCase()) btn.classList.add('active');
    });

    if (category === 'all') {
        displayHotels(hotels);
    } else {
        const filtered = hotels.filter(h => h.cat === category);
        displayHotels(filtered);
    }
}

// Search function logic
if (searchBtn) {
    searchBtn.addEventListener('click', () => {
        const query = searchInput.value.toLowerCase();
        const result = hotels.filter(h => 
            h.name.toLowerCase().includes(query) || h.loc.toLowerCase().includes(query)
        );
        displayHotels(result);
    });
}

// Initial display on load
displayHotels(hotels);

// Map and Sidebar functions
function openMap() {
    window.open("https://www.google.com/maps/place/Philippines", "_blank");
}

function searchByDest(destination) {
    if (searchInput) {
        searchInput.value = destination;
        const result = hotels.filter(h => h.loc.toLowerCase().includes(destination.toLowerCase()));
        displayHotels(result);
    }

}
