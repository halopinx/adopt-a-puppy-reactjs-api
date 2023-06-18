import Puppy from "../models/puppyModel.js";

export const getData = async (req, res) => {
    try {
      const puppies = await Puppy.find().sort({ createdAt:-1 })
      res.status(200).json(puppies);
    } catch (error) {
         console.log(error.message)
         res.status(500).json({message: error.message})
    }
 }

export const getDataById = async (req, res) => {
  try {
    const { id } = req.params;
    const puppy = await Puppy.findById(id)
    res.status(200).json(puppy);
  } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
  }
}

export const postData = async (req, res) => {
  try {
    const puppy = await Puppy.create(req.body)
    res.status(200).json(puppy);
  } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
  }
}

export const updateData = async (req, res) => {
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
}

export const deleteData = async (req, res) => {
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
}