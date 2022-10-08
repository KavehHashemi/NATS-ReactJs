import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { purgeStream, listJetstreams } from "../Store/streams";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const PurgeDialog = ({ open, handleShow, jetstream }) => {
  const dispatch = useDispatch();
  const { jetstreamManager } = useSelector((state) => state.streams);
  const purgeJetstream = () => {
    const config = { stream: jetstream, jetstreamManager: jetstreamManager };
    dispatch(purgeStream(config));
    dispatch(listJetstreams(jetstreamManager));
    handleShow(false);
  };
  return (
    <div>
      <Dialog open={open} onClose={() => handleShow(false)}>
        <DialogTitle>{"Purge Jetstream"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`Are you sure you want to purge jetstream ${jetstream}?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleShow(false)}>Cancel</Button>
          <Button onClick={purgeJetstream}>Purge</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PurgeDialog;
