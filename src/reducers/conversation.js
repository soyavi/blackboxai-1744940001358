const types = {
  LAST_MESSAGE_CHANGE: 'LAST_MESSAGE_CHANGE', // action type for changing the last message of a conversation
  CHAT_SESSIONS_CHANGE: 'CHAT_SESSIONS_CHANGE', // action type for changing the chat sessions of a user
  CURRENT_CONVERSATION_ID_CHANGE: 'CURRENT_CONVERSATION_ID_CHANGE', // action type for changing the current conversation ID
};

const initialState = {
  chat_sessions: 0, // number of chat sessions of the user
  lastMessage: {}, // last message of a conversation
  currentConversationId: null, // ID of the current conversation being viewed
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.CHAT_SESSIONS_CHANGE: // increment the chat session count by 1
      return {
        ...state,
        chat_sessions: state.chat_sessions + 1,
      };
    case types.CURRENT_CONVERSATION_ID_CHANGE: // change the current conversation ID
      return {
        ...state,
        currentConversationId: action.conversationId,
      };
    case types.LAST_MESSAGE_CHANGE: // change the last message of a conversation
      return {
        ...state,
        lastMessage: action.lastMessage,
      };
    default:
      return state;
  }
}
