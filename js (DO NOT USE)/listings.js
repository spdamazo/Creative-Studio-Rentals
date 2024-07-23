document.addEventListener('DOMContentLoaded', function() {
    const listings = JSON.parse(localStorage.getItem('listings')) || [];

    const ownerListingsDiv = document.getElementById('ownerListings');
    if (ownerListingsDiv) {
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        if (loggedInUser && loggedInUser.role === 'owner') {
            const ownerListings = listings.filter(listing => listing.ownerEmail === loggedInUser.email);
            ownerListingsDiv.innerHTML = ownerListings.map(listing => `<div>${listing.name}</div>`).join('');
        } else {
            alert('You must be logged in as an owner to view this page.');
            window.location.href = 'login.html';
        }
    }

    const studioListDiv = document.getElementById('studioList');
    if (studioListDiv) {
        studioListDiv.innerHTML = listings.map(listing => `<div>${listing.name}</div>`).join('');
    }
});

document.getElementById('editListingForm')?.addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const area = document.getElementById('area').value;
    const type = document.getElementById('type').value;
    const capacity = document.getElementById('capacity').value;
    const parking = document.getElementById('parking').checked;
    const publicTransport = document.getElementById('public_transport').checked;
    const available = document.getElementById('available').checked;
    const rentalTerm = document.getElementById('rental_term').value;
    const price = document.getElementById('price').value;

    const updatedListing = {
        name,
        address,
        area,
        type,
        capacity,
        parking,
        publicTransport,
        available,
        rentalTerm,
        price,
        ownerEmail: JSON.parse(localStorage.getItem('loggedInUser')).email
    };

    const listings = JSON.parse(localStorage.getItem('listings')) || [];
    const index = listings.findIndex(listing => listing.name === name);
    if (index !== -1) {
        listings[index] = updatedListing;
    } else {
        listings.push(updatedListing);
    }

    localStorage.setItem('listings', JSON.stringify(listings));
    alert('Listing updated successfully!');
});

document.getElementById('addListingForm')?.addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const area = document.getElementById('area').value;
    const type = document.getElementById('type').value;
    const capacity = document.getElementById('capacity').value;
    const parking = document.getElementById('parking').checked;
    const publicTransport = document.getElementById('public_transport').checked;
    const available = document.getElementById('available').checked;
    const rentalTerm = document.getElementById('rental_term').value;
    const price = document.getElementById('price').value;

    const newListing = {
        name,
        address,
        area,
        type,
        capacity,
        parking,
        publicTransport,
        available,
        rentalTerm,
        price,
        ownerEmail: JSON.parse(localStorage.getItem('loggedInUser')).email
    };

    const listings = JSON.parse(localStorage.getItem('listings')) || [];
    listings.push(newListing);

    localStorage.setItem('listings', JSON.stringify(listings));
    alert('Listing added successfully!');
});
