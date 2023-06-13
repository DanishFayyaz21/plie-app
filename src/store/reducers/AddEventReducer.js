import { ADD_EVENT, FETCH_SUCCESS,CLEAR_EVENT,UPDATE_EVENT } from "../../common/StoreActionTypes";


export const INITIAL_STATE = {
  statusEvent: false,
  statusEdit: false,
  responseAddEvent: null,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_EVENT:
      return { ...state, responseAddEvent: null };
    case ADD_EVENT + FETCH_SUCCESS:
      return {
        ...state,
        statusEvent: action.payload.success,
        responseAddEvent: action.payload,
      };
    case UPDATE_EVENT:
      return { ...state, responseAddEvent: null };
    case UPDATE_EVENT + FETCH_SUCCESS:
      return {
        ...state,
        statusEdit: false,
        responseAddEvent: action.payload,
      }
    case CLEAR_EVENT:
      return {
        ...state,
        statusEvent: action.payload,
        responseAddEvent: null,
      };
    default:
      return state;
  }
}
