import React, { useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { Assets } from "../../assets/Icons";
import Navigator from "../../common/Navigator";
import styles from "./styles";
import { normalize } from "../../common/Normalize";

export default function Artists({
  onPressShare,
  onPressFavourite,
  isFavorite,
  isDisabled,
}) {
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
      <View style={styles.sty2}>
        <View style={styles.sty3}>
          <Image
            style={styles.sty4}
            source={{ uri: EventReducer.event_profile_img }}
          />

          <View
            style={{
              justifyContent: "space-between",
              maxWidth: "50%",
              paddingBottom: 20,
              marginLeft: normalize(10),
            }}
          >
            <Text
              style={styles.sty5}
              // numberOfLines={1}
              adjustsFontSizeToFit
            >
              {EventReducer.event_name.charAt(0).toUpperCase() +
                EventReducer.event_name.slice(1)}
            </Text>
            <Text style={styles.sty6} numberOfLines={1}>
              {eventLocation}
            </Text>
          </View>

          <View
            style={{
              justifyContent: "space-between",
              maxWidth: "50%",
              paddingBottom: 20,
            }}
          >
            <View style={styles.sty7}>
              <Pressable onPress={onPressShare}>
                <Image style={styles.sty8} source={Assets.share} />
              </Pressable>
              <Pressable
                disabled={isDisabled}
                onPress={() => {
                  onPressFavourite();
                }}
              >
                <Image
                  resizeMode="contain"
                  style={styles.sty8}
                  source={
                    !isFavorite ? Assets.favourite_off : Assets.favourite_on
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

        <FlatList
          style={styles.sty1}
          data={EventReducer.artists}
          renderItem={({ item }) => {
            let artistLocation = "";
            if (item.city_name) {
              artistLocation += item.city_name;
            }
            if (item.country_name) {
              if (artistLocation) {
                artistLocation += ", ";
              }
              if (item.country_name) {
                artistLocation += item.country_name;
              }
            }
            console.log("IMGS",item.artist_profile_img);
            return (
              <View style={styles.sty12}>
                <View style={{ flexDirection: "row", maxWidth: "45%" }}>
                  <Image
                    style={styles.sty9}
                    source={{
                      uri:
                        item.artist_profile_img !== ""
                          ? item.artist_profile_img
                          : Assets.default_artist_image,
                    }}
                  />
                  <Text style={styles.sty10}>{item.art_name}</Text>
                </View>
                <Text style={styles.sty11}>{artistLocation}</Text>
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.2}
        />
      </View>
    </View>
  );
}
