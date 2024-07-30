// Wait for the DOM content to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
    // Get the container for studio listings, filter form, and "Show All" button elements
    const studioListContainer = document.getElementById('studioList');
    const filterForm = document.getElementById('filterForm');
    const showAllButton = document.getElementById('showAllButton');

    // Array to keep track of the current studio listings being displayed
    let currentStudioListings = [];

    // Function to display studio listings in the container
    function displayStudioListings(studioListings) {
        studioListContainer.innerHTML = ''; // Clear the existing listings
        currentStudioListings = studioListings; // Update the current listings
        studioListings.forEach((studio, index) => {
            // Create a new div element for each studio listing
            const studioItem = document.createElement('div');
            studioItem.className = 'listing-item';
            studioItem.innerHTML = `
                <h3>${studio.name}</h3>
                <p>${studio.address}</p>
                <p>${studio.type}</p>
                <button class="view-details-button" data-index="${index}">View Details</button>
            `;
            studioListContainer.appendChild(studioItem);
        });
    }

    // Function to filter studio listings based on the filter form input
    function filterStudioListings(event) {
        event.preventDefault(); // Prevent the default form submission behavior

        // Get filter values from the form
        const nameFilter = document.getElementById('nameFilter').value.toLowerCase();
        const addressFilter = document.getElementById('addressFilter').value.toLowerCase();
        const typeFilter = document.getElementById('typeFilter').value.toLowerCase();

        // Retrieve all studio listings from localStorage
        const allStudioListings = JSON.parse(localStorage.getItem('studioListings')) || [];

        // Filter the listings based on the filter values
        const filteredStudioListings = allStudioListings.filter(studio =>
            (studio.name.toLowerCase().includes(nameFilter) || !nameFilter) &&
            (studio.address.toLowerCase().includes(addressFilter) || !addressFilter) &&
            (studio.type.toLowerCase().includes(typeFilter) || !typeFilter)
        );

        // Display the filtered listings
        displayStudioListings(filteredStudioListings);
    }

    // Function to redirect to the studio details page
    function redirectToDetailsPage(index) {
        // Find the actual studio based on the index of the filtered list
        const studio = currentStudioListings[index];
        if (studio) {
            // Retrieve all studio listings and find the index of the selected studio
            const allStudioListings = JSON.parse(localStorage.getItem('studioListings')) || [];
            const actualIndex = allStudioListings.findIndex(listing => listing.name === studio.name && listing.address === studio.address);

            // Save the selected studio index to localStorage
            localStorage.setItem('selectedStudioIndex', actualIndex);

            // Update the browser history and redirect to the studio details page
            history.pushState({page: 'studioDetails'}, '', 'studio-details.html'); // Add state to history
            window.location.href = 'studio-details.html'; // Redirect to details page
        } else {
            alert('Studio not found');
        }
    }

    // Event listener for the filter form submission
    filterForm.addEventListener('submit', filterStudioListings);

    // Event listener for the "Show All" button
    showAllButton.addEventListener('click', () => {
        // Retrieve all studio listings and display them
        const allStudioListings = JSON.parse(localStorage.getItem('studioListings')) || [];
        displayStudioListings(allStudioListings);
    });

    // Event listener for the "View Details" buttons within the studio list container
    studioListContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('view-details-button')) {
            const studioIndex = event.target.getAttribute('data-index');
            redirectToDetailsPage(studioIndex); // Redirect to the studio details page
        }
    });

    // Display all studio listings when the page is first loaded
    showAllButton.click();
});
