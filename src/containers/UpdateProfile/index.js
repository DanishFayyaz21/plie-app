import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  Keyboard,
  Alert,
  PermissionsAndroid,
  Linking,
  ScrollView,
  RefreshControl,
} from "react-native";
import styles from "./styles";
import AppNavKeys from "../../common/AppNavKeys";
import Navigator from "../../common/Navigator";
import { Assets } from "../../assets/Icons";
import PlieTextInputForm from "../../components/PlieTextInputForm";
import PlieButton from "../../components/PlieButton";
import { validateEmail } from "../../common/Validation";
import { AsyncParamsKeys, Constants } from "../../common/Constants";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  GET_PROFILE,
  STRIPE_CONNECT,
  TOKEN,
  UPDATE_PROFILE,
  USER,
} from "../../common/StoreActionTypes";
import AuthRootView from "../../components/AuthRootView";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "react-native-image-picker";

import {
  FetchGetProfileAction,
  StripeConnectAction,
  StripeDisconnectAction,
  UpdateProfileAction,
} from "../../store/actions/ProfileAction";

const imagePickerOptions = {
  saveToPhotos: false,
  mediaType: "photo",
  includeBase64: false,
};

const requestCameraPermission = async () => {
  let returnValue = false;
  try {
    if (await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA)) {
      returnValue = true;
    } else {
      const granted = await PermissionsAndroid.requestMultiple(
        [PermissionsAndroid.PERMISSIONS.CAMERA],
        {
          title: "Cool Photo App Camera Permission",
          message:
            "Cool Photo App needs access to your camera " +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the camera");
        returnValue = true;
      } else {
        console.log("Camera permission denied");
      }
    }
  } catch (err) {
    console.warn(err);
  }

  return returnValue;
};

export default function UpdateProfile(props) {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);

  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const ref4 = useRef();

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
  });

  const [connect, setConnect] = useState(false);
  const [profileImage, setProfileImage] = useState();
  const [imageResponse, setImageResponse] = useState();

  const [fnErr, setFNErr] = useState(false);
  const [lnErr, setLNErr] = useState(false);
  const [unErr, setUNErr] = useState(false);
  const [emErr, setEMErr] = useState(false);
  const [emIVErr, setEMIVErr] = useState(false);

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
    }
  };

  const { CommonReducer, ProfileReducer } = useSelector((state) => ({
    CommonReducer: state.CommonReducer,
    ProfileReducer: state.ProfileReducer,
  }));

  const { user, url } = useSelector((state) => ({
    user: state.ProfileReducer?.user,
    url: state.ProfileReducer?.url
  }));

  useEffect(() => {
    console.log("CCCCCCCCCCCc")
    dispatch(FetchGetProfileAction());
  }, []);

  useEffect(() => {
    if (CommonReducer.api_type) {
      getResponse();
    }
    // console.log("ccccccccjjjjjjjjjjjjjjjj", ProfileReducer?.user.stripe_account_id)
    // if (ProfileReducer && !ProfileReducer?.user?.stripe_account_id && ProfileReducer?.url && !connect) {
    //   console.log('HHHHHHHHHHHHHHHHHHHHHHHHHHHH 1', ProfileReducer.url)
    //   stripeConnectOpen(ProfileReducer.url)
    // }
    // dispatch(FetchGetProfileAction());


  }, [CommonReducer, ProfileReducer]);

  const stripeConnectOpen = async (url) => {
    console.log('DDDDDDDDDDDDDDDDDDDDDDDDDDDDD', url)
    await Linking.openURL(url);
    setConnect(true)
    // dispatch(FetchGetProfileAction());
    //     const supported = await Linking.canOpenURL(url);
    // console.log('JJJJJJJJJJJJJJJJJJJJJJJJJJ', supported)
    //     if (supported) {
    //     }
  };

  function getResponse() {
    switch (CommonReducer.api_type) {
      case GET_PROFILE:
      case UPDATE_PROFILE: {
        if (ProfileReducer.resData && ProfileReducer.user != null) {
          let user = ProfileReducer.user;
          AsyncStorage.setItem(
            AsyncParamsKeys.LoginUserObj,
            JSON.stringify(user)
          );
          dispatch({ type: USER, payload: user });
          let updatedValues = {
            firstName: user.usr_fname,
            lastName: user.usr_lname,
            email: user.usr_email,
            username: user.usr_username,
            profile_image_url: user.usr_profile_img,
          };

          setValues(updatedValues);
          setProfileImage(null);
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
    }

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

    if (
      values.firstName &&
      values.lastName &&
      values.username &&
      values.email &&
      validateEmail(values.email)
    ) {
      let body = new FormData(),
        requestParams = {
          email: values.email.toLowerCase(),
          fname: values.firstName,
          lname: values.lastName,
          username: values.username,
          platform: Platform.OS,
          requestFrom: Constants.App,
        };

      for (let requestKey in requestParams) {
        body.append(requestKey, requestParams[requestKey]);
      }

      if (profileImage) {
        body.append("profile-image", profileImage);
      }
      dispatch(UpdateProfileAction(body));
    }
  };

  useEffect(() => {
    if (imageResponse) {
      console.log("imageResponse", imageResponse);
      if (imageResponse.assets) {
        let data = imageResponse.assets[0];
        let fileName = Date.now().toString() + ".jpeg";
        let file = {
          uri: data.uri,
          type: data.type,
          name: fileName,
        };
        setProfileImage(file);
        let updatedValues = { ...values, profile_image_url: "" };
        setValues(updatedValues);
      }
    }
  }, [imageResponse]);

  const doSelectImage = async () => {
    Alert.alert(
      "Plie",
      "Pick Image from",
      [
        {
          text: "Camera",
          onPress: async () => {
            let permissionAcquired =
              Platform.OS == "ios" ? true : await requestCameraPermission();
            console.log("permissionAcquired", permissionAcquired);
            if (permissionAcquired) {
              ImagePicker.launchCamera(imagePickerOptions, setImageResponse);
            } else {
              Alert.alert(
                "Sorry",
                "Sorry but you have declined camera permission, so you can not perform this action!"
              );
            }
          },
        },
        {
          text: "Gallery",
          onPress: () =>
            ImagePicker.launchImageLibrary(
              imagePickerOptions,
              setImageResponse
            ),
        },
      ],
      { cancelable: true }
    );
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem(AsyncParamsKeys.Token);
      await AsyncStorage.removeItem(AsyncParamsKeys.LoginUserObj);
      dispatch({ type: TOKEN, payload: "" });
      dispatch({ type: USER, payload: null });
      Navigator.resetFrom(AppNavKeys.Login);
    } catch (exception) { }
  };
  console.log('UUUUUUUUUUUUUUUUUUUUUUUUUUUU', user)
  const stripConnect = async () => {
    let body = new FormData()
    body.append("user_id", user.usr_id);
    dispatch(StripeConnectAction(body))
    dispatch(FetchGetProfileAction());
    setTimeout(() => {
      console.log('HHHHHHHHHHHHHHHHHHHHHHHHHHHH 1', ProfileReducer.url)
      stripeConnectOpen(ProfileReducer.url)
      setConnect(false)
    }, 3000);



  }

  const stripDisconnect = () => {
    console.log("FFFFFFFFFFFFFFFFFFFFFFkk")
    dispatch(StripeDisconnectAction())

    setTimeout(() => {
      dispatch(FetchGetProfileAction());
    }, 3000);

    setTimeout(() => {

      setConnect(false)
    }, 6000);

  }

  const onRefresh = useCallback(() => {
    dispatch(FetchGetProfileAction());
  }, []);

  return (
    <ScrollView
      style={styles.sty1}
      contentContainerStyle={{ flexGrow: 1 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <AuthRootView
        isWithoutBack
        isWithoutHeader
        onPress={() => Navigator.goBack()}
      >

        <View style={styles.sty9}>
          <Text style={styles.sty10}>Update Profile</Text>

          {user && !user.usr_login_type ? (
            <TouchableOpacity
              style={styles.sty11}
              onPress={() => Navigator.navigate(AppNavKeys.ChangePassword)}
            >
              <Image style={styles.sty12} source={Assets.setting} />
            </TouchableOpacity>
          ) : null}
        </View>

        <View style={styles.sty7}>
          <Image
            style={styles.sty4}
            source={{
              uri: values.profile_image_url
                ? values.profile_image_url
                : profileImage
                  ? profileImage.uri
                  : null,
            }}
          />
          <TouchableOpacity style={styles.sty5} onPress={() => doSelectImage()}>
            <Image style={styles.sty6} source={Assets.edit} />
          </TouchableOpacity>
        </View>

        <Text style={styles.sty13}>Profile</Text>

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
          editable={false}
          onSubmitEditing={() => ref4.current.focus()}
          onChangeText={(text) => onChangeValue("email", text)}
        />

        <PlieTextInputForm
          refs={ref4}
          isError={unErr}
          value={values.username}
          placeholder={"Username"}
          onSubmitEditing={() => Keyboard.dismiss()}
          onChangeText={(text) => onChangeUserNameValue("username", text)}
        />

        <PlieButton
          style={styles.sty8}
          text={"Update"}
          onPress={() => onSubmit()}
        />
        {user?.role == "organizer" && <TouchableOpacity
          style={styles.sty16}
          onPress={() => {
            user.stripe_account_id ? stripDisconnect() : stripConnect()
          }}
        >
          {user.stripe_account_id ? <Text style={styles.sty18}>Disconnect Stripe</Text> : <Image style={styles.sty17} source={Assets.stripe} />}
        </TouchableOpacity>}

        <Text style={styles.sty14} onPress={() => logout()}>
          Do you want to <Text style={styles.sty15}>Logout</Text> ?
        </Text>
      </AuthRootView>
    </ScrollView>

  );
}
