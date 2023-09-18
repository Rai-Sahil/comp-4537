"use strict";

const NOTES = JSON.parse(localStorage.getItem("NOTES")) || [];

// Get references
const NOTE_LIST = document.getElementById("list-notes");

document.addEventListener("DOMContentLoaded", () => {
  const updateTime = () => {
    const currentTime = new Date();
    document.getElementById("time").textContent = `Current Time: ${timeString}`;
  };

  const updateLocalStorage = () => {
    localStorage.setItem("NOTES", JSON.stringify(NOTES));
  };

  updateTime();
  updateLocalStorage();
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
  NOTES[note].removeButton.innerText = NOTES[note].buttonText;
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
  newNote.removeButton.innerText = newNote.buttonText;
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
  this.buttonText = "❌";
  this.textarea = null;
  this.removeButton = null;
}

