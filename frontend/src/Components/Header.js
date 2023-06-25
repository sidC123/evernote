import React from "react";
import {
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
  Container,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../Actions/userActions";
import "../App.css";
import { MdLogout, MdPerson } from "react-icons/md";

const Header = ({ setSearch }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <Navbar bg="primary" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand>
          <Link to="/">Evernote</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="m-auto">
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={(e) => setSearch(e.target.value)}
                style={{ width: "450px" }}
              />
            </Form>
          </Nav>
          {userInfo ? (
            <Nav
              className=" my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link>
                <Link to="/mynotes">MY NOTES</Link>
              </Nav.Link>
              <NavDropdown title={userInfo?.name} id="navbarScrollingDropdown">
                <NavDropdown.Item>
                  <Nav.Link>
                    <Link to="/profile" className="color">
                      <MdPerson
                        style={{
                          fontSize: "20px",
                          marginRight: "5px",
                          marginTop: "-2px",
                        }}
                      />
                      MY PROFILE
                    </Link>
                  </Nav.Link>
                </NavDropdown.Item>
                <NavDropdown.Item onClick={logoutHandler}>
                  <Nav.Link>
                    <Link to="/logout" className="color">
                      <MdLogout
                        style={{
                          fontSize: "20px",
                          marginRight: "5px",
                          marginTop: "-2px",
                        }}
                      />
                      LOGOUT{" "}
                    </Link>
                  </Nav.Link>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          ) : (
            <Nav>
              <Nav.Link>
                <Link to="/login" className="color">
                  LOGIN
                </Link>
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
