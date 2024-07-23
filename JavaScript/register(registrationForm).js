//save element references by its unique IDs
const form = document.getElementById('registrationForm');
const name = document.getElementById('name');
const phone = document.getElementById('phone');
const email = document.getElementById('email');
const password = document.getElementById('password');

form.addEventListener('submit', e => {
    e.preventDefault(); // prevent form from submitting because we need to validate input first
    validateInputs();
});

// validation function, need to get the value of all input field
const validateInputs = () => {
    const nameValue = name.value.trim(); //using trim() method will REMOVE whitespaces
    const phoneValue = phone.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
};

// validation condition for each elements

if (nameValue === '') {

}