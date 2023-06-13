import {
  FETCH_SUCCESS,
  FETCH_ERROR,
  EVENT_LISTING,
  FAVOURITE_EVENT_LISTING,
  EVENT_DETAIL,
  ADD_FAVOURITE,
  EVENT_DETAIL_CLEAR,
  CLAIM_EVENT,
  CHECK_CLAIM_EVENT,
} from "../../common/StoreActionTypes";

export const INITIAL_STATE = {
  message: "",
  resData: null,
  favData: null,
  claimData: null
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case EVENT_LISTING:
      return { ...state, message: null, resData: null };
    case EVENT_LISTING + FETCH_SUCCESS:
      return { ...state, message: null, resData: action.payload };
    case EVENT_LISTING + FETCH_ERROR:
      return { ...state, message: action.payload, resData: action.resData };
    case FAVOURITE_EVENT_LISTING + FETCH_SUCCESS:
      return { ...state, message: null, resData: action.payload };
    case FAVOURITE_EVENT_LISTING + FETCH_ERROR:
      return { ...state, message: action.payload, resData: action.resData };
    case EVENT_DETAIL_CLEAR:
      return { ...state, message: null, resData: null };
    case EVENT_DETAIL + FETCH_SUCCESS:
      return { ...state, message: null, resData: action.payload };
    case EVENT_DETAIL + FETCH_ERROR:
      return { ...state, message: action.payload, resData: action.resData };
    case ADD_FAVOURITE:
      return { ...state, message: null, favData: null };
    case ADD_FAVOURITE + FETCH_SUCCESS:
      return { ...state, message: null, favData: action.payload };
    case ADD_FAVOURITE + FETCH_ERROR:
      return { ...state, message: action.payload, favData: action.resData };
    case CLAIM_EVENT + FETCH_SUCCESS:
      return { ...state, message: null, claimData: action.payload };
    case CHECK_CLAIM_EVENT + FETCH_SUCCESS:
      return { ...state, message: null, claimData: action.payload };

    case CLAIM_EVENT + FETCH_ERROR:
      return { ...state, message: action.payload, claimData: null };

    case CHECK_CLAIM_EVENT + FETCH_ERROR:
      return { ...state, message: action.payload, claimData: null };

    default:
      return state;
  }
}
