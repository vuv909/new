import mongoose , {Schema} from 'mongoose';

const Image = mongoose.model('Image', new Schema({
    url : String ,
    caption : String ,
    path : String , 
    createAt : Date
}));

export default Image