import commentRepo from "../repositories/Comment.js";

const createComment = async (req, res) => {
  try {
    const id = req.params.productId;
    const productId = id;
    const { user, text, createAt } = req.body;
    const result = await commentRepo.addComment({
      productId,
      user,
      text,
      createAt: Date.now(),
    });
    if (!result) {
      res.status(500).json({ message: "Failed to add comment" });
    } else {
      res.status(200).json({ message: "Added comment successfully", result });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllComment = async (req, res) => {
  try {
    const id = req.params.productId;
    const productId = id;
    const result = await commentRepo.getAllData({ productId });
    if (!result) {
      res.status(500).json({ message: "Failed to get data comment" });
    } else {
      if (result.length === 0) {
        res.status(200).json({ message: "Empty data" });
      } else {
        res
          .status(200)
          .json({ message: "Get data comment successfully", result });
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default { createComment, getAllComment };
