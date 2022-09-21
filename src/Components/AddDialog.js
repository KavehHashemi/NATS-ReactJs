import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewJetstream } from "../Store/streams";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

const AddDialog = ({ open, openHandler }) => {
  const dispatch = useDispatch();
  const { jetstreamManager } = useSelector((state) => state.streams);
  const [jetstreamName, setJetstreamName] = useState("");
  const [subject, setSubject] = useState("");

  const addJetstream = () => {
    let config = {
      name: jetstreamName,
      subjects: [subject],
      jetstreamManager: jetstreamManager,
    };
    dispatch(addNewJetstream(config));
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        openHandler(false);
      }}
    >
      <DialogTitle>{"Add a new jetstream"}</DialogTitle>
      <DialogContent style={{ padding: "0.5rem 1.5rem" }}>
        <TextField
          autoFocus
          margin="normal"
          size="small"
          label="Jetstream Name"
          type="text"
          fullWidth
          variant="outlined"
          value={jetstreamName}
          onChange={(e) => setJetstreamName(e.target.value)}
        />
        <TextField
          margin="normal"
          size="small"
          label="Subject"
          type="text"
          fullWidth
          variant="outlined"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => openHandler(false)}>Cancel</Button>
        <Button
          onClick={() => {
            addJetstream();
            openHandler(false);
            setJetstreamName("");
            setSubject("");
          }}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddDialog;
