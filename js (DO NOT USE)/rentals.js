document.getElementById('filterForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const type = document.getElementById('type').value;
    const capacity = document.getElementById('capacity').value;

    const listings = JSON.parse(localStorage.getItem('listings')) || [];
    const filteredListings = listings.filter(listing => 
        (type ? listing.type === type : true) &&
        (capacity ? listing.capacity >= capacity : true)
    );

    document.getElementById('studioList').innerHTML = filteredListings.map(listing => `<div>${listing.name}</div>`).join('');
});
