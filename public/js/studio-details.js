// Owner's Studio details - owner's view of studio details

document.addEventListener('DOMContentLoaded', () => {
    // Reference to the container where studio details will be displayed
    const studioDetailsContainer = document.getElementById('studioDetails');

    // Function to display studio details in the container
    function displayStudioDetails(studio) {
        if (studio) {
            // Populate the container with studio details
            studioDetailsContainer.innerHTML = `
                <h2>${studio.name}</h2>
                ${studio.image ? `<img src="${studio.image}" alt="${studio.name} image" style="width: 400px; height: auto;">` : ''}
                <p><strong>Address:</strong> ${studio.address}</p>
                <p><strong>Area:</strong> ${studio.area} sq meters</p>
                <p><strong>Type:</strong> ${studio.type}</p>
                <p><strong>Capacity:</strong> ${studio.capacity}</p>
                <p><strong>Parking:</strong> ${studio.parking ? 'Yes' : 'No'}</p>
                <p><strong>Public Transport:</strong> ${studio.public_transport ? 'Yes' : 'No'}</p>
                <p><strong>Available:</strong> ${studio.available ? 'Yes' : 'No'}</p>
                <p><strong>Rental Term:</strong> ${studio.rental_term}</p>
                <p><strong>Price:</strong> $${studio.price}</p>
                <p><strong>Owner:</strong> ${studio.ownerName}</p>
                <p><strong>Email:</strong> ${studio.ownerEmail}</p>
                <p><strong>Phone:</strong> ${studio.ownerPhone || 'Not provided'}</p>
            `;
        } else {
            // Display message if no studio details are available
            studioDetailsContainer.innerHTML = '<p>No details available.</p>';
        }
    }

    // Function to load studio details based on URL parameters
    function loadStudioDetails() {
        // Parse URL parameters to get studio name and email
        const urlParams = new URLSearchParams(window.location.search);
        const studioName = urlParams.get('name');
        const studioEmail = urlParams.get('email');

        if (!studioName || !studioEmail) {
            // Display message if parameters are missing
            studioDetailsContainer.innerHTML = '<p>Studio details not available.</p>';
            return;
        }

        // Fetch studio listings from the server
        fetch('/api/studios')
            .then(response => response.json())  // Parse the JSON response
            .then(listings => {
                // Find the studio that matches the name and email
                const studio = listings.find(listing => listing.name === studioName && listing.ownerEmail === studioEmail);
                displayStudioDetails(studio);
            })
            .catch(error => {
                // Log error and display message if there is an issue fetching studio details
                console.error('Error fetching studio listings:', error);
                studioDetailsContainer.innerHTML = '<p>An error occurred while fetching studio details.</p>';
            });
    }

    // Load studio details when the page is loaded
    loadStudioDetails();
});
