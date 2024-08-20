// Owner's Edit Listing - Owner edit specified listing

document.addEventListener('DOMContentLoaded', () => {
    // Retrieve logged-in user information from local storage
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    // Redirect to login page if no user is logged in
    if (!loggedInUser) {
        window.location.href = 'login.html';
        return;
    }

    // Redirect to homepage if the logged-in user is not an owner
    if (loggedInUser.role !== 'owner') {
        window.location.href = 'index.html';
        return;
    }

    // Get URL parameters for the email and name of the listing to be edited
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email');
    const originalName = urlParams.get('name');

    // Validate that the URL parameters are provided
    if (!email || !originalName) {
        alert('Invalid request');
        window.location.href = 'view-listings.html';
        return;
    }

    // Fetch all studio listings from the server
    fetch('/api/studios')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(listings => {
        console.log('Fetched listings:', listings); // Log the fetched listings for debugging
        // Find the listing to edit based on the email and name
        const listingToEdit = listings.find(listing => listing.ownerEmail === email && listing.name === originalName);

        // Redirect if the listing to edit is not found
        if (!listingToEdit) {
            alert('Listing not found');
            window.location.href = 'view-listings.html';
            return;
        }

        // Populate the form with the details of the listing to edit
        populateForm(listingToEdit);

        // Handle form submission for editing the listing
        document.getElementById('editListingForm').addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Collect the updated listing data from the form
            const updatedListing = getFormData();
            
            // Handle image upload and update the listing
            handleImageUpload(updatedListing, listingToEdit);
        });
    })
    .catch(error => {
        console.error('Error fetching studio listings:', error);
        alert('An error occurred while fetching studio details. Please check the console for more details.');
    });

    // Populate the form fields with the listing's data
    function populateForm(listing) {
        document.getElementById('name').value = listing.name;
        document.getElementById('address').value = listing.address;
        document.getElementById('area').value = listing.area;
        document.getElementById('type').value = listing.type;
        document.getElementById('capacity').value = listing.capacity;
        document.getElementById('parking').checked = listing.parking;
        document.getElementById('public_transport').checked = listing.public_transport;
        document.getElementById('available').checked = listing.available;
        document.getElementById('rental_term').value = listing.rental_term;
        document.getElementById('price').value = listing.price;
        document.getElementById('ownerEmail').value = listing.ownerEmail;
        document.getElementById('ownerName').value = listing.ownerName;
        document.getElementById('ownerPhone').value = listing.ownerPhone;
    }

    // Collect data from the form and return it as an object
    function getFormData() {
        return {
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
            ownerEmail: document.getElementById('ownerEmail').value,
            ownerName: document.getElementById('ownerName').value,
            ownerPhone: document.getElementById('ownerPhone').value,
        };
    }

    // Handle image file upload and update the listing with the image
    function handleImageUpload(updatedListing, listingToEdit) {
        const imageInput = document.getElementById('image');
        if (imageInput.files && imageInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                updatedListing.image = e.target.result;
                updateListing(updatedListing);
            };
            reader.readAsDataURL(imageInput.files[0]);
        } else {
            // If no new image is uploaded, use the existing image
            updatedListing.image = listingToEdit.image;
            updateListing(updatedListing);
        }
    }

    // Send the updated listing data to the server
    function updateListing(updatedListing) {
        console.log('Updating listing with:', updatedListing); // Log the updated listing data for debugging
    
        fetch(`/api/studios/${encodeURIComponent(updatedListing.name)}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedListing)
        })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => {
                    throw new Error(`Network response was not ok: ${text}`);
                });
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                alert('Listing updated successfully!');
                window.location.href = 'view-listings.html';
            } else {
                alert('Error: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error updating listing:', error);
            alert('An error occurred while updating the listing.');
        });
    }
    
});
