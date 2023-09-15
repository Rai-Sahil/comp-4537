// Function to initialize the reader page
function initReaderPage() {
    console.log('reader page initialized');

    // Wrap your code inside a DOMContentLoaded event handler
    document.addEventListener('DOMContentLoaded', function () {
        const notesContainer = document.getElementById('notes-container');
        const lastRetrieved = document.getElementById('last-retrieved');

        // Function to retrieve and display notes
        function retrieveNotes() {
            const existingNotes = JSON.parse(localStorage.getItem('notes')) || [];

            // Clear the notesContainer
            notesContainer.innerHTML = '';

            if (existingNotes.length === 0) {
                // Display a message when there are no notes
                notesContainer.textContent = 'No notes to display';
            } else {
                existingNotes.forEach(note => {
                    const div = document.createElement('div');
                    div.textContent = note.text;
                    notesContainer.appendChild(div);
                });
            }

            // Update the last retrieved time
            const currentTime = new Date();
            lastRetrieved.textContent = 'Last Retrieved: ' + currentTime.toLocaleTimeString();
        }

        // Retrieve and display notes initially
        retrieveNotes();

        // Retrieve and display notes every 2 seconds
        setInterval(retrieveNotes, 2000);
    });
}

initReaderPage(); // Call the function to initialize the reader page
