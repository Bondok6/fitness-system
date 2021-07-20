import * as messagesTypes from "./messagesTypess";

const initialState = {
  conversations: {},
  contacts: {},
  loadingContacts: false,
  errorContacts: null,
  loadingCoversations: false,
  errorCoversations: null,
  pages: {},
  input:"",
  current:""
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    ////Contacts
    case messagesTypes.GET_CONTACTS_START:
      return {
        ...state,
        loadingContacts: true,
        errorContacts: null,
      };
    case messagesTypes.GET_CONTACTS_SUCCESS:
      return {
        ...state,
        loadingContacts: false,
        contacts: action.contacts,
      };
    case messagesTypes.GET_CONTACTS_FAIL:
      return {
        ...state,
        loadingContacts: false,
        errorContacts: action.error,
      };

    ////Messages
    case messagesTypes.GET_COVERSATIONS_START:
      return {
        ...state,
        loadingCoversations: true,
        errorCoversations: null,
      };
    case messagesTypes.GET_COVERSATIONS_SUCCESS:
      return {
        ...state,
        loadingCoversations: false,
        conversations: action.conversations,
      };
    case messagesTypes.GET_COVERSATIONS_FAIL:
      return {
        ...state,
        loadingCoversations: false,
        errorCoversations: action.error,
      };
    case messagesTypes.ADD_CONVERSATION:
      return {
        ...state,
        conversations: {
          ...state.conversations,
          [action.id]: action.conversation,
        },
      };
    case messagesTypes.UPDATE_CONVERSATION:
      return {
        ...state,
        conversations: {
          ...state.conversations,
          [action.id]: [
            ...action.conversation,
            // ...state.conversations[action.id],
          ],
        },
        pages: {
          ...state.pages,
          [action.id]: action.page,
        },
      };
    case messagesTypes.UPDATE_CONVERSATION_BY_MESSAGE:
      // console.log("here",action.id)
      return {
        ...state,
        conversations: {
          ...state.conversations,
          [action.id]: [...state.conversations[action.id], action.message],
        },
      };
    case messagesTypes.CHANGE_INPUT:
      return{
        ...state,
        input:action.input
      }  
    case messagesTypes.GET_CLEAR_CONTACTS:
      return{
        ...state,
        input:"" ,
        current:action.current
      } 
    case messagesTypes.GET_CURRENT_CONVERSATION:
      return{
        ...state,
        current:action.current
      }   
    default:
      return state;
  }
};
