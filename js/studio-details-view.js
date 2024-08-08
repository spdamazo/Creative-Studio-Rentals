document.addEventListener('DOMContentLoaded', () => {
    const studioDetailsViewContainer = document.getElementById('studioDetailsView');

    function displayStudioDetails(studio) {
        if (studio) {
            const photoUrl = studio.image && isValidUrl(studio.image) ? studio.image : '../images/default-photo.jpg';

            studioDetailsViewContainer.innerHTML = `
                <h2>${studio.name}</h2>
                <img src="${photoUrl}" alt="${studio.name} image" style="width: 400px; height: auto;">
                <p><strong>Address:</strong> ${studio.address}</p>
                <p><strong>Area:</strong> ${studio.area || 'N/A'} sq meters</p>
                <p><strong>Type:</strong> ${studio.type}</p>
                <p><strong>Capacity:</strong> ${studio.capacity || 'N/A'}</p>
                <p><strong>Parking:</strong> ${studio.parking ? 'Yes' : 'No'}</p>
                <p><strong>Public Transport:</strong> ${studio.public_transport ? 'Yes' : 'No'}</p>
                <p><strong>Available:</strong> ${studio.available ? 'Yes' : 'No'}</p>
                <p><strong>Rental Term:</strong> ${studio.rental_term || 'N/A'}</p>
                <p><strong>Price:</strong> $${studio.price || 'N/A'}</p>
                <p><strong>Owner:</strong> ${studio.ownerName || 'Not provided'}</p>
                <p><strong>Email:</strong> ${studio.ownerEmail || 'Not provided'}</p>
                <p><strong>Phone:</strong> ${studio.ownerPhone || 'Not provided'}</p>
            `;
        } else {
            studioDetailsViewContainer.innerHTML = '<p>No details available.</p>';
        }
    }

    function isValidUrl(url) {
        // Ensure URL is a string and starts with 'http' or 'data:image'
        return typeof url === 'string' && (url.startsWith('http') || url.startsWith('data:image'));
    }

    function loadStudioDetails() {
        const selectedIndex = localStorage.getItem('selectedStudioIndex');
        if (selectedIndex !== null) {
            const allStudioListings = JSON.parse(localStorage.getItem('studioListings')) || [];
            const index = parseInt(selectedIndex, 10); // Ensure it's an integer
            const studio = allStudioListings[index];

            if (studio) {
                displayStudioDetails(studio);
            } else {
                studioDetailsViewContainer.innerHTML = '<p>Studio not found.</p>';
            }
        } else {
            studioDetailsViewContainer.innerHTML = '<p>No studio selected.</p>';
        }
    }

    loadStudioDetails();
});
