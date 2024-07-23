document.addEventListener('DOMContentLoaded', () => {
    const studioList = document.getElementById('studioList');
    const studioDetails = document.getElementById('studioDetails');
    const filterButton = document.getElementById('filterButton');
    const showAllButton = document.getElementById('showAllButton');
    const nameFilter = document.getElementById('nameFilter');
    const addressFilter = document.getElementById('addressFilter');
    const typeFilter = document.getElementById('typeFilter');

    // Function to render studios in the list
    function renderStudios(studios) {
        studioList.innerHTML = '';
        studios.forEach(studio => {
            const listItem = document.createElement('li');
            listItem.textContent = studio.name;
            listItem.style.cursor = 'pointer';
            listItem.addEventListener('click', () => {
                showStudioDetails(studio);
            });
            studioList.appendChild(listItem);
        });
    }

    // Function to show details of a selected studio
    function showStudioDetails(studio) {
        document.getElementById('studioName').textContent = studio.name;
        document.getElementById('studioAddress').textContent = studio.address;
        document.getElementById('studioType').textContent = studio.type;
        document.getElementById('studioDescription').textContent = studio.description;
        document.getElementById('ownerName').textContent = studio.owner.name;
        document.getElementById('ownerPhone').textContent = studio.owner.phone;
        document.getElementById('ownerEmail').textContent = studio.owner.email;
        studioDetails.style.display = 'block';
    }

    // Function to filter studios based on input fields
    function filterStudios() {
        const name = nameFilter.value.toLowerCase();
        const address = addressFilter.value.toLowerCase();
        const type = typeFilter.value.toLowerCase();

        const allStudios = JSON.parse(localStorage.getItem('studios')) || [];
        const filteredStudios = allStudios.filter(studio => 
            (!name || studio.name.toLowerCase().includes(name)) &&
            (!address || studio.address.toLowerCase().includes(address)) &&
            (!type || studio.type.toLowerCase().includes(type))
        );

        renderStudios(filteredStudios);
    }

    // Function to show all studios
    function showAllStudios() {
        const allStudios = JSON.parse(localStorage.getItem('studios')) || [];
        renderStudios(allStudios);
        studioDetails.style.display = 'none'; // Hide studio details
    }

    // Add event listener to filter button
    filterButton.addEventListener('click', filterStudios);

    // Add event listener to show all button
    showAllButton.addEventListener('click', showAllStudios);

    // Initial render of all studios
    showAllStudios();
});
