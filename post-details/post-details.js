// Отримуємо параметр з URL, який містить ID поточного поста
const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id');

const postDetailsContainer = document.getElementById('postDetails');
const commentsContainer = document.createElement('div'); // Створюємо контейнер для коментарів

// Функція для відображення інформації про пост
function displayPostDetails() {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        .then(response => response.json())
        .then(post => {
            postDetailsContainer.innerHTML = ''; // Очищаємо контейнер перед відображенням нових даних
            displayPostData(post, postDetailsContainer); // Викликаємо функцію для відображення інформації про пост

            // Після відображення інформації про пост викликаємо функцію для відображення коментарів
            displayPostComments();
        })
        .catch(error => console.error('Помилка отримання інформації про пост:', error));
}

// Функція для відображення коментарів до поста
function displayPostComments() {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
        .then(response => response.json())
        .then(comments => {
            // Очищаємо контейнер для коментарів перед виведенням нових коментарів
            commentsContainer.innerHTML = '';
// Створюємо обгортку для всіх коментарів
            const commentsWrapper = document.createElement('div');
            commentsWrapper.classList.add('post-comments-wrapper');

            comments.forEach(comment => {
                const commentBlock = document.createElement('div');
                commentBlock.classList.add('post-comment');

                const commentName = document.createElement('h4');
                commentName.textContent = comment.name;

                const commentEmail = document.createElement('p');
                // commentEmail.textContent = comment.email;

                const commentBody = document.createElement('p');
                commentBody.textContent = comment.body;

                commentBlock.appendChild(commentName);
                commentBlock.appendChild(commentEmail);
                commentBlock.appendChild(commentBody);

                // Додаємо кожен коментар до обгортки для всіх коментарів
                commentsWrapper.appendChild(commentBlock);
            });

// Додаємо обгортку з коментарями до DOM
            postDetailsContainer.appendChild(commentsWrapper);

        })
        .catch(error => console.error('Помилка отримання коментарів до поста:', error));
}

// Функція для відображення інформації про пост
function displayPostData(post, parentElement) {
    const postDetails = document.createElement('div');

    for (const key in post) {
        const listItem = document.createElement('div');
        listItem.classList.add('post-data-item');

        const itemText = document.createElement('span');
        itemText.textContent = `${key}:`;

        const valueItem = document.createElement('span');
        valueItem.textContent = post[key];

        listItem.appendChild(itemText);
        listItem.appendChild(valueItem);
        postDetails.appendChild(listItem);
    }

    parentElement.appendChild(postDetails);
}

// Викликаємо функцію для відображення інформації про пост при завантаженні сторінки
displayPostDetails();
