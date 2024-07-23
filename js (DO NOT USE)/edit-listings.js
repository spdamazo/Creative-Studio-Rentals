// edit-listing.js

document.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (!loggedInUser) {
        // Redirect to login page if no user is logged in
        window.location.href = 'login.html';
    } else if (loggedInUser.role !== 'owner') {
        // Redirect if the logged-in user is not an owner
        window.location.href = 'index.html';
    }

    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email');
    const name = urlParams.get('name');

    if (!email || !name) {
        alert('Invalid request');
        window.location.href = 'view-listings.html';
        return;
    }

    const listings = JSON.parse(localStorage.getItem('studioListings')) || [];
    const listingToEdit = listings.find(listing => listing.ownerEmail === email && listing.name === name);

    if (!listingToEdit) {
        alert('Listing not found');
        window.location.href = 'view-listings.html';
        return;
    }

    // Populate form with existing listing data
    document.getElementById('name').value = listingToEdit.name;
    document.getElementById('address').value = listingToEdit.address;
    document.getElementById('area').value = listingToEdit.area;
    document.getElementById('type').value = listingToEdit.type;
    document.getElementById('capacity').value = listingToEdit.capacity;
    document.getElementById('parking').checked = listingToEdit.parking;
    document.getElementById('public_transport').checked = listingToEdit.public_transport;
    document.getElementById('available').checked = listingToEdit.available;
    document.getElementById('rental_term').value = listingToEdit.rental_term;
    document.getElementById('price').value = listingToEdit.price;

    document.getElementById('editListingForm').addEventListener('submit', (e) => {
        e.preventDefault();

        const updatedListing = {
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
            ownerEmail: listingToEdit.ownerEmail // Ensure ownerEmail remains unchanged
        };

        const updatedListings = listings.map(listing => 
            (listing.ownerEmail === email && listing.name === name) ? updatedListing : listing
        );

        localStorage.setItem('studioListings', JSON.stringify(updatedListings));

        alert('Listing updated successfully!');
        window.location.href = 'view-listings.html'; // Redirect to view listings page
    });
});
