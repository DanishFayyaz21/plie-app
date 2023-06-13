import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Image,
  Alert,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Pressable,
  StatusBar,
  useColorScheme,
  Share,
  BackHandler,
} from "react-native";
import styles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import {
  AddFavouriteAction,
  FetchEventListingAction,
} from "../../store/actions/EventAction";
import { Assets } from "../../assets/Icons";
import Navigator from "../../common/Navigator";
import AppNavKeys from "../../common/AppNavKeys";
import { useIsFocused } from "@react-navigation/native";
import EventCard from "../../components/EventCard";
import PickerModal from "../../components/PickerModal";
import FilterModal from "../../components/FilterModal";
import {
  ADD_FAVOURITE,
  CITY_LIST,
  COUNTRY_LIST,
  DANCE_STYLE_LIST,
  EVENT_LISTING,
  EVENT_TYPE_LIST,
} from "../../common/StoreActionTypes";
import {
  FetchCityListAction,
  FetchCountryListAction,
  FetchDanceStyleListAction,
  FetchEventTypeListAction,
} from "../../store/actions/FilterAction";

export default function Event({ navigation, route }) {
  const dispatch = useDispatch();
  const colorScheme = useColorScheme();
  const isFocused = useIsFocused();
  const [currentPage, setCurrentPage] = useState(1);
  const [eventsList, setEventsList] = useState([]);
  const [totalEventsCount, setTotalEventsCount] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshFlag, setRefreshFlag] = useState(true);
  const [isRender, setIsRender] = useState(false);
  const [filterParams, setFilterParams] = useState(null);
  const [isVisible, setVisible] = useState(false);
  const [isPickerVisible, setPickerVisible] = useState(false);

  const [countryList, setCountryList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [eventTypeList, setEventTypeList] = useState([]);
  const [danceStyleList, setDanceStyleList] = useState([]);

  const [pickerType, setPickerType] = useState(0);
  const [selectedCountryList, setSelectedCountryList] = useState([]);
  const [selectedCityList, setSelectedCityList] = useState([]);

  const { user, CommonReducer, EventReducer, FilterReducer } = useSelector(
    (state) => ({
      user: state.CommonReducer.user,
      CommonReducer: state.CommonReducer,
      EventReducer: state.EventReducer,
      FilterReducer: state.FilterReducer,
    })
  );

  useEffect(() => {
    if (CommonReducer.api_type) {
      console.log("CommonReducerdssd", CommonReducer.api_type);
      getResponse();
    }
  }, [EventReducer, FilterReducer]);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
    };
  }, []);

  function handleBackButtonClick() {
    if (!user) {
      Navigator.resetFrom(AppNavKeys.Login);
      return true;
    } else {
      BackHandler.exitApp();
      return true;
    }
  }

  useEffect(() => {
    if (route.params !== undefined) {
      let mList = [...eventsList];
      let index = mList.findIndex(
        (el) => el.event_date_id === route.params.eventId
      );
      const detail =
        EventReducer.resData !== null
          ? EventReducer.resData.data.event !== undefined
            ? EventReducer.resData.data.event
            : ""
          : "";
      if (detail) {
        mList[index] = { ...mList[index], isFavorite: detail.isFavorite };
      }
      setEventsList([...mList]);
    } else {
      if (isFocused === true && !refreshFlag) {
        refreshList();
      }
    }
  }, [isFocused]);

  function getResponse() {
    setIsRefreshing(false);
    switch (CommonReducer.api_type) {
      case EVENT_LISTING: {
        if (EventReducer.resData != null) {
          let responseData = EventReducer.resData;
          let success = responseData.success;
          if (success) {
            let eventIds = eventsList.map((item) => item.event_date_id);
            let receivedEvents = responseData.data.events;
            console.log("dataaaa",responseData.data);
            receivedEvents = receivedEvents.filter(
              (item) => eventIds.indexOf(item.event_date_id) == -1
            );

            setTotalEventsCount(responseData.data.total);
            if (
              refreshFlag == true &&
              eventsList.length == 0 &&
              currentPage == 1
            ) {
              setRefreshFlag(false);
              setEventsList(responseData.data.events);
            } else {
              setEventsList([...eventsList, ...receivedEvents]);
            }
            if (isRefreshing) {
              setIsRefreshing(false);
            }
          } else {
          }
          // getFilterData()
        }
        break;
      }
      case COUNTRY_LIST: {
        if (FilterReducer.resData != null) {
          let responseData = FilterReducer.resData;
          let success = responseData.success;
          if (success) {
            let countryIds = [],
              newSelectedCountryList = [];
            selectedCountryList.map((item) => {
              if (item.isSelected) {
                countryIds.push(item.cnt_id);
              }
            });
            let list = responseData.data.country.map((item) => {
              if (countryIds.indexOf(item.cnt_id) != -1) {
                item["isSelected"] = true;
                newSelectedCountryList.push(item);
              } else {
                item["isSelected"] = false;
              }
              return item;
            });

            list.sort(function (a, b) {
              return a.cnt_name.localeCompare(b.cnt_name);
            });
            setSelectedCountryList(newSelectedCountryList);
            setCountryList(list);
          }
        }
        break;
      }
      case CITY_LIST: {
        if (FilterReducer.resData != null) {
          let responseData = FilterReducer.resData;
          let success = responseData.success;
          if (success) {
            let cityIds = [],
              newSelectedCityList = [];

            cityIds = selectedCityList
              .filter((tempItem) => tempItem.isSelected)
              .map((tempItem) => tempItem.cty_id);
            let list = responseData.data.city.map((item) => {
              item["isSelected"] = false;
              if (cityIds.indexOf(item.cty_id) != -1) {
                item["isSelected"] = true;
                newSelectedCityList.push(item);
              }
              return item;
            });
            list.sort(function (a, b) {
              return a.cty_name.localeCompare(b.cty_name);
            });
            setSelectedCityList(newSelectedCityList);
            setCityList(list);
          }
        }
        break;
      }
      case EVENT_TYPE_LIST: {
        if (FilterReducer.resData != null) {
          let responseData = FilterReducer.resData;
          let success = responseData.success;
          if (success) {
            let list = responseData.data.eventType.map((item) => {
              item["isSelected"] = false;
              return item;
            });
            setEventTypeList(list);
          }
        }
        break;
      }
      case DANCE_STYLE_LIST: {
        if (FilterReducer.resData != null) {
          let responseData = FilterReducer.resData;
          let success = responseData.success;
          if (success) {
            let list = responseData.data.danceStyle.map((item) => {
              item["isSelected"] = false;
              return item;
            });
            setDanceStyleList(list);
          }
        }
        break;
      }
      case ADD_FAVOURITE: {
        const data = EventReducer.favData;
        if (data) {
          updateFavouriteIcon(
            data.data.favorite.ufe_status,
            data.data.favorite.ufe_event_id
          );
        }
        break;
      }
    }
  }

  const fetchEvents = async (loader) => {
    let body = {
      limit: 10,
      page: currentPage,
      date_from:new Date()
    };

    if (filterParams) {
      body = {
        ...body,
        ...filterParams,
      };
    }
    dispatch(FetchEventListingAction(body, loader));
  };

  const filterEvents = async (body) => {
    setFilterParams(body);
  };

  const onFilter = async () => {
    setEventsList([]);
    setPickerType(0);
    // dispatch(FetchEventListingAction(filterParams))
    setCurrentPage(1);
    if (currentPage == 1) {
      console.log("on filter");
      fetchEvents(true);
    }
  };

  useEffect(() => {
    if (filterParams) {
      onFilter();
    }
  }, [filterParams]);

  const getFilterData = () => {
    // if (countryList.length == 0) dispatch(FetchCountryListAction({}))
    // if (cityList.length == 0) dispatch(FetchCityListAction({}))

    if (eventTypeList.length == 0) dispatch(FetchEventTypeListAction({}));
    if (danceStyleList.length == 0) dispatch(FetchDanceStyleListAction({}));
  };

  useEffect(() => {
    console.log("on current page change");
    fetchEvents(true);
  }, [currentPage]);

  const openPickerModel = (type) => {
    if (type == 1) {
      dispatch(FetchCountryListAction({}));
    } else {
      let countryIds = [];
      selectedCountryList.map((item) => {
        if (item.isSelected) {
          countryIds.push(item.cnt_id);
        }
      });
      dispatch(FetchCityListAction({ countryIds }));
    }
    setVisible(false);
    setPickerType(type);
  };

  useEffect(() => {
    if (!isVisible) {
      if (pickerType > 0) setPickerVisible(true);
    }
  }, [pickerType]);

  const closePickerModel = () => {
    setVisible(true);
    setPickerVisible(false);
    setPickerType(0);
  };

  const fetchMoreData = () => {
    if (eventsList.length < totalEventsCount) {
      setCurrentPage(currentPage + 1);
    }
  };

  // useEffect(() => {
  //   if (refreshFlag) {
  //     onResetFilter(false)
  //     // setStartFlag(false)
  //   }
  // }, [refreshFlag])

  const refreshList = () => {
    // setStartFlag(true);
    setEventsList([]);
    setCurrentPage(1);
    setRefreshFlag(true);
    if (currentPage == 1) {
      console.log("on refresh list");
      fetchEvents(true);
    }
  };

  const onResetFilter = (mflag) => {
    // setCountryList(
    //   countryList.map((item) => {
    //     item.isSelected = false
    //     return item
    //   })
    // )

    // setCityList(
    //   cityList.map((item) => {
    //     item.isSelected = false
    //     return item
    //   })
    // )

    // cityList.sort(function (a, b) {
    //   return a.cty_name.localeCompare(b.cty_name);
    // });
    // setCityList(cityList);

    // setCityList([]);
    // setCountryList([]);
    setPickerType(0);
    // setSelectedCountryList([]);
    // setSelectedCityList([]);
    // getFilterData();
    setFilterParams(null);
  };

  const onPickerItemSelected = (list) => {
    if (pickerType == 1) {
      let countryIds = [];
      list.map((item) => {
        if (item.isSelected) {
          countryIds.push(item.cnt_id);
        }
      });

      if (selectedCityList.length !== 0) {
        setSelectedCountryList(list);
        // if (selectedCountryList.length !== 0 && selectedCountryList[0].cnt_id !== list[0].cnt_id) {
        // setSelectedCityList([])
        // dispatch(FetchCityListAction({ countryID: list[0].cnt_id }))

        dispatch(FetchCityListAction({ countryIds }));

        // }
      } else {
        setSelectedCountryList(list);
        // dispatch(FetchCityListAction({ countryID: list[0].cnt_id }))

        // dispatch(FetchCityListAction({ countryIds }))
      }
    } else {
      setSelectedCityList(list);
    }
    setPickerVisible(false);
    setVisible(true);
  };

  const onClickEvent = (item, index) => {
    if (user) {
      console.log("EVENTSSS", item);
      closePickerModel();
      setVisible(false);
      Navigator.navigate(AppNavKeys.EventDetail, {
        previous: "Event",
        eventId: item.event_date_id,
        eventUrl: item.event_url,
        eventidUnique: item.event_id,
      });
    } else {
      AlertFromGuestUser();
    }
  };
  const AlertFromGuestUser = () =>{
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
            console.log("OK Pressed");
            Navigator.resetFrom(AppNavKeys.Login);
          },
        },
      ],
      { cancelable: false }
    );
  }
  const onClickFavourite = async (item) => {
    if (user) {
      // setEventsList([])
      const body = {
        user_id: user.usr_id,
        event_id: item.event_date_id,
      };
      setFavouriteIcon(item.event_date_id);
      dispatch(AddFavouriteAction(body));
    } else {
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
  };

  const renderEmpty = () => (
    <View style={styles.sty17}>
      <Text style={styles.sty16}>No Data at the moment</Text>
    </View>
  );

  const onShare = async (item) => {
    try {
      const result = await Share.share({
        message: item.event_url,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    if (isVisible) getFilterData();
  }, [isVisible]);

  //  const getCallback = useCallback((like, eventId) => {
  //    console.log("EVENTSLIST===>", eventsList)
  //    const newData = eventsList.map((item) => {
  //      if (item.event_id == eventId) {
  //        item.isFavorite = like
  //      }
  //      return item
  //    })
  //    setEventsList(newData)
  //    // refreshList()
  //  }, [])

  const updateFavouriteIcon = (like, eventId) => {
    const newData = eventsList.map((item) => {
      if (item.event_date_id == eventId) {
        item.isFavorite = like;
      }
      return item;
    });
    setEventsList(newData);
  };

  const setFavouriteIcon = (eventId) => {
    const newData = eventsList.map((item) => {
      if (item.event_date_id == eventId) {
        item.isFavorite = !item.isFavorite;
      }
      return item;
    });
    setEventsList(newData);
  };

  // const getCallback = useCallback((eventId) => {
  // setEventsList(
  //   eventsList.map((item) => {
  //     if (item.id == eventId) {
  //       item.isFavorite = !item.isFavorite;
  //     }
  //     return item;
  //   })
  // )
  // }, [])

  return (
    <View style={styles.sty1}>
      <StatusBar
        backgroundColor={colorScheme == "light" ? "#fff" : "#000"}
        barStyle={colorScheme == "light" ? "dark-content" : "light-content"}
      />

      <PickerModal
        visible={isPickerVisible}
        isCountry={pickerType == 1 ? true : false}
        itemList={pickerType == 1 ? countryList : cityList}
        onClose={() => closePickerModel()}
        onSelected={(list) => onPickerItemSelected(list)}
      />

      <FilterModal
        visible={isVisible}
        selectedCountryList={selectedCountryList}
        selectedCityList={selectedCityList}
        eventTypeList={eventTypeList}
        danceStyleList={danceStyleList}
        onApply={(request) => filterEvents(request)}
        onReset={() => {
          // refreshList();
          onResetFilter(true);
          // getFilterData();
        }}
        onClose={() => setVisible(false)}
        openPickerModal={(type) => openPickerModel(type)}
        onUpdateEventList={(list) => setEventTypeList(list)}
        onUpdateDanceList={(list) => setDanceStyleList(list)}
      />

      <View style={styles.sty14}>
        <View style={styles.sty4}>
          <Text style={styles.sty15}>
            Hello{user ? " " + user.usr_fname + "!" : "!"}
          </Text>
          <Text style={styles.sty16}>Are you ready to dance?</Text>
        </View>
        <Pressable
          onPress={() => {
            if(user)
            {
              setVisible(true);
            }
            else
            {
              AlertFromGuestUser();
            }
            
          }}
        >
          <Image
            style={styles.sty21}
            resizeMode="contain"
            source={Assets.filter}
          />
        </Pressable>
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
        keyExtractor={(item, index) => {
          return index.toString();
        }}
        extraData={isRender}
        ListEmptyComponent={renderEmpty}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.2}
        onEndReached={fetchMoreData}
        onRefresh={refreshList}
        refreshing={isRefreshing}
        extraData={false}
      />
    </View>
  );
}
