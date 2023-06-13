import { Alert } from "react-native";
import Fonts from "../assets/Fonts";
import Colors from "./Colors";
//import Snackbar from "react-native-snackbar";
//import Strings from "./Strings";
//import { SnackBar } from "./SnackBar";

export const isTextNotEmpty = (text, fieldName = "") => {
  console.log(text, "get validation pin text");
  console.log(typeof text, "get validation pin text2");
  if (text && text.trim().length > 0) {
    return true;
  } else if (fieldName != "") {
    return false;
    //SnackBar(Strings.PleaseEnter + " " + fieldName + ".");
  }
  return false;
};

export const isTextNotEmpty2 = (text, fieldName = "") => {
  if (text && text.trim().length > 0) {
    return true;
  } else if (fieldName != "") {
    return false;
    //SnackBar(Strings.Please + " " + fieldName + ".");
  }
  return false;
};

export const validatePhone = (text, fieldName = "") => {
  if (text.length > 9) {
    return true;
  } else if (fieldName != "") {
    return false;
    // Alert.alert(null, 'Please enter valid ' + fieldName + '.');
    // Snackbar.show({
    //   text: "Please enter valid " + fieldName + ".",
    //   duration: Snackbar.LENGTH_LONG,
    //   backgroundColor: Colors.validationRed,
    //   fontFamily: Fonts.Regular,
    //   textColor: Colors.white,
    // });
  }
  return false;
};

export const validateEmail = (email, fieldName = "") => {
  var emailRegex =
    /^[A-Z0-9_-]+([\.][A-Z0-9_]+)*@[A-Z0-9-]+(\.[a-zA-Z]{2,5})+$/i;

  email = email.trim();
  if (emailRegex.test(email)) {
    return true;
  } else if (fieldName != "") {
    return false;
  }
  return false;
};

export const validatePassword = (password) => {
  //const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
  const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
  password = password.trim();
  if (strongRegex.test(password)) {
    return true;
  }
  return false;
};

export const validateLanguage = (isSelect, fieldName = "") => {
  console.log(isSelect, "------------->");
  if (isSelect != "") {
    return true;
  } else if (fieldName != "") {
    // Alert.alert(null, 'Please enter ' + fieldName + '.');
    //SnackBar(fieldName + ".");
    return false;
  }
  return false;
};

export const validateRegionNumber = (isValid, fieldName = "") => {
  if (isValid == true) {
    return true;
  } else if (fieldName != "") {
    //SnackBar(Strings.PleaseEnter + " " + Strings.Valid + " " + fieldName + ".");
    return false;
  }
  return false;
};

export const validRadioBtn = (isValid1, isValid2, fieldName = "") => {
  if (isValid1 == true || isValid2 == true) {
    return true;
  } else if (fieldName != "") {
    //SnackBar(fieldName + ".");
    return false;
  }
  return false;
};

export const isMoreThenZero = (text, fieldName = "") => {
  if (text && text != null && text != "" && text.trim().length > 0 && Number(text) > 0) {
    return true;
  } else {
    //SnackBar("please enter more then zero " + fieldName)
    return false;
  }
  return false;
};
