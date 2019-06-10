import { createReducer } from "../../app/common/util/reducerUtil";
import {
  ASYNC_ACTION_START,
  ASYNC_ACTION_FINISH,
  ASYNC_ACTION_ERROR,
  ASYNC_POST_START,
  ASYNC_POST_FINISH,
  ASYNC_POST_ERROR
} from "./asyncConstants";

const initialState = {
  loading: false,
  loadingPost: false
};

export const asyncActionStarted = (state, payload) => {
  return { ...state, loading: true };
};

export const asyncActionFinished = state => {
  return { ...state, loading: false };
};

export const asyncActionError = state => {
  return { ...state, loading: false };
};

export const asyncPostStarted = (state, payload) => {
  return { ...state, loadingPost: true };
};

export const asyncPostFinished = state => {
  return { ...state, loadingPost: false };
};

export const asyncPostError = state => {
  return { ...state, loadingPost: false };
};

export default createReducer(initialState, {
  [ASYNC_ACTION_START]: asyncActionStarted,
  [ASYNC_ACTION_FINISH]: asyncActionFinished,
  [ASYNC_ACTION_ERROR]: asyncActionError,
  [ASYNC_POST_START]: asyncPostStarted,
  [ASYNC_POST_FINISH]: asyncPostFinished,
  [ASYNC_POST_ERROR]: asyncPostError
});
