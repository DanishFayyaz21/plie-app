import { STRIPE_DISCONNECT_URL } from "../../common/ApiConfig";
import {
  FETCH_SUCCESS,
  FETCH_ERROR,
  GET_PROFILE,
  UPDATE_PROFILE,
  CHANGE_PASSWORD,
  DELETE_ACCOUNT,
  STRIPE_CONNECT
} from "../../common/StoreActionTypes";

export const INITIAL_STATE = {
  message: "",
  resData: null,

  user: null,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_PROFILE:
      return { ...state, message: null, resData: null };
    case GET_PROFILE + FETCH_SUCCESS:
      return {
        ...state,
        message: null,
        resData: action.payload,
        user: action.payload.data.user,
      };
    case GET_PROFILE + FETCH_ERROR:
      return { ...state, message: action.payload, resData: action.resData };

    case UPDATE_PROFILE:
      return { ...state, message: null, resData: null };
    case UPDATE_PROFILE + FETCH_SUCCESS:
      return {
        ...state,
        message: null,
        resData: action.payload,
        user: action.payload.data.user,
      };
    case UPDATE_PROFILE + FETCH_ERROR:
      return { ...state, message: action.payload, resData: action.resData };

    case CHANGE_PASSWORD:
      return { ...state, message: null, resData: null };
    case CHANGE_PASSWORD + FETCH_SUCCESS:
      return {
        ...state,
        message: null,
        resData: action.payload,
        user: action.payload.data.user,
      };
    case CHANGE_PASSWORD + FETCH_ERROR:
      return { ...state, message: action.payload, resData: action.resData };

    case DELETE_ACCOUNT:
      return { ...state, message: null, resData: null };
    case DELETE_ACCOUNT + FETCH_SUCCESS:
      return {
        ...state,
        message: null,
        resData: action.payload,
      };
    case DELETE_ACCOUNT + FETCH_ERROR:
      return { ...state, message: action.payload, resData: action.resData };

    case STRIPE_CONNECT:
      return { ...state, message: null, resData: null };
    case STRIPE_CONNECT + FETCH_SUCCESS:
      return {
        ...state,
        message: null,
        resData: action.payload,
        url: action.payload.data.stripConectUrl,
      };
    case STRIPE_CONNECT + FETCH_ERROR:
      return { ...state, message: action.payload, resData: action.resData };

    case STRIPE_DISCONNECT_URL:
      return { ...state, message: null, resData: null };

    default:
      return state;
  }
}
