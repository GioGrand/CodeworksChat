import { SubmissionError } from "redux-form";
import history from "../../app/common/util/history";
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError
} from "../async/asyncActions";
import moment from "moment";

export const createChat = post => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();

  try {
      console.log(post)
    dispatch(asyncActionStart());
    // create the user in firebase auth
    let createdPost = await firestore.add(
      {
        collection: "chats",
      },
      {
        content: post.content,
        createdAt: new Date(),
      }
    );
    console.log(createdPost);
    // update the auth profile

    dispatch(asyncActionFinish());
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
    throw new SubmissionError({
      _error: error.message
    });
  }
};
