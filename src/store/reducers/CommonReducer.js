import {
    SHOW_LOADER,
    FETCH_FAILED,
    UN_AUTHORISED,
    CURRENT_ACTION,
    NOTIFY_SERVICE,
    FIREBASE_TOKEN,
    TOKEN,
    UPLOAD_FILE,
    GENERIC_DATA,
    USER
} from '../../common/StoreActionTypes';

const INITIAL_STATE = {
    isLoading: false,
    fetchFailed: false,
    unauthorised: false,
    message: null,
    api_type: null,
    notifyService: null,
    firebaseToken: "",
    token: "",
    user: null,
    uploadFiles: null,
    genericData: null
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case CURRENT_ACTION:
            return { ...state, api_type: action.payload, fetchFailed: false, unauthorised: false, message: null }
        case SHOW_LOADER:
            return { ...state, isLoading: action.payload, fetchFailed: false, unauthorised: false, message: null }
        case FETCH_FAILED:
            return { ...state, isLoading: false, fetchFailed: true, unauthorised: false, message: action.payload }
        case UN_AUTHORISED:
            return { ...state, isLoading: false, fetchFailed: false, unauthorised: true, message: action.payload }
        case NOTIFY_SERVICE:
            return { ...state, notifyService: action.payload }
        case FIREBASE_TOKEN:
            return { ...state, firebaseToken: action.payload }
        case TOKEN:
            return { ...state, token: action.payload }
        case USER:
            return { ...state, user: action.payload }
        case UPLOAD_FILE:
            return { ...state, uploadFiles: action.payload }
        case GENERIC_DATA:
            return { ...state, genericData: action.payload }
        default:
            return state;
    }
}