// Owner's add listing - Owner adds new studio listing

document.addEventListener('DOMContentLoaded', () => {
    // Get the logged-in user details from local storage
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    // If no user is logged in or the user is not an owner, redirect to the appropriate page
    if (!loggedInUser || loggedInUser.role !== 'owner') {
        window.location.href = loggedInUser ? 'index.html' : 'login.html';
        return;
    }

    // Get the form element where the owner will add the new listing
    const addListingForm = document.getElementById('addListingForm');

    // Listen for form submission
    addListingForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        // Create a new listing object with the form data
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
            ownerEmail: loggedInUser.email, // Use logged-in user's email as the owner email
            ownerPhone: loggedInUser.phone, // Use logged-in user's phone number as the owner phone
            ownerName: loggedInUser.name,   // Add the owner's name
            image: '' // Placeholder for the image data, to be added later if uploaded
        };

        // Handle image upload if the user has selected an image
        const imageInput = document.getElementById('image');
        if (imageInput.files && imageInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                // Add the uploaded image's data as a Base64 string to the new listing object
                newListing.image = e.target.result;
                // Send the listing data to the server after the image is processed
                sendListingToServer(newListing);
            };
            reader.readAsDataURL(imageInput.files[0]); // Read the image file as a data URL
        } else {
            // If no image is uploaded, proceed to send the listing data without the image
            sendListingToServer(newListing);
        }
    });

    // Function to send the new listing to the server
    function sendListingToServer(listing) {
        fetch('/api/add-listing', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(listing) // Convert the listing object to a JSON string
        })
        .then(response => response.json()) // Parse the response as JSON
        .then(data => {
            if (data.success) {
                // If the listing is successfully added, show an alert and redirect to the owner's profile page
                alert('Listing added successfully!');
                window.location.href = 'owner-profile.html';
            } else {
                // If there's an error, display the error message
                alert('Error: ' + data.message);
            }
        })
        .catch(error => {
            // Handle any errors that occur during the fetch request
            console.error('Error adding listing:', error);
            alert('An error occurred. Please try again later.');
        });
    }
});
