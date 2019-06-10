import { SubmissionError } from "redux-form";
import history from "../../app/common/util/history";
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError,
  asyncPostStart,
  asyncPostFinish,
  asyncPostError
} from "../async/asyncActions";
import moment from "moment";

export const createChat = post => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const myState = getState();
  const personal_chat = myState.firebase.profile.personal_chat;

  try {
    console.log(personal_chat);
    dispatch(asyncActionStart());

    // create the user's post

    let createdPost = await firestore.add(
      {
        collection: "chats",
        doc: personal_chat,
        subcollections: [{ collection: "posts" }]
      },
      {
        content: post.content,
        type: "right",
        createdAt: new Date()
      }
    );
    console.log(createdPost);

    // create the fake response
    setTimeout(() => {
      dispatch(asyncPostStart());
    }, 500)
    
    let createdResponse = await setTimeout(() => {
      firestore.add(
        {
          collection: "chats",
          doc: personal_chat,
          subcollections: [{ collection: "posts" }]
        },
        {
          content: "hi, this is an automatic response",
          type: "left",
          createdAt: new Date()
        }
      );
      dispatch(asyncPostFinish());
    }, 2500);

    dispatch(asyncActionFinish());
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
    throw new SubmissionError({
      _error: error.message
    });
  }
};
