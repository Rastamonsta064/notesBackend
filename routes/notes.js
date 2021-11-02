import express from 'express';
import Note from "../models/note.model.js";
const notesRouter = express.Router();

notesRouter.route('/').get((req, res) => {
    const skip = Number(req.query.skip);
    Note.find()
        .skip(skip)
        .limit(3)
        .then(notes => res.json(notes))
        .catch(err => res.status(400).json('Error: ' + err));
});

notesRouter.route('/search/:query').get((req,res)=> {
    const query = req.params.query;
    const skip = Number(req.query.skip);
    const regex = new RegExp(query, 'i');
        Note.find({noteTitle:{$regex: regex}})
            .skip(skip)
            .limit(3)
            .then(notes => res.json(notes))
            .catch(err => res.status(400).json('Error: ' + err));
})

notesRouter.route('/add').post((req, res) => {
    const noteTitle = req.body.noteTitle;
    const noteBody = req.body.noteBody;
    const newNote = new Note({noteTitle, noteBody});

    newNote.save()
        .then(() => res.json('Note Added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

notesRouter.route('/:id').delete((req, res) => {
    Note.findByIdAndDelete(req.params.id)
        .then(event => res.json('Note deleted.'))
        .catch(err => res.status(400).json('Error ' + err));
});

notesRouter.route('/update/:id').post((req, res) => {
    Note.findById(req.params.id)
        .then(note => {
            note.noteTitle = req.body.noteTitle
            note.noteBody = req.body.noteBody

            note.save()
                .then(() => res.json('Note Updated!'))
                .catch(err => res.status(400).json('Error ' + err));
        })
        .catch(err => res.status(400).json('Error ' + err));
});

export default notesRouter;