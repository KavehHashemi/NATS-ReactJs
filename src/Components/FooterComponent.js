import React from "react";
import { useSelector } from "react-redux";

const FooterComponent = () => {
  const { jetstreamManager } = useSelector((state) => state.streams);
  let connectionStatus;
  let connectedServer;

  if (jetstreamManager !== undefined) {
    connectionStatus = jetstreamManager.nc.protocol.connected
      ? "Connected"
      : jetstreamManager.nc.protocol.connectError;
    connectedServer = jetstreamManager.nc.protocol.connected
      ? jetstreamManager.nc.protocol.server.listen
      : "";
  }

  return (
    <div className="header">
      <div className="info">
        <span className="info-span">{connectionStatus}</span>
        <span className="info-span">{connectedServer}</span>
      </div>
    </div>
  );
};

export default FooterComponent;
