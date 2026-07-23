import { Note } from "../models/notes.js"

export const getNotes = async (req, res)=>{
  try {
    const notes = await Note.find();
    res.status(200).json(notes)
  } catch (err) {
    res.status(400).json({error: err.message})
  }
}

export const addNote = async (req, res)=>{
  try {
    const {title, body} = req.body;
    const note = new Note({title, body});
    await note.save()
    res.status(201).json(note)
  } catch (err) {
    res.status(400).json({error: err.message})
  }
}