import express from 'express';
import categoryController from '../controllers/Category.js'
const categoryRouter = express.Router()

categoryRouter.post('/',categoryController.createCategory)

categoryRouter.get('/',categoryController.getAll)
export default categoryRouter