import {
  FETCH_SUCCESS,
  FETCH_ERROR,
  REGISTER,
  RESEND_EMAIL_CODE,
  VERIFY_EMAIL,
} from "../../common/StoreActionTypes";

export const INITIAL_STATE = {
  message: "",
  resData: null,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case REGISTER:
      return { ...state, message: null, resData: null };
    case REGISTER + FETCH_SUCCESS:
      return { ...state, message: null, resData: action.payload };
    case REGISTER + FETCH_ERROR:
      return { ...state, message: action.payload, resData: action.resData };

    case VERIFY_EMAIL:
      return { ...state, message: null, resData: null };
    case VERIFY_EMAIL + FETCH_SUCCESS:
      return { ...state, message: null, resData: action.payload };
    case VERIFY_EMAIL + FETCH_ERROR:
      return { ...state, message: action.payload, resData: action.resData };

    case RESEND_EMAIL_CODE:
      return { ...state, message: null, resData: null };
    case RESEND_EMAIL_CODE + FETCH_SUCCESS:
      return { ...state, message: null, resData: action.payload };
    case RESEND_EMAIL_CODE + FETCH_ERROR:
      return { ...state, message: action.payload, resData: action.resData };
    default:
      return state;
  }
}
