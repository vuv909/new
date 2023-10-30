import Category from '../models/Category.js'

const addCategory = async ({name,description})=>{
    try {
        const add = await Category.create({name, description})
        return add;
    } catch (error) {
        console.log(error);
    }
}

const getAllCategory = async ()=>{
    try {
        const data = await Category.find()
        return data;
    } catch (error) {
        console.log(error);
    }
}

export default {addCategory,getAllCategory}