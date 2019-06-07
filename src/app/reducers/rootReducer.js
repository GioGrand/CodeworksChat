import { combineReducers } from "redux";
import { reducer as FormReducer } from "redux-form";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import asyncReducer from "../../features/async/asyncReducer";

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  form: FormReducer,
  async: asyncReducer
});

export default rootReducer;
