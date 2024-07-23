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
        const listingsHtml = ownerListings.map((listing, index) => `
            <div class="listing">
                <h3>${listing.name}</h3>
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

        ownerListingsDiv.innerHTML = listingsHtml;
    }
});

// Function to delete a listing
function deleteListing(index) {
    const listings = JSON.parse(localStorage.getItem('studioListings')) || [];
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    // Filter listings to get the ones belonging to the current user
    const ownerListings = listings.filter(listing => listing.ownerEmail === loggedInUser.email);

    if (index > -1 && index < ownerListings.length) {
        // Get the email and name of the listing to be deleted
        const listingToDelete = ownerListings[index];
        
        // Filter out the listing to delete
        const updatedListings = listings.filter(listing =>
            !(listing.ownerEmail === listingToDelete.ownerEmail && listing.name === listingToDelete.name)
        );
        
        // Save the updated listings to localStorage
        localStorage.setItem('studioListings', JSON.stringify(updatedListings));

        // Reload the page to reflect the changes
        window.location.reload();
    } else {
        alert('Invalid listing index.');
    }
}

// Function to handle editing a listing
function editListing(index) {
    const listings = JSON.parse(localStorage.getItem('studioListings')) || [];
    const listingToEdit = listings.find((listing, i) => i === index);
    if (listingToEdit) {
        const { ownerEmail, name } = listingToEdit;
        window.location.href = `edit-listing.html?email=${encodeURIComponent(ownerEmail)}&name=${encodeURIComponent(name)}`;
    } else {
        alert('Invalid listing index.');
    }
}

// Function to view studio details
function viewDetails(index) {
    localStorage.setItem('selectedStudioIndex', index);
    window.location.href = 'studio-details.html';
}
