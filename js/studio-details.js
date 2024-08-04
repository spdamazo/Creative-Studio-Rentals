// Studio details - owner's view of studio details

document.addEventListener('DOMContentLoaded', () => {
    const studioDetailsContainer = document.getElementById('studioDetails');

    function displayStudioDetails(studio) {
        if (studio) {
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
                ${studio.image ? `<img src="${studio.image}" alt="${studio.name} image" style="width: 300px; height: auto;">` : ''}
            `;
        } else {
            studioDetailsContainer.innerHTML = '<p>No details available.</p>';
        }
    }

    function loadStudioDetails() {
        const studio = JSON.parse(localStorage.getItem('selectedStudioDetails'));

        // Retrieve the logged-in user from local storage
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

        // Check if no user is logged in
        if (!loggedInUser) {
            window.location.href = 'login.html';
            return;
        }

        // Check if the logged-in user is an owner
        if (loggedInUser.role !== 'owner') {
            // If not an owner, ensure the user has access or redirect as necessary
            // For example, you can just display details without any further action
            // or add custom logic based on your requirements.
        }

        // Display the studio details
        displayStudioDetails(studio);
    }

    loadStudioDetails();
});
