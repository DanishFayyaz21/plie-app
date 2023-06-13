import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { Assets } from "../../assets/Icons";
import Navigator from "../../common/Navigator";
import { normalize } from "../../common/Normalize";
import AuthRootView from "../../components/AuthRootView";
import styles from "./styles";
import ClaimModel from "../../components/ClaimModal";
import { CheckClaimEventAction, ClaimEventAction } from "../../store/actions/EventAction";

export default function General({
  onPressShare,
  onPressFavourite,
  isFavorite,
  isDisabled,
}) {
  const user = useSelector((state) => state.CommonReducer.user);
  const dispatch = useDispatch()
  const EventReducer = useSelector(
    (state) => state.EventReducer.resData.data.event
  );
  const VerifyUserReducer = useSelector(
    (state) => state.VerifyUserReducer.responseVerifyEditUser
  );
  console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", user.role)

  const Claimstatus = useSelector(
    (state) => state.EventReducer?.claimData?.data?.status
  );

  // const user = useSelector(
  //   (state) => state?.ProfileReducer.user
  // );



  const EventObj = useSelector(
    (state) => state.EventReducer.resData.data.eventObj
  );
  const [seeMoreTag, setSeeMoreTag] = useState(true);
  const [degree, setDegree] = useState(0);
  const [claimModal, setClaimModal] = useState(false);
  const claimEvent = () => {
    const formData = {
      event_id: EventReducer.event_id,
      user_id: user.usr_id
    }
    dispatch(ClaimEventAction(formData))
    onClose()

  }
  const checkClaimEvent = () => {
    const formData = {
      event_id: EventReducer.event_id,
      user_id: user.usr_id
    }
    dispatch(CheckClaimEventAction(formData))
  }

  useEffect(() => {
    console.log("EVENTREDUERDATA======>", EventObj);
    checkClaimEvent()
  }, []);

  let priceString = "",
    eventLocation = "",
    eventDateString = "";

  if (EventReducer) {
    if (EventReducer.event_price_from) {
      priceString += "€" + EventReducer.event_price_from;
    }

    if (EventReducer.event_price_to) {
      if (priceString) {
        priceString += " - ";
      }

      priceString += "€" + EventReducer.event_price_to;
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

    if (EventReducer.readable_from_date) {
      eventDateString += EventReducer.readable_from_date;
    }

    if (EventReducer.readable_to_date) {
      if (eventDateString) {
        eventDateString += " - ";
      }
      eventDateString += EventReducer.readable_to_date;
    }
  }
  const onClose = () => {
    setClaimModal(false)
  }

  return (
    <View style={styles.sty1}>
      <ClaimModel
        visible={claimModal}
        title={"Claim Event"}
        description1={"Please we aware that by claiming this event, a new case will be open to proof your real ownership. "}
        description2={"Your user and email address will be shared with our team and so we can get in contact with you and ask more details about the event."}
        onClose={onClose}
        onSubmit={claimEvent}
      />
      {EventReducer !== undefined && (
        <View style={styles.sty4}>
          <ScrollView>
            <View>
              {/* icons  */}
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

              {/* center image */}
              <Image
                style={styles.sty5}
                source={{ uri: EventReducer.event_profile_img }}
              />
              <Text style={styles.sty6}>
                {EventReducer.event_name.charAt(0).toUpperCase() +
                  EventReducer.event_name.slice(1)}
              </Text>
              <Text style={styles.sty7} numberOfLines={1}>
                {eventLocation}
              </Text>

              <ScrollView
                style={{ maxHeight: 40 }}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  flexGrow: 1,
                  justifyContent: "space-evenly",
                  marginTop: 11,
                  maxHeight: 40,
                }}
              >
                {EventReducer.dance_types.map((item, index) => {
                  return (
                    <Text
                      style={[
                        styles.sty18,
                        { marginStart: index === 0 ? 8 : 0 },
                      ]}
                    >
                      {item.ds_name.charAt(0).toUpperCase() + item.ds_name.slice(1)}
                    </Text>
                  );
                })}
              </ScrollView>

              <View style={styles.sty9}>
                <View style={{ alignItems: "center", width: "60%" }}>
                  <Text style={styles.sty10}>Date</Text>
                  <Text style={styles.sty11}>
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

                <View style={{ alignItems: "center", width: "60%" }}>
                  {EventReducer.event_types.length > 0 && (
                    <Text style={styles.sty10}>Type</Text>
                  )}
                  {EventReducer.event_types.length > 0 && (
                    <ScrollView
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={{
                        flexGrow: 1,
                        justifyContent: "space-evenly",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        maxWidth: "60%",
                      }}
                    >
                      {EventReducer.event_types.map((item, index) => {
                        return (
                          <Text style={styles.sty8}>
                            {item.evt_name}
                            {index !== EventReducer.event_types.length - 1 &&
                              ","}
                          </Text>
                        );
                      })}
                    </ScrollView>
                  )}
                </View>
                <View style={{ alignItems: "center", width: "50%" }}>
                  <Text style={styles.sty10}>Prices</Text>
                  <Text style={styles.sty11}>
                    {/* {"€"}
                    {EventReducer.event_price_from} -{" "}
                    {EventReducer.event_price_to} */}
                    {priceString}
                  </Text>
                </View>
              </View>

              <Text style={styles.sty12}>Description</Text>
              <Text style={styles.sty13}>
                {seeMoreTag
                  ? EventReducer.description.substring(0, 150)
                  : EventReducer.description}
              </Text>

              {EventReducer.description.length > 150 && (
                <TouchableOpacity
                  style={{ flexDirection: "row" }}
                  onPress={() => {
                    setSeeMoreTag((seeMoreTag) => !seeMoreTag);
                    if (seeMoreTag) {
                      setDegree(180);
                    } else {
                      setDegree(0);
                    }
                  }}
                >
                  <Text style={styles.sty14}>
                    {seeMoreTag ? "See more" : "See less"}
                  </Text>
                  <Image
                    style={[
                      { height: 5, width: 15, alignSelf: "center" },
                      { transform: [{ rotate: `${degree}deg` }] },
                    ]}
                    source={Assets.see_more}
                  />
                </TouchableOpacity>
              )}

              {/* {item.keywords.map((item) => {		return  */}
              <FlatList
                style={[
                  styles.sty1,
                  {
                    marginTop:
                      Platform.OS === "ios" ? normalize(15) : normalize(20),
                  },
                ]}
                horizontal
                data={EventObj.multi_image}
                renderItem={({ item, index }) => (
                  <View
                    style={{
                      marginRight:
                        index === EventObj.multi_image.length - 1
                          ? normalize(16)
                          : 0,
                      marginBottom: 20,
                    }}
                  >
                    <Image
                      style={styles.sty15}
                      source={{ uri: item.event_multi_img }}
                    />
                  </View>
                )}
                showsVerticalScrollIndicator={false}
                onEndReachedThreshold={0.2}
              />
            </View>

          </ScrollView>
          {console.log("VerifyUserReducer:", VerifyUserReducer)}
          {!VerifyUserReducer?.success &&
            //  user?.role=="organizer" &&
            <View style={styles.sty19}>
              <Text style={styles.claimHeading}>Claim Event</Text>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={styles.claimText}>
                  {Claimstatus ? `You request status for claim is ${Claimstatus}.` : "If you are the event organiser, let us know if you want to request its active administration by clicking inthe button."}
                </Text>
                <View>
                  <TouchableOpacity
                    disabled={Claimstatus}
                    style={styles.btnTab} onPress={() => {
                      setClaimModal(true)
                    }} >
                    <Text style={styles.tabText}>Claim</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          }
        </View>
      )}
    </View>
  );
}
