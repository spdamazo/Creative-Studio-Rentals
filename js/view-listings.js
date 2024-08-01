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
    // Retrieve existing listings from local storage
    const listings = JSON.parse(localStorage.getItem('studioListings')) || [];
    // Retrieve the logged-in user from local storage
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    // Filter listings to get the ones belonging to the current user
    const ownerListings = listings.filter(listing => listing.ownerEmail === loggedInUser.email);

    // Check if the index is valid
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
    // Retrieve existing listings from local storage
    const listings = JSON.parse(localStorage.getItem('studioListings')) || [];
    // Find the listing to edit based on the index
    const listingToEdit = listings.find((listing, i) => i === index);

    // Check if the listing to edit is found
    if (listingToEdit) {
        const { ownerEmail, name } = listingToEdit;
        // Redirect to the edit listing page with the listing's email and name as query parameters
        window.location.href = `edit-listing.html?email=${encodeURIComponent(ownerEmail)}&name=${encodeURIComponent(name)}`;
    } else {
        alert('Invalid listing index.');
    }
}

// Function to view studio details
function viewDetails(index) {
    // Save the selected studio index to local storage
    localStorage.setItem('selectedStudioIndex', index);
    // Redirect to the studio details page
    window.location.href = 'studio-details.html';
}

