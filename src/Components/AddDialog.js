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
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Switch from "@mui/material/Switch";

const AddDialog = ({ open, openHandler }) => {
  const dispatch = useDispatch();
  const { jetstreamManager } = useSelector((state) => state.streams);

  const [jetstreamName, setJetstreamName] = useState("");
  const [subjects, setSubjects] = useState([]);

  const [storage, setStorage] = useState("file");
  const [replication, setReplication] = useState(1);
  const [retentionPolicy, setRetentionPolicy] = useState("limits");
  const [discardPolicy, setDiscardPolicy] = useState("old");
  const [messagesLimit, setMessagesLimit] = useState(-1);
  const [perSubjectMessagesLimit, setPerSubjectMessagesLimit] = useState(-1);
  const [totalStreamsize, setTotalStreamsize] = useState(-1);
  const [messageTTL, setMessageTTL] = useState(0);
  const [maxMessageSize, setMaxMessageSize] = useState(-1);
  const [duplicateTrackingTimeWindow, setDuplicateTrackingTimeWindow] =
    useState(0);
  const [allowMessageRollUps, setAllowMessageRollUps] = useState(false);
  const [allowMessageDeletion, setAllowMessageDeletion] = useState(true);
  const [allowPurge, setAllowPurge] = useState(true);

  const addJetstream = () => {
    let config = {
      jetstreamManager: jetstreamManager,
      name: jetstreamName,
      // subjects: [subject],
      subjects: subjects,
      storage: storage,
      replication: replication,
      retentionPolicy: retentionPolicy,
      discardPolicy: discardPolicy,
      messagesLimit: messagesLimit,
      perSubjectMessagesLimit: perSubjectMessagesLimit,
      totalStreamsize: totalStreamsize,
      messageTTL: messageTTL,
      maxMessageSize: maxMessageSize,
      duplicateTrackingTimeWindow: duplicateTrackingTimeWindow,
      allowMessageRollUps: !allowMessageRollUps,
      allowMessageDeletion: !allowMessageDeletion,
      allowPurge: !allowPurge,
    };
    dispatch(addNewJetstream(config));
  };

  const setMultipleSubjects = (subjectsArray) => {
    let array = subjectsArray.split(",");
    setSubjects(array);
  };

  return (
    <Dialog
      fullWidth={true}
      maxWidth={"md"}
      open={open}
      onClose={() => {
        openHandler(false);
      }}
    >
      <DialogTitle>{"Add a new jetstream"}</DialogTitle>
      <DialogContent style={{ padding: "0.5rem 1.5rem" }}>
        <FormControl
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <div className="addjet-section">
            <TextField
              autoFocus
              margin="normal"
              size="small"
              label="Jetstream Name"
              type="text"
              variant="outlined"
              sx={{ width: "45%" }}
              value={jetstreamName}
              onChange={(e) => setJetstreamName(e.target.value)}
            />
            <TextField
              margin="normal"
              size="small"
              sx={{ width: "45%" }}
              label="Subject"
              type="text"
              variant="outlined"
              value={subjects}
              onChange={(e) => setMultipleSubjects(e.target.value)}
            />
          </div>
          <div className="addjet-section">
            <div className="radio-group">
              <FormLabel>Storage</FormLabel>
              <RadioGroup
                row
                value={storage}
                onChange={(e) => setStorage(e.target.value)}
              >
                <FormControlLabel
                  value="file"
                  control={<Radio size="small" />}
                  label="File"
                />
                <FormControlLabel
                  value="memory"
                  control={<Radio size="small" />}
                  label="Memory"
                />
              </RadioGroup>
            </div>
            <div className="radio-group">
              <FormLabel>Discard Policy</FormLabel>
              <RadioGroup
                row
                value={discardPolicy}
                onChange={(e) => setDiscardPolicy(e.target.value)}
              >
                <FormControlLabel
                  value="old"
                  control={<Radio size="small" />}
                  label="Old"
                />
                <FormControlLabel
                  value="new"
                  control={<Radio size="small" />}
                  label="New"
                />
              </RadioGroup>
            </div>
            <div className="radio-group">
              <FormLabel>Retention Policy</FormLabel>
              <RadioGroup
                row
                className="radio-group-font"
                value={retentionPolicy}
                onChange={(e) => setRetentionPolicy(e.target.value)}
              >
                <FormControlLabel
                  className="radio-group-font"
                  value="limits"
                  control={<Radio size="small" />}
                  label="Limits"
                />
                <FormControlLabel
                  className="radio-group-font"
                  value="interest"
                  control={<Radio size="small" />}
                  label="Interest"
                />
                <FormControlLabel
                  className="radio-group-font"
                  value="workqueue"
                  control={<Radio size="small" />}
                  label="Work Queue"
                />
              </RadioGroup>
            </div>
          </div>
          <div className="addjet-section">
            <TextField
              margin="normal"
              size="small"
              sx={{ width: "30%" }}
              label="Replication"
              type="number"
              fullWidth
              variant="outlined"
              value={replication}
              onChange={(e) => setReplication(e.target.value)}
            />

            <TextField
              margin="normal"
              size="small"
              sx={{ width: "30%" }}
              label="Messages Limit"
              type="number"
              fullWidth
              variant="outlined"
              value={messagesLimit}
              onChange={(e) => setMessagesLimit(e.target.value)}
            />

            <TextField
              margin="normal"
              size="small"
              sx={{ width: "30%" }}
              label="Per Subject Messages Limit"
              type="number"
              fullWidth
              variant="outlined"
              value={perSubjectMessagesLimit}
              onChange={(e) => setPerSubjectMessagesLimit(e.target.value)}
            />

            <TextField
              margin="normal"
              size="small"
              sx={{ width: "30%" }}
              label="Total Stream Size"
              type="number"
              fullWidth
              variant="outlined"
              value={totalStreamsize}
              onChange={(e) => setTotalStreamsize(e.target.value)}
            />

            <TextField
              margin="normal"
              size="small"
              sx={{ width: "30%" }}
              label="Message TTL"
              type="number"
              fullWidth
              variant="outlined"
              value={messageTTL}
              onChange={(e) => setMessageTTL(e.target.value)}
            />

            <TextField
              margin="normal"
              size="small"
              sx={{ width: "30%" }}
              label="Max Message Size"
              type="number"
              fullWidth
              variant="outlined"
              value={maxMessageSize}
              onChange={(e) => setMaxMessageSize(e.target.value)}
            />

            <TextField
              margin="normal"
              size="small"
              sx={{ width: "30%" }}
              label="Duplicate Tracking Time Window"
              type="number"
              // placeholder="0h1m2s"
              fullWidth
              variant="outlined"
              value={duplicateTrackingTimeWindow}
              onChange={(e) => setDuplicateTrackingTimeWindow(e.target.value)}
            />
          </div>
          <div className="addjet-section">
            <div className="switch-group">
              <FormLabel>Allow Message Roll-Ups</FormLabel>
              <Switch
                size="small"
                checked={allowMessageRollUps}
                onChange={(e) => setAllowMessageRollUps(e.target.checked)}
              ></Switch>
            </div>
            <div className="switch-group">
              <FormLabel>Allow Message Deletion</FormLabel>
              <Switch
                size="small"
                checked={allowMessageDeletion}
                onChange={(e) => setAllowMessageDeletion(e.target.checked)}
              ></Switch>
            </div>
            <div className="switch-group">
              <FormLabel>Allow Purge</FormLabel>
              <Switch
                size="small"
                checked={allowPurge}
                onChange={(e) => setAllowPurge(e.target.checked)}
              ></Switch>
            </div>
          </div>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => openHandler(false)}>Cancel</Button>
        <Button
          onClick={() => {
            addJetstream();
            openHandler(false);
            setJetstreamName("");
            setSubjects([]);
          }}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddDialog;
