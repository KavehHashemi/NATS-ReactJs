/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

const InfoDialog = ({ open, handleShow, jetstream }) => {
  return (
    <Dialog
      fullWidth={true}
      maxWidth={false}
      open={open}
      onClose={() => handleShow(false)}
    >
      <DialogTitle>{`${jetstream?.config.name}'s details`}</DialogTitle>
      <DialogContent>
        <div id="details-container">
          <p>consumers: {}</p>
          <p>name: {jetstream?.config.name}</p>
          <p onClick={(e) => console.log(jetstream?.config.subjects)}>
            subjects: {jetstream?.config.subjects}
          </p>
          <p>retention: {jetstream?.config.retention}</p>
          <p>max. consumers: {jetstream?.config.max_consumers}</p>
          <p>max. messages: {jetstream?.config.max_msgs}</p>
          <p>max. bytes: {jetstream?.config.max_bytes}</p>
          <p>max. age: {jetstream?.config.max_age}</p>
          <p>
            max. messages per subject: {jetstream?.config.max_msgs_per_subject}
          </p>
          <p>max. message size:{jetstream?.config.max_msg_size}</p>
          <p>discard: {jetstream?.config.discard}</p>
          <p>storage: {jetstream?.config.storage}</p>
          <p>number of replicas: {jetstream?.config.num_replicas}</p>
          <p>duplicate window: {jetstream?.config.duplicate_window}</p>
          <p>sealed: {jetstream?.config.sealed?.toString()}</p>
          <p>duplicate window: {jetstream?.config.duplicate_window}</p>
          <p>deny delete: {jetstream?.config.deny_delete?.toString()}</p>
          <p>deny purge: {jetstream?.config.deny_purge?.toString()}</p>
          <p>
            allow rollup headers: {jetstream?.allow_rollup_hdrs?.toString()}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InfoDialog;
