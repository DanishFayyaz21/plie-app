import { ADD_ARTIST, FETCH_SUCCESS,CLEAR_ARTIST, DELETE_ARTIST , CLEAR_DELETE_ARTIST} from "../../common/StoreActionTypes";


export const INITIAL_STATE = {
  statusEdit: false,
  statusDelete: false,
  responseAddArtist: null,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_ARTIST:
      return { ...state, responseAddArtist: null };
    case DELETE_ARTIST:
      return { ...state, responseAddArtist: null };
    case ADD_ARTIST + FETCH_SUCCESS:
      return {
        ...state,
        statusEdit: action.payload.success,
        responseAddArtist: action.payload,
      };
    case DELETE_ARTIST + FETCH_SUCCESS:
      return {
        ...state,
        statusDelete: action.payload.success,
        responseAddArtist: action.payload,
      };
    case CLEAR_DELETE_ARTIST:
      return {
        ...state,
        statusDelete: action.payload,
        responseAddArtist: null,
      };
    case CLEAR_ARTIST:
      return {
        ...state,
        statusEdit: action.payload,
        responseAddArtist: null,
      };
    default:
      return state;
  }
}
