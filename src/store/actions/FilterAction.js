import { SHOW_LOADER, EVENT_TYPE_LIST, DANCE_STYLE_LIST, COUNTRY_LIST, CITY_LIST } from "../../common/StoreActionTypes";
import { postApi } from "./ApiCallFunction";
import { fetchFail, fetchSuccess } from "./CommonAction";
import { Platform } from "react-native";
import { CITY_LIST_URL, COUNTRY_LIST_URL, DANCE_STYLE_LIST_URL, EVENT_TYPE_LIST_URL } from "../../common/ApiConfig";

/* Redux Action to call multiple APIs Simultaneously */
export const FetchCountryListAction = (body) => {
    return async (dispatch) => {
        //dispatch({ type: SHOW_LOADER, payload: true });
        Promise.all([postApi(COUNTRY_LIST_URL, COUNTRY_LIST, {}, body)])
            .then(function (values) {
                //dispatch({ type: SHOW_LOADER, payload: false });
                /* Handle Response of all Apis */
                setTimeout(
                    () => fetchSuccess(COUNTRY_LIST, dispatch, values[0]),
                    Platform.OS == "android" ? 0 : 1000
                );
            })
            .catch((err) => {
                /* Will be called in case of No internet or Unauthorised */
                fetchFail(dispatch, err);
            });
    };
};

export const FetchCityListAction = (body) => {
    return async (dispatch) => {
        //dispatch({ type: SHOW_LOADER, payload: true });
        Promise.all([postApi(CITY_LIST_URL, CITY_LIST, {}, body)])
            .then(function (values) {
                //dispatch({ type: SHOW_LOADER, payload: false });
                /* Handle Response of all Apis */
                console.log('ascjacs====>', values);
                setTimeout(
                    () => fetchSuccess(CITY_LIST, dispatch, values[0]),
                    Platform.OS == "android" ? 0 : 1000
                );
            })
            .catch((err) => {
                /* Will be called in case of No internet or Unauthorised */
                fetchFail(dispatch, err);
            });
    };
};

export const FetchEventTypeListAction = (body) => {
    return async (dispatch) => {
        //dispatch({ type: SHOW_LOADER, payload: true });
        Promise.all([postApi(EVENT_TYPE_LIST_URL, EVENT_TYPE_LIST, {}, body)])
            .then(function (values) {
                //dispatch({ type: SHOW_LOADER, payload: false });
                /* Handle Response of all Apis */
                setTimeout(
                    () => fetchSuccess(EVENT_TYPE_LIST, dispatch, values[0]),
                    Platform.OS == "android" ? 0 : 1000
                );
            })
            .catch((err) => {
                /* Will be called in case of No internet or Unauthorised */
                fetchFail(dispatch, err);
            });
    };
};

export const FetchDanceStyleListAction = (body) => {
    return async (dispatch) => {
        //dispatch({ type: SHOW_LOADER, payload: true });
        Promise.all([postApi(DANCE_STYLE_LIST_URL, DANCE_STYLE_LIST, {}, body)])
            .then(function (values) {
                //dispatch({ type: SHOW_LOADER, payload: false });
                /* Handle Response of all Apis */
                setTimeout(
                    () => fetchSuccess(DANCE_STYLE_LIST, dispatch, values[0]),
                    Platform.OS == "android" ? 0 : 1000
                );
            })
            .catch((err) => {
                /* Will be called in case of No internet or Unauthorised */
                fetchFail(dispatch, err);
            });
    };
};
