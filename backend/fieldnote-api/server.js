import express, { urlencoded } from "express"

const app = express()

app.use(express.json())
app.use(urlencoded({extended: true}))

const PORT = 3000

app.get("/", (req, res)=>{
    res.send('<h1>Home page</h1>')
})

app.get("/about", (req, res)=>{
    res.send('About Page')
})

app.get('/user/:id', (req,res)=>{
 const userId = req.params.id; // access the parameter value
 res.send(`User ID is: ${userId}`);
});

app.get('/search', (req, res) => {
  const course = req.query.course;
  const id = req.query.id;
  res.send(`Search for ${id}: ${course}`);
});

app.post('/register', (req, res) => {
  console.log(req.body); // parsed data
  res.send(`Hello, ${req.body.name}!`);
});


app.post('/login', (req, res) => {
  console.log(req.body);
  res.json({ received: req.body });
});




app.listen(PORT, ()=> console.log(`Server is running on http://localhost:${PORT}`))
