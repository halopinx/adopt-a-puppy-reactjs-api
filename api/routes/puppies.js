import express from 'express'
const router = express.Router();
import { getData, getAllData, getDataById, postData, updateData, deleteData } from '../controllers/data.js'

router.get('/', getData)
router.get('/all', getAllData)
router.get('/:id', getDataById)
router.post('/', postData)
router.put('/:id', updateData)
router.delete('/:id', deleteData)

export default router;