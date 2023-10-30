import mongoose , {Schema} from "mongoose";

const Category = mongoose.model("Category",new Schema({
    name : String,
    description : String
}))

export default Category;