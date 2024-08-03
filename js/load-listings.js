// Embedded in html line 80

document.addEventListener("DOMContentLoaded", function() {
    let container = document.getElementById('listing-container');

    let titles = ["Two Park Central", "City Tower", "Greenwood Apartments"];
    let addresses = ["1111 4 St SW, Calgary, AB T2R 1N2", "22 Main St, Vancouver, BC V6B 1P2", "555 Queen St, Toronto, ON M5V 2B6"];
    let features = ["Swimming pool | Fitness center | Storage", "Gym | Rooftop Terrace | Parking", "Garden | Library | Conference Room"];
    let prices = ["$1,799–$1,824", "$2,300–$2,500", "$1,200–$1,400"];
    let picturs = ["https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "https://plus.unsplash.com/premium_photo-1679079455767-1bbb40492d6a?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"];

    for (let i = 0; i < 3; i++) {
        // Create the elements
        let listbox = document.createElement('div');
        listbox.classList.add('listbox');

        let img = document.createElement('img');
        img.src = picturs[i];
        img.alt = "Listing Image";
        img.classList.add('listing-image');

        let listingDetails = document.createElement('div');
        listingDetails.classList.add('listing-details');

        let listingTitle = document.createElement('h3');
        listingTitle.classList.add('listing-title');
        listingTitle.textContent = titles[i];

        let listingInfo1 = document.createElement('p');
        listingInfo1.classList.add('listing-info');
        listingInfo1.textContent = addresses[i];

        let listingInfo2 = document.createElement('p');
        listingInfo2.classList.add('listing-info');
        listingInfo2.textContent = features[i];

        let listingPrice = document.createElement('p');
        listingPrice.classList.add('listing-price');
        listingPrice.textContent = prices[i];

        let btn = document.createElement('div');
        btn.classList.add('btn');
        btn.textContent = "Check availability";

        // Append the elements
        listingDetails.appendChild(listingTitle);
        listingDetails.appendChild(listingInfo1);
        listingDetails.appendChild(listingInfo2);
        listingDetails.appendChild(listingPrice);
        listingDetails.appendChild(btn);

        listbox.appendChild(img);
        listbox.appendChild(listingDetails);

        container.appendChild(listbox);
    }
});