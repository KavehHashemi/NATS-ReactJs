/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listConsumers } from "../Store/streams";

const ConsumersComponent = ({ jetstream }) => {
  const dispatch = useDispatch();
  const { jetstreamManager, consumers } = useSelector((state) => state.streams);
  const config = { stream: jetstream, jetstreamManager: jetstreamManager };
  const [consumersList, setConsumersList] = useState([]);
  dispatch(listConsumers(config));
  let counter = 0;
  useEffect(() => {
    consumers.map((c) => {
      setConsumersList([...consumersList, <p key={counter}>{c.name}</p>]);
      counter++;
    });
  }, [consumers]);
  console.log(consumersList);
  // const consumersList = [];
  // let counter = 0;
  // consumers?.map((c) => {
  //   consumersList.push(<span key={counter}>c.name</span>);
  //   counter++;
  // });

  return (
    <>
      <div>{consumersList}</div>
    </>
  );
};

export default ConsumersComponent;
