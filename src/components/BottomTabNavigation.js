import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
  Alert,
} from "react-native";
import { Containers } from "../containers";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Colors from "../common/Colors";
import { normalize } from "../common/Normalize";
import { Assets } from "../assets/Icons";
import Fonts from "../assets/Fonts";
import { AsyncParamsKeys, BottomNav } from "../common/Constants";
import AppNavKeys from "../common/AppNavKeys";
import Navigator from "../common/Navigator";
import AsyncStorage from "@react-native-async-storage/async-storage";

function MyTabBar({ state, descriptors, navigation, ...props }) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          console.log("ASCANSCJ===>");
          if (props.from == "Guest") {
            Alert.alert(
              "Plie",
              "You need to login into the app.",
              [
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel",
                },
                {
                  text: "OK",
                  onPress: () => {
                    Navigator.resetFrom(AppNavKeys.Login);
                  },
                },
              ],
              { cancelable: false }
            );
          }
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (props.from != "Guest" && !isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.sty1}
          >
            <View>{doGetIcon({ name: route.name, isFocused, onPress })}</View>
            {route.name != BottomNav.AddEvent && (
              <Text style={isFocused ? styles.sty4 : styles.sty5}>
                {route.name}
              </Text>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

function doGetIcon({ name, isFocused, onPress = null }) {
  switch (name) {
    case BottomNav.Search:
      return (
        <Image
          style={styles.sty2}
          source={isFocused ? Assets.nav_search_selected : Assets.nav_search}
        />
      );
    case BottomNav.Event:
      return (
        <Image
          style={styles.sty2}
          source={isFocused ? Assets.nav_event_selected : Assets.nav_event}
        />
      );
    case BottomNav.Favourite:
      return (
        <Image
          style={styles.sty2}
          source={isFocused ? Assets.nav_fav_selected : Assets.nav_fav}
        />
      );
    case BottomNav.Profile:
      return (
        <Image
          style={styles.sty2}
          source={isFocused ? Assets.nav_profile_selected : Assets.nav_profile}
        />
      );
    case BottomNav.AddEvent:
      return (
        <View style={styles.efecttButton}>
          <TouchableOpacity style={styles.buttonAdd} onPress={onPress}>
            <Image style={styles.stylIcon} source={Assets.icon_event} />
          </TouchableOpacity>
        </View>
      );
  }
}

const Tab = createBottomTabNavigator();

export default function BottomTab({ route }) {
  const from =
    route.params != undefined && route.params.from != undefined
      ? route.params.from
      : "";

  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <MyTabBar {...props} from={from} />}
      initialRouteName={BottomNav.Event}
    >
      <Tab.Screen name={BottomNav.Search} component={Containers.Search} />
      <Tab.Screen name={BottomNav.Event} component={Containers.Event} />
      <Tab.Screen name={BottomNav.AddEvent} component={Containers.AddEvent} />
      <Tab.Screen name={BottomNav.Favourite} component={Containers.Favourite} />
      <Tab.Screen
        name={BottomNav.Profile}
        component={Containers.UpdateProfile}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    height: normalize(66),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.6,
    // shadowRadius: 16.00,
    elevation: 24,
  },
  sty1: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  sty2: {
    width: normalize(24),
    height: normalize(24),
  },
  sty4: {
    color: Colors.black,
    fontFamily: Fonts.Medium,
    fontSize: normalize(12),
  },
  sty5: {
    color: Colors.black,
    fontFamily: Fonts.Regular,
    fontSize: normalize(12),
  },
  stylIcon: {
    width: "50%",
    height: "70%",
    alignSelf: "center",
  },
  buttonAdd: {
    backgroundColor: "#21D393",
    width: normalize(50),
    height: normalize(50),
    borderRadius: normalize(25),
    justifyContent: "center",
  },
  efecttButton: {
    backgroundColor: "white",
    padding: normalize(7),
    width: "100%",
    marginBottom: normalize(25),
    borderRadius: normalize(27),
  },
});
