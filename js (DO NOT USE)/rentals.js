let listings = [];

document.addEventListener('DOMContentLoaded', function() {
    // Fetch the seed data and initialize listings
    fetch('../data/seed-data.json')
        .then(response => response.json())
        .then(data => {
            listings = data.listings;
            displayStudios(listings);
        })
        .catch(error => console.error('Error fetching data:', error));

    const filterForm = document.getElementById('filterForm');
    const studioDetails = document.getElementById('studioDetails');

    if (filterForm) {
        filterForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const formData = new FormData(filterForm);
            const filterCriteria = {
                type: formData.get('type'),
                capacity: formData.get('capacity')
            };
            const filteredStudios = listings.filter(studio => {
                return (!filterCriteria.type || studio.type === filterCriteria.type) &&
                       (!filterCriteria.capacity || studio.capacity >= filterCriteria.capacity);
            });
            displayStudios(filteredStudios);
        });
    }
    
    function displayStudios(studios) {
        const studioList = document.getElementById('studioList');
        studioList.innerHTML = '';

        studios.forEach(studio => {
            if (studio.available) {
                const studioItem = document.createElement('div');
                studioItem.classList.add('studio-item');
                studioItem.innerHTML = `
                    <h3>${studio.name}</h3>
                    <p>${studio.address}</p>
                    <p>Type: ${studio.type}</p>
                    <p>Capacity: ${studio.capacity}</p>
                    <p>Rental Term: ${studio.rental_term}</p>
                    <p>Price: $${studio.price} per ${studio.rental_term}</p>
                    <button onclick="viewDetails('${studio.name}')">View Details</button>
                `;
                studioList.appendChild(studioItem);
            }
        });
    }

    window.viewDetails = function(studioName) {
        const studio = listings.find(studio => studio.name === studioName);
        if (studio) {
            const detailsSection = document.getElementById('studioDetails');
            detailsSection.innerHTML = `
                <h2>${studio.name}</h2>
                <p>Address: ${studio.address}</p>
                <p>Area: ${studio.area} sq meters</p>
                <p>Type: ${studio.type}</p>
                <p>Capacity: ${studio.capacity}</p>
                <p>Parking: ${studio.parking ? 'Yes' : 'No'}</p>
                <p>Public Transport: ${studio.public_transport ? 'Yes' : 'No'}</p>
                <p>Available: ${studio.available ? 'Yes' : 'No'}</p>
                <p>Rental Term: ${studio.rental_term}</p>
                <p>Price: $${studio.price} per ${studio.rental_term}</p>
            `;
        }
    };
});