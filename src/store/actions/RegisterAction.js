import {
  SHOW_LOADER,
  REGISTER,
  RESEND_EMAIL_CODE,
  VERIFY_EMAIL,
} from "../../common/StoreActionTypes";
import { postApi } from "./ApiCallFunction";
import { fetchFail, fetchSuccess } from "./CommonAction";
import { Platform } from "react-native";
import {
  REGISTER_URL,
  RESEND_EMAIL_CODE_URL,
  VERIFY_EMAIL_URL,
} from "../../common/ApiConfig";

/* Redux Action to call multiple APIs Simultaneously */
export const FetchRegisterAction = (body) => {
  return async (dispatch) => {
    dispatch({ type: SHOW_LOADER, payload: true });
    Promise.all([postApi(REGISTER_URL, REGISTER, {}, body)])
      .then(function (values) {
        dispatch({ type: SHOW_LOADER, payload: false });
        /* Handle Response of all Apis */
        setTimeout(
          () => fetchSuccess(REGISTER, dispatch, values[0]),
          Platform.OS == "android" ? 0 : 1000
        );
      })
      .catch((err) => {
        /* Will be called in case of No internet or Unauthorised */
        fetchFail(dispatch, err);
      });
  };
};

export const FetchResendEmailCodeAction = (body) => {
  return async (dispatch) => {
    dispatch({ type: SHOW_LOADER, payload: true });
    Promise.all([postApi(RESEND_EMAIL_CODE_URL, RESEND_EMAIL_CODE, {}, body)])
      .then(function (values) {
        dispatch({ type: SHOW_LOADER, payload: false });
        /* Handle Response of all Apis */
        setTimeout(
          () => fetchSuccess(RESEND_EMAIL_CODE, dispatch, values[0]),
          Platform.OS == "android" ? 0 : 1000
        );
      })
      .catch((err) => {
        /* Will be called in case of No internet or Unauthorised */
        fetchFail(dispatch, err);
      });
  };
};

export const FetchVerifyEmailAction = (body) => {
  return async (dispatch) => {
    dispatch({ type: SHOW_LOADER, payload: true });
    Promise.all([postApi(VERIFY_EMAIL_URL, VERIFY_EMAIL, {}, body)])
      .then(function (values) {
        dispatch({ type: SHOW_LOADER, payload: false });
        /* Handle Response of all Apis */
        setTimeout(
          () => fetchSuccess(VERIFY_EMAIL, dispatch, values[0]),
          Platform.OS == "android" ? 0 : 1000
        );
      })
      .catch((err) => {
        /* Will be called in case of No internet or Unauthorised */
        fetchFail(dispatch, err);
      });
  };
};
