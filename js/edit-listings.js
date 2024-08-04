// Owner's Edit Listing - edit existing studios in owner's listing

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

    // Get query parameters from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email');
    const name = urlParams.get('name');

    // Check if email or name is missing in query parameters
    if (!email || !name) {
        alert('Invalid request');
        window.location.href = 'view-listings.html';
        return;
    }

    // Retrieve existing listings from local storage
    const listings = JSON.parse(localStorage.getItem('studioListings')) || [];
    // Find the listing to edit based on email and name
    const listingToEdit = listings.find(listing => listing.ownerEmail === email && listing.name === name);

    // Check if the listing to edit is not found
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

    // Add event listener to the edit listing form for form submission
    document.getElementById('editListingForm').addEventListener('submit', (e) => {
        // Prevent default form submission behavior
        e.preventDefault();

        // Collect updated form data to create an updated listing
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

        // Handle the image upload
        const imageInput = document.getElementById('image');
        if (imageInput.files && imageInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                updatedListing.image = e.target.result; // Store the base64 encoded image data

                // Update the list of listings with the updated listing data
                const updatedListings = listings.map(listing => 
                    (listing.ownerEmail === email && listing.name === name) ? updatedListing : listing
                );

                // Save the updated list of listings to local storage
                localStorage.setItem('studioListings', JSON.stringify(updatedListings));

                // Display a success message
                alert('Listing updated successfully!');
                // Redirect to the view listings page
                window.location.href = 'view-listings.html';
            };
            reader.readAsDataURL(imageInput.files[0]);
        } else {
            // If no new image is uploaded, proceed without updating the image
            updatedListing.image = listingToEdit.image; // Keep the existing image

            // Update the list of listings with the updated listing data
            const updatedListings = listings.map(listing => 
                (listing.ownerEmail === email && listing.name === name) ? updatedListing : listing
            );

            // Save the updated list of listings to local storage
            localStorage.setItem('studioListings', JSON.stringify(updatedListings));

            // Display a success message
            alert('Listing updated successfully!');
            // Redirect to the view listings page
            window.location.href = 'view-listings.html';
        }
    });
});
