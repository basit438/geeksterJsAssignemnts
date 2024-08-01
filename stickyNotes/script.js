let noteTitle = document.getElementById("noteTitle");
let note = document.getElementById("note");
let addBtn = document.getElementById("addNote");
let color = document.getElementById("bgColor");
let notesSection = document.querySelector(".notes-section");
let placeholder = document.getElementById("placeholder");
let searchInput = document.getElementById("searchNotes");

function updatePlaceholderVisibility() {
    if (notesSection.children.length === 1) { // Only the placeholder should be there
        placeholder.style.display = 'block';
    } else {
        placeholder.style.display = 'none';
    }
}

addBtn.addEventListener("click", () => {
    let newNote = document.createElement("div");
    newNote.classList.add("newnote");
    newNote.style.backgroundColor = color.value;

    if (noteTitle.value.trim() !== "") {
        let noteTitleElement = document.createElement("h3");
        noteTitleElement.innerText = noteTitle.value;
        newNote.appendChild(noteTitleElement);
    }

    let noteContent = document.createElement("p");
    noteContent.innerText = note.value;
    newNote.appendChild(noteContent);

    let noteDate = new Date();
    let noteTimestamp = document.createElement("span");
    noteTimestamp.classList.add("timestamp");
    noteTimestamp.innerText = noteDate.toLocaleString();
    newNote.appendChild(noteTimestamp);

    let noteActions = document.createElement("div");
    noteActions.classList.add("note-actions");

    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", () => {
        deleteNote(newNote);
        updatePlaceholderVisibility();
    });
    noteActions.appendChild(deleteBtn);

    newNote.appendChild(noteActions);

    notesSection.appendChild(newNote);

    noteTitle.value = "";
    note.value = "";
    color.value = "#ffef96"; // Reset color picker to default

    updatePlaceholderVisibility();
});

function deleteNote(note) {
    notesSection.removeChild(note);
    updatePlaceholderVisibility();
}

searchInput.addEventListener("input", () => {
    let query = searchInput.value.toLowerCase();
    let notes = document.querySelectorAll(".newnote");

    notes.forEach(note => {
        let title = note.querySelector("h3");
        if (title) {
            let titleText = title.innerText.toLowerCase();
            if (titleText.includes(query)) {
                note.style.display = "block";
            } else {
                note.style.display = "none";
            }
        }
    });
});

// Initialize placeholder visibility on page load
updatePlaceholderVisibility();
