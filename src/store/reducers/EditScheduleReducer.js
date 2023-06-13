import {  ADD_SCHEDULE, FETCH_SUCCESS,CLEAR_SCHEDULE, DELETE_SCHEDULE , CLEAR_DELETE_SCHEDULE } from "../../common/StoreActionTypes";


export const INITIAL_STATE = {
  statusEdit: false,
  statusDelete: false,
  responseAddSchedule: null,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_SCHEDULE:
      return { ...state, responseAddSchedule: null };
    case DELETE_SCHEDULE:
      return { ...state, responseAddSchedule: null };
    case ADD_SCHEDULE + FETCH_SUCCESS:
      return {
        ...state,
        statusEdit: action.payload.success,
        responseAddSchedule: action.payload,
      };
    case DELETE_SCHEDULE + FETCH_SUCCESS:
      return {
        ...state,
        statusDelete: action.payload.success,
        responseAddSchedule: action.payload,
      };
    case CLEAR_DELETE_SCHEDULE:
      return {
        ...state,
        statusDelete: action.payload,
        responseAddSchedule: null,
      };
    case CLEAR_SCHEDULE:
      return {
        ...state,
        statusEdit: action.payload,
        responseAddSchedule: null,
      };
    default:
      return state;
  }
}
