import React, { useEffect, useState } from "react";
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
import moment from "moment";

export default function Schedule({
  onPressShare,
  onPressFavourite,
  isFavorite,
  isDisabled,
}) {
  const EventReducer = useSelector(
    (state) => state.EventReducer.resData.data.event
  );
  const [dates, setDates] = useState([]);
  const [scheduleList, setScheduleList] = useState([]);
  // const [ isDisabled, setIsDisabled ] = useState(false);

  var gsDayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  useEffect(() => {
    let mlist = EventReducer.schedules
      .filter((item) => {
        return item.sch_date;
      })
      .map((item) => {
        let mitem = item;
        if (!dates.includes(item.sch_date)) {
          dates.push(item.sch_date);
        }
        let timestamp =
          new Date(item.sch_date + "T" + item.sch_from_time).getTime() / 1000;
        mitem.timestamp = timestamp;
        return mitem;
      });
    let list = mlist.sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1));

    console.log("SCHEDULE=LOG=====>", EventReducer);
    setScheduleList(list);
  }, []);

  function getDay(date) {
    const d = new Date(date);
    return gsDayNames[d.getDay()];
  }

  let readableTimeFormat = "HH:mm";

  function ScheduleItem({ item, index }) {
    let scheduleItemReadableTime = "";
    if (item.sch_from_time) {
      scheduleItemReadableTime += moment(
        item.sch_date + " " + item.sch_from_time
      ).format(readableTimeFormat);
    }

    if (item.sch_to_time) {
      if (scheduleItemReadableTime) {
        scheduleItemReadableTime += " - ";
      }
      scheduleItemReadableTime += moment(
        item.sch_date + " " + item.sch_to_time
      ).format(readableTimeFormat);
    }
    return (
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingLeft: normalize(10),
            paddingRight: normalize(10),
          }}
        >
          <Text style={styles.sty9}>
            {scheduleItemReadableTime}
            {/* {item.sch_from_time.split(":")[0]}
            {":"}
            {item.sch_from_time.split(":")[1]}
            {" - "}
            {item.sch_to_time.split(":")[0]}
            {":"}
            {item.sch_to_time.split(":")[1]} */}
          </Text>
          <Text style={styles.sty9}>{item.sch_short_description}</Text>
          <Text style={styles.sty9}>{item.sch_artist_name}</Text>
        </View>
      </View>
    );
  }

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
        <View style={styles.sty4}>
          <View style={styles.sty5}>
            <Image
              style={styles.sty6}
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
              <Text style={styles.sty7} adjustsFontSizeToFit>
                {EventReducer.event_name.charAt(0).toUpperCase() +
                  EventReducer.event_name.slice(1)}
              </Text>
              <Text style={styles.sty8} numberOfLines={1}>
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
              <View style={styles.sty2}>
                <Pressable onPress={onPressShare}>
                  <Image style={styles.sty3} source={Assets.share} />
                </Pressable>
                <Pressable
                  disabled={isDisabled}
                  onPress={() => {
                    onPressFavourite();
                  }}
                >
                  <Image
                    resizeMode="contain"
                    style={styles.sty3}
                    source={
                      !isFavorite ? Assets.favourite_off : Assets.favourite_on
                    }
                  />
                </Pressable>
              </View>
              <Text style={styles.sty8} numberOfLines={1} adjustsFontSizeToFit>
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
            data={dates}
            renderItem={({ item, index }) => {
              return (
                <View>
                  <Text
                    style={{
                      alignSelf: "flex-start",
                      marginLeft: normalize(10),
                      marginTop: normalize(48),
                    }}
                  >
                    <Text style={styles.sty10}>
                      {getDay(item)} {item.split("-")[2]}
                    </Text>
                    <Text style={styles.sty11}>th</Text>
                  </Text>
                  <View style={styles.sty12} />
                  <FlatList
                    style={styles.sty1}
                    data={scheduleList.filter((i) => i.sch_date === item)}
                    renderItem={({ item, index }) => (
                      <ScheduleItem item={item} index={index} />
                    )}
                    showsVerticalScrollIndicator={false}
                    onEndReachedThreshold={0.2}
                  />
                </View>
              );
            }}
            showsVerticalScrollIndicator={false}
            onEndReachedThreshold={0.2}
          />
        </View>
      )}
    </View>
  );
}
