const notes = [{title: 'Hello', body: 'This is my first note', createdAt: Date.now()}]

export const getNotes = (req, res)=>{
  res.json(notes)
}

export const addNote = (req, res)=>{
    const note = { title: req.body.title, body: req.body.body, createAt:Date.now()}
    notes.push(note);
    res.status(201).json(note)
}