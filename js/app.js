let users = [];
let listings = [];

document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registrationForm');
    const loginForm = document.getElementById('loginForm');
    const profileForm = document.getElementById('profileForm');

    if (registrationForm) {
        registrationForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            const role = document.getElementById('role').value;
            const newUser = { name, phone, email, role };
            users.push(newUser);
            alert('Account created successfully!');
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const email = document.getElementById('email').value;
            const user = users.find(u => u.email === email);
            if (user) {
                alert('Logged in successfully!');
            } else {
                alert('User not found!');
            }
        });
    }

    if (profileForm) {
        profileForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            // Assume current user is the first user for demonstration purposes
            users[0].name = name;
            users[0].phone = phone;
            users[0].email = email;
            alert('Profile updated successfully!');
        });
    }
});
