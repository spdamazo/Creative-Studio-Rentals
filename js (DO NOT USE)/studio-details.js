// studio-details.js

document.addEventListener('DOMContentLoaded', () => {
    const studioDetailsContainer = document.getElementById('studioDetails');

    function getQueryParameter(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return decodeURIComponent(urlParams.get(name));
    }

    function displayStudioDetails(studio) {
        studioDetailsContainer.innerHTML = `
            <h2>${studio.name}</h2>
            <p><strong>Address:</strong> ${studio.address}</p>
            <p><strong>Area:</strong> ${studio.area} sq meters</p>
            <p><strong>Type:</strong> ${studio.type}</p>
            <p><strong>Capacity:</strong> ${studio.capacity}</p>
            <p><strong>Parking:</strong> ${studio.parking ? 'Yes' : 'No'}</p>
            <p><strong>Public Transport:</strong> ${studio.public_transport ? 'Yes' : 'No'}</p>
            <p><strong>Available:</strong> ${studio.available ? 'Yes' : 'No'}</p>
            <p><strong>Rental Term:</strong> ${studio.rental_term}</p>
            <p><strong>Price:</strong> $${studio.price}</p>
            <p><strong>Contact:</strong> ${studio.ownerEmail}</p>
        `;
    }

    const email = getQueryParameter('email');
    const name = getQueryParameter('name');

    console.log('Email:', email);
    console.log('Name:', name);

    if (!email || !name) {
        alert('Invalid request');
        window.location.href = 'view-listings.html';
        return;
    }

    const listings = JSON.parse(localStorage.getItem('studioListings')) || [];
    const studio = listings.find(listing => listing.ownerEmail === email && listing.name === name);

    if (!studio) {
        alert('Studio not found');
        window.location.href = 'view-listings.html';
        return;
    }

    displayStudioDetails(studio);
});
