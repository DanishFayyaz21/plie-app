import {
  FETCH_FAILED,
  UN_AUTHORISED,
  CURRENT_ACTION,
  FETCH_SUCCESS,
  FETCH_ERROR,
  TOKEN,
  USER,
  RESET_PASSWORD,
  CHANGE_PASSWORD,
  LOGIN,
  REGISTER,
  VERIFY_EMAIL,
  VERIFY_EDIT_USER
} from "../../common/StoreActionTypes";
import Logger from "../../common/Logger";

import { AsyncParamsKeys, Flash } from "../../common/Constants";

import { showMessage } from "react-native-flash-message";
import Navigator from "../../common/Navigator";
import AppNavKeys from "../../common/AppNavKeys";
import AsyncStorage from "@react-native-async-storage/async-storage";

let AuthAction = [LOGIN, REGISTER, VERIFY_EMAIL];

export const fetchSuccess = (ACTION, dispatch, res) => {
  Logger.log("Post Success Response:- " + JSON.stringify(res));
  dispatch({
    type: CURRENT_ACTION,
    payload: ACTION,
  });
  console.log("SSSSSSSSSSSSSSSSSSSSSSSSSSSVVVVVVV", res)
  if (res != null && res.success) {
    console.log("RRRRRRRRRRRRrrrr", JSON.stringify(res))
    dispatch({
      type: ACTION + FETCH_SUCCESS,
      payload: res,
    });
    dispatch({
      type: ACTION,
      payload: null,
    });
    if (ACTION == RESET_PASSWORD || ACTION == CHANGE_PASSWORD) {
      if (res.message) {
        showMessage({ type: Flash.Success, message: res.message });
      }
    }
  } else {
    dispatch({
      type: ACTION + FETCH_ERROR,
      payload: res.message,
      resData: res,
    });
    dispatch({
      type: ACTION,
      payload: null,
    });
    if (ACTION != VERIFY_EDIT_USER) {
      if (res.message) {
        if (isMessageFile(res.message)) {
          showMessage({ type: Flash.Error, message: "The event picture is exceeding the max capacity, please try again" });
        }
        else {
          showMessage({ type: Flash.Error, message: res.message });
        }

      }
      if (res.success === false &&
        res.message !== "Invalid password!"
        && AuthAction.includes(ACTION)
      ) {
        console.log("ffffff33333", ACTION)
        console.log("ffffff344444", AuthAction)
        logout(dispatch);
      }
    }
  }
};

export const fetchFail = (dispatch, err) => {
  Logger.log("===Error==> ", err);
  if (err.code == 401) {
    dispatch({
      type: UN_AUTHORISED,
      payload: err.message,
    });
  } else {
    dispatch({
      type: FETCH_FAILED,
      payload: err.message,
    });
  }
};

const isMessageFile = (message) => {
  return message.includes("exceeds your upload_max_filesize ini directive") && message.includes("The file");
}

const logout = async (dispatch) => {
  try {
    await AsyncStorage.removeItem(AsyncParamsKeys.Token);
    await AsyncStorage.removeItem(AsyncParamsKeys.LoginUserObj);
    dispatch({ type: TOKEN, payload: "" });
    dispatch({ type: USER, payload: null });
    Navigator.resetFrom(AppNavKeys.Login);
  } catch (exception) { }
};
