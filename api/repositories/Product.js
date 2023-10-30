import Product from "../models/Product.js";
import Image from "../models/Image.js";
import Category from "../models/Category.js";
const create = async ({ name, price, images = [], category }) => {
  try {
    const productData = await Product.create({ name, price, category });
    for (const { url, caption, path } of images) {
      const imageData = await Image.create({
        url,
        caption,
        path,
        createAt: Date.now(),
      });
      productData.images.push({
        _id: imageData._id,
        url,
        caption,
      });
    }
    await productData.save();
    return productData;
  } catch (err) {
    console.log(err);
  }
};

const getProductbyId = async (id) => {
  try {
    const data = await Product.findOne({ _id: id }).populate("category");
    return data;
  } catch (error) {
    console.log(error);
  }
};


const getAllProduct = async () => {
  try {
    const data = await Product.find().populate("category");
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default { create, getAllProduct , getProductbyId };
