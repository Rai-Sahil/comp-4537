'use strict'
function NoteModel(bodyText) {
    this.bodyText = bodyText;
    this.buttonText = "Remove Note";
    this.textarea = null;
    this.removeButton = null;
}

const noteModels = JSON.parse(localStorage.getItem("notes")) || [];

const noteList = document.getElementById("list-notes");

document.addEventListener("DOMContentLoaded", () => {
    const updateTime = () => {
        const currentTime = new Date();
        document.getElementById("time").textContent = `Last Fetch -> ${currentTime.getHours()} : ${currentTime.getMinutes()} : ${currentTime.getSeconds()}`;
    };

    const updateLocalStorage = () => {
        localStorage.setItem("notes", JSON.stringify(noteModels));
    };

    updateTime();
    updateLocalStorage();

    setInterval(() => {
        updateTime();
        updateLocalStorage();
    }, 2000);
});

const createNoteModel = ({ bodyText }) => {
    const noteModel = new NoteModel(bodyText);
    noteModels.push(noteModel);
    return noteModel;
};

const removeNoteModel = ({ bodyText }) => {
    const noteIndex = noteModels.findIndex((noteModel) => noteModel.bodyText === bodyText);
    if (noteIndex !== -1) {
        noteModels.splice(noteIndex, 1);
    }
};

for (const index in noteModels) {
    const noteModel = noteModels[index];
    noteModel.textarea = document.createElement("textarea");
    noteModel.textarea.value = noteModel.bodyText;
    noteModel.textarea.addEventListener("input", (e) => {
        noteModel.bodyText = e.target.value;
    });

    noteModel.removeButton = document.createElement("button");
    noteModel.removeButton.innerText = noteModel.buttonText;
    noteModel.removeButton.addEventListener("click", () => {
        removeNoteModel({ bodyText: noteModel.bodyText });
        container.remove();
    });

    const container = document.createElement("div");

    container.appendChild(noteModel.textarea);
    container.appendChild(noteModel.removeButton);
    noteList.appendChild(container);
}

const noteForm = document.getElementById("note-form");
noteForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const noteText = document.getElementById("noteText");
    const newNoteModel = createNoteModel({ bodyText: noteText.value });
    noteText.value = "";

    newNoteModel.textarea = document.createElement("textarea");
    newNoteModel.textarea.value = newNoteModel.bodyText;
    newNoteModel.textarea.addEventListener("input", (e) => {
        newNoteModel.bodyText = e.target.value;
    });

    newNoteModel.removeButton = document.createElement("button");
    newNoteModel.removeButton.innerText = newNoteModel.buttonText;
    newNoteModel.removeButton.addEventListener("click", () => {
        removeNoteModel({ bodyText: newNoteModel.bodyText });
        container.remove();
    });

    const container = document.createElement("div");

    container.appendChild(newNoteModel.textarea);
    container.appendChild(newNoteModel.removeButton);
    noteList.appendChild(container);
});
