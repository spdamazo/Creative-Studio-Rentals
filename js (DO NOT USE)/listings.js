let listings = [];

document.addEventListener('DOMContentLoaded', function() {
    const addListingForm = document.getElementById('addListingForm');
    const editListingForm = document.getElementById('editListingForm');
    const ownerListings = document.getElementById('ownerListings');
    const studioDetails = document.getElementById('studioDetails');

    if (addListingForm) {
        addListingForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const name = document.getElementById('name').value;
            const address = document.getElementById('address').value;
            const area = document.getElementById('area').value;
            const type = document.getElementById('type').value;
            const capacity = document.getElementById('capacity').value;
            const parking = document.getElementById('parking').checked;
            const publicTransport = document.getElementById('public_transport').checked;
            const available = document.getElementById('available').checked;
            const rentalTerm = document.getElementById('rental_term').value;
            const price = document.getElementById('price').value;
            const newListing = {
                name,
                address,
                area,
                type,
                capacity,
                parking,
                publicTransport,
                available,
                rentalTerm,
                price
            };
            listings.push(newListing);
            alert('Listing added successfully!');
            addListingForm.reset(); // Reset the form after submission
        });
    }

    if (editListingForm) {
        editListingForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const index = editListingForm.dataset.index; // Assuming index is stored in data-index attribute
            if (index !== undefined) {
                const name = document.getElementById('name').value;
                const address = document.getElementById('address').value;
                const area = document.getElementById('area').value;
                const type = document.getElementById('type').value;
                const capacity = document.getElementById('capacity').value;
                const parking = document.getElementById('parking').checked;
                const publicTransport = document.getElementById('public_transport').checked;
                const available = document.getElementById('available').checked;
                const rentalTerm = document.getElementById('rental_term').value;
                const price = document.getElementById('price').value;
                const updatedListing = {
                    name,
                    address,
                    area,
                    type,
                    capacity,
                    parking,
                    publicTransport,
                    available,
                    rentalTerm,
                    price
                };
                listings[index] = updatedListing;
                alert('Listing updated successfully!');
                // You may redirect or perform other actions after updating
            } else {
                alert('Error: Index not defined');
            }
        });
    }

    if (ownerListings) {
        // Function to populate ownerListings with user's listings
        function populateOwnerListings() {
            ownerListings.innerHTML = '';
            listings.forEach((listing, index) => {
                const listingDiv = document.createElement('div');
                listingDiv.classList.add('listing-item');
                listingDiv.innerHTML = `
                    <h3>${listing.name}</h3>
                    <p><strong>Address:</strong> ${listing.address}</p>
                    <p><strong>Type:</strong> ${listing.type}</p>
                    <p><strong>Price:</strong> $${listing.price}</p>
                    <button onclick="editListing(${index})">Edit</button>
                    <button onclick="deleteListing(${index})">Delete</button>
                `;
                ownerListings.appendChild(listingDiv);
            });
        }
        populateOwnerListings(); // Initial population

        // Function to edit a listing
        window.editListing = function(index) {
            const listing = listings[index];
            document.getElementById('name').value = listing.name;
            document.getElementById('address').value = listing.address;
            document.getElementById('area').value = listing.area;
            document.getElementById('type').value = listing.type;
            document.getElementById('capacity').value = listing.capacity;
            document.getElementById('parking').checked = listing.parking;
            document.getElementById('public_transport').checked = listing.publicTransport;
            document.getElementById('available').checked = listing.available;
            document.getElementById('rental_term').value = listing.rentalTerm;
            document.getElementById('price').value = listing.price;

            // Set the index as a data attribute to the form for reference during update
            editListingForm.setAttribute('data-index', index);
        };

        // Function to delete a listing
        window.deleteListing = function(index) {
            listings.splice(index, 1);
            populateOwnerListings(); // Repopulate listings after deletion
            alert('Listing deleted successfully!');
        };
    }

    if (studioDetails) {
        // Function to display details of a specific studio listing
        function displayStudioDetails(index) {
            const listing = listings[index];
            studioDetails.innerHTML = `
                <h2>${listing.name}</h2>
                <p><strong>Address:</strong> ${listing.address}</p>
                <p><strong>Type:</strong> ${listing.type}</p>
                <p><strong>Area:</strong> ${listing.area} sq meters</p>
                <p><strong>Capacity:</strong> ${listing.capacity} individuals</p>
                <p><strong>Parking:</strong> ${listing.parking ? 'Available' : 'Not available'}</p>
                <p><strong>Public Transport:</strong> ${listing.publicTransport ? 'Accessible' : 'Not accessible'}</p>
                <p><strong>Availability:</strong> ${listing.available ? 'Available' : 'Not available'}</p>
                <p><strong>Rental Term:</strong> ${listing.rentalTerm}</p>
                <p><strong>Price:</strong> $${listing.price}</p>
            `;
        }

        // Example usage: displayStudioDetails(0); // Display details of the first listing
    }
});
