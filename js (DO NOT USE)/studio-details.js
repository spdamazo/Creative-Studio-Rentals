document.addEventListener('DOMContentLoaded', () => {
    const studioDetailsContainer = document.getElementById('studioDetails');

    // Function to display studio details
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

    // Retrieve studio index from local storage
    const selectedStudioIndex = localStorage.getItem('selectedStudioIndex');

    if (selectedStudioIndex === null) {
        alert('No studio selected');
        window.location.href = 'view-listings.html';
        return;
    }

    const listings = JSON.parse(localStorage.getItem('studioListings')) || [];
    const studio = listings[parseInt(selectedStudioIndex)];

    if (!studio) {
        alert('Studio not found');
        window.location.href = 'view-listings.html';
        return;
    }

    // Display the studio details
    displayStudioDetails(studio);
});
