document.addEventListener('DOMContentLoaded', () => {
    // Get the container element where studio details will be displayed
    const studioDetailsContainer = document.getElementById('studioDetails');

    // Function to display studio details in the container
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
            <p><strong>Email:</strong> ${studio.ownerEmail}</p>
            <p><strong>Phone:</strong> ${studio.ownerPhone || 'Not provided'}</p>
        `;
    }

    // Function to load and display studio details
    function loadStudioDetails() {
        // Retrieve the index of the selected studio from local storage
        const selectedStudioIndex = localStorage.getItem('selectedStudioIndex');

        // Redirect to the view-listings page if no studio is selected
        if (selectedStudioIndex === null) {
            alert('No studio selected');
            window.location.href = 'view-listings.html';
            return;
        }

        // Retrieve the list of studio listings from local storage
        const listings = JSON.parse(localStorage.getItem('studioListings')) || [];
        const studioIndex = parseInt(selectedStudioIndex, 10);

        // Validate the selected studio index
        if (isNaN(studioIndex) || studioIndex < 0 || studioIndex >= listings.length) {
            alert('Invalid studio selected');
            window.location.href = 'view-listings.html';
            return;
        }

        // Get the studio details from the list
        const studio = listings[studioIndex];

        // Redirect to the view-listings page if the studio is not found
        if (!studio) {
            alert('Studio not found');
            window.location.href = 'view-listings.html';
            return;
        }

        // Display the studio details
        displayStudioDetails(studio);
    }

    // Handle browser back/forward navigation by reloading the studio details
    window.addEventListener('popstate', function(event) {
        if (event.state && event.state.page === 'studioDetails') {
            loadStudioDetails();
        }
    });

    // Initial call to load and display the studio details
    loadStudioDetails();
});
