/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useState } from "react";
import DeleteDialog from "./DeleteDialog";
import InfoDialog from "./InfoDialog";
import PurgeDialog from "./PurgeDialog";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/InfoOutlined";
import Clearicon from "@mui/icons-material/CleaningServicesOutlined";

const JetstreamComponent = ({ jetstream }) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showInfoDialog, setShowInfoDialog] = useState(false);
  const [showPurgeDialog, setShowPurgeDialog] = useState(false);

  const handleDeleteDialog = (show) => {
    setShowDeleteDialog(show);
  };
  const handleInfoDialog = (show) => {
    setShowInfoDialog(show);
  };
  const handlePurgeDialog = (show) => {
    setShowPurgeDialog(show);
  };

  const subjectsArray = [];
  let counter = 0;
  jetstream.config.subjects.map((subj) => {
    subjectsArray.push(
      <span className="subjects" key={counter}>
        {subj}
      </span>
    );
    counter++;
  });

  return (
    <>
      <div className="jetstream-card">
        <div className="jetstream-card-header">
          <div className="jetstream-name">{jetstream.config.name}</div>
          <div className="jetstream-actions">
            <Clearicon
              className="card-icon"
              fontSize="small"
              sx={{ color: "orange" }}
              onClick={() => handlePurgeDialog(true)}
            ></Clearicon>
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
          <div className="jetstream-subject">{subjectsArray}</div>
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
      <PurgeDialog
        jetstream={jetstream.config.name}
        open={showPurgeDialog}
        handleShow={handlePurgeDialog}
      ></PurgeDialog>
    </>
  );
};

export default JetstreamComponent;
