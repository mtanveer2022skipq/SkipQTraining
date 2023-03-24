const express = require('express');
const connectDB  = require('./db');
const Url = require('./urlModel');
// const port = 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', async (req,res) => {
    const urls = await Url.find();
    res.json(urls);
})

app.post('/', async (req,res) => {
    if(!req.body.name || !req.body.url) return res.status(400).json({msg: "Please enter all fields"});

    const {name, url} = req.body;
    const u = await Url.create({name, url});
    res.json(u);
})

app.delete('/:id', async (req,res) => {
    const u = await Url.findByIdAndDelete(req.params.id);
    res.json({msg: "Deleted successfully"});
})

app.put('/:id', async (req,res) => {
    const u = await Url.findByIdAndUpdate(req.params.id, req.body);
    res.json({msg: "Updated successfully"});
})

// app.listen(port, ()=> console.log(`Listening on PORT ${port}`));

module.exports  = app;