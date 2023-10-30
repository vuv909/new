import Product from '../repositories/Product.js'

const addNewProduct = async (req,res) => {
    try{
    const { name, price, images, category } = req.body;
    const result = await Product.create({ name, price, images, category });
    console.log(result);
    if(!result){
        res.status(500).json({
            message: 'Create product failed'
        })
    }else{
        res.status(200).json({
            message: 'Create product successfully'
        })
    }

    }catch(err){
        res.status(500).json({
            erros: error.toString()
        })
    }
}

const getAllProductController = async (req,res)=>{
    try {
        const result = await Product.getAllProduct()
        if(!result){
            res.status(500).json({
                message: 'Failed when get all products'
            })
        }else{
            res.status(200).json({
                message: 'Get all successfully',
                data : result
            })
        }
    } catch (error) {
        res.status(500).json({
            erros: error.toString()
        })
    }
}

const getProById = async (req,res)=>{
    try {
        const id = req.params.id
        const result = await Product.getProductbyId(id)
        if(!result){
            res.status(500).json({
                message: 'Failed when get all products'
            })
        }else{
            res.status(200).json({
                message: 'Get product',
                data : result
            })
        }
    } catch (error) {
        res.status(500).json({
            erros: error.toString()
        })
    }
}

export default {addNewProduct , getAllProductController , getProById}