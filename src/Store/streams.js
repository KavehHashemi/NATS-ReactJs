import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { connect } from "nats.ws";

const initialState = {
  jetstreamManager: undefined,
  jetstreams: [],
  searchResults: [],
  consumers: [],
  errorMessage: null,
};

export const setUpConnection = createAsyncThunk(
  "streams/setUpConnection",
  async (serverUrl, thunkAPI) => {
    const natsConnection = await connect({ servers: [serverUrl] });
    const jetstreamManager = await natsConnection.jetstreamManager();
    return jetstreamManager;
  }
);

export const listJetstreams = createAsyncThunk(
  "streams/listJetstreams",
  async (jetstreamManager, thunkAPI) => {
    const response = await jetstreamManager.streams.list().next();
    return response;
  }
);

export const listConsumers = createAsyncThunk(
  "streams/listConsumers",
  async (config, thunkAPI) => {
    const response = await config.jetstreamManager.consumers
      .list(config.stream)
      .next();
    return response;
  }
);

export const addNewJetstream = createAsyncThunk(
  "streams/addNewStream",
  async (config, thunkAPI) => {
    const response = await config.jetstreamManager.streams.add({
      name: config.name,
      subjects: config.subjects,
    });
    return response;
  }
);

export const getJetstreamInfo = createAsyncThunk(
  "streams/getStremInfo",
  async (config, thunkAPI) => {
    const response = await config.jsm.streams.info(config.name);
    return response.config;
  }
);

export const streamsSlice = createSlice({
  name: "streams",
  initialState,
  reducers: {
    removeJetstream: (state, action) => {
      state.jetstreamManager.streams.delete(action.payload);
      state.searchResults = state.jetstreams;
    },
    searchJetstreams: (state, action) => {
      state.searchResults = state.jetstreams.filter((js) => {
        return js.config.name
          .toLowerCase()
          .includes(action.payload.toLowerCase());
      });
    },
    clearErrorMessage: (state) => {
      state.errorMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setUpConnection.fulfilled, (state, action) => {
        state.jetstreamManager = action.payload;
      })

      .addCase(listJetstreams.fulfilled, (state, action) => {
        state.jetstreams = action.payload;
        state.searchResults = state.jetstreams;
      })
      .addCase(addNewJetstream.fulfilled, (state, action) => {
        state.jetstreams.push(action.payload);
        state.searchResults = state.jetstreams;
      })
      .addCase(addNewJetstream.rejected, (state, action) => {
        state.errorMessage = action.error.message;
      })
      .addCase(getJetstreamInfo.fulfilled, (state, action) => {
        state.jetstreamInfo = action.payload;
      })
      .addCase(listConsumers.fulfilled, (state, action) => {
        console.log(action.payload);
        state.consumers = action.payload;
      });
  },
});

export const { removeJetstream, searchJetstreams, clearErrorMessage } =
  streamsSlice.actions;

export default streamsSlice.reducer;
