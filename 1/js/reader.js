'use strict'
function updateNotes() {
  const NOTESDATA = JSON.parse(localStorage.getItem("NOTES"));
  const NOTE_LIST = document.getElementById("list-notes");

  NOTE_LIST.innerHTML = "";

  for (const note in NOTESDATA) {
    const notesText = document.createElement("p");
    notesText.addEventListener("input", (e) => {
      NOTESDATA[note].bodyText = e.target.value;
    });
    notesText.innerText = NOTESDATA[note].bodyText;

    NOTE_LIST.appendChild(notesText);
  }
}

const updateTime = () => {
  const currentTime = new Date();
  document.getElementById("time").textContent = ` ${currentTime.getHours()} : ${currentTime.getMinutes()} : ${currentTime.getSeconds()}`;
};

updateNotes();

setInterval(() => {
  updateNotes();
  updateTime();
}, 2000);
