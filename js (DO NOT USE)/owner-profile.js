document.addEventListener('DOMContentLoaded', () => {
    // Get the profile form element
    const profileForm = document.getElementById('profileForm');
    // Retrieve the logged-in user from local storage
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    // Check if no user is logged in
    if (!loggedInUser) {
        // Redirect to login page if no user is logged in
        window.location.href = 'login.html';
    } else if (loggedInUser.role !== 'owner') {
        // Redirect if the logged-in user is not an owner
        window.location.href = 'index.html';
    } else {
        // Populate profile form with logged-in user data
        document.getElementById('name').value = loggedInUser.name;
        document.getElementById('phone').value = loggedInUser.phone;
        document.getElementById('email').value = loggedInUser.email;
    }

    // Add event listener to the profile form for form submission
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

        // Display a success message
        alert('Profile updated successfully!');
    });
});
