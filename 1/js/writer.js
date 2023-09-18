"use strict";

const NOTES = JSON.parse(localStorage.getItem("NOTES")) || [];

// Get references
const NOTE_LIST = document.getElementById("list-notes");

document.addEventListener("DOMContentLoaded", () => {
  const updateTime = () => {
    const currentTime = new Date();
    // Create a string in the format dd/mm/yyyy hh:mm:ss
    const timeString = currentTime.toLocaleString();
    // Update the HTML element with the current time
    document.getElementById("time").textContent = `Current Time: ${timeString}`;
  };

  const updateLocalStorage = () => {
    // Assuming NOTES is an object you want to store in local storage
    localStorage.setItem("NOTES", JSON.stringify(NOTES));
  };

  // Call both functions initially
  updateTime();
  updateLocalStorage();

  // Set up an interval to call both functions every 2 seconds
  setInterval(() => {
    updateTime();
    updateLocalStorage();
  }, 2000);
});

const createNote = ({ bodyText }) => {
  const note = new Note(bodyText);
  NOTES.push(note);
  return note;
};

const removeNote = ({ bodyText }) => {
  const noteIndex = NOTES.findIndex((note) => note.bodyText === bodyText);
  noteIndex !== -1 ? NOTES.splice(noteIndex, 1) : null;
};

for (const note in NOTES) {
  NOTES[note].textarea = document.createElement("textarea");
  NOTES[note].textarea.value = NOTES[note].bodyText;
  NOTES[note].textarea.addEventListener("input", (e) => {
    const noteIndex = NOTES.findIndex(
      (note) => note.bodyText === NOTES[note].bodyText
    );
    NOTES[noteIndex].bodyText = e.target.value;
  });

  NOTES[note].removeButton = document.createElement("button");
  NOTES[note].removeButton.innerText = NOTES[note].buttonText; // You can use any trash icon you prefer
  // Add a click event listener to the trash icon to remove the note
  NOTES[note].removeButton.addEventListener("click", () => {
    removeNote({ bodyText: NOTES[note].bodyText });
    container.remove();
  });

  const container = document.createElement("div");

  container.appendChild(NOTES[note].textarea);
  container.appendChild(NOTES[note].removeButton);
  NOTE_LIST.appendChild(container);
}

const note_form = document.getElementById("note-form");
note_form.addEventListener("submit", (e) => {
  e.preventDefault();
  const noteText = document.getElementById("noteText");
  const newNote = createNote({ bodyText: noteText.value });
  noteText.value = "";

  newNote.textarea = document.createElement("textarea");

  newNote.textarea.value = newNote.bodyText;
  newNote.textarea.addEventListener("input", (e) => {
    const noteIndex = NOTES.findIndex(
      (note) => note.bodyText === newNote.bodyText
    );
    NOTES[noteIndex].bodyText = e.target.value;
  });

  newNote.removeButton = document.createElement("button");
  newNote.removeButton.innerText = newNote.buttonText; // You can use any trash icon you prefer
  // Add a click event listener to the trash icon to remove the note
  newNote.removeButton.addEventListener("click", () => {
    removeNote({ bodyText: newNote.bodyText });
    container.remove();
  });

  const container = document.createElement("div");

  container.appendChild(newNote.textarea);
  container.appendChild(newNote.removeButton);
  NOTE_LIST.appendChild(container);
});

function Note(bodyText) {
  this.bodyText = bodyText;
  this.buttonText = "🗑️";
  this.textarea = null; // Initialize textarea as null
  this.removeButton = null; // Initialize button as null
}

