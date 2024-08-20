// Renter's Profile Page - renter's profile page

document.addEventListener('DOMContentLoaded', () => {
    const profileForm = document.getElementById('profileForm');

    // Retrieve the logged-in user from local storage
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (!loggedInUser) {
        // Redirect to login page if no user is logged in
        window.location.href = 'login.html';
    } else if (loggedInUser.role !== 'renter') {
        // Redirect to home page if the logged-in user is not a renter
        window.location.href = 'index.html';
    } else {
        // Fetch user data from the server to ensure it's up-to-date
        fetch(`/api/users`)
            .then(response => response.json())  // Parse the JSON response
            .then(users => {
                // Find the logged-in user from the list of users
                const user = users.find(user => user.email === loggedInUser.email);

                if (user) {
                    // Populate profile form with logged-in user data
                    document.getElementById('name').value = user.name;
                    document.getElementById('phone').value = user.phone;
                    document.getElementById('email').value = user.email;
                } else {
                    // Alert and redirect if the user is not found
                    alert('User not found.');
                    window.location.href = 'login.html';
                }
            })
            .catch(error => {
                // Log error and alert user if there is an issue fetching user data
                console.error('Error fetching user data:', error);
                alert('An error occurred while fetching user data.');
            });

        // Handle profile form submission
        profileForm.addEventListener('submit', (e) => {
            e.preventDefault();  // Prevent the default form submission

            // Create an object with updated profile data
            const updatedProfile = {
                name: document.getElementById('name').value,
                phone: document.getElementById('phone').value,
                email: document.getElementById('email').value,
                role: loggedInUser.role
            };

            // Send the updated profile data to the server
            fetch('/api/update-profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedProfile)
            })
            .then(response => response.json())  // Parse the JSON response
            .then(data => {
                if (data.success) {
                    // Update the logged-in user data in local storage and show success message
                    localStorage.setItem('loggedInUser', JSON.stringify(updatedProfile));
                    alert('Profile updated successfully!');
                } else {
                    // Show an error message if the update fails
                    alert('Error: ' + data.message);
                }
            })
            .catch(error => {
                // Log error and show a user-friendly message if there is an issue updating the profile
                console.error('Error updating profile:', error);
                alert('An error occurred. Please try again later.');
            });
        });
    }
});

// Open owner information modal (if needed)
function viewOwnerDetails(ownerId) {
    // Fetch owner details from the server
    fetch(`/api/owners/${ownerId}`)
        .then(response => response.json())  // Parse the JSON response
        .then(ownerDetails => {
            // Populate the modal with owner details
            const modal = document.getElementById('owner-modal');
            const detailsDiv = document.getElementById('owner-details');
            detailsDiv.innerHTML = `
                <img src="${ownerDetails.photo}" alt="Owner Photo">
                <h3>${ownerDetails.name}</h3>
                <p>Email: ${ownerDetails.email}</p>
                <p>Phone: ${ownerDetails.phone}</p>
                <h4>Owned Studios</h4>
                <ul>
                    ${ownerDetails.studios.map(studio => `<li>${studio}</li>`).join('')}
                </ul>
            `;

            // Show the modal
            modal.style.display = "block";
        })
        .catch(error => {
            // Log error and alert user if there is an issue fetching owner details
            console.error('Error fetching owner details:', error);
            alert('An error occurred while fetching owner details.');
        });
}

// Close owner information modal (if needed)
function closeOwnerModal() {
    // Hide the modal
    const modal = document.getElementById('owner-modal');
    modal.style.display = "none";
}
