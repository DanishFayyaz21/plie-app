import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  Image,
  Keyboard
} from "react-native";
import styles from "./styles";
import Navigator from "../../common/Navigator";
import PlieTextInputForm from "../../components/PlieTextInputForm";
import AuthRootView from "../../components/AuthRootView";
import PlieButton from "../../components/PlieButton";
import { validateEmail } from "../../common/Validation";
import AppNavKeys from "../../common/AppNavKeys";
import { getDeviceName } from "react-native-device-info";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncParamsKeys, Firebase } from "../../common/Constants";
import { useDispatch, useSelector } from "react-redux";
import { LOGIN, TOKEN, USER } from "../../common/StoreActionTypes";

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
import { FetchLoginAction } from "../../store/actions/LoginAction";
import { Assets } from "../../assets/Icons";

export default function Login() {
  const dispatch = useDispatch();

  const ref1 = useRef();
  const ref2 = useRef();

  const [loginType, setLoginType] = useState(0);
  const [fbAccessToken, setFBAccessToken] = useState("");
  const [socialUser, setSocialUser] = useState(null);

  const [values, setValues] = useState({
    email: "",
    password: ""
  });

  const [emErr, setEMErr] = useState(false);
  const [pwErr, setPWErr] = useState(false);
  const [emIVErr, setEMIVErr] = useState(false);

  const { CommonReducer, LoginReducer } = useSelector((state) => ({
    CommonReducer: state.CommonReducer,
    LoginReducer: state.LoginReducer,
  }));

  useEffect(() => {
    if (CommonReducer.api_type) {
      getResponse();
    }
  }, [CommonReducer, LoginReducer]);

  function getResponse() {
    // if (LoginReducer.message && CommonReducer.api_type) {
    //   // showMessage({ type: Flash.Error, message: LoginReducer.message });
    //   if (verifyEmail) alert(LoginReducer.message);
    //   return;
    // }
    switch (CommonReducer.api_type) {
      case LOGIN: {
        // console.log("LoginReducer.resData", LoginReducer.resData);
        if (LoginReducer.resData != null) {
          let success = LoginReducer.resData.success;
          let message = LoginReducer.resData.message;
          if (success) {
            setUserData(LoginReducer.resData);
          } else {
            if (LoginReducer.resData.data) {
              let emailExists = LoginReducer.resData.data.user_email_unverified;
              let socialAccountNotFound =
                LoginReducer.resData.data.social_acccount_not_found;
              console.log("emailExists", emailExists, values.email);
              if (!LoginReducer.resData.success) {
                onChangeValue("password", "")
              }
              if (emailExists) {
                Navigator.navigate(AppNavKeys.Verification, {
                  email: values.email,
                });
              } else if (socialAccountNotFound) {
                Navigator.navigate(AppNavKeys.Register, { socialUser });
              }
            }
          }
        }
        break;
      }
    }
  }

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
        setSocialUser(user);
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
          //console.log("===Error===", error);
          alert("Error fetching data: " + error.toString());
        } else {
          //console.log("===Result===", result);

          if (result != null) {
            let user = {
              id: result.id,
              loginType: 2,
              email: result.email,
              firstName: result.first_name,
              lastName: result.last_name,
              username: generateUserName(result.first_name)
            };
            setSocialUser(user);
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

  useEffect(() => {
    if (socialUser) {
      doSocialLogin();
    }
  }, [socialUser]);

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
        setSocialUser(user);
      } else {
        let appleUser = await AsyncStorage.getItem(AsyncParamsKeys.AppleUser);
        if (appleUser != null) {
          let user = JSON.parse(appleUser);
          setSocialUser(user);
        }
      }

    }

  }

  const generateUserName = (firstName) => {
    var val = Math.floor(1000 + Math.random() * 9000);
    return firstName + "" + val;
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

  const onChangeValue = (name, value) => {
    setValues({ ...values, [name]: value });
    onRemoveError(name);
  };

  const onRemoveError = (name) => {
    if (name == "email") {
      setEMErr(false);
      setEMIVErr(false);
    } else if (name == "password") setPWErr(false);
  };

  const doLogin = async () => {
    if (!values.email) setEMErr(true);
    else if (!validateEmail(values.email)) {
      setEMErr(true);
      setEMIVErr(true);
    } else {
      setEMErr(false);
      setEMIVErr(false);
    }

    if (!values.password) setPWErr(true);
    else setPWErr(false);

    if (values.email && validateEmail(values.email) && values.password) {
      let deviceName = await getDeviceName();
      let body = {
        email: values.email.toLowerCase(),
        password: values.password,
        platform: Platform.OS,
        deviceToken: "",
        deviceName: deviceName,
        loginType: loginType,
      };

      dispatch(FetchLoginAction(body));
    }
  };

  const doSocialLogin = async () => {
    let body = {
      email: socialUser.email,
      providerId: socialUser.id,
      platform: Platform.OS,
      deviceToken: "",
      loginType: loginType,
    };

    dispatch(FetchLoginAction(body));
  };

  return (
    <AuthRootView isWithoutBack={true}>
      <PlieTextInputForm
        refs={ref1}
        isError={emErr}
        isValidError={emIVErr}
        placeholder={"Email"}
        autoCapitalize="none"
        value={values.email}
        keyboardType="email-address"
        onSubmitEditing={() => ref2.current.focus()}
        onChangeText={(text) => onChangeValue("email", text)}
      />

      <PlieTextInputForm
        refs={ref2}
        isPassword
        isError={pwErr}
        value={values.password}
        placeholder={"Password"}
        onSubmitEditing={() => Keyboard.dismiss()}
        onChangeText={(text) => onChangeValue("password", text)}
      />

      <Text
        style={styles.sty1}
        onPress={() => Navigator.navigate(AppNavKeys.ForgotPassword)}
      >
        Forgot password?
      </Text>

      <PlieButton
        text={"Sign in"}
        onPress={() => {
          setLoginType(0);
          doLogin();
        }}
      />

      <TouchableOpacity style={styles.sty2}
        onPress={() => Navigator.navigate(AppNavKeys.Register)}>
        <Text style={styles.sty3}>Not a member?</Text>
        <Text style={styles.sty4}>Sign Up Here</Text>
      </TouchableOpacity>

      <View style={styles.sty5}>
        <View style={styles.sty6} />
        <Text style={styles.sty7}>or Sign In with:</Text>
        <View style={styles.sty6} />
      </View>

      <View style={styles.sty8}>
        <TouchableOpacity
          style={styles.sty11}
          onPress={() => {
            setLoginType(1);
            googleSignIn();
          }}
        >
          <Image style={styles.sty9} source={Assets.google} />
        </TouchableOpacity>

        {Platform.OS === "ios" ?
          <TouchableOpacity
            style={styles.sty11}
            onPress={() => {
              setLoginType(3);
              appleSignIn()
            }}
          >
            <Image style={styles.sty9} source={Assets.apple}
              resizeMode="contain" />
          </TouchableOpacity>
          : null}

        <TouchableOpacity
          style={styles.sty11}
          onPress={() => {
            setLoginType(2);
            facebookSignIn();
          }}
        >
          <Image style={styles.sty10} source={Assets.facebook} />
        </TouchableOpacity>
      </View>

      <Text style={styles.sty12}
        onPress={() => Navigator.navigate(AppNavKeys.Home, {
          from: "Guest"
        })}>Enter as Guest</Text>
    </AuthRootView>
  );
}