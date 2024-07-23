// add-listing.js

document.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (!loggedInUser) {
        // Redirect to login page if no user is logged in
        window.location.href = 'login.html';
    } else if (loggedInUser.role !== 'owner') {
        // Redirect if the logged-in user is not an owner
        window.location.href = 'index.html';
    }

    const addListingForm = document.getElementById('addListingForm');

    addListingForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Collect form data
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
            ownerEmail: loggedInUser.email // Associate the listing with the owner
        };

        let listings = JSON.parse(localStorage.getItem('studioListings')) || [];
        listings.push(newListing);
        localStorage.setItem('studioListings', JSON.stringify(listings));

        alert('Listing added successfully!');
        window.location.href = 'profile.html'; // Redirect to profile or another page
    });
});
