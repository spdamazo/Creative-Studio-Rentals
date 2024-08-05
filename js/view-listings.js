// View all listings page - owner's view of his own listings

document.addEventListener('DOMContentLoaded', () => {
    // Retrieve the logged-in user from local storage
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    // Check if no user is logged in
    if (!loggedInUser) {
        window.location.href = 'login.html';
        return;
    }

    // Check if the logged-in user is an owner
    if (loggedInUser.role !== 'owner') {
        window.location.href = 'index.html';
        return;
    }

    // Get the owner listings container element
    const ownerListingsDiv = document.getElementById('ownerListings');

    // Retrieve existing listings from local storage
    const listings = JSON.parse(localStorage.getItem('studioListings')) || [];

    // Filter listings to get only those belonging to the logged-in user
    const ownerListings = listings.filter(listing => listing.ownerEmail === loggedInUser.email);

    // Check if there are no listings for the logged-in user
    if (ownerListings.length === 0) {
        ownerListingsDiv.innerHTML = '<p>You have no listings.</p>';
    } else {
        // Generate HTML for each listing
        const listingsHtml = ownerListings.map((listing, index) => `
            <div class="listing">
                <h3>${listing.name}</h3>
                <div>${listing.image ? `<img src="${listing.image}" alt="${listing.name} image" style="width: 400px; height: auto;">` : ''}</div>
                <p>Address: ${listing.address}</p>
                <p>Area: ${listing.area} sq meters</p>
                <p>Type: ${listing.type}</p>
                <p>Capacity: ${listing.capacity}</p>
                <p>Price: $${listing.price}</p>
                <button onclick="editListing(${index})">Edit</button>
                <button onclick="deleteListing(${index})">Delete</button>
                <button onclick="viewDetails(${index})">View Details</button>
            </div>
        `).join('');

        // Set the inner HTML of the owner listings container to the generated HTML
        ownerListingsDiv.innerHTML = listingsHtml;
    }
});

// Function to delete a listing
function deleteListing(index) {
    const listings = JSON.parse(localStorage.getItem('studioListings')) || [];
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    const ownerListings = listings.filter(listing => listing.ownerEmail === loggedInUser.email);

    if (index > -1 && index < ownerListings.length) {
        const listingToDelete = ownerListings[index];
        
        const updatedListings = listings.filter(listing =>
            !(listing.ownerEmail === listingToDelete.ownerEmail && listing.name === listingToDelete.name)
        );
        
        localStorage.setItem('studioListings', JSON.stringify(updatedListings));

        window.location.reload();
    } else {
        alert('Invalid listing index.');
    }
}

// Function to handle editing a listing
function editListing(index) {
    const listings = JSON.parse(localStorage.getItem('studioListings')) || [];
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    const ownerListings = listings.filter(listing => listing.ownerEmail === loggedInUser.email);

    const listingToEdit = ownerListings[index];

    if (listingToEdit) {
        const { ownerEmail, name } = listingToEdit;
        window.location.href = `edit-listing.html?email=${encodeURIComponent(ownerEmail)}&name=${encodeURIComponent(name)}`;
    } else {
        alert('Invalid listing index.');
    }
}

// Function to view studio details
function viewDetails(index) {
    const listings = JSON.parse(localStorage.getItem('studioListings')) || [];
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    // Filter listings to get only those belonging to the logged-in user
    const ownerListings = listings.filter(listing => listing.ownerEmail === loggedInUser.email);

    // Ensure index is valid and get the correct studio
    if (index >= 0 && index < ownerListings.length) {
        const selectedStudio = ownerListings[index];
        localStorage.setItem('selectedStudioDetails', JSON.stringify(selectedStudio));
        window.location.href = 'studio-details.html';
    } else {
        alert('Invalid listing index.');
    }
}
