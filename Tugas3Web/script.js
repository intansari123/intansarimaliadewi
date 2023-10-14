// Step 1
let library = [];

function addBook() {
    const titleInput = document.getElementById("titleInput").value;
    const authorInput = document.getElementById("authorInput").value;

    if (titleInput && authorInput) {
        const book = {
            title: titleInput,
            author: authorInput,
            status: {
                own: true,
                reading: false,
                read: false,
            },
        };

        library.push(book);

        // Clear input fields
        document.getElementById("titleInput").value = "";
        document.getElementById("authorInput").value = "";

        displayLibrary();
    } else {
        alert("Harap isi judul dan penulis buku!");
    }
}

// Step 2
function markAllRead() {
    library.forEach((book) => {
        book.status.read = true;
    });

    displayLibrary();
}

// Step 3
function changeFirstBookTitle() {
    if (library.length > 0) {
        library[0].title = "New Title";
        displayLibrary();
    }
}

// Step 4
function convertToJSON() {
    const jsonLibrary = JSON.stringify(library);
    console.log(jsonLibrary);
    alert("Objek Library telah diubah menjadi JSON. Lihat konsol untuk hasilnya.");
}

// Display library on the web page
function displayLibrary() {
    const libraryList = document.getElementById("libraryList");
    libraryList.innerHTML = "";

    library.forEach((book) => {
        const listItem = document.createElement("li");
        listItem.textContent = `Judul: ${book.title}, Penulis: ${book.author}, Status: own: ${book.status.own}, reading: ${book.status.reading}, read: ${book.status.read}`;
        libraryList.appendChild(listItem);
    });
}

// Initialize library display
displayLibrary();