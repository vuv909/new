import mongoose , {Schema} from 'mongoose';

const Comment = mongoose.model('Comment', new Schema({
    user : String,
    text : String,
    createAt : Date
}))

export default Comment;