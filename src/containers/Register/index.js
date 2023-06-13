import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Image, Platform, Keyboard, Linking, ScrollView } from "react-native";
import styles from "./styles";
import AppNavKeys from "../../common/AppNavKeys";
import Navigator from "../../common/Navigator";
import SplashScreen from "react-native-splash-screen";
import { Assets } from "../../assets/Icons";
import PlieTextInputForm from "../../components/PlieTextInputForm";
import PlieButton from "../../components/PlieButton";
import { validateEmail, validatePassword } from "../../common/Validation";
import { Constants, Firebase, Flash } from "../../common/Constants";
import { useDispatch, useSelector } from "react-redux";
import { REGISTER } from "../../common/StoreActionTypes";
import AuthRootView from "../../components/AuthRootView";
import RadioButton from "../../components/RadioButton";
import { POLICY, TERMS } from "../../common/ApiConfig";

import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import {
  AccessToken,
  LoginManager,
  GraphRequest,
  GraphRequestManager,
} from "react-native-fbsdk-next";
import { appleAuth } from '@invertase/react-native-apple-authentication';

import { FetchRegisterAction } from "../../store/actions/RegisterAction";
import { showMessage } from "react-native-flash-message";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Register(props) {
  const dispatch = useDispatch();

  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const ref4 = useRef();
  const ref5 = useRef();

  const { socialUser } = props.route.params;

  const [fbAccessToken, setFBAccessToken] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const [values, setValues] = useState({
    id: "",
    loginType: 0,
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    code: "",
  });

  const [fnErr, setFNErr] = useState(false);
  const [lnErr, setLNErr] = useState(false);
  const [unErr, setUNErr] = useState(false);
  const [emErr, setEMErr] = useState(false);
  const [pwErr, setPWErr] = useState(false);
  const [emIVErr, setEMIVErr] = useState(false);
  const [pwIVErr, setPWIVErr] = useState(false);

  useEffect(() => {
    setTimeout(function () {
      SplashScreen.hide();
    }, 2000);
  });

  useEffect(() => {
    if (socialUser) {
      setValues(socialUser);
    }
  }, [socialUser]);

  const onChangeValue = (name, value) => {
    setValues({ ...values, [name]: value });
    onRemoveError(name);
  };

  const onChangeNameValue = (name, value) => {
    const re = /^[A-Za-z ]+$/;
    if (value === "" || re.test(value)) {
      setValues({ ...values, [name]: value });
      onRemoveError(name);
    }
  };

  const onChangeUserNameValue = (name, value) => {
    const re = /^[a-zA-Z0-9_.]+$/;
    if (value === "" || re.test(value)) {
      setValues({ ...values, [name]: value });
      onRemoveError(name);
    }
  };

  const onRemoveError = (name) => {
    if (name == "firstName") setFNErr(false);
    else if (name == "lastName") setLNErr(false);
    else if (name == "username") setUNErr(false);
    else if (name == "email") {
      setEMErr(false);
      setEMIVErr(false);
    } else if (name == "password") {
      setPWErr(false);
      setPWIVErr(false)
    }
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
      case REGISTER: {
        if (RegisterReducer.resData != null) {
          let success = RegisterReducer.resData.success;
          let message = RegisterReducer.resData.message;
          if (success) {
            if (values.loginType == 0) {
              Navigator.navigate(AppNavKeys.Verification, {
                email: values.email
              });
            } else {
              Navigator.goBack();
            }
          } else {
            if (RegisterReducer.resData.data) {
              let emailExists = RegisterReducer.resData.data.email_exists;
              if (emailExists) {
                Navigator.navigate(AppNavKeys.Verification, {
                  email: values.email
                });
              }
            }
          }
        }
        break;
      }
    }
  }

  const onSubmit = () => {
    if (!values.firstName) {
      setFNErr(true);
      return;
    } else setFNErr(false);

    if (!values.lastName) {
      setLNErr(true);
      return;
    } else setLNErr(false);

    if (!values.username) {
      setUNErr(true);
      return;
    } else {
      setUNErr(false);

      if (values.loginType > 0) {

        if (!isChecked) {
          showMessage({
            type: Flash.Error,
            message: "Please accept Terms & Conditions"
          });
          return;
        }

        if (values.firstName &&
          values.lastName &&
          values.username &&
          isChecked) {
          let body = {
            loginType: values.loginType,
            email: values.email,
            providerId: values.id,
            fname: values.firstName,
            lname: values.lastName,
            username: values.username,
            platform: Platform.OS,
            requestFrom: Constants.App,
          };
          dispatch(FetchRegisterAction(body));
        }
      } else {
        if (!values.email) {
          setEMErr(true);
          return;
        } else if (!validateEmail(values.email)) {
          setEMErr(true);
          setEMIVErr(true);
          return;
        } else {
          setEMErr(false);
          setEMIVErr(false);
        }

        if (!values.password) {
          setPWErr(true);
          return;
        } else if (!validatePassword(values.password)) {
          setPWErr(true);
          setPWIVErr(true);
          return;
        } else {
          setPWErr(false);
          setPWIVErr(false);

          if (!isChecked) {
            showMessage({
              type: Flash.Error,
              message: "Please accept Terms & Conditions"
            });
            return;
          }

          if (
            values.firstName &&
            values.lastName &&
            values.username &&
            values.email &&
            validateEmail(values.email) &&
            values.password &&
            validatePassword(values.password) &&
            isChecked
          ) {
            let body = {
              email: values.email.toLowerCase(),
              password: values.password,
              fname: values.firstName,
              lname: values.lastName,
              username: values.username,
              platform: Platform.OS,
              requestFrom: Constants.App,
            };
            dispatch(FetchRegisterAction(body));
          }
        }
      }
    }
  };

  const googleSignIn = async () => {
    try {
      GoogleSignin.configure({
        scopes: ["profile", "email"],
        iosClientId: Firebase.IOSClientId
      });

      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      //console.log("===User===", userInfo);

      if (userInfo != null) {
        const userDetail = userInfo.user;

        let user = {
          id: userDetail.id,
          loginType: 1,
          email: userDetail.email,
          firstName: userDetail.givenName,
          lastName: userDetail.familyName,
          username: generateUserName(userDetail.givenName)
        };
        setValues(user);
      }

      // this.setState({ userInfo });
    } catch (error) {
      //console.log("===Error===", error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  const facebookSignIn = async () => {
    // Attempt a login using the Facebook login dialog asking for default permissions.
    try {
      const result = await LoginManager.logInWithPermissions(
        ["public_profile", "email"]
      );
      console.log(result);

      const tokenResult = await AccessToken.getCurrentAccessToken();
      console.log(tokenResult?.accessToken);
      setFBAccessToken(tokenResult?.accessToken);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (fbAccessToken) {
      const responseInfoCallback = (error, result) => {
        if (error) {
          //console.log(error);
          alert("Error fetching data: " + error.toString());
        } else {
          //console.log(result);

          if (result != null) {
            let user = {
              id: result.id,
              loginType: 2,
              email: result.email,
              firstName: result.first_name,
              lastName: result.last_name,
              username: generateUserName(result.first_name)
            };
            setValues(user);
          }

          //alert('id: ' + result.id + '\n\nname: ' + result.name + '\n\nfirst_name: ' + result.first_name + '\n\nlast_name: ' + result.last_name + '\n\nemail: ' + result.email);
        }
      };

      const infoRequest = new GraphRequest(
        "/me",
        {
          accessToken: fbAccessToken,
          parameters: {
            fields: {
              string: "email,name,first_name,last_name",
            },
          },
        },
        responseInfoCallback
      );

      // Start the graph request.
      new GraphRequestManager().addRequest(infoRequest).start();
    }
  }, [fbAccessToken]);

  const appleSignIn = async () => {

    // performs login request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME]
    });

    // get current authentication state for user
    // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
    const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);

    // use credentialState response to ensure the user is authenticated
    if (credentialState === appleAuth.State.AUTHORIZED) {
      // user is authenticated

      let user = {
        id: appleAuthRequestResponse.user,
        loginType: 3,
        email: appleAuthRequestResponse.email,
        firstName: appleAuthRequestResponse.fullName.givenName,
        lastName: appleAuthRequestResponse.fullName.familyName,
        username: generateUserName(appleAuthRequestResponse.fullName.givenName)
      };

      if (appleAuthRequestResponse.email != null) {
        await AsyncStorage.setItem(
          AsyncParamsKeys.AppleUser,
          JSON.stringify(user)
        );
        setValues(user);
      } else {
        let appleUser = await AsyncStorage.getItem(AsyncParamsKeys.AppleUser);
        if (appleUser != null) {
          let user = JSON.parse(appleUser);
          setValues(user);
        }
      }

    }

  }

  const generateUserName = (firstName) => {
    var val = Math.floor(1000 + Math.random() * 9000);
    return firstName + "" + val;
  }

  const doOpenURL = (type) => {
    try {
      if (type == 1) {
        Linking.openURL(TERMS)
      } else {
        Linking.openURL(POLICY)
      }
    } catch (error) { }
  };




  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

 useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <AuthRootView onPress={() => Navigator.goBack()}>
      <View style={styles.sty1}>
        <PlieTextInputForm
          rootStyle={styles.sty2}
          refs={ref1}
          isError={fnErr}
          placeholder={"First name"}
          value={values.firstName}
          onSubmitEditing={() => ref2.current.focus()}
          onChangeText={(text) => onChangeNameValue("firstName", text)}
        />

        <PlieTextInputForm
          rootStyle={styles.sty3}
          refs={ref2}
          isError={lnErr}
          placeholder={"Last name"}
          value={values.lastName}
          onSubmitEditing={() => ref3.current.focus()}
          onChangeText={(text) => onChangeNameValue("lastName", text)}
        />
      </View>

      <PlieTextInputForm
        refs={ref3}
        isError={emErr}
        isValidError={emIVErr}
        placeholder={"Email"}
        autoCapitalize="none"
        keyboardType="email-address"
        value={values.email}
        editable={!values.id}
        onSubmitEditing={() => ref4.current.focus()}
        onChangeText={(text) => onChangeValue("email", text)}
      />

      <PlieTextInputForm
        refs={ref4}
        isError={unErr}
        value={values.username}
        placeholder={"Username"}
        onSubmitEditing={() => !values.id ? ref5.current.focus() : Keyboard.dismiss()}
        onChangeText={(text) => onChangeUserNameValue("username", text)}
      />

      {!values.id ? (
        <View>
          <PlieTextInputForm
            refs={ref5}
            isPassword
            isError={pwErr}
            isValidError={pwIVErr}
            placeholder={"Password"}
            onSubmitEditing={() => Keyboard.dismiss()}
            onChangeText={(text) => onChangeValue("password", text)}
          />

          <Text style={styles.sty10}>
            8 characters, number, and symbol required
          </Text>
        </View>
      ) : null}

      <View style={styles.sty12}>
        <RadioButton
          isChecked={isChecked}
          onChecked={(isChecked) => setIsChecked(isChecked)}
        />
        <TouchableOpacity onPress={() => setIsChecked(!isChecked)}>
          <Text style={styles.sty13}>
          I agree to Plie’s{" "}
            <Text style={styles.sty14}
              onPress={() => doOpenURL(1)}>Terms of Services</Text> and{" "}
            <Text style={styles.sty14}
              onPress={() => doOpenURL(2)}>Privacy Policy</Text>.
          </Text>
        </TouchableOpacity>
      </View>

      <PlieButton text={"Create Account"} onPress={() => onSubmit()} />

      <View style={styles.sty6}>
        <View style={styles.sty4} />
        <Text style={styles.sty5}>or Sign Up with:</Text>
        <View style={styles.sty4} />
      </View>

      <View style={styles.sty7}>
        <TouchableOpacity
          style={styles.sty11}
          onPress={() => {
            googleSignIn();
          }}
        >
          <Image style={styles.sty8} source={Assets.google} />
        </TouchableOpacity>

        {Platform.OS === "ios" ?
          <TouchableOpacity
            style={styles.sty11}
            onPress={() => {
              setLoginType(3);
              appleSignIn()
            }}
          >
            <Image style={styles.sty8} source={Assets.apple} />
          </TouchableOpacity>
          : null}

        <TouchableOpacity
          style={styles.sty11}
          onPress={() => {
            facebookSignIn();
          }}
        >
          <Image style={styles.sty9} source={Assets.facebook} />
        </TouchableOpacity>
      </View>
    
    </AuthRootView>
  );
}
