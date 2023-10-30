import CategoryController  from '../repositories/Category.js'

const createCategory = async (req,res)=>{
    try {
        const {name,description} = req.body;
        const result = await CategoryController.addCategory({name,description})
        if(!result){
            res.status(500).json({message: "Failed to add category"});
        }else {
            res.status(200).json({message: "Added category successfully",result});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getAll = async (req,res)=>{
    try {
       
        const result = await CategoryController.getAllCategory()
        if(!result){
            res.status(500).json({message: "Failed to get category"});
        }else {
            res.status(200).json({message: " successfully",result});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export default {createCategory,getAll };