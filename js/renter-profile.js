document.addEventListener('DOMContentLoaded', () => {
    // Get the profile form element and the logged-in user data from localStorage
    const profileForm = document.getElementById('profileForm');
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    // If no user is logged in, redirect to the login page
    if (!loggedInUser) {
        window.location.href = 'login.html';
        return;
    }

    // If the logged-in user is not a renter, redirect to the index page
    if (loggedInUser.role !== 'renter') {
        window.location.href = 'index.html';
        return;
    }

    // Populate the profile form fields with the logged-in user data
    document.getElementById('name').value = loggedInUser.name;
    document.getElementById('phone').value = loggedInUser.phone;
    document.getElementById('email').value = loggedInUser.email;

    // Add an event listener to handle form submission
    profileForm.addEventListener('submit', (e) => {
        // Prevent the default form submission behavior
        e.preventDefault();

        // Get the updated profile data from the form fields
        const updatedProfile = {
            name: document.getElementById('name').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            email: document.getElementById('email').value.trim(),
            role: loggedInUser.role // Ensure the role remains the same
        };

        // Simple validation to check if the fields are not empty
        if (!updatedProfile.name || !updatedProfile.phone || !updatedProfile.email) {
            alert('All fields are required.');
            return;
        }

        // Retrieve the list of users from localStorage, or an empty array if none exist
        let users = JSON.parse(localStorage.getItem('users')) || [];

        // Update the user data in the users array
        users = users.map(user => user.email === loggedInUser.email ? updatedProfile : user);

        // Save the updated users array and the updated profile to localStorage
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('loggedInUser', JSON.stringify(updatedProfile));

        // Show a success message
        alert('Profile updated successfully!');
    });
});
