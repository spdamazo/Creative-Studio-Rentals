// Add these functions to the existing `renter-profile.js`

// Function to show the popup modal
function showPopupModal() {
    const modal = document.getElementById('popup-modal');
    modal.style.display = "block";
}

// Function to close the popup modal
function closePopupModal() {
    const modal = document.getElementById('popup-modal');
    modal.style.display = "none";
}

// Modify the form submission event listener to use the popup modal
profileForm.addEventListener('submit', (e) => {
    // Prevent default form submission behavior
    e.preventDefault();

    // Create an updated profile object with the new values from the form
    const updatedProfile = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        role: loggedInUser.role // Ensure the role remains the same
    };

    // Retrieve the list of users from local storage
    let users = JSON.parse(localStorage.getItem('users')) || [];
    // Update the user data in the list of users
    users = users.map(user => user.email === loggedInUser.email ? updatedProfile : user);
    // Save the updated list of users to local storage
    localStorage.setItem('users', JSON.stringify(users));
    // Update the logged-in user data in local storage
    localStorage.setItem('loggedInUser', JSON.stringify(updatedProfile));

    // Show the popup modal
    showPopupModal();
});