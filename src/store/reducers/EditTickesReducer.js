import {  ADD_TICKET, FETCH_SUCCESS,CLEAR_TICKET, DELETE_TICKET , CLEAR_DELETE_TICKET } from "../../common/StoreActionTypes";


export const INITIAL_STATE = {
  statusEdit: false,
  statusDelete: false,
  responseAddTickets: null,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_TICKET:
      return { ...state, responseAddTickets: null };
    case DELETE_TICKET:
      return { ...state, responseAddTickets: null };
    case ADD_TICKET + FETCH_SUCCESS:
      return {
        ...state,
        statusEdit: action.payload.success,
        responseAddTickets: action.payload,
      };
    case DELETE_TICKET + FETCH_SUCCESS:
      return {
        ...state,
        statusDelete: action.payload.success,
        responseAddTickets: action.payload,
      };
    case CLEAR_DELETE_TICKET:
      return {
        ...state,
        statusDelete: action.payload,
        responseAddTickets: null,
      };
    case CLEAR_TICKET:
      return {
        ...state,
        statusEdit: action.payload,
        responseAddArtist: null,
      };
    default:
      return state;
  }
}
