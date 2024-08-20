// Renter's View all listings page - renter's view of all listings

document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements
    const studioListContainer = document.getElementById('studioList');
    const filterForm = document.getElementById('filterForm');
    const filterToggleButton = document.getElementById('filterToggleButton');
    const showAllButton = document.getElementById('showAllButton');

    // Store the original listings to maintain the mapping between filtered and original indices
    let originalStudioListings = []; 

    // Function to display studio listings in the container
    function displayStudioListings(studioListings, originalIndices) {
        if (!studioListContainer) return; // Check if the container element exists
        studioListContainer.innerHTML = ''; // Clear any existing listings
        studioListings.forEach((studio, index) => {
            // Set default photo URL if the studio image is not available or not valid
            const photoUrl = studio.image && isValidUrl(studio.image) ? studio.image : '../images/default-photo.jpg';

            // Create a new div element for each studio listing
            const studioItem = document.createElement('div');
            studioItem.className = 'listing-item';
            studioItem.innerHTML = `
                <div>
                    <img src="${photoUrl}" alt="${studio.name} image" style="width: 400px; height: auto;">
                </div>
                <h3>${studio.name}</h3>
                <p>${studio.address}</p>
                <p>${studio.type}</p>
                <p>Area: ${studio.area} sq meters</p>
                <p>Capacity: ${studio.capacity}</p>
                <p>Price: $${studio.price}</p>
                <button class="view-details-button" data-index="${index}" data-original-index="${originalIndices[index]}">View Details</button>
            `;
            studioListContainer.appendChild(studioItem); // Append the new div to the container
        });
    }

    // Function to check if a URL is valid
    function isValidUrl(url) {
        try {
            new URL(url); // Try creating a URL object
            return true;
        } catch (_) {
            return false; // Return false if URL creation fails
        }
    }

    // Function to fetch studio listings from the server
    async function fetchStudioListings() {
        try {
            const response = await fetch('/api/studios'); // Fetch data from the API
            if (!response.ok) {
                throw new Error('Failed to fetch studio listings'); // Handle HTTP errors
            }
            const data = await response.json(); // Parse the JSON response
            return data;
        } catch (error) {
            console.error('Error:', error); // Log errors to the console
            return []; // Return an empty array if an error occurs
        }
    }

    // Function to filter studio listings based on user input
    async function filterStudioListings(event) {
        event.preventDefault(); // Prevent default form submission

        // Retrieve filter values from the form
        const nameFilter = document.getElementById('nameFilter')?.value.toLowerCase() || '';
        const addressFilter = document.getElementById('addressFilter')?.value.toLowerCase() || '';
        const areaFilter = document.getElementById('areaFilter')?.value.toLowerCase() || '';
        const typeFilter = document.getElementById('typeFilter')?.value.toLowerCase() || '';
        const capacityFilter = document.getElementById('capacityFilter')?.value.toLowerCase() || '';
        const priceFilter = document.getElementById('priceFilter')?.value.toLowerCase() || '';
        const parkingFilter = document.getElementById('parkingFilter')?.checked;
        const publicTransportFilter = document.getElementById('publicTransportFilter')?.checked;
        const availableFilter = document.getElementById('availableFilter')?.checked;
        const rentalTermFilter = document.getElementById('rentalTermFilter')?.value.toLowerCase() || '';

        const allStudioListings = await fetchStudioListings(); // Fetch all listings from the server
        // Filter listings based on the user's input
        const filteredStudioListings = allStudioListings.filter((studio) =>
            (nameFilter === '' || studio.name.toLowerCase().includes(nameFilter)) &&
            (addressFilter === '' || studio.address.toLowerCase().includes(addressFilter)) &&
            (areaFilter === '' || studio.area.toString().toLowerCase().includes(areaFilter)) &&
            (typeFilter === '' || studio.type.toLowerCase().includes(typeFilter)) &&
            (capacityFilter === '' || studio.capacity.toString().toLowerCase().includes(capacityFilter)) &&
            (priceFilter === '' || studio.price.toString().toLowerCase().includes(priceFilter)) &&
            (!parkingFilter || studio.parking.toLowerCase() === 'yes') &&
            (!publicTransportFilter || studio.publicTransport.toLowerCase() === 'yes') &&
            (!availableFilter || studio.available) &&
            (rentalTermFilter === '' || studio.rentalTerm.toLowerCase().includes(rentalTermFilter))
        );

        // Map filtered listings back to original indices
        const originalIndices = allStudioListings
            .map((studio, index) => filteredStudioListings.includes(studio) ? index : null)
            .filter(index => index !== null);

        displayStudioListings(filteredStudioListings, originalIndices); // Display filtered listings
    }

    // Function to toggle the visibility of the filter form
    function toggleFilterForm() {
        if (filterForm.style.display === 'none' || filterForm.style.display === '') {
            filterForm.style.display = 'block'; // Show the filter form
            filterToggleButton.textContent = 'Hide Filters'; // Change button text
        } else {
            filterForm.style.display = 'none'; // Hide the filter form
            filterToggleButton.textContent = 'Show Filters'; // Change button text
        }
    }

    // Function to redirect to the details page for a selected studio
    async function redirectToDetailsPage(studio) {
        if (studio) {
            const queryString = `?name=${encodeURIComponent(studio.name)}&email=${encodeURIComponent(studio.ownerEmail)}`;
            window.location.href = `studio-details-view.html${queryString}`; // Redirect to details page
        } else {
            alert('Studio not found'); // Alert if studio details are not available
        }
    }

    // Ensure elements exist before adding event listeners
    if (filterForm) filterForm.addEventListener('submit', filterStudioListings);
    if (showAllButton) {
        showAllButton.addEventListener('click', async () => {
            const allStudioListings = await fetchStudioListings(); // Fetch all listings from the server
            displayStudioListings(allStudioListings, [...Array(allStudioListings.length).keys()]); // Display all listings with original indices
        });
    }
    if (filterToggleButton) {
        filterToggleButton.addEventListener('click', toggleFilterForm); // Toggle filter form visibility
    }

    // Add event listener for clicking on "View Details" button
    if (studioListContainer) {
        studioListContainer.addEventListener('click', async (event) => {
            if (event.target.classList.contains('view-details-button')) {
                const originalIndex = parseInt(event.target.getAttribute('data-original-index'), 10); // Get the original index of the listing
                const allStudioListings = await fetchStudioListings(); // Fetch all listings from the server
                const studio = allStudioListings[originalIndex];
                await redirectToDetailsPage(studio); // Redirect to details page
            }
        });
    }

    // Display all studio listings on page load
    if (showAllButton) showAllButton.click();
});
