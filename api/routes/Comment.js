import CommentController from '../controllers/Comment.js'
import express from 'express'
const commentRouter = express.Router()

commentRouter.post('/products/:productId/comment',CommentController.createComment)
commentRouter.get('/products/:productId/comment',CommentController.getAllComment)

export default commentRouter