import React, { useState, useEffect, useRef, useCallback } from "react"
import { View, Text, Platform, Keyboard, TouchableOpacity, Image, FlatList, ScrollView, Pressable, Share, TextInput,Alert } from "react-native"
import styles from "./styles"
import { Assets } from "../../assets/Icons"
import Navigator from "../../common/Navigator"
import PlieTextInput from "../../components/PlieTextInput"
import AuthRootView from "../../components/AuthRootView"
import PlieButton from "../../components/PlieButton"
import { validateEmail } from "../../common/Validation"
import AppNavKeys from "../../common/AppNavKeys"
import { getDeviceName } from "react-native-device-info"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { AsyncParamsKeys, Constants, Flash } from "../../common/Constants"
import { useDispatch, useSelector } from "react-redux"
import { AddFavouriteAction, FetchFavouriteEventListing } from "../../store/actions/EventAction"
import { ADD_FAVOURITE, FAVOURITE_EVENT_LISTING } from "../../common/StoreActionTypes"
import { useIsFocused } from "@react-navigation/native"
import EventCard from "../../components/EventCard"
import FilterModal from "../../components/FilterModal"
import { debounce } from "lodash"

export default function Favourite({ route }) {
  const dispatch = useDispatch()
  const isFocused = useIsFocused()
  const [currentPage, setCurrentPage] = useState(1)

  const [eventsList, setEventsList] = useState([])
  const [totalEventsCount, setTotalEventsCount] = useState(0)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [refreshFlag, setRefreshFlag] = useState(true)
  const [searchText, setSearchText] = useState("")

  const { user, CommonReducer, EventReducer } = useSelector((state) => ({
    user: state.CommonReducer.user,
    CommonReducer: state.CommonReducer,
    EventReducer: state.EventReducer,
  }))


  useEffect(() => {
    if (CommonReducer.api_type) {
      getResponse()
    }
  }, [EventReducer])

  useEffect(() => {
    if (route.params !== undefined) {
      let mList = [...eventsList]
      let index = mList.findIndex((el) => el.event_date_id === route.params.eventId)
      const detail = EventReducer.resData !== null ? EventReducer.resData.data.event : ""
      if (detail) { 
        if (detail.isFavorite == 0) {
          mList.splice(index, 1)
        } else {
          mList[index] = { ...mList[index], isFavorite: detail.isFavorite }
        }
      }
      setEventsList([...mList])
    } else {
      if (isFocused === true) {
        refreshList()
      }
    }
  }, [isFocused])

  // useEffect(
  // 	() => {
  // 		console.log('FAVOURITEPAGE==EVENTLISTEMPTY===>', eventsList);
  // 		if (isFocused == true && eventsList.length == 0) {
  // 			refreshList();
  // 		}
  // 	},
  // 	[ eventsList.length === 0 ]
  // );

  function getResponse() {
    switch (CommonReducer.api_type) {
      case FAVOURITE_EVENT_LISTING: {
        if (EventReducer.resData != null) {
          let responseData = EventReducer.resData
          let success = responseData.success
          if (success) {
            let eventIds = eventsList.map((item) => item.event_date_id)
            let receivedEvents = responseData.data.events

            receivedEvents = receivedEvents.filter((item) => eventIds.indexOf(item.event_date_id) == -1)
            setTotalEventsCount(responseData.data.total)
            if (refreshFlag == true && eventsList.length == 0) {
              setRefreshFlag(false)
              setEventsList(responseData.data.events)
            } else {
              setEventsList([...eventsList, ...receivedEvents])
            }
            if (isRefreshing) {
              setIsRefreshing(false)
            }
          } else {
          }
        }
        break
      }
      case ADD_FAVOURITE: {
        const data = EventReducer.favData
        if (data) {
          updateFavouriteIcon(data.data.favorite.ufe_status, data.data.favorite.ufe_event_id)
        }
        break
      }
    }
  }

  const fetchEvents = async (value = "") => {
    let body = {
      limit: 10,
      page: currentPage,
      search: value,
      isFavorite: 1,
    }
    dispatch(FetchFavouriteEventListing(body))
  }

  useEffect(() => {
    fetchEvents()
  }, [currentPage])

  const fetchMoreData = () => {
    console.log("fetchMoreData", eventsList.length, totalEventsCount)
    if (eventsList.length < totalEventsCount) {
      setCurrentPage(currentPage + 1)
    }
  }

  // const refreshList = () => {
  //   setSearchText("")
  //   setRefreshFlag(true)
  //   setCurrentPage(1)
  //   fetchEvents()
  // }

  useEffect(() => {
    if(refreshFlag){
      fetchEvents()
    }
  },[refreshFlag])

  const refreshList = () => {
    setSearchText("")
    setEventsList([])
    setCurrentPage(1)
    setRefreshFlag(true)
  }

  const onClickEvent = (item, index) => {
    if (user) {
      let dateNow = new Date();
      let dataDateEvent = item.readable_from_date;
      console.log("date strinf", dataDateEvent);
      let informationDateEvent = dataDateEvent.split(".");
      const year =  "20" + informationDateEvent[2];
      const month = informationDateEvent[1];
      const day = informationDateEvent[0];
      let dateEvent = new Date(`${month}/${day}/${year}`);
      const diffTime = dateEvent- dateNow;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      console.log("time event favourite", diffDays);
      if(diffDays >= 0)
      {
        Navigator.navigate(AppNavKeys.EventDetail, { previous: "Favourite", eventId: item.event_date_id, eventUrl: item.event_url, eventIdEvent:item.event_id })
      }
    } else {
      Alert.alert(
        "Plie",
        "You need to login into the app in order to see the details.",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          {
            text: "OK",
            onPress: () => {
              console.log("OK Pressed")
              Navigator.resetFrom(AppNavKeys.Login)
            },
          },
        ],
        { cancelable: false }
      )
    }
  }

  const logout = async () => {
    await AsyncStorage.removeItem(AsyncParamsKeys.EventUserObj)
    Navigator.resetFrom(AppNavKeys.Event)
  }

  const onClickFavourite = async (item) => {
    // setEventsList([])
    const body = {
      user_id: user.usr_id,
      event_id: item.event_date_id,
    }
    setFavouriteIcon(item.event_date_id)
    dispatch(AddFavouriteAction(body))
  }

  const renderEmpty = () => (
    <View style={styles.sty17}>
      <Text style={styles.sty16}>You have no selected events yet</Text>
    </View>
  )

  const onShare = async (item) => {
    try {
      const result = await Share.share({
        message: item.event_url,
      })
    } catch (error) {
      alert(error.message)
    }
  }

  // const getCallback = useCallback(() => {
  //   refreshList()
  // }, [])

  const updateFavouriteIcon = (like, eventId) => {
    const newData = eventsList.filter((item) => {
      if (item.event_date_id == eventId) {
        item.isFavorite = like
      } else {
        return item
      }
    })
    setEventsList(newData)
  }

  const setFavouriteIcon = (eventId) => {
    const newData = eventsList.map((item) => {
      if (item.event_date_id == eventId) {
        item.isFavorite = !item.isFavorite
      }
      return item
    })
    setEventsList(newData)
  }

  const handleDebounce = debounce((value) => {
    setCurrentPage(1)
    setEventsList([])
    fetchEvents(value)
  }, 500)

  return (
    <View style={styles.sty1}>
      <View style={styles.sty14}>
        <Text style={styles.sty15}>Hello {user ? user.usr_fname + "!" : ""}</Text>
        <Text style={styles.sty16}>Are you ready to dance?</Text>
      </View>

      <View style={styles.sty19}>
        <Image style={styles.sty20} source={Assets.search} />
        <TextInput
          style={styles.sty21}
          placeholder={"Search"}
          placeholderTextColor={"#00000080"}
          value={searchText}
          onChangeText={(text) => {
            setSearchText(text)
            // handleDebounce(text)
          }}
          onSubmitEditing={() => {
            // setSearchText(text)
            handleDebounce(searchText)
          }}
        />
        {searchText !== "" && (
          <TouchableOpacity
            onPress={() => {
              setSearchText("")
              handleDebounce("")
            }}
          >
            <Image style={styles.sty22} source={Assets.close} />
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        style={[styles.sty1, { marginTop: 16 }]}
        data={eventsList}
        renderItem={({ item, index }) => (
          <EventCard
            item={item}
            onPress={() => onClickEvent(item, index)}
            onPressFavourite={() => onClickFavourite(item)}
            onPressShare={() => onShare(item)}
            mheight={16}
          />
        )}
        ListEmptyComponent={renderEmpty}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.2}
        onEndReached={fetchMoreData}
        onRefresh={refreshList}
        refreshing={isRefreshing}
      />
    </View>
  )
}
