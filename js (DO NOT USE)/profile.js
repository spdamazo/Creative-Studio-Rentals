document.addEventListener('DOMContentLoaded', function() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (!loggedInUser) {
        alert('You are not logged in.');
        window.location.href = 'login.html';
    } else {
        document.getElementById('name').value = loggedInUser.name;
        document.getElementById('phone').value = loggedInUser.phone;
        document.getElementById('email').value = loggedInUser.email;
    }
});

document.getElementById('profileForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;

    const updatedUser = {
        ...JSON.parse(localStorage.getItem('loggedInUser')),
        name,
        phone,
        email
    };

    localStorage.setItem('loggedInUser', JSON.stringify(updatedUser));
    localStorage.setItem('user', JSON.stringify(updatedUser));
    alert('Profile updated successfully!');
});
