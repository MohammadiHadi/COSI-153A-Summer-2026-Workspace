import express, { urlencoded } from "express"
import notesRouter from "./routes/notes.js"
import mongoose from "mongoose"
import cors from "cors"
import 'dotenv/config'


const app = express()
const PORT = 3000

function logger(req, res, next){
  console.log(`${req.method} ${req.url}`)
  next()
 }

app.use(express.json())
app.use(urlencoded({extended: true}))
app.use(cors({origin: "*"}))

app.use('/api/notes', logger, notesRouter )

mongoose.connect(process.env.MONGO_URI).then(()=>{
  console.log('MongoDB is connceted sucessfully!');
  app.listen(PORT, ()=> console.log(`Server is running on http://localhost:${PORT}`))
}).catch(err =>console.error('Failed to connected to the database: ', err))
