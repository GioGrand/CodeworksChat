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
    console.log(createdNewChat.id);

    // create a new profile in firestore
    let newUser = {
      personal_chat: createdNewChat.id,
      createdAt: firestore.FieldValue.serverTimestamp()
    };
    await firestore.set(`users/${createdAnonymousUser.user.uid}`, {
      ...newUser
    });

    await dispatch(triggerFirstQuestion(createdNewChat.id));

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

export const triggerFirstQuestion = personal_chat => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  try {
    dispatch(asyncPostStart());
    // create the user in firebase auth

    await firestore.set(
      {
        collection: "quotations",
        doc: personal_chat
      },
      {
        level_1_name_asked: true,
        createdAt: new Date()
      }
    );

    await setTimeout(() => {
      firestore.add(
        {
          collection: "chats",
          doc: personal_chat,
          subcollections: [{ collection: "posts" }]
        },
        {
          content:
            "Hi, my name is Adam, and I'll help you with the quotation for your flat. Can I know your name first?",
          type: "left",
          createdAt: new Date(),
          level: "1"
        }
      );
      dispatch(asyncPostFinish());
    }, 2500);

    //      await history.push("/register");
  } catch (error) {
    console.log(error);
    dispatch(asyncPostError());
    throw new SubmissionError({
      _error: error.message
    });
  }
};
