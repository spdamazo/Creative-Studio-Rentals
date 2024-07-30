// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    // Retrieve the logged-in user from local storage
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    // Check if no user is logged in
    if (!loggedInUser) {
        // Redirect to login page if no user is logged in
        window.location.href = 'login.html';
    } else if (loggedInUser.role !== 'owner') {
        // Redirect if the logged-in user is not an owner
        window.location.href = 'index.html';
    }

    // Get the add listing form element
    const addListingForm = document.getElementById('addListingForm');

    // Add event listener to the add listing form for form submission
    addListingForm.addEventListener('submit', (e) => {
        // Prevent default form submission behavior
        e.preventDefault();

        // Collect form data to create a new listing
        const newListing = {
            name: document.getElementById('name').value,
            address: document.getElementById('address').value,
            area: document.getElementById('area').value,
            type: document.getElementById('type').value,
            capacity: document.getElementById('capacity').value,
            parking: document.getElementById('parking').checked,
            public_transport: document.getElementById('public_transport').checked,
            available: document.getElementById('available').checked,
            rental_term: document.getElementById('rental_term').value,
            price: document.getElementById('price').value,
            ownerEmail: loggedInUser.email, // Associate the listing with the owner
            ownerPhone: loggedInUser.phone
        };

        // Retrieve existing listings from local storage
        let listings = JSON.parse(localStorage.getItem('studioListings')) || [];
        // Add the new listing to the list of listings
        listings.push(newListing);
        // Save the updated list of listings to local storage
        localStorage.setItem('studioListings', JSON.stringify(listings));

        // Display a success message
        alert('Listing added successfully!');
        // Redirect to the profile or another page
        window.location.href = 'owner-profile.html';
    });
});