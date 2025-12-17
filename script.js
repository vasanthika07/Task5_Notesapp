function loadNotes() {
  fetch("/notes")
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById("notesList");
      list.innerHTML = "";
      data.forEach((note, index) => {
        const li = document.createElement("li");
        li.innerHTML = `${note} <button onclick="deleteNote(${index})">X</button>`;
        list.appendChild(li);
      });
    });
}

function addNote() {
  const note = document.getElementById("noteInput").value;
  if (!note) return alert("Enter note");

  fetch("/notes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ note })
  }).then(() => {
    document.getElementById("noteInput").value = "";
    loadNotes();
  });
}

function deleteNote(index) {
  fetch(`/notes/${index}`, { method: "DELETE" })
    .then(() => loadNotes());
}

loadNotes();
