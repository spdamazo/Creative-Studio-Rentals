document.addEventListener('DOMContentLoaded', () => {
    const studioListContainer = document.getElementById('studioList');
    const filterForm = document.getElementById('filterForm');
    const showAllButton = document.getElementById('showAllButton');

    function displayStudioListings(studioListings) {
        studioListContainer.innerHTML = ''; // Clear the existing listings
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

    function redirectToDetailsPage(index) {
        localStorage.setItem('selectedStudioIndex', index);
        window.location.href = 'studio-details.html'; // Use the same HTML page
    }

    filterForm.addEventListener('submit', filterStudioListings);

    showAllButton.addEventListener('click', () => {
        const allStudioListings = JSON.parse(localStorage.getItem('studioListings')) || [];
        displayStudioListings(allStudioListings);
    });

    studioListContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('view-details-button')) {
            const studioIndex = event.target.getAttribute('data-index');
            redirectToDetailsPage(studioIndex);
        }
    });

    // Display all studio listings on page load
    showAllButton.click();
});
