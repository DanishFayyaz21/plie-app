import { VERIFY_EDIT_USER, FETCH_SUCCESS,CLEAR_EDIT_USER, FETCH_ERROR } from "../../common/StoreActionTypes";


export const INITIAL_STATE = {
  statusEdit: false,
  responseVerifyEditUser: null,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case VERIFY_EDIT_USER:
      return { ...state };
    case VERIFY_EDIT_USER + FETCH_SUCCESS:
    return {
        ...state,
        statusEdit: action.payload.success,
        responseVerifyEditUser: action.payload,
      };
    case VERIFY_EDIT_USER + FETCH_ERROR:
      return {
        ...state,
        statusEdit: false,
        responseVerifyEditUser: null,
      };
    case CLEAR_EDIT_USER:
      return {
        ...state,
        statusEdit: action.payload,
        responseVerifyEditUser: null,
      };
    default:
      return state;
  }
}
