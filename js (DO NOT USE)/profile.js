// profile.js

document.addEventListener('DOMContentLoaded', () => {
    const profileForm = document.getElementById('profileForm');
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (!loggedInUser) {
        // Redirect to login page if no user is logged in
        window.location.href = 'login.html';
    } else if (loggedInUser.role !== 'owner') {
        // Redirect if the logged-in user is not an owner
        window.location.href = 'index.html';
    } else {
        // Populate profile form with logged-in user data
        document.getElementById('name').value = loggedInUser.name;
        document.getElementById('phone').value = loggedInUser.phone;
        document.getElementById('email').value = loggedInUser.email;
    }

    profileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const updatedProfile = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            role: loggedInUser.role
        };

        localStorage.setItem('loggedInUser', JSON.stringify(updatedProfile));
        alert('Profile updated successfully!');
    });
    
    if (loggedInUser.role === 'owner') {
        document.getElementById('ownerLinks').style.display = 'block';
    }
});
