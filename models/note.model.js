import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const noteSchema = new Schema({

    noteTitle: {type: String, required: true},
    noteBody: {type: String, required: true},

}, {
    timestamps: true,
});

const Note = mongoose.model('Note', noteSchema);

export default Note;