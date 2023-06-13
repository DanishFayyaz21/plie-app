import React, { useState, useRef, useEffect } from "react";
import { Linking, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AppNavKeys from "./common/AppNavKeys";
import { Containers } from "./containers";
import Navigator from "./common/Navigator";
import BottomTab from "./components/BottomTabNavigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncParamsKeys } from "./common/Constants";
import { useDispatch, useSelector } from "react-redux";
import { TOKEN, USER } from "./common/StoreActionTypes";
import { Settings } from "react-native-fbsdk-next";
import SplashScreen from "react-native-splash-screen";

import { requestUserPermission, notificationListener } from "./common/notificationService";
Settings.initializeSDK();

const Screens = {
  [AppNavKeys.LandingPage]: Containers.LandingPage,
  [AppNavKeys.Register]: Containers.Register,
  [AppNavKeys.Login]: Containers.Login,
  [AppNavKeys.Verification]: Containers.Verification,
  [AppNavKeys.ForgotPassword]: Containers.ForgotPassword,
  [AppNavKeys.ResetPassword]: Containers.ResetPassword,
  [AppNavKeys.Home]: BottomTab,
  [AppNavKeys.UpdateProfile]: Containers.UpdateProfile,
  [AppNavKeys.ChangePassword]: Containers.ChangePassword,
  // [AppNavKeys.General]: Containers.General,
  // [AppNavKeys.Schedule]: Containers.Schedule,
  // [AppNavKeys.Artists]: Containers.Artists,
  // [AppNavKeys.Tickets]: Containers.Tickets,
  // [AppNavKeys.Others]: Containers.Others,
  [AppNavKeys.EventDetail]: Containers.EventDetail,
  [AppNavKeys.AddEvent]: Containers.AddEvent,
};

const MainStack = createStackNavigator();

const MainRouteConfig = () => {
  const dispatch = useDispatch();
  const navigationRef = useRef();

  const [isVisited, setVisited] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(null);

  const { user } = useSelector((state) => ({
    user: state.CommonReducer.user,
  }));

  async function get() {
    const user = await AsyncStorage.getItem(AsyncParamsKeys.LoginUserObj);

    const initialUrl = await Linking.getInitialURL();

    if (!initialUrl) {
      return;
    }

    console.log(
      "EVENTDETAIL=======>URL",
      initialUrl,
      initialUrl.includes("eventdetail"),
      user
    );

    const id = initialUrl.split("/").pop();

    if (initialUrl.includes("eventdetail") && user) {
      console.log("INSIDE======================================>1", id);
      Navigator.navigate(AppNavKeys.EventDetail, {
        previous: "Event",
        eventId: id,
        eventUrl: initialUrl,
      });
    }
  }

  function showAlert(msg) {
    Alert.alert(
      "Plie",
      msg,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            console.log("OK Pressed");
          },
        },
      ],
      { cancelable: false }
    );
  }

  useEffect(() => {
    if (navigationRef != null && navigationRef.current != null) {
      Navigator.setContainer(navigationRef.current);
    }
  });

  useEffect(() => {
    if (user && user.usr_id && !isLoggedIn) {
      console.log("user changed set logged in ");
      setLoggedIn(true);
    }
  }, [user]);

  useEffect(() => {
    async function doGetUser() {
      let user = await AsyncStorage.getItem(AsyncParamsKeys.LoginUserObj);
      let isVisitedValue = await AsyncStorage.getItem(
        AsyncParamsKeys.IsVisited
      );
      let value = JSON.parse(isVisitedValue);
      if (value != null && value) {
        setVisited(true);
      }

      if (user) {
        console.log("user already available set logged in ");
        setLoggedIn(true);
        let token = await AsyncStorage.getItem(AsyncParamsKeys.Token);
        dispatch({ type: TOKEN, payload: token });
        dispatch({ type: USER, payload: JSON.parse(user) });
      } else {
        setLoggedIn(false);
      }

      if (!value) {
        Navigator.resetFrom(AppNavKeys.LandingPage);
      } else if (user) {
        Navigator.resetFrom(AppNavKeys.Home);
      } else {
        Navigator.resetFrom(AppNavKeys.Login);
      }

      setTimeout(() => {
        SplashScreen.hide();

        console.log("AppJSFILE=======>");
        // get();
        Linking.getInitialURL().then((initialUrl) => {
          console.log("Initial URL ", initialUrl);
          if (initialUrl) {
            openLinkingUrl(initialUrl, user ? true : false);
          }
        });
      }, 1500);
    }
    doGetUser();
  }, []);


  const _handleOpenURL = (event) => {
    console.log("_handleOpenURL", event.url, isLoggedIn);
    openLinkingUrl(event.url, isLoggedIn);
  };

  const openLinkingUrl = (initialUrl, isLoggedIn) => {
    const id = initialUrl.split("/").pop();
    console.log("openLinkingUrl", initialUrl, isLoggedIn);
    // Alert.alert("Linking URL", initialUrl);

    if (initialUrl.includes("eventdetail") && isLoggedIn) {
      console.log("INSIDE======================================>1", id);
      Navigator.push(AppNavKeys.EventDetail, {
        previous: "Event",
        eventId: id,
        eventUrl: initialUrl,
      });
    }


    if (initialUrl.includes("updateprofile") && isLoggedIn) {
      console.log("ppppp======================================>1", id);
      Navigator.push(AppNavKeys.UpdateProfile);
    }
  };

  useEffect(() => {
    // if (isLoggedIn != null) {
    // }

    Linking.addEventListener("url", _handleOpenURL);

    return () => {
      // unsubscribe event
      Linking.removeEventListener("url", _handleOpenURL);
    };
  }, [isLoggedIn]);

  useEffect(() => {
    requestUserPermission();
    notificationListener();
  }, [])
  return (
    <NavigationContainer ref={navigationRef}>
      <MainStack.Navigator screenOptions={{ gestureEnabled: false }}>
        {Object.entries({ ...Screens }).map(([name, component]) => (
          <MainStack.Screen
            key={name}
            name={name}
            component={component}
            options={{ headerShown: false }}
          />
        ))}
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default MainRouteConfig;
