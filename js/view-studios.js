// View all listings page - renter's view of all listings

document.addEventListener('DOMContentLoaded', () => {
    const studioListContainer = document.getElementById('studioList');
    const filterForm = document.getElementById('filterForm');
    const filterToggleButton = document.getElementById('filterToggleButton');
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
                <p>Area: ${studio.area} sq meters</p>
                <p>Capacity: ${studio.capacity}</p>
                <p>Price: $${studio.price}</p>
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
        const areaFilter = document.getElementById('areaFilter')?.value.toLowerCase() || '';
        const typeFilter = document.getElementById('typeFilter')?.value.toLowerCase() || '';
        const capacityFilter = document.getElementById('capacityFilter')?.value.toLowerCase() || '';
        const priceFilter = document.getElementById('priceFilter')?.value.toLowerCase() || '';
        const parkingFilter = document.getElementById('parkingFilter')?.checked;
        const publicTransportFilter = document.getElementById('publicTransportFilter')?.checked;
        const availableFilter = document.getElementById('availableFilter')?.checked;
        const rentalTermFilter = document.getElementById('rentalTermFilter')?.value.toLowerCase() || '';

        const allStudioListings = JSON.parse(localStorage.getItem('studioListings')) || [];
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

        const originalIndices = allStudioListings
            .map((studio, index) => filteredStudioListings.includes(studio) ? index : null)
            .filter(index => index !== null);

        displayStudioListings(filteredStudioListings, originalIndices);
    }

    // Function to toggle the visibility of the filter form
    function toggleFilterForm() {
        if (filterForm.style.display === 'none' || filterForm.style.display === '') {
            filterForm.style.display = 'block';
            filterToggleButton.textContent = 'Hide Filters';
        } else {
            filterForm.style.display = 'none';
            filterToggleButton.textContent = 'Show Filters';
        }
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
    if (filterToggleButton) {
        filterToggleButton.addEventListener('click', toggleFilterForm);
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
