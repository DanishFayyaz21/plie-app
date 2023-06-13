import { combineReducers } from "redux";

import CommonReducer from "./reducers/CommonReducer";
import LoginReducer from "./reducers/LoginReducer";
import RegisterReducer from "./reducers/RegisterReducer";
import EventReducer from "./reducers/EventReducer";
import FilterReducer from "./reducers/FilterReducer";
import ProfileReducer from "./reducers/ProfileReducer";
import AddEventReducer from "./reducers/AddEventReducer";
import VerifyUserReducer from "./reducers/VerifyUserReducer";
import EditArtistReducer from "./reducers/EditArtistReducer";
import EditTickesReducer from "./reducers/EditTickesReducer";
import EditScheduleReducer from "./reducers/EditScheduleReducer";
export default combineReducers({
  CommonReducer: CommonReducer,
  LoginReducer: LoginReducer,
  RegisterReducer: RegisterReducer,
  EventReducer: EventReducer,
  FilterReducer: FilterReducer,
  AddEventReducer: AddEventReducer,
  VerifyUserReducer: VerifyUserReducer,
  EditArtistReducer: EditArtistReducer,
  EditTickesReducer: EditTickesReducer,
  EditScheduleReducer: EditScheduleReducer,
  ProfileReducer,
});
