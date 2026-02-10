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
                    <button class="view-details-btn" onclick="openDetails(${hotels.indexOf(hotel)})">View Details</button>
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

// Function to open the modal and fill it with specific hotel data
function openDetails(index) {
    const hotel = hotels[index];
    const modal = document.getElementById('hotelModal');
    
    // Map data to modal elements
    document.getElementById('modalName').innerText = hotel.name;
    document.getElementById('modalLoc').innerText = hotel.loc;
    document.getElementById('modalImgMain').src = hotel.img;
    document.getElementById('modalImg1').src = hotel.img; 
    document.getElementById('modalImg2').src = hotel.img; 
    document.getElementById('modalStars').innerText = "⭐".repeat(hotel.rate);
    document.getElementById('modalRatingScore').innerText = hotel.rate + ".0";
    
    // Dynamic description
    document.getElementById('modalDesc').innerText = `Located in the heart of ${hotel.loc}, ${hotel.name} offers a refined sanctuary for travelers. Known for its impeccable service and timeless elegance.`;

    // Show modal and prevent background scrolling
    modal.style.display = "block";
    document.body.style.overflow = "hidden"; 
}

// Function to close the modal
function closeModal() {
    document.getElementById('hotelModal').style.display = "none";
    document.body.style.overflow = "auto"; 
}

// Close modal if clicking outside the content box
window.onclick = function(event) {
    const modal = document.getElementById('hotelModal');
    if (event.target == modal) {
        closeModal();
    }
}

// --- FILTER & SEARCH LOGIC ---

// Filter function for category buttons
function filterHotels(category) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
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
    window.open("https://www.google.com/maps", "_blank");
}

function searchByDest(destination) {
    if (searchInput) {
        searchInput.value = destination;
        const result = hotels.filter(h => h.loc.toLowerCase().includes(destination.toLowerCase()));
        displayHotels(result);
    }
}
