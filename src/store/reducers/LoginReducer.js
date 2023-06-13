import {
  LOGIN,
  FETCH_SUCCESS,
  FETCH_ERROR,
  FORGOT_PASSWORD,
  VERIFY_PASSWORD_CODE,
  RESET_PASSWORD,
} from "../../common/StoreActionTypes";

export const INITIAL_STATE = {
  message: "",
  resData: null,
};

export default function (state = INITIAL_STATE, action) {  
  switch (action.type) {
    case LOGIN:
      return { ...state, message: null, resData: null };
    case LOGIN + FETCH_SUCCESS:
      return { ...state, message: null, resData: action.payload };
    case LOGIN + FETCH_ERROR:
      return { ...state, message: action.payload, resData: action.resData };

    case FORGOT_PASSWORD:
      return { ...state, message: null, resData: null };
    case FORGOT_PASSWORD + FETCH_SUCCESS:
      return { ...state, message: null, resData: action.payload };
    case FORGOT_PASSWORD + FETCH_ERROR:
      return { ...state, message: action.payload, resData: action.resData };

    case VERIFY_PASSWORD_CODE:
      return { ...state, message: null, resData: null };
    case VERIFY_PASSWORD_CODE + FETCH_SUCCESS:
      return { ...state, message: null, resData: action.payload };
    case VERIFY_PASSWORD_CODE + FETCH_ERROR:
      return { ...state, message: action.payload, resData: action.resData };

    case RESET_PASSWORD:
      return { ...state, message: null, resData: null };
    case RESET_PASSWORD + FETCH_SUCCESS:
      return { ...state, message: null, resData: action.payload };
    case RESET_PASSWORD + FETCH_ERROR:
      return { ...state, message: action.payload, resData: action.resData };

    default:
      return state;
  }
}
