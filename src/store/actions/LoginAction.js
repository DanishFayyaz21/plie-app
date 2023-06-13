import {
  SHOW_LOADER,
  LOGIN,
  FORGOT_PASSWORD,
  VERIFY_PASSWORD_CODE,
  RESET_PASSWORD,
} from "../../common/StoreActionTypes";
import { postApi } from "./ApiCallFunction";
import { fetchFail, fetchSuccess } from "./CommonAction";
import { Platform } from "react-native";
import {
  LOGIN_URL,
  FORGOT_PASSWORD_URL,
  VERIFY_PASSWORD_CODE_URL,
  RESET_PASSWORD_URL,
} from "../../common/ApiConfig";

/* Redux Action to call multiple APIs Simultaneously */
export const FetchLoginAction = (body) => {
  return async (dispatch) => {
    dispatch({ type: SHOW_LOADER, payload: true });
    Promise.all([postApi(LOGIN_URL, LOGIN, {}, body)])
      .then(function (values) {
        dispatch({ type: SHOW_LOADER, payload: false });
        console.log('CASNCIAS====>', values);
        /* Handle Response of all Apis */
        setTimeout(
          () => fetchSuccess(LOGIN, dispatch, values[0]),
          Platform.OS == "android" ? 0 : 1000
        );
      })
      .catch((err) => {
        console.log('CASNCIAS====>2', values);
        /* Will be called in case of No internet or Unauthorised */
        fetchFail(dispatch, err);
      });
  };
};

export const FetchForgotPasswordAction = (body) => {
  return async (dispatch) => {
    dispatch({ type: SHOW_LOADER, payload: true });
    Promise.all([postApi(FORGOT_PASSWORD_URL, FORGOT_PASSWORD, {}, body)])
      .then(function (values) {
        dispatch({ type: SHOW_LOADER, payload: false });
        /* Handle Response of all Apis */
        setTimeout(
          () => fetchSuccess(FORGOT_PASSWORD, dispatch, values[0]),
          Platform.OS == "android" ? 0 : 1000
        );
      })
      .catch((err) => {
        /* Will be called in case of No internet or Unauthorised */
        fetchFail(dispatch, err);
      });
  };
};

export const FetchVerifyPasswordCodeAction = (body) => {
  return async (dispatch) => {
    dispatch({ type: SHOW_LOADER, payload: true });
    Promise.all([
      postApi(VERIFY_PASSWORD_CODE_URL, VERIFY_PASSWORD_CODE, {}, body),
    ])
      .then(function (values) {
        dispatch({ type: SHOW_LOADER, payload: false });
        /* Handle Response of all Apis */
        setTimeout(
          () => fetchSuccess(VERIFY_PASSWORD_CODE, dispatch, values[0]),
          Platform.OS == "android" ? 0 : 1000
        );
      })
      .catch((err) => {
        /* Will be called in case of No internet or Unauthorised */
        fetchFail(dispatch, err);
      });
  };
};

export const FetchResetPasswordAction = (body) => {
  return async (dispatch) => {
    dispatch({ type: SHOW_LOADER, payload: true });
    Promise.all([postApi(RESET_PASSWORD_URL, RESET_PASSWORD, {}, body)])
      .then(function (values) {
        dispatch({ type: SHOW_LOADER, payload: false });
        /* Handle Response of all Apis */
        setTimeout(
          () => fetchSuccess(RESET_PASSWORD, dispatch, values[0]),
          Platform.OS == "android" ? 0 : 1000
        );
      })
      .catch((err) => {
        /* Will be called in case of No internet or Unauthorised */
        fetchFail(dispatch, err);
      });
  };
};
