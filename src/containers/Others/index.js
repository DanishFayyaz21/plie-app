import React from "react";
import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { Assets } from "../../assets/Icons";
import Navigator from "../../common/Navigator";
import styles from "./styles";
import { normalize } from "../../common/Normalize";

export default function Others({ onPressShare, onPressFavourite }) {
  const user = useSelector((state) => state.CommonReducer.user);
  const EventReducer = useSelector(
    (state) => state.EventReducer.resData.data.event
  );

  let eventDateString = "",
    eventLocation = "";

  if (EventReducer.readable_from_date) {
    eventDateString += EventReducer.readable_from_date;
  }

  if (EventReducer.readable_to_date) {
    if (eventDateString) {
      eventDateString += " - ";
    }
    eventDateString += EventReducer.readable_to_date;
  }

  if (EventReducer.city) {
    eventLocation +=
      EventReducer.city.charAt(0).toUpperCase() + EventReducer.city.slice(1);
  }

  if (EventReducer.country) {
    if (eventLocation) {
      eventLocation += ", ";
    }
    eventLocation +=
      EventReducer.country.charAt(0).toUpperCase() +
      EventReducer.country.slice(1);
  }

  return (
    <View style={styles.sty1}>
      {EventReducer !== undefined && (
        <View style={styles.sty2}>
          <View style={styles.sty3}>
            <Image
              style={styles.sty4}
              source={{ uri: EventReducer.event_profile_img }}
            />

            <View
              style={{
                justifyContent: "space-between",
                maxWidth: "60%",
                paddingBottom: 5,
                marginLeft: 10,
              }}
            >
              <Text style={styles.sty5} adjustsFontSizeToFit>
                {EventReducer.event_name}
              </Text>
              <Text style={styles.sty6} numberOfLines={1}>
                {eventLocation}
              </Text>
            </View>

            <View
              style={{
                justifyContent: "space-between",
                maxWidth: "60%",
                paddingBottom: 5,
              }}
            >
              <View style={styles.sty7}>
                <Pressable onPress={onPressShare}>
                  <Image style={styles.sty8} source={Assets.share} />
                </Pressable>
                <Pressable onPress={onPressFavourite}>
                  <Image
                    resizeMode="contain"
                    style={styles.sty8}
                    source={
                      EventReducer.isFavorite === 0
                        ? Assets.favourite_off
                        : Assets.favourite_on
                    }
                  />
                </Pressable>
              </View>
              <Text style={styles.sty6} numberOfLines={1} adjustsFontSizeToFit>
                {eventDateString}
                {/* {EventReducer.readable_from_date.split("-")[0] +
                  "." +
                  EventReducer.readable_from_date.split("-")[1] +
                  "." +
                  EventReducer.readable_to_date.split("-")[2].slice(-2)}
                {" - "}
                {EventReducer.readable_to_date.split("-")[0] +
                  "." +
                  EventReducer.readable_to_date.split("-")[1] +
                  "." +
                  EventReducer.readable_to_date.split("-")[2].slice(-2)} */}
              </Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}
