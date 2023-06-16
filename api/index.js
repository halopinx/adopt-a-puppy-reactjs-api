const mongoose = require('mongoose');
const express = require('express');
const Puppy = require('./models/puppyModel');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/api/puppies', async (req, res) => {
    try {
      const puppies = await Puppy.find({})
      res.status(200).json(puppies);
    } catch (error) {
         console.log(error.message)
         res.status(500).json({message: error.message})
    }
 })
 app.get('/api/puppies/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const puppy = await Puppy.findById(id)
      res.status(200).json(puppy);
    } catch (error) {
         console.log(error.message)
         res.status(500).json({message: error.message})
    }
 })

 
app.post('/api/puppies', async (req, res) => {
   try {
     const puppy = await Puppy.create(req.body)
     res.status(200).json(puppy);
   } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
   }
})


app.put('/api/puppies/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const puppy = await Puppy.findByIdAndUpdate(id, req.body);

      if (!puppy) {
        return res.status(404).json({ message: `Cannot find any product with ID: ${id}`})
      }

      const updatedPuppy = await Puppy.findById(id)
      res.status(200).json(updatedPuppy);
    } catch (error) {
         console.log(error.message)
         res.status(500).json({message: error.message})
    }
 })


 app.delete('/api/puppies/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const puppy = await Puppy.findByIdAndRemove(id);

      if (!puppy) {
        return res.status(404).json({ message: `Cannot find any product with ID: ${id}`})
      }

      res.status(200).json(puppy);
      
    } catch (error) {
         console.log(error.message)
         res.status(500).json({message: error.message})
    }
 })


mongoose.connect(process.env.MONGO_DB_URL)
  .then(() => {
    console.log('Connected to MongoDB...')
    app.listen(process.env.PORT_API, () => {
        console.log('Start running at port 5000')
    })
    
  })
  .catch((error) => console.log(error));


module.exports = app;