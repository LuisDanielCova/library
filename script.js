let myLibrary = [];

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function(){
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
}

function addBookToLibrary(title, author, pages, read){
    let newBook = new Book (title, author, pages, read);
    myLibrary.push(newBook);
}

addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, true);
addBookToLibrary('Strip Jack', 'Ian Rankin', 299, false);

//Display the form
let modal = document.getElementById(`myModal`);
let btn = document.getElementById(`openForm`);
let span = document.getElementsByClassName(`close`)[0];

btn.addEventListener(`click`, () => modal.style.display = `block`);
span.addEventListener(`click`, () => modal.style.display = `none`);

//Display the table
function displayTable(){
    let index = 0;
    myLibrary.forEach(book => {
        let tbody = document.querySelector(`.books`);
        let tr = document.createElement(`tr`);
        tr.classList = `rows`;
        let indexTd = document.createElement(`td`);
        indexTd.textContent = ++index;
        tr.appendChild(indexTd);
        for(let i = 0; i<4; i++){
            let td = document.createElement(`td`);
            switch(i){
                case 0:
                    td.textContent = book.title;
                    break;
                case 1:
                    td.textContent = book.author;
                    break;
                case 2:
                    td.textContent = book.pages;
                    break;
                case 3:
                    let readBtn = document.createElement(`button`);
                    readBtn.textContent = book.read;
                    readBtn.classList = `readBtn`;
                    readBtn.addEventListener(`click`, changeReadStatus);
                    td.appendChild(readBtn);
                    break;
            }
            tr.appendChild(td);
        }
        tr = addDeleteBtn(tr);
        tbody.appendChild(tr);
    });
}

//Delete a Book
function addDeleteBtn(tr){
    let deleteBtn = document.createElement(`button`);
    deleteBtn.textContent = `Delete book`;
    deleteBtn.classList = `deleteBtn`;
    deleteBtn.addEventListener(`click`, deleteBook);
    let deleteTd = document.createElement(`td`);
    deleteTd.appendChild(deleteBtn);
    tr.appendChild(deleteTd);
    return tr;
}

function deleteBook(){
    let index = getIndexOfBook(this);
    myLibrary.splice(index-1, 1);
    refreshTable();
}

//Change the read status of a book
function changeReadStatus(){
    let index = getIndexOfBook(this);
    (this.textContent === `true`) ? this.textContent = false : this.textContent = true;
    myLibrary[index-1].read = this.textContent;
}

function getIndexOfBook(obj){
    let tr = obj.parentNode.parentNode;
    return +tr.firstElementChild.textContent;
}

function deleteTable(){
    let rows = document.querySelectorAll(`.rows`);
    rows.forEach(row => row.remove());
}


//Add a new book
let addNewBookBtn = document.getElementById(`addNewBook`);
addNewBookBtn.addEventListener(`click`, addNewBook);

function addNewBook(){
    let title = document.getElementById(`bookTitle`).value;
    let author = document.getElementById(`bookAuthor`).value;
    let pages = document.getElementById(`bookPages`).value;
    let read = document.getElementById(`readCheck`).checked;
    addBookToLibrary(title, author, pages, read);
    refreshFrom();
    refreshTable();
}

function refreshTable(){
    deleteTable();
    displayTable();
}

function refreshFrom(){
    let title = document.getElementById(`bookTitle`);
    let author = document.getElementById(`bookAuthor`);
    let pages = document.getElementById(`bookPages`);
    let read = document.getElementById(`readCheck`);
    title.value = author.value = pages.value = ``;
    read.checked = false;
}

displayTable();