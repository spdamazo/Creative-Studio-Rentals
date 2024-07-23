// registrationForm.js

document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const role = document.getElementById('role').value;
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;

    // Retrieve existing users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if user already exists
    const userExists = users.some(user => user.email === email);

    if (userExists) {
        alert('User already exists with this email!');
    } else {
        // If user does not exist, create new user and save to localStorage
        const newUser = {
            role,
            name,
            phone,
            email,
            password
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        alert('Registration successful!');
        window.location.href = 'login.html';
    }
});
