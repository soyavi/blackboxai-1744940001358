const Settings = require('../config/Settings');

const types = {
  TOGGLE_DARK_MODE: 'TOGGLE_DARK_MODE',
  TOGGLE_SYSTEM_PREFERENCE: 'TOGGLE_SYSTEM_PREFERENCE',
};

const initialState = {
  darkMode: Boolean(Settings.DEFAULT_DARK), // Initialize dark mode to the default value from settings
  systemPreference: false,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.TOGGLE_DARK_MODE:
      return {
        ...state,
        darkMode: !state.darkMode, // Toggle the value of dark mode
      };
    case types.TOGGLE_SYSTEM_PREFERENCE:
      return {
        ...state,
        systemPreference: !state.systemPreference, // Toggle the value of system preference
      };
    default:
      return state;
  }
}
