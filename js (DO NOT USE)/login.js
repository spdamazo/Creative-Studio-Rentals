document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser && storedUser.email === email && storedUser.password === password) {
        localStorage.setItem('loggedInUser', JSON.stringify(storedUser));
        alert('Login successful!');
        window.location.href = 'profile.html';
    } else {
        alert('Invalid email or password.');
    }
});
