document.addEventListener('DOMContentLoaded', () => {
    const studioListContainer = document.getElementById('studioList');
    const filterForm = document.getElementById('filterForm');
    const showAllButton = document.getElementById('showAllButton');
    const viewDetailsModal = document.getElementById('viewDetailsModal');
    const viewDetailsContent = document.getElementById('viewDetailsContent');

    function displayStudioListings(studioListings) {
        studioListContainer.innerHTML = ''; // Clear the existing listings
        studioListings.forEach(studio => {
            const studioItem = document.createElement('div');
            studioItem.className = 'listing-item';
            studioItem.innerHTML = `
                <h3>${studio.name}</h3>
                <p>${studio.address}</p>
                <p>${studio.type}</p>
                <button class="view-details-button" data-id="${studio.id}">View Details</button>
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

    function showStudioDetails(studioId) {
        const allStudioListings = JSON.parse(localStorage.getItem('studioListings')) || [];
        const selectedStudio = allStudioListings.find(studio => studio.id === studioId);

        if (selectedStudio) {
            viewDetailsContent.innerHTML = `
                <h2>${selectedStudio.name}</h2>
                <p><strong>Address:</strong> ${selectedStudio.address}</p>
                <p><strong>Type:</strong> ${selectedStudio.type}</p>
                <p><strong>Description:</strong> ${selectedStudio.description}</p>
                <p><strong>Owner:</strong> ${selectedStudio.ownerName}</p>
                <p><strong>Owner Phone:</strong> ${selectedStudio.ownerPhone}</p>
                <p><strong>Owner Email:</strong> ${selectedStudio.ownerEmail}</p>
                <button id="closeModal">Close</button>
            `;
            viewDetailsModal.style.display = 'block';
        }
    }

    filterForm.addEventListener('submit', filterStudioListings);

    showAllButton.addEventListener('click', () => {
        const allStudioListings = JSON.parse(localStorage.getItem('studioListings')) || [];
        displayStudioListings(allStudioListings);
    });

    studioListContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('view-details-button')) {
            const studioId = event.target.getAttribute('data-id');
            showStudioDetails(studioId);
        }
    });

    viewDetailsModal.addEventListener('click', (event) => {
        if (event.target.id === 'closeModal') {
            viewDetailsModal.style.display = 'none';
        }
    });

    // Display all studio listings on page load
    showAllButton.click();
});
