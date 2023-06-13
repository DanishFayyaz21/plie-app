import {
  SHOW_LOADER,
  GET_PROFILE,
  UPDATE_PROFILE,
  CHANGE_PASSWORD,
  DELETE_ACCOUNT,
  TOKEN,
  USER,
  STRIPE_CONNECT,
  STRIPE_DISCONNECT
} from "../../common/StoreActionTypes";
import { getApi, postApi, postFileApi } from "./ApiCallFunction";
import { fetchFail, fetchSuccess } from "./CommonAction";
import { Platform } from "react-native";
import {
  GET_PROFILE_URL,
  UPDATE_PROFILE_URL,
  CHANGE_PASSWORD_URL,
  DELETE_ACCOUNT_URL,
  STRIPE_CONNECT_URL,
  STRIPE_DISCONNECT_URL
} from "../../common/ApiConfig";
import { AsyncParamsKeys } from "../../common/Constants";
import Navigator from "../../common/Navigator";
import AppNavKeys from "../../common/AppNavKeys";
import AsyncStorage from "@react-native-async-storage/async-storage";

/* Redux Action to call multiple APIs Simultaneously */
export const FetchGetProfileAction = (body) => {
  return async (dispatch) => {
    dispatch({ type: SHOW_LOADER, payload: true });
    Promise.all([postApi(GET_PROFILE_URL, GET_PROFILE, {}, body)])
      .then(function (values) {
        dispatch({ type: SHOW_LOADER, payload: false });
        /* Handle Response of all Apis */
        setTimeout(
          () => fetchSuccess(GET_PROFILE, dispatch, values[0]),
          Platform.OS == "android" ? 0 : 1000
        );
      })
      .catch((err) => {
        /* Will be called in case of No internet or Unauthorised */
        fetchFail(dispatch, err);
      });
  };
};

export const UpdateProfileAction = (body) => {
  return async (dispatch) => {
    dispatch({ type: SHOW_LOADER, payload: true });
    Promise.all([postFileApi(UPDATE_PROFILE_URL, UPDATE_PROFILE, {}, body)])
      .then(function (values) {
        dispatch({ type: SHOW_LOADER, payload: false });
        /* Handle Response of all Apis */
        setTimeout(
          () => fetchSuccess(UPDATE_PROFILE, dispatch, values[0]),
          Platform.OS == "android" ? 0 : 1000
        );
      })
      .catch((err) => {
        /* Will be called in case of No internet or Unauthorised */
        fetchFail(dispatch, err);
      });
  };
};

export const ChangePasswordAction = (body) => {
  return async (dispatch) => {
    dispatch({ type: SHOW_LOADER, payload: true });
    Promise.all([postApi(CHANGE_PASSWORD_URL, CHANGE_PASSWORD, {}, body)])
      .then(function (values) {
        dispatch({ type: SHOW_LOADER, payload: false });
        /* Handle Response of all Apis */
        setTimeout(
          () => fetchSuccess(CHANGE_PASSWORD, dispatch, values[0]),
          Platform.OS == "android" ? 0 : 1000
        );
      })
      .catch((err) => {
        /* Will be called in case of No internet or Unauthorised */
        fetchFail(dispatch, err);
      });
  };
};

export const DeleteAccountAction = () => {
  return async (dispatch) => {
    dispatch({ type: SHOW_LOADER, payload: true });
    Promise.all([postApi(DELETE_ACCOUNT_URL, DELETE_ACCOUNT,)])
      .then(function (values) {
        dispatch({ type: SHOW_LOADER, payload: false });
        /* Handle Response of all Apis */
        console.log('delete account data======>', values);
        logout(dispatch);
        setTimeout(
          () => fetchSuccess(DELETE_ACCOUNT, dispatch, values[0]),
          Platform.OS == "android" ? 0 : 1000
        );

      })
      .catch((err) => {
        console.log('delete account fail======>', err);
        /* Will be called in case of No internet or Unauthorised */
        fetchFail(dispatch, err);
      });
  };
};

export const StripeConnectAction = (body) => {
  return async (dispatch) => {
    dispatch({ type: SHOW_LOADER, payload: true });
    Promise.all([postFileApi(STRIPE_CONNECT_URL, STRIPE_CONNECT, {}, body)])
      .then(function (values) {
        dispatch({ type: SHOW_LOADER, payload: false });
        /* Handle Response of all Apis */
        setTimeout(
          () => fetchSuccess(STRIPE_CONNECT, dispatch, values[0]),
          Platform.OS == "android" ? 0 : 1000
        );
      })
      .catch((err) => {
        /* Will be called in case of No internet or Unauthorised */
        fetchFail(dispatch, err);
      });
  };
};

export const StripeDisconnectAction = (body) => {
  return async (dispatch) => {
    dispatch({ type: SHOW_LOADER, payload: true });
    Promise.all([getApi(STRIPE_DISCONNECT_URL, STRIPE_DISCONNECT, {})])
      .then(function (values) {
        dispatch({ type: SHOW_LOADER, payload: false });
        /* Handle Response of all Apis */
        // setTimeout(
        //   () => fetchSuccess(STRIPE_CONNECT, dispatch, values[0]),
        //   Platform.OS == "android" ? 0 : 1000
        // );
      })
      .catch((err) => {
        /* Will be called in case of No internet or Unauthorised */
        fetchFail(dispatch, err);
      });
  };
};


const logout = async (dispatch) => {
  try {
    await AsyncStorage.removeItem(AsyncParamsKeys.Token);
    await AsyncStorage.removeItem(AsyncParamsKeys.LoginUserObj);
    dispatch({ type: TOKEN, payload: "" });
    dispatch({ type: USER, payload: null });
    Navigator.resetFrom(AppNavKeys.Login);
  } catch (exception) {
    console.log('error msg====>', exception);
  }
};
