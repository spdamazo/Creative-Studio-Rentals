document.addEventListener('DOMContentLoaded', () => {
    const profileForm = document.getElementById('profileForm');
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (!loggedInUser) {
        // Redirect to login page if no user is logged in
        window.location.href = 'login.html';
        return;
    } 
    
    if (loggedInUser.role !== 'renter') {
        // Redirect if the logged-in user is not a renter
        window.location.href = 'index.html';
        return;
    } 
    
    // Populate profile form with logged-in user data
    document.getElementById('name').value = loggedInUser.name;
    document.getElementById('phone').value = loggedInUser.phone;
    document.getElementById('email').value = loggedInUser.email;

    profileForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const updatedProfile = {
            name: document.getElementById('name').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            email: document.getElementById('email').value.trim(),
            role: loggedInUser.role // Ensure the role remains the same
        };

        // Simple validation to check if the fields are not empty
        if (!updatedProfile.name || !updatedProfile.phone || !updatedProfile.email) {
            alert('All fields are required.');
            return;
        }

        // Update the user data in localStorage
        let users = JSON.parse(localStorage.getItem('users')) || [];
        users = users.map(user => user.email === loggedInUser.email ? updatedProfile : user);
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('loggedInUser', JSON.stringify(updatedProfile));

        alert('Profile updated successfully!');
    });
});