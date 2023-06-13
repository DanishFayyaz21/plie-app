// export const BASE_URL = "http://18.158.54.6";
// export const BASE_URL = "https://plie.dev";
export const BASE_URL = "https://pile-api.axiscodingsolutions.com";

export const API_URL = BASE_URL + "/api";

export const LOGIN_URL = API_URL + "/login";
export const REGISTER_URL = API_URL + "/register";
export const RESEND_EMAIL_CODE_URL = API_URL + "/resend-email-code";
export const VERIFY_EMAIL_URL = API_URL + "/verify-email";
export const FORGOT_PASSWORD_URL = API_URL + "/forgot-password";
export const VERIFY_PASSWORD_CODE_URL = API_URL + "/verify-password-token";
export const RESET_PASSWORD_URL = API_URL + "/reset-password";
export const STRIPE_CONNECT_URL = API_URL + "/strip-connect";
export const STRIPE_DISCONNECT_URL = API_URL + "/strip-disconect";

export const EVENT_LISTING_URL = API_URL + "/events-listing";
export const ADD_FAVOURITE_URL = API_URL + "/user-fav-event";
export const EVENT_DETAIL_URL = API_URL + "/admin/event-detail";
export const ADD_EVENT_URL = API_URL + "/admin/event-save-user";
export const CLAIM_EVENT_URL = API_URL + "/admin/claim-event";
export const CHECK_CLAIM_EVENT_URL = API_URL + "/admin/check-claim-event";
export const ADD_EVENT_EDIT_URL = API_URL + "/admin/event-save";
export const COUNTRY_LIST_URL = API_URL + "/admin/country-listing";
export const CITY_LIST_URL = API_URL + "/admin/city-listing";
export const EVENT_TYPE_LIST_URL = API_URL + "/admin/event-type-listing";
export const DANCE_STYLE_LIST_URL = API_URL + "/admin/dance-style-listing";
export const VERIFY_EDIT_USER_URL = API_URL + "/admin/verify-user-event";
export const ADD_ARTIST_URL = API_URL + "/admin/event-artist-save";
export const DELETE_ARTIST_URL = API_URL + "/admin/event-artist-delete";
export const ADD_TICKET_URL = API_URL + "/admin/event-tickets-save";
export const DELETE_TICKET_URL = API_URL + "/admin/event-tickets-delete";
export const ADD_SCHEDULE_URL = API_URL + "/admin/event-schedule-save";
export const DELETE_SCHEDULE_URL = API_URL + "/admin/event-schedule-delete";
export const TICKETS_CHARGE_URL = API_URL + "/charge";
export const TICKETS_CHARGE_COMPLETED_URL = API_URL + "/charge-completed";
export const PURCHASE_ONLINE_ACTIVE_URL = API_URL + "/activate-deactivate-online-purchase/event";

export const TERMS = BASE_URL + "/terms-conditions";
export const POLICY = BASE_URL + "/privacy-policy";

export const GET_PROFILE_URL = API_URL + "/get-user-profile";
export const UPDATE_PROFILE_URL = API_URL + "/update-user-profile";
export const CHANGE_PASSWORD_URL = API_URL + "/change-user-password";
export const DELETE_ACCOUNT_URL = API_URL + "/delete-account";

export const LOGOUT_URL = API_URL + "/logout";
