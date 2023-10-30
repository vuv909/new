import Comment from "../models/Comment.js";
import Product from "../models/Product.js";
import mongoose from "mongoose";
const addComment = async ({ productId, user, text, createAt }) => {
  try {
    const addData = await Comment.create({ user, text, createAt });
    const product = await Product.findOne({ _id: productId });
    if (!product) {
      console.log("Product not found");
      return null;
    }
    product.comments.push(addData._id);

    await product.save();
    return addData;
  } catch (error) {
    console.log(error);
  }
};

const getAllData = async ({ productId }) => {
  try {
    const getAll = await Product.findOne({ _id: productId }).populate(
      "comments"
    );
    return getAll;
  } catch (error) {
    console.log(error);
  }
};

export default { addComment, getAllData };
