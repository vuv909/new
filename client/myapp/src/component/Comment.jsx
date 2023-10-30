import React, { useEffect, useState } from "react";
import api from "../connectApi/api";
import Carousel from "react-bootstrap/Carousel";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import Image from "../imgs/img.js";
import Card from "react-bootstrap/Card";
const ControlImg = styled.div`
  display: flex;
  gap: 2px;
`;
const ControlDescription = styled.div`
  text-align: start;
`;
const ControlComment = styled.div`
  margin-top: 5%;
  text-align: start;
`;
const AddDiv = styled.div`
  width: 50%;
  margin-bottom: 10px;
  display: grid;
`;
const ControlDisplayComment = styled.div`
  margin-top: 5%;
  text-align: start;
`;
const FormComment = styled.div`
  #comment{
    border: none;
    background-color: #4ba34b;
    padding: 10px;
    color: white;
    &:hover{
      background-color: green;
    }
  }
`;
const Comment = () => {
  const [newComment, setNewcomment] = useState("");
  const [user, setUser] = useState("");
  const [text, setText] = useState("");
  const [product, setProduct] = useState();
  const { id } = useParams();
  const [allComments, setAllComments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await api.getProductById(id, setProduct);
    };
    fetchData();
  }, []);

  //get comments
  useEffect(() => {
    const fetchData = async () => {
      await api.viewComment(id, setAllComments);
    };
    fetchData();
  }, []);

  console.log(product);
  const handleComment = async (id) => {
    console.log(id);
    const newdata = { user, text };

    //add comment api
    await api.addComment(id, newdata, setNewcomment);

    setUser("");
    setText("");
    document.getElementById("name").value = "";
    document.getElementById("text").value = "";
    await api.viewComment(id, setAllComments);
  };
  return (
    <div>
      <Carousel>
        {product?.images?.map((img) => (
          <Carousel.Item>
            <div style={{ width: "100%" , height : '400px' }}>
              <img
                src={img?.caption}
                style={{width:'100%',height:'500px',objectFit:'cover'}}
              />
            </div>
          </Carousel.Item>
        ))}
      </Carousel>

      <ControlDescription>
        <h1 style={{marginBottom:'2%'}}> Name : {product?.name}</h1>
        <h3> Price : {product?.price.toLocaleString("vi-VN")}đ</h3>
        <h3> Category : {product?.category?.name}</h3>
        <h3> Description : {product?.category?.description}</h3>
      </ControlDescription>
      <ControlComment>
        <h4>Comment</h4>

        <FormComment>
          <AddDiv>
            <label for="name">Username</label>
            <input
              type="text"
              id="name"
              onChange={(e) => setUser(e.target.value)}
            />
          </AddDiv>
          <AddDiv>
            <label for="text">Text</label>
            <textarea
              type="text"
              id="text"
              onChange={(e) => setText(e.target.value)}
            />
          </AddDiv>
          <button id="comment" onClick={() => handleComment(product?._id)}>Comment</button>
        </FormComment>
      </ControlComment>
      <ControlDisplayComment>
        {allComments?.map((comment) => (
          <Card body style={{ marginBottom: "1%" , backgroundColor:'#d6d2d2' }}>
            <div>
              <span style={{ fontWeight: "bolder" }}>Username : </span>
              {comment.user}
            </div>
            <div>
              <span style={{ fontWeight: "bolder" }}>Text : </span>
              {comment.text}
            </div>
          </Card>
        ))}
      </ControlDisplayComment>
    </div>
  );
};

export default Comment;
