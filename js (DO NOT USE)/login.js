document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;

    // Retrieve users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if user exists based on email
    const user = users.find(user => user.email === email);

    if (user) {
        // Login successful
        alert('Login successful!');
        window.location.href = 'profile.html';
    } else {
        // Login failed
        alert('Invalid email.');
    }
});
