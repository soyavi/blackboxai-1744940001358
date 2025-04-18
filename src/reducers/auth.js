// Define action types as constants
const types = {
  AUTH_CHANGE: 'AUTH_CHANGE',
  USER_INFO_CHANGE: 'USER_INFO_CHANGE',
  PROFILE_CHANGES: 'PROFILE_CHANGES',
  ACCESS_TOKEN_CHANGE: 'ACCESS_TOKEN_CHANGE',
};

// Define the initial state for the reducer
const initialState = {
  isLogged: false, // Whether the user is currently logged in or not
  user: {}, // User object containing user information
  isProfileChanges: 0, // Counter to track profile changes
};

// Define the reducer function that handles state changes
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.AUTH_CHANGE:
      // If the action is to change authentication status, return new state with updated values
      return {
        ...state,
        isLogged: !state.isLogged, // Toggle isLogged value to the opposite of current value
        user: action.user, // Update user information in state
      };
    case types.USER_INFO_CHANGE:
      // If the action is to change user information, return new state with updated values
      return {
        ...state,
        user: action.user, // Update user information in state
      };
    case types.PROFILE_CHANGES:
      // If the action is to change profile information, return new state with updated values
      return {
        ...state,
        isProfileChanges: state.isProfileChanges + 1, // Increment isProfileChanges counter
      };
    case types.ACCESS_TOKEN_CHANGE:
      // If the action is to change the access token, return new state with updated values
      return {
        ...state,
        accessToken: action.accessToken, // Update the access token in state
      };
    default:
      return state; // Return the current state if no action is specified or recognized
  }
}
