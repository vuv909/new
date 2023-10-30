import axios from "axios";

const getAllCategory = async (setAllCategories) => {
  try {
    const data = await axios.get("http://localhost:9999/categories");
    if (data.status === 200) {
      console.log(data);
      setAllCategories(data.data.result);
    } else {
      console.log("cannot connect to category");
    }
  } catch (error) {
    console.log(error);
  }
};

const addProduct = async (newdata) => {
  try {
    const data = newdata;
    const response = await axios.post("http://localhost:9999/products", data);
    console.log(response);
    if (response.status === 200) {
      console.log("Add successfully");
    } else {
      console.log("Add failed!!!");
    }
  } catch (error) {
    console.log(error);
  }
};

const addCategory = async (newdata) => {
  try {
    const data = newdata;
    const response = await axios.post("http://localhost:9999/categories", data);
    console.log(response);
    if (response.status === 200) {
      console.log("Add successfully");
    } else {
      console.log("Add failed!!!");
    }
  } catch (error) {
    console.log(error);
  }
};

const getAllProduct = async (setAllProduct) => {
  try {
    const response = await axios.get("http://localhost:9999/products");
    console.log(response);
    if (response.status === 200) {
      setAllProduct(response.data.data);
      console.log("Successfully view all products");
    } else {
      console.log("failed when get data product!!!");
    }
  } catch (error) {
    console.log(error);
  }
};

const getProductById = async (id, setProduct) => {
  try {
    const response = await axios.get(`http://localhost:9999/products/${id}`);
    console.log(response);
    if (response.status === 200) {
      setProduct(response.data.data);
      console.log("Successfully get product");
    } else {
      console.log("failed when get data product!!!");
    }
  } catch (error) {
    console.log(error);
  }
};

const addComment = async (id, newdata, setNewcomment) => {
  try {
    const data = newdata;
    const response = await axios.post(
      `http://localhost:9999/products/${id}/comment`,
      data
    );
    console.log(response);
    if (response.status === 200) {
      setNewcomment(response.data.data);
      console.log("Successfully comment");
    } else {
      console.log("failed when submit comment!!!");
    }
  } catch (error) {
    console.log(error);
  }
};

const viewComment = async (id, setAllComments) => {
  try {
    const response = await axios.get(
      `http://localhost:9999/products/${id}/comment`
    );
    console.log(response);
    if (response.status === 200) {
      setAllComments(response.data.result.comments);
      console.log("Successfully get comment");
    } else {
      console.log("failed when get comment!!!");
    }
  } catch (error) {
    console.log(error);
  }
};

export default {
  getAllCategory,
  addProduct,
  addCategory,
  getAllProduct,
  getProductById,
  addComment,
  viewComment,
};
