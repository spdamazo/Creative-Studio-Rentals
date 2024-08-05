// View all listings page - renter's view of all listings

document.addEventListener('DOMContentLoaded', () => {
    const studioListContainer = document.getElementById('studioList');
    const filterForm = document.getElementById('filterForm');
    const showAllButton = document.getElementById('showAllButton');

    // Function to display studio listings in the container
    function displayStudioListings(studioListings) {
        studioListContainer.innerHTML = ''; // Clear the existing listings
        studioListings.forEach((studio, index) => {
            const photoUrl = studio.image && isValidUrl(studio.image) ? studio.image : '../images/default-photo.jpg';

            const studioItem = document.createElement('div');
            studioItem.className = 'listing-item';
            studioItem.innerHTML = `
                <div>
                    <img src="${photoUrl}" alt="${studio.name} image" style="width: 500px; height: auto;">
                </div>
                <h3>${studio.name}</h3>
                <p>${studio.address}</p>
                <p>${studio.type}</p>
                <button class="view-details-button" data-index="${index}">View Details</button>
            `;
            studioListContainer.appendChild(studioItem);
        });
    }

    // Function to check if a URL is valid
    function isValidUrl(url) {
        return typeof url === 'string' && (url.startsWith('http') || url.startsWith('data:image'));
    }

    // Function to filter studio listings based on user input
    function filterStudioListings(event) {
        event.preventDefault();

        const nameFilter = document.getElementById('nameFilter').value.toLowerCase();
        const addressFilter = document.getElementById('addressFilter').value.toLowerCase();
        const typeFilter = document.getElementById('typeFilter').value.toLowerCase();

        const allStudioListings = JSON.parse(localStorage.getItem('studioListings')) || [];
        const filteredStudioListings = allStudioListings.filter(studio =>
            (nameFilter === '' || studio.name.toLowerCase().includes(nameFilter)) &&
            (addressFilter === '' || studio.address.toLowerCase().includes(addressFilter)) &&
            (typeFilter === '' || studio.type.toLowerCase().includes(typeFilter))
        );

        displayStudioListings(filteredStudioListings);
    }

    // Function to redirect to the details page for a selected studio
    function redirectToDetailsPage(index) {
        const allStudioListings = JSON.parse(localStorage.getItem('studioListings')) || [];
        if (index >= 0 && index < allStudioListings.length) {
            localStorage.setItem('selectedStudioIndex', index);
            window.location.href = 'studio-details-view.html'; // Ensure this URL is correct
        } else {
            alert('Studio not found');
        }
    }

    filterForm.addEventListener('submit', filterStudioListings);

    showAllButton.addEventListener('click', () => {
        const allStudioListings = JSON.parse(localStorage.getItem('studioListings')) || [];
        displayStudioListings(allStudioListings);
    });

    studioListContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('view-details-button')) {
            const studioIndex = parseInt(event.target.getAttribute('data-index'), 10); // Ensure index is an integer
            redirectToDetailsPage(studioIndex);
        }
    });

    // Display all studio listings on page load
    showAllButton.click();
});
