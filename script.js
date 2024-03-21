const addBookForm = document.getElementById('addBookForm');
const searchInput = document.getElementById('searchInput');
const bookList = document.getElementById('bookList');
const noResultsMessage = document.createElement('div');
noResultsMessage.classList.add('no-results');
noResultsMessage.textContent = 'No books found matching your search criteria. Please try again.';

let books = []; 

addBookForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const genre = document.getElementById('genre').value;

    if (title && author && pages && genre) {
        const book = { title, author, pages, genre };
        books.push(book);
        renderBooks();
        addBookForm.reset();
    } else {
        alert('Please fill in all fields.');
    }
});

searchInput.addEventListener('input', function() {
    const searchValue = searchInput.value.toLowerCase();
    renderBooks(searchValue);
});

function renderBooks(searchValue = '') {
    bookList.innerHTML = '';
    noResultsMessage.style.display = 'none';

    const filteredBooks = searchValue
        ? books.filter(book => book.title.toLowerCase().includes(searchValue))
        : books;

    if (filteredBooks.length === 0) {
        bookList.appendChild(noResultsMessage);
        noResultsMessage.style.display = 'block';
    } else {
        filteredBooks.forEach(book => {
            const bookElement = document.createElement('div');
            bookElement.classList.add('book');
            bookElement.innerHTML = `<h3>${book.title}</h3><p>Author: ${book.author}</p><p>Pages: ${book.pages}</p><p>Genre: ${book.genre}</p>`;
            bookList.appendChild(bookElement);
        });
    }
}