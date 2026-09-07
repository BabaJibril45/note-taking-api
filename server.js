require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());


const PORT = process.env.PORT


let notes = [
    {id: 1, title: "Note1", content: "Baba jibril api"},
    {id: 2, title: "Note2", content: "creating my api"},
    {id: 3, title: "Note3", content: "Testing my api"}
];

app.get("/", (req, res) => res.status(200).json(notes));

app.get("/notes/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const note = notes.find((n) => n.id === id);
    if(!note) return res.status(401).json( {error:'Not Found'});
    res.status(201).json(note);
});

app.post('/notes', (req, res) => {
    const {title, content} = req.body;
    const newNote = { id: notes.length + 1, title, content };
    if(!title || !content) return res.status(401).json({error: "title and content required!"});
    notes.push(newNote);
        res.status(200).json(newNote);
});

app.patch("/notes/:id", (req, res) => {
    const newId = parseInt(req.params.id);
    const note = notes.find((n) => n.id === newId);
    if(!notes) return res.status(404).json({error: 'Not Found'});
    Object.assign(note, req.body),
    res.status(200).json(note);
});

app.put("/notes/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const noteIndex = notes.findIndex((n) => n.id === id);
    if(noteIndex === -1) return res.status(404).json({error: 'Not Found'});

    notes[noteIndex] = {id, ...req.body};
    res.status(200).json(notes[noteIndex]);
});

app.delete("/notes/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const lenBefore = notes.length;
    notes = notes.filter((n) => n.id !== id);
    if (notes.length === lenBefore)
        return res.status(404).json({error: 'Not found'});
    res.status(204).send();
});



app.listen(PORT,() => {
    console.log('API is live on ${PORT}');
});


