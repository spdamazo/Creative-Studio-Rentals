// Login page - existing user logs in

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', function(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Get the email input value from the form
    const email = document.getElementById('email').value;

    // Send a GET request to the server to fetch the list of users
    fetch('/api/users')
        .then(response => response.json())
        .then(users => {
            // Check if a user exists with the provided email
            const user = users.find(user => user.email === email);

            // If a user with the email is found
            if (user) {
                // Save the logged-in user's data to localStorage for the session
                localStorage.setItem('loggedInUser', JSON.stringify(user));

                // Redirect the user based on their role
                if (user.role === 'owner') {
                    window.location.href = 'owner-profile.html'; // Redirect to owner profile page
                } else if (user.role === 'renter') {
                    window.location.href = 'renter-profile.html'; // Redirect to renter profile page
                } else {
                    alert('User role is not recognized.'); // Handle unrecognized user roles
                }
            } else {
                // If no user with the provided email is found, show an error message
                alert('Invalid email.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        });
});
