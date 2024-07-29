document.addEventListener('DOMContentLoaded', () => {
    const studioListContainer = document.getElementById('studioList');
    const filterForm = document.getElementById('filterForm');
    const showAllButton = document.getElementById('showAllButton');

    let currentStudioListings = [];

    // Function to display studio listings
    function displayStudioListings(studioListings) {
        studioListContainer.innerHTML = ''; // Clear the existing listings
        currentStudioListings = studioListings; // Update the current listings
        studioListings.forEach((studio, index) => {
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

    // Function to filter studio listings based on the filter form
    function filterStudioListings(event) {
        event.preventDefault();

        const nameFilter = document.getElementById('nameFilter').value.toLowerCase();
        const addressFilter = document.getElementById('addressFilter').value.toLowerCase();
        const typeFilter = document.getElementById('typeFilter').value.toLowerCase();

        const allStudioListings = JSON.parse(localStorage.getItem('studioListings')) || [];
        const filteredStudioListings = allStudioListings.filter(studio =>
            (studio.name.toLowerCase().includes(nameFilter) || !nameFilter) &&
            (studio.address.toLowerCase().includes(addressFilter) || !addressFilter) &&
            (studio.type.toLowerCase().includes(typeFilter) || !typeFilter)
        );

        displayStudioListings(filteredStudioListings);
    }

    // Function to redirect to the studio details page
    function redirectToDetailsPage(index) {
        // Find the actual studio based on the index of the filtered list
        const studio = currentStudioListings[index];
        if (studio) {
            const allStudioListings = JSON.parse(localStorage.getItem('studioListings')) || [];
            const actualIndex = allStudioListings.findIndex(listing => listing.name === studio.name && listing.address === studio.address);
            localStorage.setItem('selectedStudioIndex', actualIndex);
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
        const allStudioListings = JSON.parse(localStorage.getItem('studioListings')) || [];
        displayStudioListings(allStudioListings);
    });

    // Event listener for the "View Details" buttons
    studioListContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('view-details-button')) {
            const studioIndex = event.target.getAttribute('data-index');
            redirectToDetailsPage(studioIndex);
        }
    });

    // Display all studio listings on page load
    showAllButton.click();
});