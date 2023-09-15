// writer.js

// Function to initialize the writer page
function initWriterPage() {
    // Retrieve existing notes from local storage
    const existingNotes = JSON.parse(localStorage.getItem('notes')) || [];

    const notesContainer = document.getElementById('notes-container');
    const addBtn = document.getElementById('add-button');

    // Populate text areas with existing notes
    existingNotes.forEach((note, index) => {
        const textarea = createNoteTextarea(note.text);
        notesContainer.appendChild(textarea);
    });

    // Add a new note when the "Add Note" button is clicked
    addBtn.addEventListener('click', () => {
        const textarea = createNoteTextarea('');
        notesContainer.appendChild(textarea);
    });

    // Update the last saved time
    const lastSaved = document.getElementById('last-saved');
    setInterval(() => {
        const currentTime = new Date();
        lastSaved.textContent = 'Last Saved: ' + currentTime.toLocaleTimeString();
        
        // Save notes to local storage
        const textareas = document.querySelectorAll('textarea');
        const notes = [];
        textareas.forEach(textarea => {
            notes.push({ text: textarea.value });
        });
        localStorage.setItem('notes', JSON.stringify(notes));
    }, 2000);
}

function createNoteTextarea(text) {
    const div = document.createElement('div');
    
    const textarea = document.createElement('textarea');
    textarea.value = text;
    
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.addEventListener('click', () => {
        const notesContainer = document.getElementById('notes-container');
        notesContainer.removeChild(div); // Remove the entire div, not just the textarea and removeBtn
    });
    
    div.appendChild(textarea);
    div.appendChild(removeBtn);
    
    return div;
}

document.addEventListener('DOMContentLoaded', initWriterPage);
