document.getElementById('registrationForm').addEventListener('submit', function(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Get the role, name, phone, and email input values from the form
    const role = document.getElementById('role').value;
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;

    // Retrieve the list of existing users from localStorage, or an empty array if none exist
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if a user already exists with the provided email
    const userExists = users.some(user => user.email === email);

    // If a user with the email already exists, show an error message
    if (userExists) {
        alert('User already exists with this email!');
    } else {
        // If no user with the email exists, create a new user object
        const newUser = {
            role,
            name,
            phone,
            email
        };

        // Add the new user to the users array
        users.push(newUser);

        // Save the updated users array to localStorage
        localStorage.setItem('users', JSON.stringify(users));

        // Show a success message and redirect to the login page
        alert('Registration successful!');
        window.location.href = 'login.html';
    }
});
