// Отримуємо посилання на елемент з ідентифікатором 'userList' з HTML
const userList = document.getElementById('userList');

// Функція для отримання та відображення списку користувачів
function getUsers() {
    // Отримуємо дані з сервера за допомогою Fetch API
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json()) // Перетворюємо відповідь у форматі JSON
        .then(users => {
            users.forEach(user => {
                // Створюємо блок для кожного користувача
                const userBlock = document.createElement('div');
                userBlock.classList.add('user-block'); // Додамо клас для стилізації

                // Створюємо кнопку "Деталі" як посилання на сторінку з деталями користувача
                const detailsButton = document.createElement('button');
                detailsButton.textContent = 'Деталі';
                detailsButton.classList.add('details-button'); // Додамо клас для стилізації кнопки

                // Додаємо обробник події для кнопки "Деталі"
                detailsButton.addEventListener('click', () => {
                    // Перенаправляємо на сторінку з деталями користувача
                    window.location.href = `../user-details/user-details.html?id=${user.id}`;
                });

                // Створюємо елемент для відображення імені та ID користувача
                const userName = document.createElement('p');
                userName.textContent = `ID: ${user.id}, Name: ${user.name}`;
                userName.classList.add('user-name'); // Додамо клас для стилізації імені

                // Додаємо елементи до блоку користувача
                userBlock.appendChild(userName);
                userBlock.appendChild(detailsButton);

                // Додаємо блок користувача до контейнера списку користувачів
                userList.appendChild(userBlock);
            });
        })
        .catch(error => console.error('Помилка отримання користувачів:', error));
}

// Викликаємо функцію для отримання та відображення користувачів
getUsers();
