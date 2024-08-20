// Owner's View all listings page - owner's view of his own listings

document.addEventListener('DOMContentLoaded', () => {
    // Retrieve the logged-in user from local storage
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    // Check if no user is logged in
    if (!loggedInUser) {
        window.location.href = 'login.html'; // Redirect to login page if no user is found
        return;
    }

    // Check if the logged-in user is an owner
    if (loggedInUser.role !== 'owner') {
        window.location.href = 'index.html'; // Redirect to home page if user is not an owner
        return;
    }

    // Get the container element where the owner's listings will be displayed
    const ownerListingsDiv = document.getElementById('ownerListings');

    // Fetch all studio listings from the server
    fetch('/api/studios')
        .then(response => response.json()) // Parse the JSON response
        .then(listings => {
            // Filter listings to get only those belonging to the logged-in user
            const ownerListings = listings.filter(listing => listing.ownerEmail === loggedInUser.email);

            // Check if there are no listings for the logged-in user
            if (ownerListings.length === 0) {
                ownerListingsDiv.innerHTML = '<p>You have no listings.</p>'; // Display message if no listings are found
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
                        <button onclick="viewDetails('${listing.name}', '${listing.ownerEmail}')">View Details</button>
                    </div>
                `).join('');

                // Set the inner HTML of the owner listings container to the generated HTML
                ownerListingsDiv.innerHTML = listingsHtml;
            }
        })
        .catch(error => {
            // Log error and display a message if there is an issue fetching studio listings
            console.error('Error fetching studio listings:', error);
            alert('An error occurred while fetching studio listings.');
        });
});

// Function to delete a listing
function deleteListing(index) {
    // Fetch all studio listings from the server
    fetch('/api/studios')
        .then(response => response.json()) // Parse the JSON response
        .then(listings => {
            // Retrieve the logged-in user from local storage
            const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

            // Filter listings to get only those belonging to the logged-in user
            const ownerListings = listings.filter(listing => listing.ownerEmail === loggedInUser.email);

            // Ensure the index is valid
            if (index > -1 && index < ownerListings.length) {
                const listingToDelete = ownerListings[index];
                
                // Create a new array of listings without the one to be deleted
                const updatedListings = listings.filter(listing =>
                    !(listing.ownerEmail === listingToDelete.ownerEmail && listing.name === listingToDelete.name)
                );
                
                // Send the updated listings to the server
                fetch('/api/studios', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updatedListings)
                })
                .then(response => response.json()) // Parse the JSON response
                .then(data => {
                    if (data.success) {
                        window.location.reload(); // Reload the page if deletion is successful
                    } else {
                        alert('Error: ' + data.message); // Display error message if deletion fails
                    }
                })
                .catch(error => {
                    // Log error and display a message if there is an issue updating listings
                    console.error('Error updating listings:', error);
                    alert('An error occurred while updating listings.');
                });
            } else {
                alert('Invalid listing index.'); // Display error message if index is invalid
            }
        })
        .catch(error => {
            // Log error and display a message if there is an issue fetching studio listings
            console.error('Error fetching studio listings:', error);
            alert('An error occurred while fetching studio listings.');
        });
}

// Function to handle editing a listing
function editListing(index) {
    // Fetch all studio listings from the server
    fetch('/api/studios')
        .then(response => response.json()) // Parse the JSON response
        .then(listings => {
            // Retrieve the logged-in user from local storage
            const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

            // Filter listings to get only those belonging to the logged-in user
            const ownerListings = listings.filter(listing => listing.ownerEmail === loggedInUser.email);

            // Ensure the index is valid
            const listingToEdit = ownerListings[index];

            if (listingToEdit) {
                const { ownerEmail, name } = listingToEdit;
                // Redirect to the edit listing page with parameters
                window.location.href = `edit-listing.html?email=${encodeURIComponent(ownerEmail)}&name=${encodeURIComponent(name)}`;
            } else {
                alert('Invalid listing index.'); // Display error message if index is invalid
            }
        })
        .catch(error => {
            // Log error and display a message if there is an issue fetching studio listings
            console.error('Error fetching studio listings:', error);
            alert('An error occurred while fetching studio listings.');
        });
}

// Function to view studio details
function viewDetails(name, email) {
    // Fetch all studio listings from the server
    fetch('/api/studios')
        .then(response => response.json()) // Parse the JSON response
        .then(listings => {
            // Find the studio details that match the parameters
            const studio = listings.find(listing => listing.name === name && listing.ownerEmail === email);

            if (studio) {
                // Set the studio details in the URL parameters and redirect to the details page
                const params = new URLSearchParams({
                    name: studio.name,
                    email: studio.ownerEmail
                });
                window.location.href = `studio-details.html?${params.toString()}`;
            } else {
                alert('Studio not found.'); // Display error message if studio is not found
            }
        })
        .catch(error => {
            // Log error and display a message if there is an issue fetching studio details
            console.error('Error fetching studio listings:', error);
            alert('An error occurred while fetching studio details.');
        });
}
