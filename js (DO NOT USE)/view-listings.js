// document.addEventListener('DOMContentLoaded', () => {
//     const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

//     if (!loggedInUser) {
//         // Redirect to login page if no user is logged in
//         window.location.href = 'login.html';
//     } else if (loggedInUser.role !== 'owner') {
//         // Redirect if the logged-in user is not an owner
//         window.location.href = 'index.html';
//     }

//     const ownerListingsDiv = document.getElementById('ownerListings');
//     const listings = JSON.parse(localStorage.getItem('studioListings')) || [];
//     const ownerListings = listings.filter(listing => listing.ownerEmail === loggedInUser.email);

//     if (ownerListings.length === 0) {
//         ownerListingsDiv.innerHTML = '<p>You have no listings.</p>';
//     } else {
//         const listingsHtml = ownerListings.map((listing, index) => `
//             <div class="listing">
//                 <h3>${listing.name}</h3>
//                 <p>Address: ${listing.address}</p>
//                 <p>Area: ${listing.area} sq meters</p>
//                 <p>Type: ${listing.type}</p>
//                 <p>Capacity: ${listing.capacity}</p>
//                 <p>Price: $${listing.price}</p>
//                 <button onclick="editListing('${encodeURIComponent(listing.ownerEmail)}', '${encodeURIComponent(listing.name)}')">Edit</button>
//                 <button onclick="deleteListing(${index})">Delete</button>
//             </div>
//         `).join('');

//         ownerListingsDiv.innerHTML = listingsHtml;
//     }
// });

// // Function to delete a listing
// function deleteListing(index) {
//     const listings = JSON.parse(localStorage.getItem('studioListings')) || [];
//     const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

//     // Filter listings to get the ones belonging to the current user
//     const ownerListings = listings.filter(listing => listing.ownerEmail === loggedInUser.email);

//     if (index > -1 && index < ownerListings.length) {
//         // Get the email and name of the listing to be deleted
//         const listingToDelete = ownerListings[index];
        
//         // Filter out the listing to delete
//         const updatedListings = listings.filter(listing =>
//             !(listing.ownerEmail === listingToDelete.ownerEmail && listing.name === listingToDelete.name)
//         );
        
//         // Save the updated listings to localStorage
//         localStorage.setItem('studioListings', JSON.stringify(updatedListings));

//         // Reload the page to reflect the changes
//         window.location.reload();
//     } else {
//         alert('Invalid listing index.');
//     }
// }

// // Function to handle editing a listing
// function editListing(ownerEmail, listingName) {
//     window.location.href = `edit-listing.html?email=${ownerEmail}&name=${listingName}`;
// }

// view-listings.js

document.addEventListener('DOMContentLoaded', () => {
    const listingsContainer = document.getElementById('listingsContainer');
    const filterForm = document.getElementById('filterForm');

    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    function createListingElement(listing) {
        const listingDiv = document.createElement('div');
        listingDiv.className = 'listing';
        listingDiv.innerHTML = `
            <h3>${listing.name}</h3>
            <p><strong>Address:</strong> ${listing.address}</p>
            <p><strong>Type:</strong> ${listing.type}</p>
            <a href="studio-details.html?email=${listing.ownerEmail}&name=${listing.name}">View Details</a>
        `;

        if (loggedInUser && loggedInUser.role === 'owner' && listing.ownerEmail === loggedInUser.email) {
            listingDiv.innerHTML += `
                <a href="edit-listing.html?email=${listing.ownerEmail}&name=${listing.name}">Edit</a>
                <button class="delete-btn" data-email="${listing.ownerEmail}" data-name="${listing.name}">Delete</button>
            `;
        }

        return listingDiv;
    }

    function displayListings(listings) {
        listingsContainer.innerHTML = '';
        listings.forEach(listing => {
            const listingElement = createListingElement(listing);
            listingsContainer.appendChild(listingElement);
        });

        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const email = e.target.getAttribute('data-email');
                const name = e.target.getAttribute('data-name');
                deleteListing(email, name);
            });
        });
    }

    function filterListings(name, address, type) {
        const listings = JSON.parse(localStorage.getItem('studioListings')) || [];
        return listings.filter(listing => 
            (name === '' || listing.name.includes(name)) &&
            (address === '' || listing.address.includes(address)) &&
            (type === '' || listing.type.includes(type))
        );
    }

    filterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('filterName').value;
        const address = document.getElementById('filterAddress').value;
        const type = document.getElementById('filterType').value;
        const filteredListings = filterListings(name, address, type);
        displayListings(filteredListings);
    });

    function deleteListing(email, name) {
        let listings = JSON.parse(localStorage.getItem('studioListings')) || [];
        listings = listings.filter(listing => !(listing.ownerEmail === email && listing.name === name));
        localStorage.setItem('studioListings', JSON.stringify(listings));
        alert('Listing deleted successfully');
        displayListings(listings);
    }

    const allListings = JSON.parse(localStorage.getItem('studioListings')) || [];
    displayListings(allListings);
});
