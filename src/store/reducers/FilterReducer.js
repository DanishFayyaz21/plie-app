import {
    FETCH_SUCCESS,
    FETCH_ERROR,
    EVENT_TYPE_LIST,
    DANCE_STYLE_LIST,
    COUNTRY_LIST,
    CITY_LIST,
} from "../../common/StoreActionTypes";

export const INITIAL_STATE = {
    message: "",
    resData: null
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case COUNTRY_LIST:
            return { ...state, message: null, resData: null };
        case COUNTRY_LIST + FETCH_SUCCESS:
            return { ...state, message: null, resData: action.payload };
        case COUNTRY_LIST + FETCH_ERROR:
            return { ...state, message: action.payload, resData: action.resData };

        case CITY_LIST:
            return { ...state, message: null, resData: null };
        case CITY_LIST + FETCH_SUCCESS:
            return { ...state, message: null, resData: action.payload };
        case CITY_LIST + FETCH_ERROR:
            return { ...state, message: action.payload, resData: action.resData };

        case EVENT_TYPE_LIST:
            return { ...state, message: null, resData: null };
        case EVENT_TYPE_LIST + FETCH_SUCCESS:
            return { ...state, message: null, resData: action.payload };
        case EVENT_TYPE_LIST + FETCH_ERROR:
            return { ...state, message: action.payload, resData: action.resData };

        case DANCE_STYLE_LIST:
            return { ...state, message: null, resData: null };
        case DANCE_STYLE_LIST + FETCH_SUCCESS:
            return { ...state, message: null, resData: action.payload };
        case DANCE_STYLE_LIST + FETCH_ERROR:
            return { ...state, message: action.payload, resData: action.resData };

        default:
            return state;
    }
}
