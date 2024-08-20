// Load listings for Owner and Renter Homepage

document.addEventListener("DOMContentLoaded", function() {
    let container = document.getElementById('listing-container');

    // Function to check if a URL is valid
    function isValidUrl(url) {
        return typeof url === 'string' && (url.startsWith('http') || url.startsWith('data:image'));
    }

    // Function to check if the user is logged in
    function isLoggedIn() {
        return localStorage.getItem('loggedInUser') !== null;
    }

    // Function to get the logged-in user's role
    function getUserRole() {
        const user = JSON.parse(localStorage.getItem('loggedInUser'));
        return user ? user.role : null;
    }

    // Function to fetch studio listings from the server
    async function fetchStudioListings() {
        try {
            const response = await fetch('/api/listings');
            if (!response.ok) {
                throw new Error('Failed to fetch studio listings');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching studio listings:', error);
            return []; // Return an empty array if an error occurs
        }
    }

    // Function to display the studio listings on the page
    function displayStudioListings(studioListings) {
        studioListings.forEach((studio, index) => {
            // Create a container for each listing
            let listbox = document.createElement('div');
            listbox.classList.add('listbox');

            // Create an image element for the listing
            let img = document.createElement('img');
            img.src = isValidUrl(studio.image) ? studio.image : '../images/default-photo.jpg'; // Use a default image if the URL is not valid
            img.alt = "Listing Image";
            img.classList.add('listing-image');

            // Create a container for the listing details
            let listingDetails = document.createElement('div');
            listingDetails.classList.add('listing-details');

            // Add title, address, type, and price to the listing details
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

            // Add an event listener to the button to redirect based on user role
            btn.addEventListener('click', () => {
                if (isLoggedIn()) {
                    const role = getUserRole();
                    // Save selected studio's name and owner email to localStorage
                    localStorage.setItem('selectedStudioName', studio.name);
                    localStorage.setItem('selectedStudioOwnerEmail', studio.ownerEmail);

                    // Redirect to the appropriate details page based on user role
                    if (role === 'owner') {
                        window.location.href = `studio-details-view2.html?name=${encodeURIComponent(studio.name)}&email=${encodeURIComponent(studio.ownerEmail)}`;
                    } else if (role === 'renter') {
                        window.location.href = `studio-details-view.html?name=${encodeURIComponent(studio.name)}&email=${encodeURIComponent(studio.ownerEmail)}`;
                    } else {
                        alert('Invalid user role.');
                    }
                } else {
                    alert('Please log in to check availability.');
                    window.location.href = 'pages/login.html';
                }
            });

            // Append the elements to the listbox
            listingDetails.appendChild(listingTitle);
            listingDetails.appendChild(listingInfo1);
            listingDetails.appendChild(listingInfo2);
            listingDetails.appendChild(listingPrice);
            listingDetails.appendChild(btn);

            listbox.appendChild(img);
            listbox.appendChild(listingDetails);

            // Append the listbox to the container
            container.appendChild(listbox);
        });
    }

    // Fetch and display the studio listings on page load
    fetchStudioListings().then(displayStudioListings);
});
