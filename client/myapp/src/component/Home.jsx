import React, { useEffect } from "react";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import api from "../connectApi/api.js";
import Image from "../imgs/img.js";
import { useNavigate } from "react-router-dom";
const Container = styled.div``;
const ButtonAddProduct = styled.button`
  border: none;
  background-color: #96ef80;
  padding: 10px;
  margin-right: 10px;
  cursor: pointer;
  &:hover {
    background-color: #47f01d;
  }
`;
const ButtonAddCategory = styled.button`
  border: none;
  background-color: #8780ef;
  padding: 10px;
  margin-right: 10px;
  &:hover {
    background-color: #392bf6;
  }
`;
const AddDiv = styled.div`
  margin-bottom: 10px;
  display: grid;
`;
const ProductControl = styled.div`
  margin-top: 3%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;
const Home = () => {
  const navigate = useNavigate();
  const [allProduct, setAllProduct] = useState();

  const [showProductModal, setShowProductModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  const handleCloseProductModal = () => setShowProductModal(false);
  const handleShowProductModal = () => setShowProductModal(true);

  const handleCloseCategoryModal = () => setShowCategoryModal(false);
  const handleShowCategoryModal = () => setShowCategoryModal(true);

  const [files, setFile] = useState([]);
  const [allCategories, setAllCategories] = useState();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  //add cate
  const [newCategory, setNewCategory] = useState();
  const [nameCate, setCateName] = useState("");
  const [desc, setDesc] = useState("");
  const [newdata, setNewdata] = useState("");
  //call api get all products
  useEffect(() => {
    const fetchData = async () => {
      await api.getAllProduct(setAllProduct);
    };
    fetchData();
  }, []);

  //call api get all categories
  useEffect(() => {
    const fetchData = async () => {
      await api.getAllCategory(setAllCategories);
    };
    fetchData();
  }, [newCategory]);

  console.log(allCategories);

  const [images, setImages] = useState([]);

  const handleChangeFile = async (e) => {
    console.log("hello");
    console.log(e.target.files);
    setFile(e.target.files);
    setImages([]);
    for (let i = 0; i < e.target.files.length; i++) {
      const file = e.target.files[i];
      const imgConvert = await readFileAsDataURL(file);

      setImages((prevImages) => [
        ...prevImages,                  
        { url: "web.com", caption: imgConvert, path: "local" },
      ]);
    }
  };

  const readFileAsDataURL = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();

      reader.onload = () => {
        console.log(file.name); // Log the file name
        console.log(reader.result); // Log the base64 data
        resolve(reader.result);
      };

      reader.readAsDataURL(file);
    });
  };

  const handleAdd = async () => {
    console.log(files);

    // for (const { name, type } of files) {
    //   setImages(images.push({ url: "web.com", caption: name, path: type }));
    // }
    console.log("Name:", name);
    console.log("Price:", price);
    console.log("Category:", category);
    console.log("Images:", images);

    const data = {
      name,
      price,
      images,
      category,
    };

    await api.addProduct(data);

    setImages([]);
    setName("");
    setPrice("");
    setCategory("");
    setFile([]);
    setFile([]);
    await api.getAllProduct(setAllProduct);
    handleCloseProductModal();
  };

  useEffect(() => {
    console.log("this is images");
    console.log(images);
  }, [images]);

  const handleAddCategory = async () => {
    console.log("CateName:", nameCate);
    console.log("Desc:", desc);

    const data = { name: nameCate, description: desc };

    await api.addCategory(data);
    setNewCategory(data);
    setCateName("");
    setDesc("");
    handleCloseCategoryModal();
  };

  return (
    <Container>
      <div>
        <ButtonAddProduct variant="primary" onClick={handleShowProductModal}>
          Add product
        </ButtonAddProduct>

        <Modal
          show={showProductModal}
          onHide={handleCloseProductModal}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddDiv>
              <label for="name">Name</label>
              <input
                type="text"
                id="name"
                onChange={(e) => setName(e.target.value)}
              />
            </AddDiv>
            <AddDiv>
              <label for="price">Price</label>
              <input
                type="number"
                id="price"
                onChange={(e) => setPrice(e.target.value)}
              />
            </AddDiv>
            <AddDiv>
              <label for="cate">Category</label>
              <select id="cate" onChange={(e) => setCategory(e.target.value)}>
                <option></option>
                {allCategories?.map((category) => (
                  <option key={category?._id} value={category?._id}>
                    {category?.name}
                  </option>
                ))}
              </select>
            </AddDiv>
            <AddDiv>
              <label for="img">Image</label>
              <input
                type="file"
                id="img"
                multiple
                onChange={handleChangeFile}
              />
            </AddDiv>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseProductModal}>
              Close
            </Button>
            <Button variant="primary" onClick={handleAdd}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
        <ButtonAddCategory onClick={handleShowCategoryModal}>
          Add category
        </ButtonAddCategory>
        <Modal
          show={showCategoryModal}
          onHide={handleCloseCategoryModal}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddDiv>
              <label for="nameCate">Name</label>
              <input
                type="text"
                id="nameCate"
                onChange={(e) => setCateName(e.target.value)}
              />
            </AddDiv>
            <AddDiv>
              <label for="des">Description</label>
              <textarea
                type="text"
                id="des"
                onChange={(e) => setDesc(e.target.value)}
              />
            </AddDiv>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseCategoryModal}>
              Close
            </Button>
            <Button variant="primary" onClick={handleAddCategory}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <ProductControl>
        {allProduct?.map((product) => (
          <Card
            style={{
              width: "98%",
              marginLeft: "auto",
              marginRight: "auto",
              marginBottom: "2%",
            }}
          >
            <Card.Img
              variant="top"
              style={{ height: "300px" , objectFit:'cover' }}
              src={product.images[0]?.caption}
            />
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
              <Card.Text>
                Price : {product.price.toLocaleString("vi-VN")}đ
              </Card.Text>
              <Card.Text>Category : {product.category.name}</Card.Text>
              <Button
                variant="primary"
                onClick={() => navigate(`/comment/${product._id}`)}
              >
                Comment
              </Button>
            </Card.Body>
          </Card>
        ))}
      </ProductControl>
    </Container>
  );
};

export default Home;
