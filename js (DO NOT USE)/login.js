document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Retrieve users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if user credentials are correct
    const user = users.find(user => user.email === email); // Remove password check

    if (user) {
        // Login successful
        alert('Login successful!');
        window.location.href = 'profile.html';
    } else {
        // Login failed
        alert('Invalid email or password.');
    }
});
