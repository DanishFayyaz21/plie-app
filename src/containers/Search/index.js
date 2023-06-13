import React, { useState, useEffect, useCallback } from "react";
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
  BackHandler,
} from "react-native";
import styles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import {
  AddFavouriteAction,
  FetchEventListingAction,
} from "../../store/actions/EventAction";
import {
  ADD_FAVOURITE,
  CITY_LIST,
  COUNTRY_LIST,
  DANCE_STYLE_LIST,
  EVENT_LISTING,
  EVENT_TYPE_LIST,
} from "../../common/StoreActionTypes";
import { Assets } from "../../assets/Icons";
import FilterModal from "../../components/FilterModal";
import {
  FetchCityListAction,
  FetchCountryListAction,
  FetchDanceStyleListAction,
  FetchEventTypeListAction,
} from "../../store/actions/FilterAction";
import { debounce, pick } from "lodash";
import PickerModal from "../../components/PickerModal";
import { useIsFocused } from "@react-navigation/native";
import AppNavKeys from "../../common/AppNavKeys";
import Navigator from "../../common/Navigator";
import Colors from "../../common/Colors";
import { normalize } from "../../common/Normalize";
import EventCard from "../../components/EventCard";

export default function Search({ route }) {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [refreshFlag, setRefreshFlag] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);

  const [eventsList, setEventsList] = useState([]);
  const [totalEventsCount, setTotalEventsCount] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isVisible, setVisible] = useState(false);
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filterParams, setFilterParams] = useState(null);
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
    switch (CommonReducer.api_type) {
      case EVENT_LISTING: {
        console.log("EventReducer.resData", EventReducer.resData);
        if (EventReducer.resData != null) {
          let responseData = EventReducer.resData;
          let success = responseData.success;
          if (success) {
            let eventIds = eventsList.map((item) => item.event_date_id);
            let receivedEvents = responseData.data.events;

            receivedEvents = receivedEvents.filter(
              (item) => eventIds.indexOf(item.event_date_id) == -1
            );

            setTotalEventsCount(responseData.data.total);

            if (refreshFlag == true && eventsList.length == 0) {
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
            let list = responseData.data.country.map((item) => {
              item["isSelected"] = false;
              return item;
            });
            list.sort(function (a, b) {
              return a.cnt_name.localeCompare(b.cnt_name);
            });
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
            let list = responseData.data.city.map((item) => {
              item["isSelected"] = false;
              return item;
            });
            list.sort(function (a, b) {
              return a.cty_name.localeCompare(b.cty_name);
            });
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

  const handleDebounce = debounce((value) => {
    setCurrentPage(1);
    setEventsList([]);
    if (currentPage == 1) {
      fetchEvents();
    }    
  }, 500);

  const fetchEvents = async () => {
    let body = {
      limit: 10,
      search: searchText,
      page: currentPage,
      ...filterParams,
    };
    dispatch(FetchEventListingAction(body));
  };

  const filterEvents = async (body) => {
    setFilterParams(body);
  };

  const onFilter = async () => {
    setEventsList([]);
    setPickerType(0);
    // dispatch(FetchEventListingAction(filterParams));
    setCurrentPage(1);
    if (currentPage == 1) {
      fetchEvents();
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
    // if (eventTypeList.length == 0) dispatch(FetchEventTypeListAction({}))
    // if (danceStyleList.length == 0) dispatch(FetchDanceStyleListAction({}))
  };

  useEffect(() => {
    fetchEvents();
  }, [currentPage]);

  const openPickerModel = (type) => {
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
    console.log("fetchMoreData", eventsList.length, totalEventsCount);
    if (eventsList.length < totalEventsCount) {
      setCurrentPage(currentPage + 1);
    }
  };

  // const refreshList = () => {
  //   setSearchText("");
  //   setRefreshFlag(true)
  //   setCurrentPage(1)
  //   fetchEvents()
  // }

  // useEffect(() => {
  //   if (refreshFlag) {
  //     onResetFilter();
  //   }
  // }, [refreshFlag]);

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

  // const onResetFilter = () => {
  //   setCountryList(
  //     countryList.map((item) => {
  //       item.isSelected = false
  //       return item
  //     })
  //   )

  //   setCityList(
  //     cityList.map((item) => {
  //       item.isSelected = false
  //       return item
  //     })
  //   )

  //   setPickerType(0)
  //   setSelectedCountryList([])
  //   setSelectedCityList([])
  //   fetchEvents()
  // }

  const onResetFilter = () => {
    // setCityList([]);
    // setCountryList([]);
    setPickerType(0);
    // setSelectedCountryList([]);
    // setSelectedCityList([]);
    // getFilterData();
    // fetchEvents();
    setFilterParams(null);
  };

  const onPickerItemSelected = (list) => {
    if (pickerType == 1) {
      if (selectedCityList.length !== 0) {
        setSelectedCountryList(list);
        if (
          selectedCountryList.length !== 0 &&
          selectedCountryList[0].cnt_id !== list[0].cnt_id
        ) {
          setSelectedCityList([]);
          dispatch(FetchCityListAction({ countryID: list[0].cnt_id }));
        }
      } else {
        setSelectedCountryList(list);
        dispatch(FetchCityListAction({ countryID: list[0].cnt_id }));
      }
    } else {
      setSelectedCityList(list);
    }
    setPickerVisible(false);
    setVisible(true);
  };

  const renderEmpty = () => (
    <View style={styles.sty17}>
      <Text style={styles.sty16}>No Data at the moment</Text>
    </View>
  );

  const onClickEvent = (item, index) => {
    if (user) {
      Navigator.navigate(AppNavKeys.EventDetail, {
        previous: "Search",
        eventId: item.event_date_id,
        eventUrl: item.event_url,
      });
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
              console.log("OK Pressed");
              Navigator.resetFrom(AppNavKeys.Login);
            },
          },
        ],
        { cancelable: false }
      );
    }
  };

  const onClickFavourite = async (item) => {
    if (user) {
      const body = {
        user_id: user.usr_id,
        event_id: item.event_date_id,
      };
      setFavouriteIcon(item.event_date_id);
      dispatch(AddFavouriteAction(body));
    } else {
      Navigator.navigate(AppNavKeys.Login);
    }
  };

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

  return (
    <View style={styles.sty1}>
      {EventReducer !== undefined && (
        <>
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
            onReset={() => onResetFilter()}
            onClose={() => setVisible(false)}
            openPickerModal={(type) => openPickerModel(type)}
          />

          <View style={styles.sty14}>
            <View style={styles.sty4}>
              <Text style={styles.sty15}>
                Hello{user ? " " + user.usr_fname + "!" : "!"}
              </Text>
              <Text style={styles.sty16}>Are you ready to dance?</Text>
            </View>
            {/* <TouchableOpacity onPress={() => setVisible(true)}>
              <Image style={styles.sty21} source={Assets.filter} />
            </TouchableOpacity> */}
          </View>

          <View style={styles.sty18}>
            <Image style={styles.sty19} source={Assets.search} />
            <TextInput
              style={styles.sty20}
              placeholder={"Search"}
              value={searchText}
              placeholderTextColor={"#00000080"}
              onChangeText={(text) => {
                setSearchText(text);
                // handleDebounce(text)
              }}
              onSubmitEditing={() => {
                // setSearchText(text)
                handleDebounce(searchText);
              }}
            />
            {searchText !== "" && (
              <TouchableOpacity
                onPress={() => {
                  setSearchText("");
                  handleDebounce("");
                }}
              >
                <Image style={styles.sty22} source={Assets.close} />
              </TouchableOpacity>
            )}
          </View>

          <FlatList
            style={styles.sty1}
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
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={renderEmpty}
            showsVerticalScrollIndicator={false}
            onEndReachedThreshold={0.2}
            onEndReached={fetchMoreData}
            onRefresh={refreshList}
            refreshing={isRefreshing}
          />
        </>
      )}
    </View>
  );
}
