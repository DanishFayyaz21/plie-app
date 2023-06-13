import React, { useEffect, useState,useRef } from "react";
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
import ScheduleEdit from "../ScheduleEdit";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
export default function SchedulesEdit({
  onPressShare,
  onPressFavourite,
  isFavorite,
  isDisabled,
  eventId,
  eventdate,
}) {
  const EventReducer = useSelector(
    (state) => state?.EventReducer?.resData?.data?.event
  );
  const [dates, setDates] = useState([]);
  const [scheduleList, setScheduleList] = useState([]);
  // const [ isDisabled, setIsDisabled ] = useState(false);
  const scroll = useRef();
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
    let mlist = EventReducer?.schedules
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
    let list = mlist?.sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1));

    console.log("SCHEDULE=LOG=====>", EventReducer);
    console.log("list", list);
    setScheduleList(list);
  }, [EventReducer]);

  function getDay(date) {
    const d = new Date(date);
    return gsDayNames[d.getDay()];
  }

  let readableTimeFormat = "HH:mm";


  let eventDateString = "",
    eventLocation = "";
  if(EventReducer)
  {
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
  }

  return (
    <>
    { EventReducer !== undefined && (
      <KeyboardAwareScrollView
      innerRef={ ref =>{
         scroll.current = ref 
       }
     
      }
      extraScrollHeight={normalize(200)}
     >
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
                //justifyContent: "space-between",
                maxWidth: "50%",
                paddingBottom: 10,
                marginLeft: normalize(10),
         
              }}
            >
              <Text style={styles.sty7} adjustsFontSizeToFit>
                {EventReducer.event_name.charAt(0).toUpperCase() +
                  EventReducer.event_name.slice(1)}
              </Text>
              <View  style={{marginTop:"4%"}}>
                <Text style={styles.sty8} numberOfLines={1}>
                  {eventLocation}
                </Text>
              </View>
            </View>

            <View
              style={{
                justifyContent: "space-between",
                maxWidth: "50%",
                paddingBottom: 10,
            
              }}
            >
              <View style={styles.sty2}>
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
          </View>

          
          <ScheduleEdit eventId={eventId} scheduleList={scheduleList} eventdate={eventdate} scroll={scroll}/>
         
        </View>
      )}
    </View>
    </KeyboardAwareScrollView>
    )}
  </>
  );
}
