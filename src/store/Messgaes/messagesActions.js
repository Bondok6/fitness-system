import axios from "axios";
import * as messageTypes from "./messagesTypess";
export const fetchContactsStart = () => {
  return {
    type: messageTypes.GET_CONTACTS_START,
  };
};
export const fetchContactsSuccess = (contacts) => {
  return {
    type: messageTypes.GET_CONTACTS_SUCCESS,
    contacts,
  };
};
export const fetchContactsFail = (error) => {
  return {
    type: messageTypes.GET_CONTACTS_FAIL,
    error,
  };
};

export const fetchConversationsStart = () => {
  return {
    type: messageTypes.GET_COVERSATIONS_START,
  };
};
export const fetchConversationsSuccess = (conversations) => {
  return {
    type: messageTypes.GET_COVERSATIONS_SUCCESS,
    conversations,
  };
};
export const fetchConversationsFail = (error) => {
  return {
    type: messageTypes.GET_COVERSATIONS_FAIL,
    error,
  };
};

export const addCoversation = (id, conversation) => {
  return {
    type: messageTypes.ADD_CONVERSATION,
    id,
    conversation,
  };
};
export const updateCoversation = (id, conversation, page) => {
  ///FOR PAGINATION
  return {
    type: messageTypes.UPDATE_CONVERSATION,
    id,
    conversation,
    page,
  };
};
export const updateCoversationByMessage = (id, message) => {
  //done
  return {
    type: messageTypes.UPDATE_CONVERSATION_BY_MESSAGE,
    id,
    message,
  };
};

export const addCoversations = (ids) => {
  return async (dispatch) => {
    try {
      dispatch(fetchConversationsStart());
      const idsArr = [];
      const idsArrIndexes = [];
      ids.map((id, index) => {
        idsArr.push(
          axios.get(
            `/conversations/${
              id._id[0] === localStorage.getItem("userId")
                ? id._id[0]
                : id._id[1]
            }/messages`
          )
        );
        idsArrIndexes.push(index);
      });
      // console.log(idsArr)
      const response = await Promise.all(idsArr);
      const allConversations = {};
      response.map((conversation) => {
        let id = conversation.data.to;
        allConversations[id] = conversation.data.docs;
      });

      dispatch(fetchConversationsSuccess(allConversations));

      // console.log(allConversations);
    } catch (err) {
      dispatch(fetchConversationsFail(err));
      console.log(err);
    }
  };
};

export const fetchContacts = (param) => {
  return async (dispatch) => {
    try {
      dispatch(fetchContactsStart());
      const res = await axios.get("/conversations");
      dispatch(fetchContactsSuccess(res.data));
      !param && dispatch(addCoversations(res.data.docs));
    } catch (err) {
      dispatch(fetchContactsFail(err));
    }
  };
};

export const clearSuccess = (current) => {
  return {
    type: messageTypes.GET_CLEAR_CONTACTS,
    current,
  };
};

export const clearContacts = (current) => {
  return async (dispatch) => {
    dispatch(clearSuccess(current));
  };
};
export const changeInput = (input) => {
  return {
    type: messageTypes.CHANGE_INPUT,
    input,
  };
};

export const changingInput = (input) => {
  return async (dispatch) => {
    dispatch(changeInput(input));
  };
};

export const setCurrentConversationSuccess = (current) => {
  return {
    type: messageTypes.GET_CURRENT_CONVERSATION,
    current,
  };
};

export const setCurrentConversation1 = (param) => {
  return async (dispatch) => {
    dispatch(setCurrentConversationSuccess(param));
  };
};

// export const fetchMessagesStart = () => {
//   return {
//     type: messageTypes.GET_MESSAGES_START,
//   };
// };
// export const fetchMessagesSuccess = (messages) => {
//   return {
//     type: messageTypes.GET_MESSAGES_SUCCESS,
//     messages,
//   };
// };
// export const fetchMessagesFail = (error) => {
//   return {
//     type: messageTypes.GET_MESSAGES_FAIL,
//     error,
//   };
// };

// export const fetchMessages = async (id) => {
//   return async (dispatch) => {
//     try {
//       dispatch(fetchMessagesStart());
//       const res = await axios.get(`/conversations/${id}/messages`);
//       dispatch(fetchMessagesSuccess(res.data));
//     } catch (err) {
//       dispatch(fetchMessagesFail(err));
//     }
//   };
// };
