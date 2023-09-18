"use strict";

function updateNotes() {
  const NOTES = JSON.parse(localStorage.getItem("NOTES"));
  const NOTE_LIST = document.getElementById("list-notes");

  // Clear the existing content in NOTE_LIST
  NOTE_LIST.innerHTML = "";

  for (const note in NOTES) {
    const note_p_tag = document.createElement("p");
    note_p_tag.addEventListener("input", (e) => {
      NOTES[note].bodyText = e.target.value;
    });
    note_p_tag.innerText = NOTES[note].bodyText;

    NOTE_LIST.appendChild(note_p_tag);
  }
}

const updateTime = () => {
  const currentTime = new Date();
  // Create a string in the format dd/mm/yyyy hh:mm:ss
  const timeString = currentTime.toLocaleString();
  // Update the HTML element with the current time
  document.getElementById("time").textContent = `Current Time: ${timeString}`;
};

// Call the updateNotes function initially
updateNotes();
updateTime();

// Set up a timer to call updateNotes every 2 seconds
setInterval(() => {
  updateNotes();
  updateTime();
}, 2000);
