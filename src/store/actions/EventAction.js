import {
  SHOW_LOADER,
  EVENT_LISTING,
  ADD_FAVOURITE,
  FAVOURITE_EVENT_LISTING,
  EVENT_DETAIL,
  EVENT_DETAIL_CLEAR,
  ADD_EVENT,
  UPDATE_EVENT,
  VERIFY_EDIT_USER,
  CLEAR_EDIT_USER,
  ADD_ARTIST,
  DELETE_ARTIST,
  ADD_TICKET,
  DELETE_TICKET,
  ADD_SCHEDULE,
  DELETE_SCHEDULE,
  TICKET_CHARGE,
  CLAIM_EVENT,
  CHECK_CLAIM_EVENT,
} from "../../common/StoreActionTypes";
import { postApi, postFileApi, postFileApiWithoutHeader } from "./ApiCallFunction";
import { fetchFail, fetchSuccess } from "./CommonAction";
import { Platform } from "react-native";
import {
  ADD_FAVOURITE_URL,
  EVENT_DETAIL_URL,
  EVENT_LISTING_URL,
  ADD_EVENT_URL,
  VERIFY_EDIT_USER_URL,
  ADD_ARTIST_URL,
  DELETE_ARTIST_URL,
  ADD_TICKET_URL,
  DELETE_TICKET_URL,
  ADD_SCHEDULE_URL,
  DELETE_SCHEDULE_URL,
  ADD_EVENT_EDIT_URL,
  TICKETS_CHARGE_URL,
  CLAIM_EVENT_URL,
  CHECK_CLAIM_EVENT_URL,
} from "../../common/ApiConfig";
import Navigator from "../../common/Navigator";
import AppNavKeys from "../../common/AppNavKeys";

/* Redux Action to call multiple APIs Simultaneously */
export const FetchEventListingAction = (body, loader) => {
  return async (dispatch) => {
    dispatch({ type: SHOW_LOADER, payload: loader });
    Promise.all([postApi(EVENT_LISTING_URL, EVENT_LISTING, {}, body)])
      .then(function (values) {
        setTimeout(
          () => dispatch({ type: SHOW_LOADER, payload: false }),
          Platform.OS == "android" ? 0 : 500
        );
        console.log("EVENTSLIST======>", values);
        /* Handle Response of all Apis */
        setTimeout(
          () => fetchSuccess(EVENT_LISTING, dispatch, values[0]),
          Platform.OS == "android" ? 0 : 1000
        );
      })
      .catch((err) => {
        dispatch({ type: SHOW_LOADER, payload: false });
        /* Will be called in case of No internet or Unauthorised */
        fetchFail(dispatch, err);
      });
  };
};

export const FetchFavouriteEventListing = (body) => {
  return async (dispatch) => {
    dispatch({ type: SHOW_LOADER, payload: true });
    Promise.all([postApi(EVENT_LISTING_URL, FAVOURITE_EVENT_LISTING, {}, body)])
      .then(function (values) {
        dispatch({ type: SHOW_LOADER, payload: false });
        /* Handle Response of all Apis */
        setTimeout(
          () => fetchSuccess(FAVOURITE_EVENT_LISTING, dispatch, values[0]),
          Platform.OS == "android" ? 0 : 1000
        );
      })
      .catch((err) => {
        /* Will be called in case of No internet or Unauthorised */
        fetchFail(dispatch, err);
      });
  };
};

export const AddFavouriteAction = (body) => {
  return async (dispatch) => {
    // dispatch({ type: SHOW_LOADER, payload: true });
    Promise.all([postApi(ADD_FAVOURITE_URL, ADD_FAVOURITE, {}, body)])
      .then(function (values) {
        // dispatch({ type: SHOW_LOADER, payload: false });
        /* Handle Response of all Apis */
        setTimeout(
          () => fetchSuccess(ADD_FAVOURITE, dispatch, values[0]),
          Platform.OS == "android" ? 0 : 1000
        );
        // values[0].data.favorite.ufe_status,
        // getCallback(values[0].dat	a.favorite.ufe_event_id);
      })
      .catch((err) => {
        /* Will be called in case of No internet or Unauthorised */
        fetchFail(dispatch, err);
      });
  };
};

export const ClearEventDetail = () => {
  return async (dispatch) => {
    dispatch({ type: EVENT_DETAIL_CLEAR, payload: null });
  };
};
export const ClearEdit = () => {
  return async (dispatch) => {
    dispatch({ type: CLEAR_EDIT_USER, payload: false });
  };
};

export const FetchEventDetail = (body, show) => {
  console.log("EVENTDETAIL PARAMS======>", body, show);
  return async (dispatch) => {
    dispatch({ type: SHOW_LOADER, payload: show });
    dispatch(ClearEventDetail());
    Promise.all([postApi(EVENT_DETAIL_URL, EVENT_DETAIL, {}, body)])
      .then(function (values) {
        console.log("EVENTDETAIL LOG======>", values);
        dispatch({ type: SHOW_LOADER, payload: false });
        /* Handle Response of all Apis */
        setTimeout(
          () => fetchSuccess(EVENT_DETAIL, dispatch, values[0]),
          Platform.OS == "android" ? 0 : 1000
        );
      })
      .catch((err) => {
        console.log("EVENTDETAIL failed======>", err);
        /* Will be called in case of No internet or Unauthorised */
        fetchFail(dispatch, err);
      });
  };
};

export const AddEventAction = (body) => {
  console.log("ADD EVENT PARAMS======>", body);
  return async (dispatch) => {
    dispatch({ type: SHOW_LOADER, payload: true });
    Promise.all([postFileApiWithoutHeader(ADD_EVENT_URL, ADD_EVENT, {}, body)])
      .then(function (values) {
        dispatch({ type: SHOW_LOADER, payload: false });
        /* Handle Response of all Apis */
        setTimeout(
          () => fetchSuccess(ADD_EVENT, dispatch, values[0]),
          Platform.OS == "android" ? 0 : 1000
        );
      })
      .catch((err) => {
        /* Will be called in case of No internet or Unauthorised */
        fetchFail(dispatch, err);
      });
  }
};

export const ClaimEventAction = (body) => {
  console.log("Claim event PARAMS======>", body);
  return async (dispatch) => {
    dispatch({ type: SHOW_LOADER, payload: true });
    Promise.all([postApi(CLAIM_EVENT_URL, CLAIM_EVENT, {}, body)])
      .then(function (values) {
        console.log("Claim Event LOG======>", values);
        dispatch({ type: SHOW_LOADER, payload: false });
        /* Handle Response of all Apis */
        setTimeout(
          () => fetchSuccess(CLAIM_EVENT, dispatch, values[0]),
          Platform.OS == "android" ? 0 : 1000
        );
      })
      .catch((err) => {
        console.log("EVENTDETAIL failed======>", err);
        /* Will be called in case of No internet or Unauthorised */
        fetchFail(dispatch, err);
      });
  };
};

export const CheckClaimEventAction = (body) => {
  console.log("Check Claim event PARAMS======>", body);
  return async (dispatch) => {
    dispatch({ type: SHOW_LOADER, payload: true });
    Promise.all([postApi(CHECK_CLAIM_EVENT_URL, CHECK_CLAIM_EVENT, {}, body)])
      .then(function (values) {
        console.log("Check Claim Event LOG======>s", values);
        dispatch({ type: SHOW_LOADER, payload: false });
        /* Handle Response of all Apis */
        setTimeout(
          () => fetchSuccess(CHECK_CLAIM_EVENT, dispatch, values[0]),
          Platform.OS == "android" ? 0 : 1000
        );
      })
      .catch((err) => {
        console.log("EVENTDETAIL failed======>", err);
        /* Will be called in case of No internet or Unauthorised */
        fetchFail(dispatch, err);
      });
  };
};

export const AddEventEdit = (body) => {
  console.log("ADD EVENT EDIT PARAMS======>", body);
  return async (dispatch) => {
    dispatch({ type: SHOW_LOADER, payload: true });
    Promise.all([postFileApiWithoutHeader(ADD_EVENT_EDIT_URL, UPDATE_EVENT, {}, body)])
      .then(function (values) {
        dispatch({ type: SHOW_LOADER, payload: false });
        /* Handle Response of all Apis */
        setTimeout(
          () => fetchSuccess(UPDATE_EVENT, dispatch, values[0]),
          Platform.OS == "android" ? 0 : 1000
        );
      })
      .catch((err) => {
        /* Will be called in case of No internet or Unauthorised */
        fetchFail(dispatch, err);
      });
  }
}

export const VerifyEdit = (body) => {
  console.log("VERIFY EDIT PARAMS======>", body);
  return async (dispatch) => {
    dispatch({ type: SHOW_LOADER, payload: true });
    Promise.all([postApi(VERIFY_EDIT_USER_URL, VERIFY_EDIT_USER, {}, body)])
      .then(function (values) {
        console.log("VERIFY EDIT LOG======>", values[0], body);
        dispatch({ type: SHOW_LOADER, payload: false });
        /* Handle Response of all Apis */
        setTimeout(
          () => fetchSuccess(VERIFY_EDIT_USER, dispatch, values[0]),
          Platform.OS == "android" ? 0 : 1000
        );
      })
      .catch((err) => {
        console.log("EVENTDETAIL failed======>", err);
        /* Will be called in case of No internet or Unauthorised */
        fetchFail(dispatch, err);
      });
  };
};

export const AddArtist = (body) => {
  console.log("ADD OR EDIT ARTIST PARAMS======>", body);
  return async (dispatch) => {
    dispatch({ type: SHOW_LOADER, payload: true });
    Promise.all([postApi(ADD_ARTIST_URL, ADD_ARTIST, {}, body)])
      .then(function (values) {
        console.log("ADD OR EDIT ARTIST LOG======>", values);
        dispatch({ type: SHOW_LOADER, payload: false });
        /* Handle Response of all Apis */
        setTimeout(
          () => fetchSuccess(ADD_ARTIST, dispatch, values[0]),
          Platform.OS == "android" ? 0 : 1000
        );
      })
      .catch((err) => {
        console.log("EVENTDETAIL failed======>", err);
        /* Will be called in case of No internet or Unauthorised */
        fetchFail(dispatch, err);
      });
  };
};
export const DeleteArtist = (body) => {
  console.log("DELETE ARTIST PARAMS======>", body);
  return async (dispatch) => {
    dispatch({ type: SHOW_LOADER, payload: true });
    Promise.all([postApi(DELETE_ARTIST_URL, DELETE_ARTIST, {}, body)])
      .then(function (values) {
        console.log("DELETE ARTIST LOG======>", values);
        dispatch({ type: SHOW_LOADER, payload: false });
        /* Handle Response of all Apis */
        setTimeout(
          () => fetchSuccess(DELETE_ARTIST, dispatch, values[0]),
          Platform.OS == "android" ? 0 : 1000
        );
      })
      .catch((err) => {
        console.log("DELETE ARTIST failed======>", err);
        /* Will be called in case of No internet or Unauthorised */
        fetchFail(dispatch, err);
      });
  };
};
export const AddTicket = (body) => {
  console.log("ADD TICKET PARAMS======>", body);
  return async (dispatch) => {
    dispatch({ type: SHOW_LOADER, payload: true });
    Promise.all([postApi(ADD_TICKET_URL, ADD_TICKET, {}, body)])
      .then(function (values) {
        console.log("ADD TICKET LOG======>", values);
        dispatch({ type: SHOW_LOADER, payload: false });
        /* Handle Response of all Apis */
        setTimeout(
          () => fetchSuccess(ADD_TICKET, dispatch, values[0]),
          Platform.OS == "android" ? 0 : 1000
        );
      })
      .catch((err) => {
        console.log("ADD TICKET failed======>", err);
        /* Will be called in case of No internet or Unauthorised */
        fetchFail(dispatch, err);
      });
  };
}

export const DeleteTicket = (body) => {
  console.log("DELETE TICKET PARAMS======>", body);
  return async (dispatch) => {
    dispatch({ type: SHOW_LOADER, payload: true });
    Promise.all([postApi(DELETE_TICKET_URL, DELETE_TICKET, {}, body)])
      .then(function (values) {
        console.log("DELETE TICKET LOG======>", values);
        dispatch({ type: SHOW_LOADER, payload: false });
        /* Handle Response of all Apis */
        setTimeout(
          () => fetchSuccess(DELETE_TICKET, dispatch, values[0]),
          Platform.OS == "android" ? 0 : 1000
        );
      })
      .catch((err) => {
        console.log("DELETE TICKET failed======>", err);
        /* Will be called in case of No internet or Unauthorised */
        fetchFail(dispatch, err);
      });
  };
}
export const AddSchedule = (body) => {
  console.log("ADD SCHEDULE PARAMS======>", body);
  return async (dispatch) => {
    dispatch({ type: SHOW_LOADER, payload: true });
    Promise.all([postApi(ADD_SCHEDULE_URL, ADD_SCHEDULE, {}, body)])
      .then(function (values) {
        console.log("ADD SCHEDULE  LOG======>", values);
        dispatch({ type: SHOW_LOADER, payload: false });
        /* Handle Response of all Apis */
        setTimeout(
          () => fetchSuccess(ADD_SCHEDULE, dispatch, values[0]),
          Platform.OS == "android" ? 0 : 1000
        );
      })
      .catch((err) => {
        console.log("ADD SCHEDULE  failed======>", err);
        /* Will be called in case of No internet or Unauthorised */
        fetchFail(dispatch, err);
      });
  };
}
export const DeleteSchedule = (body) => {
  return async (dispatch) => {
    dispatch({ type: SHOW_LOADER, payload: true });
    Promise.all([postApi(DELETE_SCHEDULE_URL, DELETE_SCHEDULE, {}, body)])
      .then(function (values) {
        console.log("DELETE SCHEDULE  LOG======>", values);
        dispatch({ type: SHOW_LOADER, payload: false });
        /* Handle Response of all Apis */
        setTimeout(
          () => fetchSuccess(DELETE_SCHEDULE, dispatch, values[0]),
          Platform.OS == "android" ? 0 : 1000
        );
      })
      .catch((err) => {
        console.log("DELETE SCHEDULE  failed======>", err);
        /* Will be called in case of No internet or Unauthorised */
        fetchFail(dispatch, err);
      });
  };
}

export const TicketCharge = (body) => {
  return async (dispatch) => {
    dispatch({ type: SHOW_LOADER, payload: true });
    Promise.all([postApi(TICKETS_CHARGE_URL, TICKET_CHARGE, {}, body)])
      .then(function (values) {
        console.log("TICKET CHARGE  LOG======>", values);
        dispatch({ type: SHOW_LOADER, payload: false });
        /* Handle Response of all Apis */
        setTimeout(
          () => fetchSuccess(TICKET_CHARGE, dispatch, values[0]),
          Platform.OS == "android" ? 0 : 1000
        );
      })
      .catch((err) => {
        console.log("TICKET CHARGE  failed======>", err);
        /* Will be called in case of No internet or Unauthorised */
        fetchFail(dispatch, err);
      });
  };
}

