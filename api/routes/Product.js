import express from 'express';
import Product from '../controllers/Product.js'
const productRouter = express.Router()

productRouter.post('/',Product.addNewProduct)
productRouter.get('/',Product.getAllProductController)
productRouter.get('/:id',Product.getProById)

export default productRouter