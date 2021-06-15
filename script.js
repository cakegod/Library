"use strict";

const bookDOM = {
  form: document.querySelector(".form"),
  bookWrapper: document.getElementById("book-wrapper"),
  close: document.querySelector(".close"),
  addBookButton: document.querySelector(".plus-icon"),
  title: document.getElementById("title"),
  author: document.getElementById("author"),
  pages: document.getElementById("pages"),
  readquestion: document.getElementById("readquestion"),
};

const bookArray = {
  myLibrary: [],
  bookNumber: 0,
};

bookDOM.addBookButton.addEventListener("click", () => bookDOM.form.classList.add("active"));
bookDOM.close.addEventListener("click", () => bookDOM.form.classList.remove("active"));
bookDOM.form.addEventListener("submit", addBookToLibrary);

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
  readToggle(truthy) {
    return this.read = truthy;
  }
}



function addBookToLibrary(e) {
  e.preventDefault();
  let newBook = new Book(title.value, author.value, pages.value, readquestion.checked);
  bookArray.myLibrary.push(newBook);
  createBook(bookArray.myLibrary[bookArray.bookNumber]);
  bookArray.bookNumber++;
}

function createBook(item) {
  const newBook = document.createElement("div");
  bookDOM.bookWrapper.appendChild(newBook);
  newBook.className = "book";

  const deleteBook = document.createElement("span");
  newBook.appendChild(deleteBook);
  deleteBook.textContent = "close";
  deleteBook.className = "material-icons-outlined close 1";
  deleteBook.addEventListener("click", removeBook);

  const title = document.createElement("p");
  newBook.appendChild(title);
  title.textContent = bookArray.myLibrary[bookArray.bookNumber].title;
  title.className = "title";

  const author = document.createElement("p");
  newBook.appendChild(author);
  author.textContent = `by ${bookArray.myLibrary[bookArray.bookNumber].author}`;
  author.className = "author";

  const pages = document.createElement("p");
  newBook.appendChild(pages);
  pages.textContent = bookArray.myLibrary[bookArray.bookNumber].pages + " pages";
  pages.className = "pages";

  const read = document.createElement("button");
  newBook.appendChild(read);
  read.textContent = "Read";
  readInitialStyle();

  read.addEventListener("click", () => {
    if (read.classList == "read button") {
      read.classList.add("active");
      read.textContent = "Read";
      bookArray.myLibrary[bookArray.myLibrary.indexOf(item)].readToggle(true);

    } else if (read.classList == "read button active") {
      read.classList.remove("active");
      read.textContent = "Not Read";
      bookArray.myLibrary[bookArray.myLibrary.indexOf(item)].readToggle(false);;

    }
  }
  );

  function readInitialStyle() {
    if (readquestion.checked === true) {
      read.className = "read button active";

    } else if (readquestion.checked === false) {
      read.textContent = "Not Read";
      read.className = "read button";
    }
  }

  function removeBook() {
    newBook.remove();
    bookArray.myLibrary.splice(bookArray.myLibrary.indexOf(item), 1);
    bookArray.bookNumber--;
  }
  formReset();
};


function formReset() {
  bookDOM.form.reset();
  bookDOM.form.classList.remove("active");
}

