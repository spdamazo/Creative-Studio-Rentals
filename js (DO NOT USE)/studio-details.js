// studio-details.js

document.addEventListener('DOMContentLoaded', () => {
    const studioDetailsContainer = document.getElementById('studioDetails');

    function getQueryParameter(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    function displayStudioDetails(studio) {
        studioDetailsContainer.innerHTML = `
            <h2>${studio.name}</h2>
            <p><strong>Address:</strong> ${studio.address}</p>
            <p><strong>Area:</strong> ${studio.area} square meters</p>
            <p><strong>Type:</strong> ${studio.type}</p>
            <p><strong>Accommodates:</strong> ${studio.capacity}</p>
            <p><strong>Parking:</strong> ${studio.parking ? 'Yes' : 'No'}</p>
            <p><strong>Public Transport:</strong> ${studio.public_transport ? 'Yes' : 'No'}</p>
            <p><strong>Available:</strong> ${studio.available ? 'Yes' : 'No'}</p>
            <p><strong>Rental Term:</strong> ${studio.rental_term}</p>
            <p><strong>Price per Rental Term:</strong> ${studio.price}</p>
            <p><strong>Owner:</strong> ${studio.ownerName}</p>
            <p><strong>Owner Phone:</strong> ${studio.ownerPhone}</p>
            <p><strong>Owner Email:</strong> ${studio.ownerEmail}</p>
        `;
    }

    function loadStudioDetails() {
        const studioId = getQueryParameter('id');
        const allStudioListings = JSON.parse(localStorage.getItem('studioListings')) || [];
        const selectedStudio = allStudioListings.find(studio => studio.id === studioId);

        if (selectedStudio) {
            displayStudioDetails(selectedStudio);
        } else {
            studioDetailsContainer.innerHTML = `<p>Studio not found.</p>`;
        }
    }

    loadStudioDetails();
});
