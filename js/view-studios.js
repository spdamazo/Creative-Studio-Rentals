// View all listings page - renter's view of all listings

document.addEventListener('DOMContentLoaded', () => {
    const studioListContainer = document.getElementById('studioList');
    const filterForm = document.getElementById('filterForm');
    const showAllButton = document.getElementById('showAllButton');
    
    let originalStudioListings = []; // Store the original listings to maintain the mapping

    // Function to display studio listings in the container
    function displayStudioListings(studioListings, originalIndices) {
        if (!studioListContainer) return; // Check if the container exists
        studioListContainer.innerHTML = ''; // Clear the existing listings
        studioListings.forEach((studio, index) => {
            const photoUrl = studio.image && isValidUrl(studio.image) ? studio.image : '../images/default-photo.jpg';

            const studioItem = document.createElement('div');
            studioItem.className = 'listing-item';
            studioItem.innerHTML = `
                <div>
                    <img src="${photoUrl}" alt="${studio.name} image" style="width: 400px; height: auto;">
                </div>
                <h3>${studio.name}</h3>
                <p>${studio.address}</p>
                <p>${studio.type}</p>
                <button class="view-details-button" data-index="${index}" data-original-index="${originalIndices[index]}">View Details</button>
            `;
            studioListContainer.appendChild(studioItem);
        });
    }

    // Function to check if a URL is valid
    function isValidUrl(url) {
        try {
            new URL(url); // Attempt to create a new URL object
            return true;
        } catch (_) {
            return false;
        }
    }

    // Function to filter studio listings based on user input
    function filterStudioListings(event) {
        event.preventDefault();

        const nameFilter = document.getElementById('nameFilter')?.value.toLowerCase() || '';
        const addressFilter = document.getElementById('addressFilter')?.value.toLowerCase() || '';
        const typeFilter = document.getElementById('typeFilter')?.value.toLowerCase() || '';

        const allStudioListings = JSON.parse(localStorage.getItem('studioListings')) || [];
        const filteredStudioListings = allStudioListings.filter((studio, index) =>
            (nameFilter === '' || studio.name.toLowerCase().includes(nameFilter)) &&
            (addressFilter === '' || studio.address.toLowerCase().includes(addressFilter)) &&
            (typeFilter === '' || studio.type.toLowerCase().includes(typeFilter))
        );

        const originalIndices = allStudioListings
            .map((studio, index) => filteredStudioListings.includes(studio) ? index : null)
            .filter(index => index !== null);

        displayStudioListings(filteredStudioListings, originalIndices);
    }

    // Function to redirect to the details page for a selected studio
    function redirectToDetailsPage(originalIndex) {
        const allStudioListings = JSON.parse(localStorage.getItem('studioListings')) || [];
        if (originalIndex >= 0 && originalIndex < allStudioListings.length) {
            localStorage.setItem('selectedStudioIndex', originalIndex);
            window.location.href = 'studio-details-view.html'; // Ensure this URL is correct
        } else {
            alert('Studio not found');
        }
    }

    // Ensure elements exist before adding event listeners
    if (filterForm) filterForm.addEventListener('submit', filterStudioListings);
    if (showAllButton) {
        showAllButton.addEventListener('click', () => {
            const allStudioListings = JSON.parse(localStorage.getItem('studioListings')) || [];
            displayStudioListings(allStudioListings, [...Array(allStudioListings.length).keys()]); // Pass original indices
        });
    }

    if (studioListContainer) {
        studioListContainer.addEventListener('click', (event) => {
            if (event.target.classList.contains('view-details-button')) {
                const originalIndex = parseInt(event.target.getAttribute('data-original-index'), 10); // Get the original index
                redirectToDetailsPage(originalIndex);
            }
        });
    }

    // Display all studio listings on page load
    if (showAllButton) showAllButton.click();
});
