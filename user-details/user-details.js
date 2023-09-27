// Отримуємо параметр з URL, який містить ID поточного користувача
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('id');

const userDetailsContainer = document.getElementById('userDetails');
const userPostsContainer = document.getElementById('userPosts');
const showPostsButton = document.getElementById('showPostsButton');

// Функція для відображення інформації про користувача
function displayUserDetails() {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then(response => response.json())
        .then(user => {
            userDetailsContainer.innerHTML = ''; // Очищаємо контейнер перед відображенням нових даних
            displayUserData(user, userDetailsContainer); // Викликаємо функцію для відображення всієї інформації
        })
        .catch(error => console.error('Помилка отримання інформації про користувача:', error));
}

// Функція для відображення постів користувача
function displayUserPosts() {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
        .then(response => response.json())
        .then(posts => {
            userPostsContainer.innerHTML = ''; // Очищаємо контейнер перед відображенням нових даних
            posts.forEach(post => {
                const postBlock = document.createElement('div');
                postBlock.classList.add('user-post-block');

                const postTitle = document.createElement('h3');
                postTitle.textContent = post.title;

                const viewPostButton = document.createElement('button');
                viewPostButton.textContent = 'View Post';
                viewPostButton.classList.add('details-button_post'); // Додамо клас для стилізації кнопки

                // Додаємо обробник події для кнопки "Деталі"
               viewPostButton.addEventListener('click', () => {
                   // Перенаправляємо на сторінку з деталями користувача
                   window.location.href = `../post-details/post-details.html?id=${post.id}`;
               });
                postBlock.appendChild(postTitle);
                postBlock.appendChild(viewPostButton);

                userPostsContainer.appendChild(postBlock);

                });
            })
        .catch(error => console.error('Помилка отримання постів користувача:', error));
}

// Функція для відображення даних користувача
function displayUserData(user, parentElement) {
    for (const key in user) {
        const listItem = document.createElement('div');
        listItem.classList.add('user-data-item');

        const itemText = document.createElement('span');
        itemText.textContent = `${key}:`;

        if (typeof user[key] === 'object' && user[key] !== null) {
            const nestedList = document.createElement('div');
            nestedList.classList.add('user-nested-list');
            displayNestedData(user[key], nestedList); // Викликаємо функцію для обробки вкладених об'єктів
            listItem.appendChild(itemText);
            listItem.appendChild(nestedList);
        } else {
            const valueItem = document.createElement('span');
            valueItem.textContent = user[key];
            listItem.appendChild(itemText);
            listItem.appendChild(valueItem);
        }

        parentElement.appendChild(listItem);
    }
}

// Функція для відображення вкладених даних
function displayNestedData(data, parentElement) {
    for (const key in data) {
        const listItem = document.createElement('div');
        listItem.classList.add('user-nested-item');

        const itemText = document.createElement('span');
        itemText.textContent = `${key}:`;

        if (typeof data[key] === 'object' && data[key] !== null) {
            const nestedList = document.createElement('div');
            nestedList.classList.add('user-nested-list');
            displayNestedData(data[key], nestedList); // Рекурсивно викликаємо для вкладених об'єктів
            listItem.appendChild(itemText);
            listItem.appendChild(nestedList);
        } else {
            const valueItem = document.createElement('span');
            valueItem.textContent = data[key];
            listItem.appendChild(itemText);
            listItem.appendChild(valueItem);
        }

        parentElement.appendChild(listItem);
    }
}

// Додамо обробник події для кнопки "Post of current user"
showPostsButton.addEventListener('click', () => {
    displayUserPosts();
});

// Виведемо інформацію про користувача при завантаженні сторінки
displayUserDetails();
