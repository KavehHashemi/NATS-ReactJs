/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React from "react";
import { useEffect } from "react";
import { Nuid } from "nats.ws";
import JetstreamComponent from "./JetstreamComponent";
import { listJetstreams } from "../Store/streams";
import { useSelector, useDispatch } from "react-redux";

const JetstreamsComponent = () => {
  const dispatch = useDispatch();
  const { jetstreamManager, searchResults } = useSelector(
    (state) => state.streams
  );

  useEffect(() => {
    if (jetstreamManager !== undefined)
      dispatch(listJetstreams(jetstreamManager));
  }, [jetstreamManager]);

  const jetstreamArray = [];
  searchResults?.map((js) => {
    jetstreamArray.push(
      <JetstreamComponent
        jetstream={js}
        key={new Nuid().seq}
      ></JetstreamComponent>
    );
  });
  return (
    <div className="jetstream-container">
      <div className="jetstream-header">
        <div>Jetstreams</div>
      </div>
      <div className="jetstream-list">{jetstreamArray}</div>
    </div>
  );
};

export default JetstreamsComponent;
