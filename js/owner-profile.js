document.addEventListener('DOMContentLoaded', () => {
  // Get the profile form element
  const profileForm = document.getElementById('profileForm');
  // Retrieve the logged-in user from local storage
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  // Check if no user is logged in
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

  // Add event listener to the profile form for form submission
  profileForm.addEventListener('submit', (e) => {
      // Prevent default form submission behavior
      e.preventDefault();

      // Create an updated profile object with the new values from the form
      const updatedProfile = {
          name: document.getElementById('name').value,
          phone: document.getElementById('phone').value,
          email: document.getElementById('email').value,
          role: loggedInUser.role // Ensure the role remains the same
      };

      // Retrieve the list of users from local storage
      let users = JSON.parse(localStorage.getItem('users')) || [];
      // Update the user data in the list of users
      users = users.map(user => user.email === loggedInUser.email ? updatedProfile : user);
      // Save the updated list of users to local storage
      localStorage.setItem('users', JSON.stringify(users));

      // Update the logged-in user data in local storage
      localStorage.setItem('loggedInUser', JSON.stringify(updatedProfile));

      // Retrieve the list of studio listings from local storage
      let studios = JSON.parse(localStorage.getItem('studioListings')) || [];
      // Update all studios owned by the previous email
      studios = studios.map(studio => 
          studio.ownerEmail === loggedInUser.email 
          ? { ...studio, ownerName: updatedProfile.name, ownerEmail: updatedProfile.email, ownerPhone: updatedProfile.phone } 
          : studio
      );
      // Save the updated list of studios to local storage
      localStorage.setItem('studioListings', JSON.stringify(studios));

      // Display a success message
      alert('Profile updated successfully!');
  });
});

// Open owner information modal
function viewOwnerDetails(ownerId) {
// Fetch owner details based on ownerId
const ownerDetails = getOwnerDetailsById(ownerId);

// Populate modal with owner details
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

// Show modal
modal.style.display = "block";
}

// Close owner information modal
function closeOwnerModal() {
const modal = document.getElementById('owner-modal');
modal.style.display = "none";
}

// Sample function to fetch owner details (replace with actual data fetching logic)
function getOwnerDetailsById(ownerId) {
// This is just a sample data. Replace this with actual data fetching logic.
return {
  photo: 'owner-photo.jpg',
  name: 'Sample Owner',
  email: 'owner@example.com',
  phone: '123-456-7890',
  studios: ['Studio 1', 'Studio 2']
};
}
