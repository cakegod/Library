"use strict";

let myLibrary = [];
const form = document.querySelector(".form");
const bookWrapper = document.getElementById("book-wrapper");
const close = document.querySelector(".close");
const addBookButton = document.querySelector(".plus-icon");
let bookNumber = 0;

addBookButton.addEventListener("click", () => form.classList.add("active"));
close.addEventListener("click", () => form.classList.remove("active"));
form.addEventListener("submit", addBookToLibrary);
document.addEventListener("click", readToggle);
class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

function addBookToLibrary(e) {
  e.preventDefault();
  let newBook = new Book(title.value, author.value, pages.value, readquestion.checked);
  myLibrary.push(newBook);
  createBook(myLibrary[bookNumber]);
  bookNumber++;
}

function createBook(item) {
  const newBook = document.createElement("div");
  bookWrapper.appendChild(newBook);
  newBook.className = "book";

  const deleteBook = document.createElement("span");
  newBook.appendChild(deleteBook);
  deleteBook.textContent = "close";
  deleteBook.className = "material-icons-outlined close 1";

  const title = document.createElement("p");
  newBook.appendChild(title);
  title.textContent = myLibrary[bookNumber].title;
  title.className = "title";

  const author = document.createElement("p");
  newBook.appendChild(author);
  author.textContent = `by ${myLibrary[bookNumber].author}`;
  author.className = "author";

  const pages = document.createElement("p");
  newBook.appendChild(pages);
  pages.textContent = myLibrary[bookNumber].pages + " pages";
  pages.className = "pages";

  const read = document.createElement("button");
  newBook.appendChild(read);
  read.textContent = "Read";
  if (readquestion.checked === true) {
    read.className = "read button active";
  } else if (readquestion.checked === false)
    read.textContent = "Not Read"; {
    read.className = "read button";
  }

  deleteBook.addEventListener("click", () => {
    newBook.remove();
    myLibrary.splice(myLibrary.indexOf(item), 1);
    bookNumber--;
  }
  );
  form.reset();
  form.classList.remove("active");
};


function readToggle(event) {
  const read = event.target;
  if (read.classList == "read button") {
    read.classList.add("active");
    read.textContent = "Read";

  } else if (read.classList == "read button active") {
    read.classList.remove("active");
    read.textContent = "Not Read";
  }
}




