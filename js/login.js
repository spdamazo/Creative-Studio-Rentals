document.getElementById('loginForm').addEventListener('submit', function(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Get the email input value from the form
    const email = document.getElementById('email').value;

    // Retrieve the list of users from localStorage, or an empty array if none exist
    const users = JSON.parse(localStorage.getItem('users')) || [];

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
});

document.addEventListener('DOMContentLoaded', function() {
    const loginLogoutLink = document.getElementById('loginLogoutLink');
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (loggedInUser) {
        if (user.role === 'owner') {
            window.location.href = 'owner-profile.html';
            loginLogoutLink.textContent = 'Logout';
            loginLogoutLink.href = '#';
            loginLogoutLink.addEventListener('click', function() {
                localStorage.removeItem('loggedInUser');
                window.location.href = 'login.html';
            });
        } else if (user.role === 'renter') {
            window.location.href = 'renter-profile.html';
            loginLogoutLink.textContent = 'Logout';
            loginLogoutLink.href = '#';
            loginLogoutLink.addEventListener('click', function() {
                localStorage.removeItem('loggedInUser');
                window.location.href = 'login.html';
            });
        } else {
            alert('User role is not recognized.');
        }

    }
});

// Update the login/logout link based on the user's login state
document.addEventListener('DOMContentLoaded', function() {
    const loginLogoutLink = document.getElementById('loginLogoutLink');
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (loggedInUser) {
        // If user is logged in, update the link to show "Logout"
        loginLogoutLink.textContent = 'Logout';
        loginLogoutLink.href = '#';
        loginLogoutLink.addEventListener('click', function() {
            localStorage.removeItem('loggedInUser'); // Remove the logged-in user's data
            window.location.href = 'login.html'; // Redirect to login page
        });
    } else {
        // If user is not logged in, set the link to "Login"
        loginLogoutLink.textContent = 'Login';
        loginLogoutLink.href = 'login.html';
    }
});