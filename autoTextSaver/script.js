// Get the textarea element and status elements
const textarea = document.getElementById("myTextarea");
const charCount = document.getElementById("charCount");
const autosaveStatus = document.getElementById("autosaveStatus");

// Function to save the textarea content to local storage
function saveToLocalStorage() {
    localStorage.setItem("savedText", textarea.value);
    autosaveStatus.textContent = "Saved!";
    setTimeout(() => {
        autosaveStatus.textContent = "Not saved";
    }, 2000); // Reset status after 2 seconds
}

// Function to update the character count
function updateCharCount() {
    charCount.textContent = `${textarea.value.length} characters`;
}

// Check if there's existing data in local storage and populate the textarea
if (localStorage.getItem("savedText")) {
    textarea.value = localStorage.getItem("savedText");
    updateCharCount(); // Update the character count after loading
}

// Add event listeners to the textarea for input changes
textarea.addEventListener("input", () => {
    updateCharCount();
    saveToLocalStorage();
});
