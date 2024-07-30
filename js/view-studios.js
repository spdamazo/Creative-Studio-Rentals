    // Get references to the relevant DOM elements
    const studioListContainer = document.getElementById('studioList');
    const filterForm = document.getElementById('filterForm');
    const showAllButton = document.getElementById('showAllButton');

    // Initialize an empty array to hold the current studio listings
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
            studioListContainer.appendChild(studioItem); // Append the new element to the container
        });
    }

    // Function to filter studio listings based on user input
    function filterStudioListings(event) {
        event.preventDefault(); // Prevent the default form submission behavior

        // Get filter values and convert them to lowercase for case-insensitive comparison
        const nameFilter = document.getElementById('nameFilter').value.toLowerCase();
        const addressFilter = document.getElementById('addressFilter').value.toLowerCase();
        const typeFilter = document.getElementById('typeFilter').value.toLowerCase();

        // Retrieve all studio listings from localStorage
        const allStudioListings = JSON.parse(localStorage.getItem('studioListings')) || [];
        
        // Filter the listings based on the user input
        const filteredStudioListings = allStudioListings.filter(studio =>
            (studio.name.toLowerCase().includes(nameFilter) || !nameFilter) &&
            (studio.address.toLowerCase().includes(addressFilter) || !addressFilter) &&
            (studio.type.toLowerCase().includes(typeFilter) || !typeFilter)
        );

        // Display the filtered listings
        displayStudioListings(filteredStudioListings);
    }

    // Function to redirect to the details page for a selected studio
    function redirectToDetailsPage(index) {
        // Find the actual studio based on the index of the filtered list
        const studio = currentStudioListings[index];
        if (studio) {
            // Retrieve all studio listings and find the index of the selected studio
            const allStudioListings = JSON.parse(localStorage.getItem('studioListings')) || [];
            const actualIndex = allStudioListings.findIndex(listing => listing.name === studio.name && listing.address === studio.address);
            // Save the index of the selected studio in localStorage
            localStorage.setItem('selectedStudioIndex', actualIndex);
            // Redirect to the studio details page
            window.location.href = 'studio-details.html'; // Use the same HTML page
        } else {
            alert('Studio not found'); // Notify if the studio is not found
        }
    }

    // Add event listener to the filter form to handle form submissions
    filterForm.addEventListener('submit', filterStudioListings);

    // Add event listener to the show all button to display all studio listings
    showAllButton.addEventListener('click', () => {
        const allStudioListings = JSON.parse(localStorage.getItem('studioListings')) || [];
        displayStudioListings(allStudioListings);
    });

    // Add event listener to the studio list container to handle clicks on view details buttons
    studioListContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('view-details-button')) {
            const studioIndex = event.target.getAttribute('data-index');
            redirectToDetailsPage(studioIndex);
        }
    });

    // Display all studio listings on page load
    showAllButton.click();
});
