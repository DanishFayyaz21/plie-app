import React from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Share,
  StyleSheet,
  Platform,
} from "react-native";
import { normalize } from "../common/Normalize";
import Colors from "../common/Colors";
import { Assets } from "../assets/Icons";

function EventCard({ item, mheight, onPress, onPressFavourite, onPressShare }) {
  let priceString = "",
    eventDateString = "";

  if (item.event_price_from) {
    priceString += "€" + item.event_price_from;
  }

  if (item.event_price_to) {
    if (priceString) {
      priceString += " - ";
    }

    priceString += "€" + item.event_price_to;
  }

  if (item.readable_from_date) {
    eventDateString += item.readable_from_date;
  }

  if (item.readable_to_date) {
    if (eventDateString) {
      eventDateString += " - ";
    }
    eventDateString += item.readable_to_date;
  }

  return (
    <View style={[styles.sty2, { marginBottom: mheight }]}>
      <Pressable onPress={onPress}>
        <Image style={styles.sty3} source={{ uri: item.event_profile_img }} />
      </Pressable>

      <View style={styles.sty4}>
        <Pressable onPress={onPress}>
          <Text style={styles.sty5}>
            {item.event_name.charAt(0).toUpperCase() + item.event_name.slice(1)}
          </Text>
          <Text style={styles.sty6}>{eventDateString}</Text>
          {/* <Text style={styles.sty6}>
            {item.readable_from_date.split("-")[0] +
              "." +
              item.readable_from_date.split("-")[1] +
              "." +
              item.readable_to_date.split("-")[2].slice(-2)}
            {" - "}
            {item.readable_to_date.split("-")[0] +
              "." +
              item.readable_to_date.split("-")[1] +
              "." +
              item.readable_to_date.split("-")[2].slice(-2)}
          </Text> */}
          <Text style={styles.sty7}>
            {/* €{item.event_price_from + " - €" + item.event_price_to} */}
            {priceString}
          </Text>
        </Pressable>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginBottom: normalize(10), marginTop: normalize(5) }}
        >
          {item.danceStyles.map((item) => {
            return (
              <Text style={styles.sty8}>
                {item.ds_name.charAt(0).toUpperCase() + item.ds_name.slice(1)}
              </Text>
            );
          })}
        </ScrollView>
      </View>

      <Pressable style={styles.sty11} onPress={onPress}>
        <View style={styles.sty9}>
          {item.city ? (
            <Text numberOfLines={1} style={styles.sty10}>
              {item.city.charAt(0).toUpperCase() + item.city.slice(1)}
              {item.country ? "," : ""}
            </Text>
          ) : null}
          {item.country ? (
            <Text style={styles.sty10}>
              {item.country.charAt(0).toUpperCase() + item.country.slice(1)}
            </Text>
          ) : null}
        </View>

        <View style={styles.sty12}>
          <Pressable onPress={onPressShare}>
            <Image style={styles.sty13} source={Assets.share} />
          </Pressable>
          <Pressable onPress={onPressFavourite}>
            <Image
              resizeMode="contain"
              style={styles.sty13}
              source={
                item.isFavorite == 0
                  ? Assets.favourite_off
                  : Assets.favourite_on
              }
            />
          </Pressable>
        </View>
      </Pressable>
    </View>
  );
}

export default EventCard;

const styles = StyleSheet.create({
  sty1: {
    flex: 1,
  },
  sty2: {
    flex: 1,
    flexDirection: "row",
    marginHorizontal: normalize(10),
    // marginVertical: normalize(8),
    borderRadius: normalize(12),
    backgroundColor: Colors.white,
    alignItems: "center",
  },
  sty3: {
    width: normalize(80),
    height: normalize(80),
    margin: normalize(8),
    borderRadius: normalize(4),
  },
  sty4: {
    flex: 1,
  },
  sty5: {
    color: Colors.black,
    fontFamily: Fonts.GothicSemiBold,
    fontSize: normalize(16),
    marginTop: normalize(5),
  },
  sty6: {
    color: Colors.primary,
    fontFamily: Fonts.Medium,
    fontSize: normalize(12),
  },
  sty7: {
    color: Colors.hint,
    fontFamily: Fonts.Regular,
    fontSize: normalize(12),
  },
  sty8: {
    height: normalize(21),
    textAlign: "center",
    textAlignVertical: "center",
    color: Colors.black,
    fontFamily: Fonts.PoppinsMedium,
    fontSize: normalize(12),
    borderRadius: Platform.OS === "ios" ? normalize(12) : normalize(25),
    paddingHorizontal: normalize(10),
    marginEnd: normalize(5),
    backgroundColor: Colors.color6,
    overflow: "hidden",
  },
  sty9: {
    flex: 1,
    paddingTop: normalize(5),
  },
  sty10: {
    textAlignVertical: "center",
    color: Colors.hint,
    fontFamily: Fonts.Regular,
    fontSize: normalize(11),
    marginEnd: normalize(3),
  },
  sty11: {
    flex: 0.5,
    alignItems: "flex-end",
  },
  sty12: {
    flexDirection: "row",
  },
  sty13: {
    width: normalize(24),
    height: normalize(24),
    marginEnd: normalize(5),
    marginBottom: normalize(10),
  },
});
