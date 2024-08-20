// Owner's Profile Page - owner's profile page

document.addEventListener('DOMContentLoaded', () => {
    const profileForm = document.getElementById('profileForm');

    // Retrieve the logged-in user from local storage
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    // Redirect to login page if no user is logged in
    if (!loggedInUser) {
        window.location.href = 'login.html';
    } 
    // Redirect to home page if the logged-in user is not an owner
    else if (loggedInUser.role !== 'owner') {
        window.location.href = 'index.html';
    } 
    // If the user is an owner, proceed with fetching and displaying user data
    else {
        // Fetch user data from the server to ensure it's up-to-date
        fetch(`/api/users`)
            .then(response => response.json())
            .then(users => {
                // Find the logged-in user from the list of users
                const user = users.find(user => user.email === loggedInUser.email);

                // Populate profile form with logged-in user data if user is found
                if (user) {
                    document.getElementById('name').value = user.name;
                    document.getElementById('phone').value = user.phone;
                    document.getElementById('email').value = user.email;
                } else {
                    alert('User not found.');
                    window.location.href = 'login.html';
                }
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
                alert('An error occurred while fetching user data.');
            });

        // Handle form submission for profile updates
        profileForm.addEventListener('submit', (e) => {
            e.preventDefault();

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
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Update the logged-in user data in local storage
                    localStorage.setItem('loggedInUser', JSON.stringify(updatedProfile));
                    alert('Profile updated successfully!');
                } else {
                    alert('Error: ' + data.message);
                }
            })
            .catch(error => {
                console.error('Error updating profile:', error);
                alert('An error occurred. Please try again later.');
            });
        });
    }
});

// Open owner information modal
function viewOwnerDetails(ownerId) {
    fetch(`/api/owners/${ownerId}`)
        .then(response => response.json())
        .then(ownerDetails => {
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

            modal.style.display = "block";
        })
        .catch(error => {
            console.error('Error fetching owner details:', error);
            alert('An error occurred while fetching owner details.');
        });
}

// Close owner information modal
function closeOwnerModal() {
    const modal = document.getElementById('owner-modal');
    modal.style.display = "none";
}
