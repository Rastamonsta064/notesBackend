import mongoose from "mongoose";
import express from 'express';
import cors from 'cors';
import {} from 'dotenv/config'
import notesRouter from "./routes/notes.js";

const app = express();
const port = process.env.PORT || 5000;

const whitelist = ['http:localhost:3000','https://server-for-notes.herokuapp.com/'];
const corsOptions = {
    origin: 'https://rastamonsta064.github.io/',
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

const uri = process.env.ATLAS_URI;

mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

app.use('/notes', notesRouter);

app.listen(port, () => {
    console.log(`Notes app server is running on http://localhost:${port}`);
});
