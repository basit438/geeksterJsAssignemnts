let noteTitle = document.getElementById("noteTitle");
let note = document.getElementById("note");
let addBtn = document.getElementById("addNote");
let color = document.getElementById("bgColor");
let notesSection = document.querySelector(".notes-section");
let placeholder = document.getElementById("placeholder");

function updatePlaceholderVisibility() {
    if (notesSection.children.length === 1) { // Only the placeholder should be there
        placeholder.style.display = 'block';
    } else {
        placeholder.style.display = 'none';
    }
}

addBtn.addEventListener("click", () => {
    // Create a new note div
    let newNote = document.createElement("div");
    newNote.classList.add("newnote");

    // Set the background color of the note
    newNote.style.backgroundColor = color.value;

    // Add the note title
    if (noteTitle.value.trim() !== "") {
        let noteTitleElement = document.createElement("h3");
        noteTitleElement.innerText = noteTitle.value;
        newNote.appendChild(noteTitleElement);
    }

    // Add the note content
    let noteContent = document.createElement("p");
    noteContent.innerText = note.value;
    newNote.appendChild(noteContent);

    // Add the timestamp
    let noteDate = new Date();
    let noteTimestamp = document.createElement("span");
    noteTimestamp.classList.add("timestamp");
    noteTimestamp.innerText = noteDate.toLocaleString();
    newNote.appendChild(noteTimestamp);

    // Add delete button
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

    // Append the new note to the notes section
    notesSection.appendChild(newNote);

    // Clear the input fields after adding the note
    noteTitle.value = "";
    note.value = "";
    color.value = "#ffef96"; // Reset color picker to default

    // Update placeholder visibility
    updatePlaceholderVisibility();
});

function deleteNote(note) {
    notesSection.removeChild(note);
    updatePlaceholderVisibility();
}

// Initialize placeholder visibility on page load
updatePlaceholderVisibility();
