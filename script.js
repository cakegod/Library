"use strict";
let myLibrary = [];
const submit = document.querySelector(".submit");
const form = document.querySelector(".form");
const body = document.querySelector("body");
const bookWrapper = document.getElementById("book-wrapper");
const minimize = document.querySelector(".minimize");
const addBookButton = document.querySelector(".plus-icon");
let i = 0;

addBookButton.addEventListener("click", () => form.classList.add("active"));
minimize.addEventListener("click", () => form.classList.remove("active"));
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(e) {
  e.preventDefault();
  let newBook = new Book(title.value, author.value, pages.value, readquestion.checked);
  myLibrary.push(newBook);

  createBook(myLibrary[i]);
  i++;
}

function createBook(item) {
  const newBook = document.createElement("div");
  bookWrapper.appendChild(newBook);
  newBook.className = "book";

  const deleteBook = document.createElement("span");
  newBook.appendChild(deleteBook);
  deleteBook.textContent = "close";
  deleteBook.className = "material-icons-outlined";

  const title = document.createElement("p");
  newBook.appendChild(title);
  title.textContent = myLibrary[i].title;
  title.className = "title";

  const author = document.createElement("p");
  newBook.appendChild(author);
  author.textContent = myLibrary[i].author;
  author.className = "author";

  const pages = document.createElement("p");
  newBook.appendChild(pages);
  pages.textContent = myLibrary[i].pages;
  pages.className = "pages";

  const read = document.createElement("button");
  newBook.appendChild(read);
  read.textContent = "Read";
  if (readquestion.checked === true) {
    read.className = "read button active";
  } else if (readquestion.checked === false) {
    read.className = "read button";
  }

  deleteBook.addEventListener("click", () => {
    newBook.remove();
    myLibrary.splice(myLibrary.indexOf(item), 1);
    i--;
  }
  );
  form.reset();
};

document.addEventListener("click", function (e) {
  const read = document.querySelector(".read");
  if (e.target.classList == "read button") {
    read.addEventListener("click", () => read.classList.add("active"));
  } else if (e.target.classList == "read button active") {
    read.addEventListener("click", () => read.classList.remove("active"));
  }
});

submit.addEventListener("click", addBookToLibrary);
