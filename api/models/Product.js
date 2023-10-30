import mongoose , { Schema } from 'mongoose'

const Product = mongoose.model('Product',new Schema({
    name : String , 
    price : Number,
    images : [] , //Embeded
    category: {
        type : mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    comments : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
}))
export default Product