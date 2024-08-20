// Main Home Page - Index

document.addEventListener("DOMContentLoaded", function() {
    // Select the container element where listings will be displayed
    let container = document.getElementById('listing-container');

    // Function to check if a URL is valid
    function isValidUrl(url) {
        return typeof url === 'string' && (url.startsWith('http') || url.startsWith('data:image'));
    }

    // Function to fetch studio listings from the server
    async function fetchStudioListings() {
        try {
            // Make a request to the API endpoint to get studio listings
            const response = await fetch('/api/listings');
            
            // Check if the response is successful
            if (!response.ok) {
                throw new Error('Failed to fetch studio listings');
            }
            
            // Parse and return the JSON data
            const data = await response.json();
            return data;
        } catch (error) {
            // Log errors to the console and return an empty array
            console.error('Error fetching studio listings:', error);
            return [];
        }
    }

    // Function to display the fetched studio listings
    function displayStudioListings(studioListings) {
        // Iterate over each listing and create elements to display it
        studioListings.forEach((studio, index) => {
            // Create a container for each listing
            let listbox = document.createElement('div');
            listbox.classList.add('listbox');

            // Create an image element for the listing
            let img = document.createElement('img');
            img.src = isValidUrl(studio.image) ? studio.image : 'images/default-photo.jpg';
            img.alt = "Listing Image";
            img.classList.add('listing-image');

            // Create a container for listing details
            let listingDetails = document.createElement('div');
            listingDetails.classList.add('listing-details');

            // Create and populate elements for listing title, address, type, and price
            let listingTitle = document.createElement('h3');
            listingTitle.classList.add('listing-title');
            listingTitle.textContent = studio.name;

            let listingInfo1 = document.createElement('p');
            listingInfo1.classList.add('listing-info');
            listingInfo1.textContent = studio.address;

            let listingInfo2 = document.createElement('p');
            listingInfo2.classList.add('listing-info');
            listingInfo2.textContent = studio.type;

            let listingPrice = document.createElement('p');
            listingPrice.classList.add('listing-price');
            listingPrice.textContent = studio.price ? `$${studio.price}` : 'Price not listed';

            // Create a button to check availability
            let btn = document.createElement('div');
            btn.classList.add('btn');
            btn.textContent = "Check availability";
            btn.dataset.index = index;

            // Add an event listener to the button to redirect to the login page
            btn.addEventListener('click', () => {
                window.location.href = 'pages/login.html';
            });

            // Append the created elements to their respective containers
            listingDetails.appendChild(listingTitle);
            listingDetails.appendChild(listingInfo1);
            listingDetails.appendChild(listingInfo2);
            listingDetails.appendChild(listingPrice);
            listingDetails.appendChild(btn);

            listbox.appendChild(img);
            listbox.appendChild(listingDetails);

            // Append the listing container to the main container
            container.appendChild(listbox);
        });
    }

    // Fetch and display the studio listings on page load
    fetchStudioListings().then(displayStudioListings);
});
