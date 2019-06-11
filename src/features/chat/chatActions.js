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

    // get the quotation

    let tempQuotation = await firestore.get(`quotations/${personal_chat}`);

    if (
      tempQuotation.data().level_1_name_asked &&
      !tempQuotation.data().level_2_location_asked
    ) {
      console.log("siamo al livello 1");
      console.log(post.content);
      const updatedQuotation = {
        client_name: post.content,
        level_2_location_asked: true
      };
      await firestore.update(
        { collection: "quotations", doc: personal_chat },
        updatedQuotation
      );
      await firestore.update(
        { collection: "chats", doc: personal_chat },
        updatedQuotation
      );

      let createdResponse = await setTimeout(() => {
        firestore.add(
          {
            collection: "chats",
            doc: personal_chat,
            subcollections: [{ collection: "posts" }]
          },
          {
            content: "Thanks " + post.content +  ". Is your project in London?",
            type: "left",
            createdAt: new Date(),
            clientName: updatedQuotation.client_name
          }
        );
        dispatch(asyncPostFinish());
      }, 2500);
    }

    if (
      tempQuotation.data().level_1_name_asked &&
      tempQuotation.data().level_2_location_asked &&
      !tempQuotation.data().level_3_size_asked
    ) {
      console.log("siamo al livello 3");
      console.log(post.content);
      const updatedQuotation = {
        location: post.content,
        level_3_size_asked: true
      };
      await firestore.update(
        { collection: "quotations", doc: personal_chat },
        updatedQuotation
      );

      let createdResponse3 = await setTimeout(() => {
        firestore.add(
          {
            collection: "chats",
            doc: personal_chat,
            subcollections: [{ collection: "posts" }]
          },
          {
            content: "Great. Roughly, how many square meters is your flat?",
            type: "left",
            createdAt: new Date()
          }
        );
        dispatch(asyncPostFinish());
      }, 2500);
    }
    if (
      tempQuotation.data().level_1_name_asked &&
      tempQuotation.data().level_2_location_asked &&
      tempQuotation.data().level_3_size_asked &&
      !tempQuotation.data().level_4_type_asked
    ) {
      console.log("siamo al livello 3");

      console.log(post.content);
      const updatedQuotation = {
        size: post.content,
        level_4_type_asked: true
      };
      await firestore.update(
        { collection: "quotations", doc: personal_chat },
        updatedQuotation
      );

      let createdResponse4 = await setTimeout(() => {
        firestore.add(
          {
            collection: "chats",
            doc: personal_chat,
            subcollections: [{ collection: "posts" }]
          },
          {
            content:
              "Almost there. Last question: Would you like a complete refurbishment including kitchen and bathroom, or just a general refresher?",
            type: "left",
            createdAt: new Date()
          }
        );
        dispatch(asyncPostFinish());
      }, 2500);
    }
    if (
      tempQuotation.data().level_1_name_asked &&
      tempQuotation.data().level_2_location_asked &&
      tempQuotation.data().level_3_size_asked &&
      tempQuotation.data().level_4_type_asked
    ) {
      console.log("siamo al livello 4");

      const updatedQuotation = {
        type: post.content,
        level_4_type_asked: true
      };
      await firestore.update(
        { collection: "quotations", doc: personal_chat },
        updatedQuotation
      );

      let tempQuotation2 = await firestore.get(`quotations/${personal_chat}`);

      const content =
        tempQuotation.data().client_name +
        tempQuotation.data().location +
        tempQuotation.data().size +
        updatedQuotation.type +
        "";

      let createdResponse4 = await setTimeout(() => {
        firestore.add(
          {
            collection: "chats",
            doc: personal_chat,
            subcollections: [{ collection: "posts" }]
          },
          {
            content:
        
              "Awesome " +  tempQuotation.data().client_name + ". Based on the info provided I can estimate that for a " + updatedQuotation.type + " refurbishment of " + tempQuotation.data().size + " sqm in London the cost would be £13000",
            type: "left",
            createdAt: new Date()
          }
        );
        dispatch(asyncPostFinish());
      }, 2500);
    }

    // create the fake response
    setTimeout(() => {
      dispatch(asyncPostStart());
    }, 500);

    dispatch(asyncActionFinish());
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
    throw new SubmissionError({
      _error: error.message
    });
  }
};
