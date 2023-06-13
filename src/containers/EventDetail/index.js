import React, { useCallback, useEffect, useState } from "react"
import { Image, Pressable, Text, TouchableOpacity, View, StatusBar, useColorScheme, Share, BackHandler, ScrollView, RefreshControl, Platform } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { Assets } from "../../assets/Icons"
import Navigator from "../../common/Navigator"
import styles from "./styles"
import { normalize } from "../../common/Normalize"
import Colors from "../../common/Colors"
import General from "../General"
import Schedule from "../Schedule"
import Artists from "../Artists"
import Tickets from "../Tickets"
import Others from "../Others"
import AppNavKeys from "../../common/AppNavKeys"
import { AddFavouriteAction, ClearEventDetail, FetchEventDetail, VerifyEdit, ClearEdit } from "../../store/actions/EventAction"
import { ADD_FAVOURITE, EVENT_DETAIL, CLEAR_EDIT_USER } from "../../common/StoreActionTypes"

import PlieButton from "../../components/PlieButton";

export default function EventDetail({
  route: {
    params: { previous, eventId, eventUrl, eventidUnique, eventIdEvent },
  },
  navigation,
}) {
  const dispatch = useDispatch();
  const colorScheme = useColorScheme();
  const [flag, setFlag] = useState(true);
  const user = useSelector((state) => state.CommonReducer.user)
  const [isFav, setIsFav] = useState(true)
  const EventReducer = useSelector((state) => state.EventReducer)
  const CommonReducer = useSelector((state) => state.CommonReducer)
  const detail = EventReducer.resData !== null ? EventReducer.resData.data ? EventReducer.resData.data.event : "" : ""
  const listTab = [{ status: "General" }, { status: "Artists" }, { status: "Tickets" }, { status: "Schedule" }]
  const [status, setStatus] = useState("General")
  const [refreshing, setRefreshing] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const VerifyUserReducer = useSelector(
    (state) => state.VerifyUserReducer.responseVerifyEditUser
  );

  console.log("SSSlllllllllllllllll22l", VerifyUserReducer)

  useEffect(() => {
    if (CommonReducer.api_type) {
      console.log(EventReducer);
      getResponse()
      console.log("despues response", EventReducer);
    }
  }, [EventReducer])

  useEffect(() => {
    console.log("even reducer", EventReducer.resData);
    console.log("even Edit", VerifyUserReducer);
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick)
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick)

    }
  }, [])

  useEffect(() => {
    console.log("CAMBIA FLAGGGGGGGGGGGGGGGGGG");
    console.log("FLAG", flag);
    dispatch(FetchEventDetail({ elementId: eventId }, false));
    // if(user && EventReducer )
    // {
    //   const {event_id} = EventReducer.resData.data.event;
    //   const userID = user.usr_id;
    //   const body = {event_id:event_id,user_id:userID};
    //   dispatch(VerifyEdit(body));
    // }

  }, [flag]);

  useEffect(() => {
    if (EventReducer.resData) {
      if (VerifyUserReducer) {
        dispatch(ClearEdit());
      }
      let event_id;
      if (previous == "Favourite") {
        event_id = eventIdEvent
      }
      else {
        event_id = EventReducer?.resData?.data?.event.event_id;
      }
      console.log("EVENT ID", event_id);
      console.log("event id de props", eventidUnique);
      console.log("eventId en propssss ", eventId);
      const userID = user.usr_id;
      const body = { event_id: event_id, user_id: userID };

      dispatch(VerifyEdit(body));

    }

  }, [EventReducer])
  function handleBackButtonClick() {
    dispatch(ClearEventDetail());
    dispatch(ClearEdit());
    Navigator.navigate("Home", { screen: previous, params: { from: "EventDetail", eventId: eventId, fav: isFav } })
    return true
  }

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: eventUrl,
      })
    } catch (error) {
      alert(error.message)
    }
  }

  const onClickFavourite = () => {
    setIsDisabled(true)
    if (user) {
      const body = {
        user_id: user.usr_id,
        event_id: detail.event_date_id,
      }
      setFavouriteIcon()
      dispatch(AddFavouriteAction(body))
    } else {
      Navigator.navigate(AppNavKeys.Login)
    }
  }

  const updateFavouriteIcon = (status) => {
    setIsFav(status)
    // setFlag((e) => !e)
  }

  const setFavouriteIcon = () => {
    setIsFav((e) => !e)
  }

  function getResponse() {
    switch (CommonReducer.api_type) {
      case ADD_FAVOURITE: {
        const data = EventReducer?.favData
        setIsDisabled(false)
        if (data) {
          updateFavouriteIcon(data.data.favorite.ufe_status)
        }
        break
      }
      case EVENT_DETAIL: {
        const data = EventReducer?.resData
        if (data != null) {
          console.log('datalog===>', data);
          setRefreshing(false)
          if (data.data.length !== 0 && data.data.event.isFavorite == 0) {
            setIsFav(false)
          } else {
            setIsFav(true)
          }
        }
        break;
      }
    }
  }

  const onRefresh = useCallback(() => {
    console.log("call onRefresh");
    setRefreshing(true);
    dispatch(FetchEventDetail({ elementId: eventId }, true))
  }, []);

  function EditEvent() {
    console.log("edit event", eventId);
    console.log("user", user.usr_id);
    dispatch(ClearEdit());
    Navigator.navigate("AddEvent", { params: { event: EventReducer?.resData?.data?.event, isEdit: true, eventdate: eventId, status: status } });
    return true;
  }
  return (
    <View
      style={styles.sty1}>
      <ScrollView style={styles.sty1}
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>
        {EventReducer !== undefined && (
          <>
            <StatusBar
              backgroundColor={colorScheme == "light" ? "#fff" : "#000"}
              barStyle={colorScheme == "light" ? "dark-content" : "light-content"}
            />
            <View style={styles.sty2}>
              <Text style={styles.sty3}>Hello{user ? " " + user.usr_fname + "!" : "!"}</Text>
              <Text style={styles.sty4}>Are you ready to dance?</Text>
            </View>

            <View style={styles.tabBarStyle}>
              {listTab.map((e) => (
                <TouchableOpacity style={[styles.btnTab, status === e.status && styles.selectedTab]} onPress={() => setStatus(e.status)}>
                  <Text style={[styles.tabText, status === e.status && styles.selectedText]}>{e.status}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity onPress={() => handleBackButtonClick()}>
              <Image style={styles.backIcon} source={Assets.back} />
            </TouchableOpacity>
            {console.log('EVENTREDUCER AAA', EventReducer)}
            {EventReducer.resData && EventReducer.resData.success && (
              <>
                {status === "General" && <General onPressShare={() => onShare()} onPressFavourite={() => onClickFavourite()} isFavorite={isFav} isDisabled={isDisabled} />}
                {status === "Artists" && <Artists onPressShare={() => onShare()} onPressFavourite={() => onClickFavourite()} isFavorite={isFav} isDisabled={isDisabled} />}
                {status === "Tickets" && <Tickets onPressShare={() => onShare()} onPressFavourite={() => onClickFavourite()} isFavorite={isFav} isDisabled={isDisabled} />}
                {status === "Schedule" && <Schedule onPressShare={() => onShare()} onPressFavourite={() => onClickFavourite()} isFavorite={isFav} isDisabled={isDisabled} />}
                {/* {status === "Others" && <Others onPressShare={() => onShare()} onPressFavourite={() => onClickFavourite()} />} */}
              </>
            )}
          </>
        )}
        {console.log("CCCCCCCCCCCCCCCCC", VerifyUserReducer)}

        {VerifyUserReducer?.success && (

          <PlieButton
            style={styles.buttonEdit}
            text={"Edit"}
            disabled={VerifyUserReducer?.success ? false : true}
            onPress={() => EditEvent()}
          />


        )
        }
      </ScrollView>
    </View>
  )
}
