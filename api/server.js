import express from "express"
import cors from "cors"
import * as dotenv from 'dotenv'
import productRouter from './routes/Product.js'
import connectDB from "./database/connection.js"
import categoryRouter from "./routes/Category.js"
import commentRouter from "./routes/Comment.js"
dotenv.config()
const app = express()
app.use(cors())
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(express.json()) 
app.use('/products',productRouter)
app.use('/categories',categoryRouter)
app.use('/',commentRouter)
const port = process.env.PORT || 8080

app.listen(port, ()=>{
    connectDB()
    console.log(`Server is running on port ${port}`);
})