// document.addEventListener('DOMContentLoaded', () => {
//     const studioListContainer = document.getElementById('studioList');
//     const filterForm = document.getElementById('filterForm');
//     const showAllButton = document.getElementById('showAllButton');

//     function displayStudioListings(studioListings) {
//         studioListContainer.innerHTML = ''; // Clear the existing listings
//         studioListings.forEach(studio => {
//             const studioItem = document.createElement('div');
//             studioItem.className = 'listing-item';
//             studioItem.innerHTML = `
//                 <h3>${studio.name}</h3>
//                 <p>${studio.address}</p>
//                 <p>${studio.type}</p>
//                 <button class="view-details-button" data-id="${studio.id}">View Details</button>
//             `;
//             studioListContainer.appendChild(studioItem);
//         });
//     }

//     function filterStudioListings(event) {
//         event.preventDefault();

//         const nameFilter = document.getElementById('nameFilter').value.toLowerCase();
//         const addressFilter = document.getElementById('addressFilter').value.toLowerCase();
//         const typeFilter = document.getElementById('typeFilter').value.toLowerCase();

//         const allStudioListings = JSON.parse(localStorage.getItem('studioListings')) || [];
//         const filteredStudioListings = allStudioListings.filter(studio =>
//             (studio.name.toLowerCase().includes(nameFilter) || !nameFilter) &&
//             (studio.address.toLowerCase().includes(addressFilter) || !addressFilter) &&
//             (studio.type.toLowerCase().includes(typeFilter) || !typeFilter)
//         );

//         displayStudioListings(filteredStudioListings);
//     }

//     function redirectToDetailsPage(studioId) {
//         window.location.href = `studio-details.html?id=${studioId}`;
//     }

//     filterForm.addEventListener('submit', filterStudioListings);

//     showAllButton.addEventListener('click', () => {
//         const allStudioListings = JSON.parse(localStorage.getItem('studioListings')) || [];
//         displayStudioListings(allStudioListings);
//     });

//     studioListContainer.addEventListener('click', (event) => {
//         if (event.target.classList.contains('view-details-button')) {
//             const studioId = event.target.getAttribute('data-id');
//             redirectToDetailsPage(studioId);
//         }
//     });

//     // Display all studio listings on page load
//     showAllButton.click();
// });


// view-studios.js

document.addEventListener('DOMContentLoaded', () => {
    const studiosContainer = document.getElementById('studiosContainer');
    const filterForm = document.getElementById('filterForm');

    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    function createStudioElement(studio) {
        const studioDiv = document.createElement('div');
        studioDiv.className = 'studio';
        studioDiv.innerHTML = `
            <h3>${studio.name}</h3>
            <p><strong>Address:</strong> ${studio.address}</p>
            <p><strong>Type:</strong> ${studio.type}</p>
            <a href="studio-details.html?email=${studio.ownerEmail}&name=${studio.name}">View Details</a>
        `;

        if (loggedInUser && loggedInUser.role === 'owner' && studio.ownerEmail === loggedInUser.email) {
            studioDiv.innerHTML += `
                <a href="edit-studio.html?email=${studio.ownerEmail}&name=${studio.name}">Edit</a>
                <button class="delete-btn" data-email="${studio.ownerEmail}" data-name="${studio.name}">Delete</button>
            `;
        }

        return studioDiv;
    }

    function displayStudios(studios) {
        studiosContainer.innerHTML = '';
        studios.forEach(studio => {
            const studioElement = createStudioElement(studio);
            studiosContainer.appendChild(studioElement);
        });

        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const email = e.target.getAttribute('data-email');
                const name = e.target.getAttribute('data-name');
                deleteStudio(email, name);
            });
        });
    }

    function filterStudios(name, address, type) {
        const studios = JSON.parse(localStorage.getItem('studioListings')) || [];
        return studios.filter(studio => 
            (name === '' || studio.name.includes(name)) &&
            (address === '' || studio.address.includes(address)) &&
            (type === '' || studio.type.includes(type))
        );
    }

    filterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('filterName').value;
        const address = document.getElementById('filterAddress').value;
        const type = document.getElementById('filterType').value;
        const filteredStudios = filterStudios(name, address, type);
        displayStudios(filteredStudios);
    });

    function deleteStudio(email, name) {
        let studios = JSON.parse(localStorage.getItem('studioListings')) || [];
        studios = studios.filter(studio => !(studio.ownerEmail === email && studio.name === name));
        localStorage.setItem('studioListings', JSON.stringify(studios));
        alert('Studio deleted successfully');
        displayStudios(studios);
    }

    const allStudios = JSON.parse(localStorage.getItem('studioListings')) || [];
    displayStudios(allStudios);
});
