import React, { useEffect } from "react";
import MainScreen from "./MainScreen";
import "../App.css";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Actions/userActions";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate("/mynotes");
      console.log("hey");
    }
  }, [navigate, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <MainScreen title="LOGIN">
      <div className="loginimg"></div>
      <div className="loginContainer">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            style={{ width: "150px", height: "35px" }}
          >
            {loading && <Loading />} Submit
          </Button>
        </Form>
        <Row>
          <Col className="mt-2">
            New User ?
            <Link to="/register" style={{ color: "black" }}>
              &nbsp; <b>Click Here</b>
            </Link>
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};

export default LoginScreen;
