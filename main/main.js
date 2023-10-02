// Common class names for styling
const commonValueClass = 'data-value';

// Get a reference to the user list container element from the HTML
const userList = document.getElementById('userList');

// Function to fetch and display the list of users
function getUsers() {
    // Fetch user data from the server using the Fetch API
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json()) // Convert the response to JSON format
        .then(users => {
            users.forEach(user => {
                // Create a block to represent each user
                const userBlock = document.createElement('div');
                userBlock.classList.add('user-block'); // Apply a class for styling

                // Create a "Details" button for each user to navigate to their details page
                const detailsButton = document.createElement('button');
                detailsButton.textContent = 'Details';
                detailsButton.classList.add('details-button'); // Apply a class for styling the button

                // Add an event listener to handle clicking the "Details" button
                detailsButton.addEventListener('click', () => {
                    // Redirect to the user details page with the user's ID as a parameter
                    window.location.href = `../user-details/user-details.html?id=${user.id}`;
                });

                // Create elements to display the user's ID and name
                const userId = document.createElement('p');
                userId.textContent = `№ ${user.id}`;
                userId.classList.add(commonValueClass); // Apply a common class for styling values

                const userName = document.createElement('p');
                userName.textContent = `Name - ${user.name}`;
                userName.classList.add(commonValueClass); // Apply a common class for styling values

                // Append elements to the user block
                userBlock.appendChild(userId);
                userBlock.appendChild(userName);
                userBlock.appendChild(detailsButton);

                // Add the user block to the user list container
                userList.appendChild(userBlock);
            });
        })
        .catch(error => console.error('Error fetching users:', error));
}

// Call the function to fetch and display the list of users
getUsers();
