import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Platform,
  Keyboard,
} from "react-native";
import styles from "./styles";
import Navigator from "../../common/Navigator";
import PlieTextInput from "../../components/PlieTextInput";
import AuthRootView from "../../components/AuthRootView";
import PlieButton from "../../components/PlieButton";
import { useDispatch, useSelector } from "react-redux";
import { CHANGE_PASSWORD,DELETE_ACCOUNT, TOKEN, USER } from "../../common/StoreActionTypes";
import { ChangePasswordAction, DeleteAccountAction } from "../../store/actions/ProfileAction";
import { validatePassword } from "../../common/Validation";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AsyncParamsKeys } from "../../common/Constants";
import AppNavKeys from "../../common/AppNavKeys";

export default function ChangePassword({ route, navigation, ...props }) {
  const dispatch = useDispatch();

  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();

  const [values, setValues] = useState({
    oldPass: "",
    newPass: "",
    confPass: "",
  });

  const [opErr, setOPErr] = useState(false);
  const [npErr, setNPErr] = useState(false);
  const [cpErr, setCPErr] = useState(false);
  const [npCpErr, setNpCpErr] = useState(false);
  const [pwIVErr, setPWIVErr] = useState(false);

  const { CommonReducer, ProfileReducer } = useSelector((state) => ({
    CommonReducer: state.CommonReducer,
    ProfileReducer: state.ProfileReducer,
  }));

  useEffect(() => {
    if (CommonReducer.api_type) {
      getResponse();
    }
  }, [CommonReducer, ProfileReducer]);

  function getResponse() {
    switch (CommonReducer.api_type) {
      case CHANGE_PASSWORD: {
        if (ProfileReducer.resData != null) {
          let success = ProfileReducer.resData.success;
          if (success) {
            setValues({
              oldPass: "",
              newPass: "",
              confPass: "",
            });
          } else {
          }
        }
        break;
      }
      case DELETE_ACCOUNT: {
        console.log('ascascsacs=====>')
        if (ProfileReducer.resData != null) {
          let success = ProfileReducer.resData.success;
          if (success) {
            logout();
          } else {
          }
        }
        break;
      }
    }
  }

  const logout = async () => {
    try {
      await AsyncStorage.removeItem(AsyncParamsKeys.Token);
      await AsyncStorage.removeItem(AsyncParamsKeys.LoginUserObj);
      dispatch({ type: TOKEN, payload: "" });
      dispatch({ type: USER, payload: null });
      Navigator.resetFrom(AppNavKeys.Login);
    } catch (exception) {}
  };


  const onChangeValue = (name, value) => {
    setValues({ ...values, [name]: value });
    onRemoveError(name);
  };

  const onRemoveError = (name) => {
    if (name == "oldPass") setOPErr(false);
    else if (name == "newPass") {
      setNPErr(false);
      setPWIVErr(false);
    }
    else if (name == "confPass") setCPErr(false);
  };

  const doChangePassword = async () => {
    if (!values.oldPass) {
      setOPErr(true);
      return;
    } else setOPErr(false);

    if (!values.newPass) {
      setNPErr(true);
      return;
    } else if (!validatePassword(values.newPass)) {
      setNPErr(true);
      setPWIVErr(true);
      return;
    } else {
      setNPErr(false);
      setPWIVErr(false);
    }

    if (!values.confPass) {
      setCPErr(true);
      return;
    } else setCPErr(false);

    if (values.confPass != values.newPass) {
      setNpCpErr(true);
      return;
    } else {
      setNpCpErr(false);
    }

    if (values.newPass) {
      let body = {
        password: values.oldPass,
        "new-password": values.newPass,
        platform: Platform.OS,
      };
      dispatch(ChangePasswordAction(body));
    }
  };

  return (
    <AuthRootView
      isWithoutHeader
      onPress={() => Navigator.goBack()}>

      <Text style={styles.sty1}>Reset Password</Text>

      <PlieTextInput
        refs={ref3}
        isPassword
        isWithoutTitle
        isError={opErr}
        value={values.oldPass}
        placeholder={"Old Password"}
        onSubmitEditing={() => ref1.current.focus()}
        onChangeText={(text) => onChangeValue("oldPass", text)}
      />

      <PlieTextInput
        refs={ref1}
        isPassword
        isWithoutTitle
        isError={npErr}
        isValidError={pwIVErr}
        value={values.newPass}
        placeholder={"New Password"}
        onSubmitEditing={() => ref2.current.focus()}
        onChangeText={(text) => onChangeValue("newPass", text)}
      />

      <PlieTextInput
        refs={ref2}
        isPassword
        isWithoutTitle
        isError={cpErr}
        value={values.confPass}
        placeholder={"Confirm Password"}
        onSubmitEditing={() => {
          Keyboard.dismiss();
        }}
        onChangeText={(text) => onChangeValue("confPass", text)}
      />

      <Text style={styles.sty2}>
        8 characters, number, and symbol required
      </Text>

      {npCpErr ? (
        <Text style={styles.sty4}>
          New password and confirm password are not same!
        </Text>
      ) : null}

      <PlieButton
        style={styles.sty3}
        text={"Update"}
        onPress={() => doChangePassword()}
      />

      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.sty5}>Do you want to </Text>
        <TouchableOpacity
          onPress={() => { dispatch(DeleteAccountAction()) }}><Text style={styles.sty6}>Delete Account </Text></TouchableOpacity>
        <Text style={styles.sty5}>?</Text>
      </View>


    </AuthRootView>
  );
}
