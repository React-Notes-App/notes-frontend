import React from "react";
import { useState } from "react";
import { useNoteAppContext } from "../Provider/NoteAppProvider";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { FormCheck, FormControl, InputGroup } from "react-bootstrap";
import CreateLabelDropDown from "./CreateLabelDropDown";
import AddBoxIcon from "@mui/icons-material/AddBox";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

function AddNote({param_id, param_name, param_is_archived}) {
  const { createNote } = useNoteAppContext();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [noteTitle, setNoteTitle] = useState("");
  const [noteItem, setNoteItem] = useState("");

  const [labelId, setLabelId] = useState("");
  const [label_name, setLabel_Name] = useState("");
  const [labelPreview, setLabelPreview] = useState("");

  const itemCharacterLimit = 200;

  const titleCharacterLimit = 20;

  const handleTitleChange = (event) => {
    if (titleCharacterLimit - event.target.value.length >= 0) {
      setNoteTitle(event.target.value);
    }
  };

  const handleItemChange = (event) => {
    if (itemCharacterLimit - event.target.value.length >= 0) {
      setNoteItem(event.target.value);
    }
  };
  const handleSaveClick = () => {
    if (noteTitle.trim().length > 0) {
      createNote(noteTitle, noteItem, label_name, labelId, param_is_archived);
      setNoteTitle("");
      setNoteItem("");
      setLabel_Name("");
      setLabelId("");
      setLabelPreview("");
      handleClose();
    } else {
      alert("Please enter a title");
    }
    setNoteTitle("");
  };

  const clearLabelPreview = () => {
    setLabelPreview("");
    setLabelId("");
    setLabel_Name("");
  }

  return (
    <div>
      <AddBoxIcon sx={{ fontSize: 60 }} className="me-2" onClick={handleShow} />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header
          className="border-0 justify-content-center"
          style={{ paddingBottom: "0px" }}
        >
          <InputGroup className="align-items-center">
            <FormControl
              style={{
                border: "none",
                backgroundColor: "transparent",
                fontSize: "1rem",
                paddingLeft: "0px",
              }}
              aria-label="noteTitle"
              aria-describedby="basic-addon1"
              placeholder="Title"
              onChange={handleTitleChange}
              value={noteTitle}
            />
          </InputGroup>
        </Modal.Header>
        <Modal.Body
          className="border-0"
          style={{ paddingBottom: "0px", paddingTop: "0px" }}
        >
          <InputGroup className="mb-3 align-items-center">
            <FormCheck />
            <FormControl
              style={{
                border: "none",
                backgroundColor: "transparent",
                fontSize: "1rem",
              }}
              aria-label="noteItem"
              aria-describedby="basic-addon1"
              placeholder="Item"
              onChange={handleItemChange}
              value={noteItem}
            />
          </InputGroup>
          <hr style={{ marginLeft: ".5rem", marginRight: ".5rem" }} />
          {labelPreview ? (
            <div
              className="d-flex align-items-center"
              style={{ marginBottom: ".5rem" }}
            >
              <small className="note-label">{labelPreview}</small>
              <HighlightOffIcon
                className="label-delete-icon"
                style={{ marginLeft: ".5rem", marginRight: ".5rem" }}
                label={labelPreview}
                onClick={clearLabelPreview}
              />
            </div>
          ) : null}
        </Modal.Body>
        <Modal.Footer className="border-0 d-flex justify-content-between">
          <CreateLabelDropDown
            label_name={label_name}
            setLabel_Name={setLabel_Name}
            setLabelPreview={setLabelPreview}
            labelId={labelId}
            setLabelId={setLabelId}
            param_id={param_id}
            param_name={param_name}
          />
          <div>
            <Button
              variant="secondary"
              style={{ marginLeft: ".5em" }}
              onClick={handleClose}
            >
              Close
            </Button>
            <Button
              variant="primary"
              style={{ marginLeft: ".5em" }}
              onClick={handleSaveClick}
            >
              Save
            </Button>
          </div>
        </Modal.Footer>
      </Modal>

      {/* <div
        className="modal fade"
        id="newNoteModal"
        tabIndex="-1"
        aria-labelledby="newNoteModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="newNoteModalLabel">
                Create a New Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <textarea
                rows="1"
                cols="55"
                placeholder="Title"
                onChange={handleTitleChange}
                value={noteTitle}
                id="noteTitle"
              ></textarea>
              <hr className="border border-1 opacity-50"></hr>
              <textarea
                rows="10"
                cols="55"
                placeholder="Type to add a note..."
                onChange={handleTextChange}
                value={noteText}
                id="noteText"
              ></textarea>
            </div>
            <div className="modal-footer justify-content-between">
              <small>{textCharacterLimit - noteText.length}</small>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSaveClick}
                data-bs-dismiss="modal"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default AddNote;
