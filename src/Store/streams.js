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

export const addNewJetstream = createAsyncThunk(
  "streams/addNewStream",
  async (config, thunkAPI) => {
    const StreamConfig = {
      name: config.name,
      subjects: config.subjects,
      storage: config.storage,
      num_replicas: config.replication,
      retention: config.retentionPolicy,
      discard: config.discardPolicy,
      max_msgs: config.messagesLimit,
      max_msgs_per_subject: config.perSubjectMessagesLimit,
      max_bytes: config.totalStreamsize,
      max_age: config.messageTTL * 1000000000, //seconds to NANOseconds
      max_msg_size: config.maxMessageSize,
      duplicate_window: config.duplicateTrackingTimeWindow * 1000000000, //seconds to NANOseconds
      allow_rollup_hdrs: config.allowMessageRollUps,
      deny_delete: config.allowMessageDeletion,
      deny_purge: config.allowPurge,
    };
    // console.log(StreamConfig);
    const response = await config.jetstreamManager.streams.add(StreamConfig);
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

export const listConsumers = createAsyncThunk(
  "streams/listConsumers",
  async (config, thunkAPI) => {
    const response = await config.jetstreamManager.consumers
      .list(config.stream)
      .next();
    return response;
  }
);

export const purgeStream = createAsyncThunk(
  "streams/purgeStream",
  async (config, thunkAPI) => {
    const response = await config.jetstreamManager.streams.purge(config.stream);
    return response;
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
        // console.log(action);
      })
      .addCase(getJetstreamInfo.fulfilled, (state, action) => {
        state.jetstreamInfo = action.payload;
      })
      .addCase(listConsumers.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.consumers = action.payload;
      })
      .addCase(purgeStream.fulfilled, (state, action) => {
        console.log("stream purged");
      });
  },
});

export const { removeJetstream, searchJetstreams, clearErrorMessage } =
  streamsSlice.actions;

export default streamsSlice.reducer;
