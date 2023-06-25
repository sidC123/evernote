import React from "react";
import MainScreen from "./MainScreen";
import "../App.css";
import { Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../Actions/userActions";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [picMessage, setPicMessage] = useState(null);

  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo) {
      navigate("/mynotes");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(register(name, email, password, pic));
    }
  };

  const postDetails = (pics) => {
    if (!pics) {
      return setPicMessage("Please Select An Image");
    }
    setPicMessage(null);

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "EverNote");
      data.append("cloud_name", "djzk46bkv");
      fetch("https://api.cloudinary.com/v1_1/djzk46bkv/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setPic(data.url, toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage("Please Select An Image");
    }
  };
  return (
    <MainScreen title="Register Now">
      <div className="regimg"></div>
      <div className="regContainer">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
        {picMessage && (
          <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
        )}
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3">
            <Form.Label>Enter Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Profile Picture</Form.Label>
            <Form.Control
              onChange={(e) => postDetails(e.target.files[0])}
              id="custom-file"
              type="file"
              label="Upload Profile Picture"
              custom
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            className="mt-4"
            style={{ width: "150px", height: "35px" }}
          >
            {loading && <Loading />} Submit
          </Button>
        </Form>
      </div>
    </MainScreen>
  );
};

export default RegisterScreen;
