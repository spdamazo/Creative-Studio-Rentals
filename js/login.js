document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;

    // Retrieve users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if user exists based on email
    const user = users.find(user => user.email === email);

    if (user) {

        // Save user data to localStorage for the session
        localStorage.setItem('loggedInUser', JSON.stringify(user));

        // Redirect based on user role
        if (user.role === 'owner') {
            window.location.href = 'owner-profile.html';
        } else if (user.role === 'renter') {
            window.location.href = 'renter-profile.html';
        } else {
            alert('User role is not recognized.');
        }
    } else {
        // Login failed
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
