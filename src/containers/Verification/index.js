import React, { useState, useEffect, useRef } from "react";
import { Text, TouchableOpacity } from "react-native";
import styles from "./styles";
import AppNavKeys from "../../common/AppNavKeys";
import Navigator from "../../common/Navigator";
import PlieButton from "../../components/PlieButton";
import { getDeviceName } from "react-native-device-info";
import { useDispatch, useSelector } from "react-redux";
import {
  RESEND_EMAIL_CODE,
  TOKEN,
  USER,
  VERIFY_EMAIL,
} from "../../common/StoreActionTypes";
import AuthRootView from "../../components/AuthRootView";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  FetchResendEmailCodeAction,
  FetchVerifyEmailAction,
} from "../../store/actions/RegisterAction";
import { AsyncParamsKeys } from "../../common/Constants";

export default function Verification({ route, navigation, ...props }) {

  const dispatch = useDispatch();
  const otpView = useRef();

  const { email } = route.params;

  const [cdErr, setCDErr] = useState(false);

  const [values, setValues] = useState({
    code: "",
    email: email,
  });

  const onChangeValue = (name, value) => {
    setValues({ ...values, [name]: value });
    onRemoveError(name);
  };

  const onRemoveError = (name) => {
    if (name == "firstName") setFNErr(false);
    else if (name == "lastName") setLNErr(false);
    else if (name == "username") setUNErr(false);
    else if (name == "email") {
      setEMErr(false);
      setEMIVErr(false);
    } else if (name == "password") setPWErr(false);
  };

  const { CommonReducer, RegisterReducer } = useSelector((state) => ({
    CommonReducer: state.CommonReducer,
    RegisterReducer: state.RegisterReducer,
  }));

  useEffect(() => {
    if (CommonReducer.api_type) {
      getResponse();
    }
  }, [CommonReducer, RegisterReducer]);

  function getResponse() {
    // if (RegisterReducer.message && CommonReducer.api_type) {
    //   // showMessage({ type: Flash.Error, message: RegisterReducer.message });
    //   if (verifyEmail) alert(RegisterReducer.message);
    //   return;
    // }
    switch (CommonReducer.api_type) {
      case VERIFY_EMAIL: {
        if (RegisterReducer.resData != null) {
          let message = RegisterReducer.resData.message;
          if (RegisterReducer.resData.success) {
            setUserData(RegisterReducer.resData);
          }
        }
        break;
      }
      case RESEND_EMAIL_CODE: {
        // if (RegisterReducer.resData != null) {
        //   alert(RegisterReducer.resData.message);
        // }
        break;
      }
    }
  }

  const setUserData = async (data) => {
    let user = data.data.user;
    let token = data.data.token;
    await AsyncStorage.setItem(
      AsyncParamsKeys.LoginUserObj,
      JSON.stringify(user)
    );
    await AsyncStorage.setItem(AsyncParamsKeys.Token, token);
    dispatch({ type: TOKEN, payload: token });
    dispatch({ type: USER, payload: user });
    Navigator.navigate(AppNavKeys.Home);
  };

  // useEffect(() => {
  //   setTimeout(() => {
  //     otpView.current.focusField(0);
  //   }, 1500);
  // }, []);

  const doVerifyEmail = async () => {
    if (!values.code) setCDErr(true);
    else {
      setCDErr(false);

      let deviceName = await getDeviceName();
      let body = {
        email: values.email.toLowerCase(),
        code: values.code,
        deviceToken: "",
        deviceName: deviceName,
      };
      dispatch(FetchVerifyEmailAction(body));
    }
  };

  const doResendCode = () => {
    let body = {
      email: values.email.toLowerCase()
    };
    dispatch(FetchResendEmailCodeAction(body));
  };

  return (
    <AuthRootView onPress={() => Navigator.goBack()}>
      <Text style={styles.sty10}>
        Enter the verification code sent to your email
      </Text>

      <OTPInputView
        ref={otpView}
        style={styles.sty1}
        pinCount={6}
        autoFocusOnLoad={false}
        onCodeChanged={(code) => onChangeValue("code", code)}
        codeInputFieldStyle={styles.sty2}
        codeInputHighlightStyle={styles.sty3}
        onCodeFilled={(code) => { }}
      />

      {cdErr ? (
        <Text style={styles.sty19}>Please enter verification code</Text>
      ) : null}

      <TouchableOpacity
        onPress={() => {
          doResendCode();
        }}
      >
        <Text style={styles.sty14}>Resend</Text>
      </TouchableOpacity>

      <PlieButton
        text={"Verify Email"}
        onPress={() => {
          doVerifyEmail();
        }}
      />

    </AuthRootView>
  );
}
