import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Platform,
  Linking,
  TouchableOpacity,
  Image,
} from "react-native";
import styles from "./styles";
import Navigator from "../../common/Navigator";
import PlieTextInputForm from "../../components/PlieTextInputForm";
import AuthRootView from "../../components/AuthRootView";
import PlieButton from "../../components/PlieButton";
import RadioButton from "../../components/RadioButton";
import { validateEmail, validatePassword } from "../../common/Validation";
import AppNavKeys from "../../common/AppNavKeys";
import { getDeviceName } from "react-native-device-info";
import { Flash } from "../../common/Constants";
import { useDispatch, useSelector } from "react-redux";
import {
  FORGOT_PASSWORD,
  VERIFY_PASSWORD_CODE,
  RESET_PASSWORD
} from "../../common/StoreActionTypes";
import { showMessage } from "react-native-flash-message";

import OTPInputView from "@twotalltotems/react-native-otp-input";

import {
  FetchForgotPasswordAction,
  FetchVerifyPasswordCodeAction,
  FetchResetPasswordAction,
} from "../../store/actions/LoginAction";
import { POLICY, TERMS } from "../../common/ApiConfig";

export default function ResetPassword({ route, navigation, ...props }) {
  const dispatch = useDispatch();

  const { email } = route.params;

  const ref1 = useRef();
  const ref2 = useRef();
  const otpView = useRef();

  const [codeVerified, setCodeVerified] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const [values, setValues] = useState({
    email: email,
    code: "",
    newPass: "",
    confPass: "",
  });

  const [cdErr, setCDErr] = useState(false);
  const [npErr, setNPErr] = useState(false);
  const [cpErr, setCPErr] = useState(false);
  const [npCpErr, setNpCpErr] = useState(false);
  const [pwIVErr, setPWIVErr] = useState(false);

  const { CommonReducer, LoginReducer } = useSelector((state) => ({
    CommonReducer: state.CommonReducer,
    LoginReducer: state.LoginReducer,
  }));

  useEffect(() => {
    setTimeout(() => {
      if (otpView && otpView.current) {
        otpView.current.focusField(0);
      }
    }, 1500);
  }, []);

  useEffect(() => {
    if (CommonReducer.api_type) {
      getResponse();
    }
  }, [CommonReducer, LoginReducer]);

  function getResponse() {
    switch (CommonReducer.api_type) {
      case RESET_PASSWORD: {
        if (LoginReducer.resData != null) {
          let success = LoginReducer.resData.success;
          if (success) {
            Navigator.resetFrom(AppNavKeys.Login);
          } else {
          }
        }
        break;
      }
      case FORGOT_PASSWORD: {
        if (LoginReducer.resData != null) {
        }
        break;
      }
      case VERIFY_PASSWORD_CODE: {
        if (LoginReducer.resData != null) {
          if (LoginReducer.resData.success) {
            setCodeVerified(true);
          }
        }
        break;
      }
    }
  }

  const onChangeValue = (name, value) => {
    setValues({ ...values, [name]: value });
    onRemoveError(name);
  };

  const onRemoveError = (name) => {
    if (name == "code") setCDErr(false);
    else if (name == "newPass") setNPErr(false);
    else if (name == "confPass") setCPErr(false);
  };

  const doResetPassword = async () => {

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

    if (values.email && validateEmail(values.email) && values.newPass) {
      let deviceName = await getDeviceName();
      let body = {
        email: values.email.toLowerCase(),
        code: values.code,
        password: values.newPass,
        platform: Platform.OS,
        deviceToken: "",
        deviceName: deviceName,
      };
      dispatch(FetchResetPasswordAction(body));
    }
  };

  const doSendCode = () => {
    let body = {
      email: values.email.toLowerCase(),
    };
    dispatch(FetchForgotPasswordAction(body));
  };

  const doVerifyCode = async () => {
    if (!values.code) setCDErr(true);
    else {
      setCDErr(false);

      if (!isChecked) {
        showMessage({
          type: Flash.Error,
          message: "Please accept Terms & Conditions",
        });
        return;
      }

      let deviceName = await getDeviceName();
      let body = {
        email: values.email.toLowerCase(),
        code: values.code,
        deviceToken: "",
        deviceName: deviceName,
      };
      dispatch(FetchVerifyPasswordCodeAction(body));
    }
  };

  const doOpenURL = (type) => {
    try {
      if (type == 1) {
        Linking.openURL(TERMS)
      } else {
        Linking.openURL(POLICY)
      }
    } catch (error) { }
  };

  return (
    <AuthRootView onPress={() => Navigator.goBack()}>
      {codeVerified ? (
        <View>
          <Text style={styles.sty15}>Set Password</Text>

          <PlieTextInputForm
            refs={ref1}
            isPassword
            isWithoutTitle
            isError={npErr}
            isValidError={pwIVErr}
            placeholder={"New Password"}
            onSubmitEditing={() => ref2.current.focus()}
            onChangeText={(text) => onChangeValue("newPass", text)}
          />

          <PlieTextInputForm
            refs={ref2}
            isPassword
            isWithoutTitle
            isError={cpErr}
            placeholder={"Confirm Password"}
            onChangeText={(text) => onChangeValue("confPass", text)}
          />

          <Text style={styles.sty16}>
            8 characters, number, and symbol required
          </Text>

          {npCpErr ? (
            <Text style={styles.sty19}>New password and confirm password are not same!</Text>
          ) : null}

          <PlieButton
            style={styles.sty17}
            text={"Update Password"}
            onPress={() => doResetPassword()}
          />
        </View>
      ) : (
        <View>
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

          <View style={styles.sty11}>
            <RadioButton
              isChecked={isChecked}
              onChecked={(isChecked) => setIsChecked(isChecked)}
            />
            <TouchableOpacity onPress={() => setIsChecked(!isChecked)}>
              <Text style={styles.sty12}>
                I agree to Photo’s{" "}
                <Text style={styles.sty13}
                  onPress={() => doOpenURL(1)}>Terms of Service</Text> and{" "}
                <Text style={styles.sty13}
                  onPress={() => doOpenURL(2)}>Privacy Policy</Text>.
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              doSendCode();
            }}
          >
            <Text style={styles.sty14}>Resend</Text>
          </TouchableOpacity>

          <PlieButton
            text={"Verify Email"}
            onPress={() => {
              doVerifyCode();
            }}
          />

        </View>
      )}
    </AuthRootView>
  );
}
