import React from "react";
import { Button } from "react-bootstrap";
import "../App.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainScreen from "./MainScreen";

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      navigate("/mynotes");
    }
  }, [navigate]);

  return (
    <MainScreen>
      <div className="main">
        <div className="intro-text">
          <p className="smalltxt">WELCOME TO</p>
          <p className="title">EVERNOTE</p>
          <p className="subtitle">ONE SAFE PLACE FOR ALL YOUR NOTES</p>
          <div className="buttoncontainer">
            <a href="/login">
              <Button size="lg" className="landingbutton">
                LOGIN
              </Button>
            </a>
            <a href="/register">
              <Button
                size="lg"
                className="landingbutton"
                variant="outline-primary"
              >
                SIGNUP
              </Button>
            </a>
          </div>
        </div>
        <div className="mainimg"></div>
      </div>
    </MainScreen>
  );
};

export default LandingPage;
