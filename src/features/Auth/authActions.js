import { SubmissionError } from "redux-form";
import history from "../../app/common/util/history";
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError
} from "../async/asyncActions";


export const anonymousCreateChat = address => async (
    dispatch,
    getState,
    { getFirebase, getFirestore }
  ) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    try {
      dispatch(asyncActionStart());
      // create the user in firebase auth
      let createdAnonymousUser = await firebase.auth().signInAnonymously();
      console.log(createdAnonymousUser.user.uid);
      // update the auth profile
      let newChat = {
        create_by: createdAnonymousUser.user.uid,
        createdAt: firestore.FieldValue.serverTimestamp()
      };
      let createdNewChat = await firestore.add(`chats`, newChat);
      console.log(createdNewChat.id)

  
      // create a new profile in firestore
      let newUser = {
        personal_chat: createdNewChat.id,
        createdAt: firestore.FieldValue.serverTimestamp()
      };
      await firestore.set(`users/${createdAnonymousUser.user.uid}`, {
        ...newUser
      });
      dispatch(asyncActionFinish());
//      await history.push("/register");
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
      throw new SubmissionError({
        _error: error.message
      });
    }
  };
