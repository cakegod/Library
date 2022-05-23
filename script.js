"use strict";
const books = [];

const bookDOM = {
	form: document.querySelector(".form"),
	wrapper: document.getElementById("book-wrapper"),
	close: document.querySelector(".close"),
	addButton: document.querySelector(".plus-icon"),
	title: document.getElementById("title"),
	author: document.getElementById("author"),
	pages: document.getElementById("pages"),
	readCheck: document.getElementById("readCheck"),
};

bookDOM.addButton.addEventListener("click", () =>
	bookDOM.form.classList.add("active")
);
bookDOM.close.addEventListener("click", () =>
	bookDOM.form.classList.remove("active")
);
bookDOM.form.addEventListener("submit", renderBook());

class Book {
	constructor(title, author, pages, read) {
		this.title = title;
		this.author = author;
		this.pages = pages;
		this.read = read;
	}
}

// Submit form, push new book to the books array, render and save locally
bookDOM.form.addEventListener("submit", (e) => {
	e.preventDefault();
	const newBook = new Book(
		bookDOM.title.value,
		bookDOM.author.value,
		bookDOM.pages.value,
		bookDOM.readCheck.checked
	);
	books.push(newBook);
	bookDOM.form.reset();
	renderBook();
	saveStateStorage();
});

function renderBook() {
	clearDOM();
	books.forEach((book) => {
		const elements = createDOMElement();
		addClass(elements, book);
		addInnerText(elements, book);
		addEvents(elements, book);
		appendChild(elements);
	});
}

function clearDOM() {
	bookDOM.wrapper.textContent = "";
}

function createDOMElement() {
	const bookContainer = document.createElement("div");
	const title = document.createElement("p");
	const author = document.createElement("p");
	const pages = document.createElement("p");
	const read = document.createElement("button");
	const close = document.createElement("span");

	return { bookContainer, title, author, pages, read, close };
}

function addClass(
	{
		bookContainer: bookContainer,
		title: title,
		author: author,
		pages: pages,
		read: read,
		close: close,
	},
	book
) {
	bookContainer.classList = "book";
	title.classList = "title";
	author.classList = "author";
	pages.classList = "pages";
	close.classList = "material-icons-outlined close 1";
	if (book.read) {
		read.innerText = "Read";
		read.classList = "read button active";
	} else {
		read.innerText = "Not Read";
		read.classList = "read button";
	}
}

function addInnerText(
	{ close: close, title: title, author: author, pages: pages },
	book
) {
	close.innerText = "close";
	title.innerText = book.title;
	author.innerText = `by ${book.author}`;
	pages.innerText = `${book.pages} pages`;
}

function appendChild({
	bookContainer: bookContainer,
	title: title,
	author: author,
	pages: pages,
	read: read,
	close: close,
}) {
	bookContainer.appendChild(close);
	bookContainer.appendChild(title);
	bookContainer.appendChild(author);
	bookContainer.appendChild(pages);
	bookContainer.appendChild(read);
	bookDOM.wrapper.appendChild(bookContainer);
}

function addEvents({ read: read, close: close }, book) {
	read.addEventListener("click", () => {
		if (book.read) {
			book.read = false;
			read.innerText = "Not Read";
			read.classList = "read button";
		} else {
			book.read = true;
			read.innerText = "Read";
			read.classList = "read button active";
		}
		saveStateStorage();
	});

	close.addEventListener("click", () => {
		const index = books.indexOf(book);
		books.splice(index, 1);
		saveStateStorage();
		renderBook();
	});
}

function saveStateStorage() {
	localStorage.setItem("books", JSON.stringify(books));
}

function loadStorage() {
	if (localStorage.getItem("books") !== null) {
		books.push(...JSON.parse(localStorage.getItem("books")));
		renderBook();
	}
}

loadStorage();
