// view-listings.js

document.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (!loggedInUser) {
        // Redirect to login page if no user is logged in
        window.location.href = 'login.html';
    } else if (loggedInUser.role !== 'owner') {
        // Redirect if the logged-in user is not an owner
        window.location.href = 'index.html';
    }

    const ownerListingsDiv = document.getElementById('ownerListings');
    const listings = JSON.parse(localStorage.getItem('studioListings')) || [];
    const ownerListings = listings.filter(listing => listing.ownerEmail === loggedInUser.email);

    if (ownerListings.length === 0) {
        ownerListingsDiv.innerHTML = '<p>You have no listings.</p>';
    } else {
        const listingsHtml = ownerListings.map(listing => `
            <div class="listing">
                <h3>${listing.name}</h3>
                <p>Address: ${listing.address}</p>
                <p>Area: ${listing.area} sq meters</p>
                <p>Type: ${listing.type}</p>
                <p>Capacity: ${listing.capacity}</p>
                <p>Price: $${listing.price}</p>
                <a href="edit-listing.html?email=${encodeURIComponent(listing.ownerEmail)}&name=${encodeURIComponent(listing.name)}">Edit</a>
            </div>
        `).join('');

        ownerListingsDiv.innerHTML = listingsHtml;
    }
});
