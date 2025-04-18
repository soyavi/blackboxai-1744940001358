import moment from 'moment';

const initialState = {
  events: [],
  selectedDate: moment().format('YYYY-MM-DD'),
  currentView: 'month', // 'month', 'week', 'day'
};

export default function calendarReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_EVENT':
      return {
        ...state,
        events: [...state.events, action.event],
      };
    case 'UPDATE_EVENT':
      return {
        ...state,
        events: state.events.map(event =>
          event.id === action.event.id ? action.event : event,
        ),
      };
    case 'DELETE_EVENT':
      return {
        ...state,
        events: state.events.filter(event => event.id !== action.eventId),
      };
    case 'SET_SELECTED_DATE':
      return {
        ...state,
        selectedDate: action.date,
      };
    case 'SET_CURRENT_VIEW':
      return {
        ...state,
        currentView: action.view,
      };
    default:
      return state;
  }
}
