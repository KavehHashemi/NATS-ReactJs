/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useState } from "react";
import DeleteDialog from "./DeleteDialog";
import InfoDialog from "./InfoDialog";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/InfoOutlined";

const JetstreamComponent = ({ jetstream }) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showInfoDialog, setShowInfoDialog] = useState(false);

  const handleDeleteDialog = (show) => {
    setShowDeleteDialog(show);
  };
  const handleInfoDialog = (show) => {
    setShowInfoDialog(show);
  };

  return (
    <>
      <div className="jetstream-card">
        <div className="jetstream-card-header">
          <div className="jetstream-name">{jetstream.config.name}</div>
          <div className="jetstream-actions">
            <InfoIcon
              className="card-icon"
              fontSize="small"
              color="info"
              onClick={() => handleInfoDialog(true)}
            ></InfoIcon>
            <DeleteIcon
              className="card-icon"
              fontSize="small"
              sx={{ color: "#d18091" }}
              onClick={() => handleDeleteDialog(true)}
            ></DeleteIcon>
          </div>
        </div>
        <div className="jetstream-content">
          <div className="jetstream-subject">{jetstream.config.subjects}</div>
          <div className="jetstream-additional">
            <div>Messages: {jetstream.state.messages}</div>
            <div>Active Consumers: {jetstream.state.consumer_count}</div>
          </div>
        </div>
        <div className="jetstream-footer"></div>
      </div>
      <DeleteDialog
        jetstream={jetstream.config.name}
        open={showDeleteDialog}
        handleShow={handleDeleteDialog}
      ></DeleteDialog>
      <InfoDialog
        jetstream={jetstream}
        open={showInfoDialog}
        handleShow={handleInfoDialog}
      ></InfoDialog>
    </>
  );
};

export default JetstreamComponent;
