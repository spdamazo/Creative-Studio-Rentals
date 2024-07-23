// view-studios.js

document.addEventListener('DOMContentLoaded', () => {
    const studioListContainer = document.getElementById('studioList');
    const filterForm = document.getElementById('filterForm');
    const showAllButton = document.getElementById('showAllButton');
    const viewDetailsModal = document.getElementById('viewDetailsModal');
    const viewDetailsContent = document.getElementById('viewDetailsContent');

    function displayListings(listings) {
        studioListContainer.innerHTML = ''; // Clear the existing listings
        listings.forEach(listing => {
            const listingItem = document.createElement('div');
            listingItem.className = 'listing-item';
            listingItem.innerHTML = `
                <h3>${listing.name}</h3>
                <p>${listing.address}</p>
                <p>${listing.type}</p>
                <button class="view-details-button" data-id="${listing.id}">View Details</button>
            `;
            studioListContainer.appendChild(listingItem);
        });
    }

    function filterListings(event) {
        event.preventDefault();

        const nameFilter = document.getElementById('nameFilter').value.toLowerCase();
        const addressFilter = document.getElementById('addressFilter').value.toLowerCase();
        const typeFilter = document.getElementById('typeFilter').value.toLowerCase();

        const allListings = JSON.parse(localStorage.getItem('listings')) || [];
        const filteredListings = allListings.filter(listing =>
            (listing.name.toLowerCase().includes(nameFilter) || !nameFilter) &&
            (listing.address.toLowerCase().includes(addressFilter) || !addressFilter) &&
            (listing.type.toLowerCase().includes(typeFilter) || !typeFilter)
        );

        displayListings(filteredListings);
    }

    function showListingDetails(listingId) {
        const allListings = JSON.parse(localStorage.getItem('listings')) || [];
        const selectedListing = allListings.find(listing => listing.id === listingId);

        if (selectedListing) {
            viewDetailsContent.innerHTML = `
                <h2>${selectedListing.name}</h2>
                <p><strong>Address:</strong> ${selectedListing.address}</p>
                <p><strong>Type:</strong> ${selectedListing.type}</p>
                <p><strong>Description:</strong> ${selectedListing.description}</p>
                <p><strong>Owner:</strong> ${selectedListing.ownerName}</p>
                <p><strong>Owner Phone:</strong> ${selectedListing.ownerPhone}</p>
                <p><strong>Owner Email:</strong> ${selectedListing.ownerEmail}</p>
                <button id="closeModal">Close</button>
            `;
            viewDetailsModal.style.display = 'block';
        }
    }

    filterForm.addEventListener('submit', filterListings);

    showAllButton.addEventListener('click', () => {
        const allListings = JSON.parse(localStorage.getItem('listings')) || [];
        displayListings(allListings);
    });

    studioListContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('view-details-button')) {
            const listingId = event.target.getAttribute('data-id');
            showListingDetails(listingId);
        }
    });

    viewDetailsModal.addEventListener('click', (event) => {
        if (event.target.id === 'closeModal') {
            viewDetailsModal.style.display = 'none';
        }
    });

    // Display all listings on page load
    showAllButton.click();
});
