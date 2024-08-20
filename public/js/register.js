// Registration Page - new user registers

document.getElementById('registrationForm').addEventListener('submit', function(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Get the role, name, phone, and email input values from the form
    const role = document.getElementById('role').value;
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;

    // Create a new user object with the gathered data
    const newUser = {
        role,
        name,
        phone,
        email
    };

    // Send a POST request to the server with the new user data
    fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    })
    .then(response => response.json())  // Parse the JSON response from the server
    .then(data => {
        if (data.success) {
            // Show a success message and redirect to the login page
            alert('Registration successful!');
            window.location.href = 'login.html';
        } else {
            // Show an error message if registration failed
            alert('Error: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        // Show a generic error message if something goes wrong
        alert('An error occurred. Please try again later.');
    });
});
