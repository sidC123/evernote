import React, { useEffect, useState } from "react";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import MainScreen from "./MainScreen";
import ErrorMessage from "./ErrorMessage";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, listNotes } from "../Actions/notesActions";
import Loading from "./Loading";
import { MdDelete, MdEdit, MdAddCircleOutline } from "react-icons/md";

const MyNotes = ({ search }) => {
  const dispatch = useDispatch();

  const noteList = useSelector((state) => state.noteList);
  const { loading, notes, error } = noteList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const noteDelete = useSelector((state) => state.noteDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = noteDelete;

  const noteCreate = useSelector((state) => state.noteCreate);
  const { success: successCreate } = noteCreate;

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { success: successUpdate } = noteUpdate;

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(listNotes());
    if (!userInfo) {
      navigate("/");
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    successDelete,
    successCreate,
    successUpdate,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteNoteAction(id));
    }
  };
  return (
    <>
      <MainScreen title={`Welcome Back ${userInfo.name}`}>
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        <Link to="createnote">
          <Button
            style={{ marginLeft: 10, marginBottom: 6, width: "250px" }}
            size="lg"
          >
            <MdAddCircleOutline
              style={{
                marginLeft: "-5px",
                fontSize: "20px",
                marginRight: "4px",
                marginTop: "-3px",
              }}
            />
            Create New Note
          </Button>
        </Link>
        {notes
          ?.filter((filteredNode) =>
            filteredNode.title.toLowerCase().includes(search.toLowerCase())
          )
          .filter((filteredNode) => filteredNode.user === userInfo._id)
          .map((note, index) => (
            <Accordion key={note._id}>
              <Card style={{ margin: 10 }}>
                <Card.Header style={{ display: "flex" }}>
                  <span
                    style={{
                      color: "black",
                      textDecoration: "none",
                      flex: 1,
                      cursor: "pointer",
                      alignSelf: "center",
                      fontSize: 18,
                    }}
                  >
                    <Accordion.Header variant="link" eventkey="0">
                      {note.title}
                    </Accordion.Header>
                  </span>
                  <div>
                    <Button href={`/note/${note._id}`}>
                      <MdEdit
                        style={{
                          marginLeft: "-3px",
                          fontSize: "20px",
                          marginRight: "3px",
                          marginTop: "-2px",
                        }}
                      />
                      EDIT
                    </Button>
                    <Button
                      variant="danger"
                      className="mx-2"
                      onClick={() => deleteHandler(note._id)}
                    >
                      <MdDelete
                        style={{
                          marginLeft: "-3px",
                          fontSize: "20px",
                          marginRight: "3px",
                          marginTop: "-2px",
                        }}
                      />
                      DELETE
                    </Button>
                  </div>
                </Card.Header>
                <Accordion.Body eventkey="0">
                  <Card.Body>
                    <h4>
                      <Badge variant="success">
                        Category - {note.category}
                      </Badge>
                    </h4>
                    <blockquote className="blockquote mb-0">
                      <p>{note.content}</p>
                      <footer className="blockquote-footer">
                        Created on{" "}
                        <b title="Source Title">
                          {note.createdAt.substring(0, 10)}
                        </b>
                      </footer>
                    </blockquote>
                  </Card.Body>
                </Accordion.Body>
              </Card>
            </Accordion>
          ))}
      </MainScreen>
    </>
  );
};

export default MyNotes;
