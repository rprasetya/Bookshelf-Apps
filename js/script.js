const shelf = localStorage.getItem("bookshelf");
if (!shelf) {
  localStorage.setItem("bookshelf", "[]");
}
const unreadShelf = document.querySelector(".containerUnreadBook");
const alreadyReadShelf = document.querySelector(".containerBook");
let containerUnreadBookContent = "";
let containerAlreadyReadBookContent = "";

const searchContainer = localStorage.getItem("searchContainer");

const parseShelf = JSON.parse(localStorage.getItem("bookshelf"));
const shelfLength = parseShelf.length;

const outputBtn = (isComplete, value) => {
  if (isComplete === "Already Read") {
    return `<button onClick="uncheckBtn(${value})" class="checklistBtn">
                    <img
                      src="../assets/undo.png"
                      alt="undo"
                    />
                  </button>`;
  } else if (isComplete === "Unread") {
    return `<button onClick="checklistFunction(${value})" class="checklistBtn">
                    <img
                      src="../assets/checklist.png"
                      alt="checklist"
                    />
                  </button>`;
  }
};

const launch = () => {
  for (let i = 0; i < shelfLength; i++) {
    const bookId = parseShelf[i].id;
    const bookTitle = parseShelf[i].title;
    const bookYear = parseShelf[i].year;
    const bookAuthor = parseShelf[i].author;
    const bookIsComplete = parseShelf[i].isCompleted
      ? "Already Read"
      : "Unread";

    if (bookIsComplete === "Already Read") {
      containerAlreadyReadBookContent += `<ul>
                <li class="bookTitle">
                   ${bookTitle}
                </li>
                <li class="year">${bookYear}</li>
                <li class="author">${bookAuthor}</li>
                <li class="isComplete">${bookIsComplete}</li>
                <div class="btn">
                  ${outputBtn(bookIsComplete, bookId)}
                  <button onClick="deleteBook(${bookId})" class="deleteBtn"">
                    <img
                      src="../assets/delete-trash.png"
                      alt="delete-trash"
                    />
                  </button>
                </div>
              </ul>`;
    } else if (bookIsComplete === "Unread") {
      containerUnreadBookContent += `<ul>
                <li class="bookTitle">
                   ${bookTitle}
                </li>
                <li class="year">${bookYear}</li>
                <li class="author">${bookAuthor}</li>
                <li class="isComplete">${bookIsComplete}</li>
                <div class="btn">
                  ${outputBtn(bookIsComplete, bookId)}
                  <button onClick="deleteBook(${bookId})" class="deleteBtn">
                    <img
                      src="../assets/delete-trash.png"
                      alt="delete-trash"
                    />
                  </button>
                </div>
              </ul>`;
    }
  }
  unreadShelf.innerHTML = containerUnreadBookContent;
  alreadyReadShelf.innerHTML = containerAlreadyReadBookContent;
};

const displaySearchResult = () => {
  const searchResult = [];
  const searchInput = localStorage.getItem("searchContainer");
  const parseSearchInput = JSON.parse(searchInput);
  for (let i = 0; i < parseShelf.length; i++) {
    const book = parseShelf[i];
    if (book.title.toLowerCase().includes(parseSearchInput)) {
      searchResult.push(book);
    }
  }
  for (let i = 0; i < searchResult.length; i++) {
    const bookId = searchResult[i].id;
    const bookTitle = searchResult[i].title;
    const bookYear = searchResult[i].year;
    const bookAuthor = searchResult[i].author;
    const bookIsComplete = searchResult[i].isCompleted
      ? "Already Read"
      : "Unread";

    if (bookIsComplete === "Already Read") {
      containerAlreadyReadBookContent += `<ul>
                    <li class="bookTitle">
                       ${bookTitle}
                    </li>
                    <li class="year">${bookYear}</li>
                    <li class="author">${bookAuthor}</li>
                    <li class="isComplete">${bookIsComplete}</li>
                    <div class="btn">
                      ${outputBtn(bookIsComplete, bookId)}
                      <button onClick="deleteBook(${bookId})" class="deleteBtn"">
                        <img
                          src="../assets/delete-trash.png"
                          alt="delete-trash"
                        />
                      </button>
                    </div>
                  </ul>`;
    } else if (bookIsComplete === "Unread") {
      containerUnreadBookContent += `<ul>
                    <li class="bookTitle">
                       ${bookTitle}
                    </li>
                    <li class="year">${bookYear}</li>
                    <li class="author">${bookAuthor}</li>
                    <li class="isComplete">${bookIsComplete}</li>
                    <div class="btn">
                      ${outputBtn(bookIsComplete, bookId)}
                      <button onClick="deleteBook(${bookId})" class="deleteBtn">
                        <img
                          src="../assets/delete-trash.png"
                          alt="delete-trash"
                        />
                      </button>
                    </div>
                  </ul>`;
    }
  }
  unreadShelf.innerHTML = containerUnreadBookContent;
  alreadyReadShelf.innerHTML = containerAlreadyReadBookContent;
};

const checkSearch = () => {
  if (searchContainer === "" || searchContainer === '""') {
    launch();
  } else if (searchContainer === null) {
    launch();
  } else if (searchContainer !== "") {
    document.querySelector(".searchInput").value = JSON.parse(searchContainer);
    displaySearchResult();
  }
};

const searchContainerCheck = () => {
  if (searchContainer !== null) {
    checkSearch();
  } else if (searchContainer === null) {
    localStorage.setItem("searchContainer", "");
    checkSearch();
  }
};

searchContainerCheck();

const checklistFunction = (value) => {
  for (let i = 0; i < parseShelf.length; i++) {
    if (parseShelf[i].id === value) {
      parseShelf[i].isCompleted = true;
      break;
    }
  }
  localStorage.setItem("bookshelf", JSON.stringify(parseShelf));
  alert("The Book Has Been Read");
  location.reload();
};

const uncheckBtn = (value) => {
  for (let i = 0; i < parseShelf.length; i++) {
    if (parseShelf[i].id === value) {
      parseShelf[i].isCompleted = false;
      break;
    }
  }
  localStorage.setItem("bookshelf", JSON.stringify(parseShelf));
  alert("Unread The Book");
  location.reload();
};

const deleteBook = (index) => {
  for (let i = 0; i < parseShelf.length; i++) {
    if (parseShelf[i].id === index) {
      parseShelf.splice(i, 1);
      break;
    }
  }
  localStorage.setItem("bookshelf", JSON.stringify(parseShelf));
  alert("Book Deleted");
  location.reload();
};

const addBookModal = () => {
  const elemen = document.querySelector(".formNewBook");
  elemen.style.transform = "translateX(0vw)";
};

const closeModal = () => {
  const elemen = document.querySelector(".formNewBook");
  elemen.style.transform = "translateX(-100vw)";
};

const submitNewBook = () => {
  localStorage.setItem("searchContainer", "");
  if (shelfLength === 0) {
    pushToLocalStorage("a");
  } else {
    pushToLocalStorage("b");
  }
};

const pushToLocalStorage = (lengthBookshelf) => {
  const newTitle = document.querySelector(".title").value;
  const newYear = document.querySelector(".year").value;
  const newAuthor = document.querySelector(".author").value;
  const newRead = document.querySelector(".read").checked;
  let newId = 0;

  if (lengthBookshelf === "a") {
    const newBook = {
      id: newId,
      title: newTitle,
      year: newYear,
      author: newAuthor,
      isCompleted: newRead,
    };
    const strfyMakeObj = JSON.stringify(newBook);
    localStorage.setItem("bookshelf", strfyMakeObj);

    if (newTitle === "") {
      alert("Please Fill the Title!");
    } else {
      if (newYear) {
        newBook.year = newYear;
      } else if (!newYear) {
        newBook.year = "Unknown";
      }

      if (newAuthor === "") {
        newBook.author = "Unknown";
      }

      parseShelf.push(newBook);
      localStorage.setItem("bookshelf", JSON.stringify(parseShelf));
      alert("Book Added");
    }
  }

  if (lengthBookshelf === "b") {
    const lastObjId = shelfLength - 1;
    let newId = 0;
    newId = parseShelf[lastObjId].id + 1;

    if (newTitle === "") {
      alert("Please Fill the Title!");
    } else {
      const newBook = {
        id: newId,
        title: newTitle,
        year: newYear,
        author: newAuthor,
        isCompleted: newRead,
      };

      if (newYear) {
        newBook.year = newYear;
      } else if (!newYear) {
        newBook.year = "Unknown";
      }

      if (newAuthor === "") {
        newBook.author = "Unknown";
      }

      parseShelf.push(newBook);
      localStorage.setItem("bookshelf", JSON.stringify(parseShelf));
      alert("Book Added");
      location.reload();
    }
  }
};

const searchBook = () => {
  const searchInput = document
    .querySelector(".searchInput")
    .value.toLowerCase();
  const strfySearchInput = JSON.stringify(searchInput);
  localStorage.setItem("searchContainer", strfySearchInput);
  location.reload();
};
