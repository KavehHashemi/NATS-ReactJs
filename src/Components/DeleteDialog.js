import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeJetstream, listJetstreams } from "../Store/streams";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const DeleteDialog = ({ open, handleShow, jetstream }) => {
  const dispatch = useDispatch();
  const { jetstreamManager } = useSelector((state) => state.streams);
  const deleteJetstream = () => {
    dispatch(removeJetstream(jetstream));
    dispatch(listJetstreams(jetstreamManager));
    handleShow(false);
  };
  return (
    <div>
      <Dialog open={open} onClose={() => handleShow(false)}>
        <DialogTitle>{"Delete Jetstream"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`Are you sure you want to delete jetstream ${jetstream}?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleShow(false)}>Cancel</Button>
          <Button onClick={deleteJetstream}>Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteDialog;
