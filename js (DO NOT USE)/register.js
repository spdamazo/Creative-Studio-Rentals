document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const role = document.getElementById('role').value;
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    const user = {
        role,
        name,
        phone,
        email,
        password
    };

    localStorage.setItem('user', JSON.stringify(user));
    alert('Registration successful!');
    window.location.href = 'login.html';
});
