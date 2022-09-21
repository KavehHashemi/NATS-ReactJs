import React from "react";
import { useDispatch } from "react-redux";
import { searchJetstreams } from "../Store/streams";
import TextField from "@mui/material/TextField";

const SearchComponent = () => {
  const dispatch = useDispatch();
  return (
    <div className="search-div">
      <TextField
        label="Search Jetstreams"
        autoFocus={true}
        size="small"
        variant="outlined"
        className="search-field"
        onChange={(e) => {
          dispatch(searchJetstreams(e.target.value));
        }}
      />
    </div>
  );
};

export default SearchComponent;
