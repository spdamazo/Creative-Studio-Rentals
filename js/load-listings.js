document.addEventListener("DOMContentLoaded", function() {
    let container = document.getElementById('listing-container');

    // Fetch the listings from local storage
    let studioListings = JSON.parse(localStorage.getItem('studioListings')) || [];

    // Function to check if a URL is valid
    function isValidUrl(url) {
        return typeof url === 'string' && (url.startsWith('http') || url.startsWith('data:image'));
    }

    // Function to check if user is logged in
    function isLoggedIn() {
        return localStorage.getItem('loggedInUser') !== null;
    }

    // Function to get the logged-in user's role
    function getUserRole() {
        const user = JSON.parse(localStorage.getItem('loggedInUser'));
        return user ? user.role : null;
    }

    studioListings.forEach((studio, index) => {
        // Create the elements
        let listbox = document.createElement('div');
        listbox.classList.add('listbox');

        let img = document.createElement('img');
        img.src = isValidUrl(studio.image) ? studio.image : '../images/default-photo.jpg';
        img.alt = "Listing Image";
        img.classList.add('listing-image');

        let listingDetails = document.createElement('div');
        listingDetails.classList.add('listing-details');

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

        let btn = document.createElement('div');
        btn.classList.add('btn');
        btn.textContent = "Check availability";
        btn.dataset.index = index;

        // Add event listener to the button to redirect to the details page
        btn.addEventListener('click', () => {
            if (isLoggedIn()) {
                localStorage.setItem('selectedStudioIndex', index);
                const role = getUserRole();
                if (role === 'owner') {
                    window.location.href = 'studio-details.html';
                } else if (role === 'renter') {
                    window.location.href = 'studio-details-view.html';
                } else {
                    alert('Invalid user role.');
                }
            } else {
                alert('Please log in to check availability.');
                window.location.href = '../pages/login.html';
            }
        });

        // Append the elements
        listingDetails.appendChild(listingTitle);
        listingDetails.appendChild(listingInfo1);
        listingDetails.appendChild(listingInfo2);
        listingDetails.appendChild(listingPrice);
        listingDetails.appendChild(btn);

        listbox.appendChild(img);
        listbox.appendChild(listingDetails);

        container.appendChild(listbox);
    });
});
