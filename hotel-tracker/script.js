// Database of hotels
const hotels = [
    {
        name: "Boracay Beach Resort",
        loc: "Boracay, Aklan",
        price: 4500,
        cat: "beach",
        img: "boracay.jpg",
        subImgs: ["Boracay Beach Resort(1).jpg", "Boracay Beach Resort(2).jpg"],
        rate: 5,
        desc: "A stunning beachfront escape offering crystal clear waters and white sand. Perfect for relaxation and sunset viewing."
    },
    {
        name: "The Manila Hotel",
        loc: "One Rizal Park, Manila",
        price: 3200,
        cat: "city",
        img: "manila.jpg",
        subImgs: ["Manila City Hotel.jpg", "Manila City Hotel (2).jpg"],
        rate: 5,
        desc: "Overlooking the South Harbor, this iconic luxury hotel is an 11-minute walk from Rizal Park. Featuring marble bathrooms and swanky restaurants."
    },
    {
        name: "Baguio Mountain Lodge",
        loc: "Baguio City",
        price: 5800,
        cat: "mountain",
        img: "baguio.jpg",
        subImgs: ["Baguio Mountain(1).jpg", "Baguio Mountain Lodge(2).jpg"],
        rate: 4,
        desc: "Nestled in the cold mountains of Baguio, this lodge offers a cozy atmosphere with a stone fireplace."
    },
    {
        name: "Cebu Bay Hotel",
        loc: "Cebu City",
        price: 3800,
        cat: "city",
        img: "cebu.jpg",
        subImgs: ["Cebu Bay Hotel(1).jpg", "Cebu Bay Hotel(2).jpg"],
        rate: 4,
        desc: "Located in the vibrant center of Cebu, this hotel features a stunning rooftop infinity pool."
    },
    {
        name: "El Nido Island Resort",
        loc: "Palawan",
        price: 7200,
        cat: "beach",
        img: "El Nido Island Resort.jpg",
        subImgs: ["El Nido Island Resort(2).jpg", "El Nido Island Resort (3).jpg"],
        rate: 5,
        desc: "A paradise tucked away in limestone cliffs with private villas and direct access to turquoise waters."
    },
    {
        name: "Davao Downtown Inn",
        loc: "Davao City",
        price: 2300,
        cat: "city",
        img: "Davao Downtown Inn.jpg",
        subImgs: ["Davao Downtown Inn - Hop Inn Hotel Davao(1).jpg", "Davao Downtown Inn - Hop Inn Hotel Davao(2).jpg"],
        rate: 3,
        desc: "Modern and clean. Perfect for business travelers looking for a comfortable stay in downtown Davao."
    }
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
                    <button class="fav-btn"><i class="fa-regular fa-heart"></i></button>
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

// Modal logic
function openDetails(index) {
    const hotel = hotels[index];
    const modal = document.getElementById('hotelModal');

    document.getElementById('modalName').innerText = hotel.name;
    document.getElementById('modalLoc').innerText = hotel.loc;
    document.getElementById('modalImgMain').src = hotel.img;
    document.getElementById('modalImg1').src = hotel.subImgs[0];
    document.getElementById('modalImg2').src = hotel.subImgs[1];
    document.getElementById('modalStars').innerText = "⭐".repeat(hotel.rate);
    document.getElementById('modalRatingScore').innerText = hotel.rate + ".0";
    document.getElementById('modalDesc').innerText = hotel.desc;

    modal.style.display = "block";
    document.body.style.overflow = "hidden";
}

function closeModal() {
    document.getElementById('hotelModal').style.display = "none";
    document.body.style.overflow = "auto";
}

window.onclick = function(event) {
    if (event.target == document.getElementById('hotelModal')) closeModal();
}

// Search and Filter logic
function filterHotels(category) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.innerText.toLowerCase() === category.toLowerCase()) btn.classList.add('active');
    });
    const result = category === 'all' ? hotels : hotels.filter(h => h.cat === category);
    displayHotels(result);
}

if (searchBtn) {
    searchBtn.addEventListener('click', () => {
        const query = searchInput.value.toLowerCase();
        const result = hotels.filter(h => h.name.toLowerCase().includes(query) || h.loc.toLowerCase().includes(query));
        displayHotels(result);
    });
}

function openMap() {
    window.open("https://www.google.com/maps/place/Philippines", "_blank");
}

function searchByDest(destination) {
    searchInput.value = destination;
    const result = hotels.filter(h => h.loc.toLowerCase().includes(destination.toLowerCase()));
    displayHotels(result);
}

// Initial Render
displayHotels(hotels);

function applyOffer(type) {
    switch (type) {
        case 'cancellation':
            alert("✅ Free Cancellation applied! You can now cancel any booking up to 24 hours before check-in without charges.");
            break;
        case 'no-fees':
            alert("🏷️ No Booking Fees! We've removed all service charges for your current session.");
            break;
        case 'promo':
            const discountedHotels = hotels.filter(h => h.rate >= 4);
            displayHotels(discountedHotels);
            alert("🎁 Holiday Promos: Showing our top-rated hotels with special holiday rates!");
            break;
        default:
            console.log("Offer type not recognized.");
    }
}
