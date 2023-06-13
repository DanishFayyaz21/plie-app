import React, { useState, useEffect } from "react"
import { View, StyleSheet, TouchableOpacity, Text, Image, ScrollView } from "react-native"
import Fonts from "../assets/Fonts"
import { Assets } from "../assets/Icons"
import Colors from "../common/Colors"
import { normalize } from "../common/Normalize"
import { Calendar } from "react-native-calendars"
import PlieButton from "./PlieButton"
import moment from "moment"
import Modal from "react-native-modal";

function FilterModal(props) {
  // const [isVisible, setVisible] = useState(false)

  const [dateType, setDateType] = useState(1)
  const [dateFrom, setDateFrom] = useState("From")
  const [dateTo, setDateTo] = useState("To")

  const [month, setMonth] = useState(moment().format("MMMM YYYY"))
  const [flag, setFlag] = useState(true);

  const [mCountryList, setCountryList] = useState([])
  const [mCityList, setCityList] = useState([])
  const [mEventTypeList, setEventTypeList] = useState([])
  const [mDanceStyleList, setDanceStyleList] = useState([])

  const [todayDate, setDate] = useState(null)
  const currentDate = moment().format("YYYY-MM-DD");

  const DROPDOWN_TIMING = 400;

  useEffect(() => {
    // setDateFrom(currentDate)
    setDateType(1)
  }, [])

  const { visible, selectedCountryList, selectedCityList, eventTypeList, danceStyleList } = props

  // useEffect(() => {
  //   setVisible(visible)
  // }, [visible])

  useEffect(() => {
    setCountryList(selectedCountryList)
  }, [selectedCountryList])

  useEffect(() => {
    setCityList(selectedCityList)
  }, [selectedCityList])

  useEffect(() => {
    setEventTypeList(eventTypeList)
  }, [eventTypeList])

  useEffect(() => {
    setDanceStyleList(danceStyleList)
  }, [danceStyleList])

  const onClose = () => {
    props.onClose()
    // setVisible(false)
  }

  const onApply = () => {
    let countryIds = []
    let cityIds = []
    let eventTypeIds = []
    let danceStyleIds = []

    mCountryList.map((item) => {
      if (item.isSelected) {
        countryIds.push(item.cnt_id)
      }
    })

    mCityList.map((item) => {
      if (item.isSelected) {
        cityIds.push(item.cty_id)
      }
    })

    mEventTypeList.map((item) => {
      if (item.isSelected) {
        eventTypeIds.push(item.evt_id)
      }
    })

    mDanceStyleList.map((item) => {
      if (item.isSelected) {
        danceStyleIds.push(item.ds_id)
      }
    })

    let body = {
      country: countryIds,
      city: cityIds,
      event_type: eventTypeIds,
      dance_style: danceStyleIds,
      date_from: flag ? new Date() : dateFrom,
      date_to: dateTo == 'To' ? '' : dateTo,
    }

    props.onApply(body)
    props.onClose()
    // setVisible(false)
  }

  const onReset = () => {
    setEventTypeList(
      mEventTypeList.map((item) => {
        item.isSelected = false
        return item
      })
    )

    setDanceStyleList(
      mDanceStyleList.map((item) => {
        item.isSelected = false
        return item
      })
    )
    mCountryList.map((item) => {
      item.isSelected = false
      return item
    })
    setCountryList(
     []
    )
    mCityList.map((item) => {
      item.isSelected = false
      return item
    })
    setCityList(
      []
    )


    setDateType(1)
    setDateFrom("From")
    setFlag(true)
    setDateTo("To")

    props.onReset()
    // props.onClose()
    // setVisible(false)
  }

  const openPickerModal = (type) => {
    console.log('country list======>', mCountryList);
    props.openPickerModal(type)
    props.onUpdateEventList(mEventTypeList)
    props.onUpdateDanceList(mDanceStyleList)
    // props.onClose()
    // setVisible(false)
  }

  const onEventTypeSelect = (id) => {
    setEventTypeList(
      mEventTypeList.map((item) => {
        if (item.evt_id == id) item.isSelected = !item.isSelected
        return item
      })
    )
  }

  const onDanceStyleSelect = (id) => {
    setDanceStyleList(
      mDanceStyleList.map((item) => {
        if (item.ds_id == id) item.isSelected = !item.isSelected
        return item
      })
    )
  }

  const onDateSelect = (type, date) => {
    if (type === 1) {
      setFlag(false);
      setDateFrom(date.dateString)
      // setTimeout(() => { if(dateTo == "To") setDateType(2) }, 500)
    } else {
      setDateTo(date.dateString)
    }
  }

  return (
    <Modal
      visible={visible}
      transparent={true}
      onRequestClose={() => {
        onClose();
      }}
      onBackButtonPress={() => {
        onClose();
      }}
      onBackdropPress={() => {
        onClose();
      }}
      onModalHide={() => {
        // this.hideFiltersModal();
      }}
      onSwipeComplete={() => {
        onClose();
      }}
      animationInTiming={DROPDOWN_TIMING}
      animationOutTiming={DROPDOWN_TIMING}
      backdropTransitionInTiming={DROPDOWN_TIMING}
      backdropTransitionOutTiming={DROPDOWN_TIMING}
      swipeDirection={"down"}
      hideModalContentWhileAnimating={true}
      useNativeDriver={true}
      useNativeDriverForBackdrop={true}
      propagateSwipe={true}
      statusBarTranslucent={false}
      // animated={true}
      // animationType="slide"
      style={{ justifyContent: 'flex-end', margin: 0, flex: 1 }}
    >
      <View style={styles.sty1}>
        <View style={styles.sty2}>
          <View style={styles.sty3}>
            <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-between" }}>
              <View style={{ marginStart: normalize(15) }} />
              <View style={styles.sty4} />
              <TouchableOpacity onPress={() => onClose()}>
                <Image style={styles.sty27} resizeMode="contain" source={Assets.close} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
              <View style={styles.sty25}>
                {/* <View style={{ flexDirection: "row", justifyContent: "space-around",width: "100%" }}> */}
                <Text style={styles.sty24}>Event Filter</Text>

                {/* </View> */}

                <Text style={styles.sty5}>Location</Text>

                <View style={styles.sty6}>
                  <View>
                    <TouchableOpacity style={styles.sty7} onPress={() => openPickerModal(1)}>
                      <Text style={styles.sty8}>Select Country</Text>
                      <Image style={styles.sty9} resizeMode="contain" source={Assets.down_arrow} />
                    </TouchableOpacity>

                    {mCountryList.length > 0 &&
                      mCountryList.map((item) => {
                        return (
                          <View>
                            <Text style={styles.sty26}>{item.cnt_name}</Text>
                          </View>
                        )
                      })}
                  </View>

                  <View>
                    <TouchableOpacity style={styles.sty7} onPress={() => openPickerModal(2)}>
                      <Text style={styles.sty8}>Select City</Text>
                      <Image style={styles.sty9} resizeMode="contain" source={Assets.down_arrow} />
                    </TouchableOpacity>

                    {mCityList.length > 0 &&
                      mCityList.map((item) => {
                        return (
                          <View>
                            <Text style={styles.sty26}>{item.cty_name}</Text>
                          </View>
                        )
                      })}
                  </View>
                </View>

                <View style={styles.sty10} />

                <Text style={styles.sty5}>Event type</Text>

                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {mEventTypeList.map((item, index) => {
                    return (
                      <TouchableOpacity
                        style={[
                          styles.sty11,
                          {
                            marginEnd: index == mEventTypeList.length - 1 ? normalize(18) : 0,
                            marginStart: index == 0 ? normalize(18) : normalize(10),
                          },
                        ]}
                        onPress={() => onEventTypeSelect(item.evt_id)}
                      >
                        <Text style={item.isSelected ? styles.sty22 : styles.sty12}>{item.evt_name}</Text>
                      </TouchableOpacity>
                    )
                  })}
                </ScrollView>

                <View style={styles.sty10} />

                <Text style={styles.sty5}>Dance Style</Text>

                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {mDanceStyleList.map((item, index) => {
                    return (
                      <TouchableOpacity
                        style={[
                          styles.sty11,
                          {
                            marginEnd: index == mDanceStyleList.length - 1 ? normalize(18) : 0,
                            marginStart: index == 0 ? normalize(18) : normalize(10),
                          },
                        ]}
                        onPress={() => onDanceStyleSelect(item.ds_id)}
                      >
                        <Text style={item.isSelected ? styles.sty22 : styles.sty12}>{item.ds_name}</Text>
                      </TouchableOpacity>
                    )
                  })}
                </ScrollView>

                <View style={styles.sty10} />

                <Text style={styles.sty5}>Date Range</Text>

                <View style={styles.sty6}>
                  <TouchableOpacity
                    style={[dateType == 1 ? styles.sty23 : styles.sty7, { width: "45%", height: 30 }]}
                    onPress={() => setDateType(1)}
                  >
                    <Text style={styles.sty8}>{flag ? "From" : dateFrom.split('-')[2] + "." + dateFrom.split('-')[1] + "." + dateFrom.split('-')[0].slice(-2)}</Text>
                    <Image style={styles.sty13} resizeMode="contain" source={Assets.calendar} />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[dateType == 2 ? styles.sty23 : styles.sty7, { width: "45%", height: 30 }]}
                    onPress={() => setDateType(2)}
                  >
                    <Text style={styles.sty8}>{dateTo === "To" ? "To" : dateTo.split('-')[2] + "." + dateTo.split('-')[1] + "." + dateTo.split('-')[0].slice(-2)}</Text>
                    <Image style={styles.sty13} resizeMode="contain" source={Assets.calendar} />
                  </TouchableOpacity>
                </View>
                {/* {console.log('TODAYDATELOG====>', todayDate)} */}
                <View style={{ width: "90%", marginBottom: normalize(60) }}>

                  <Calendar
                    theme={{
                      // backgroundColor: '#ffffff',
                      // calendarBackground: Colors.white,
                      textSectionTitleColor: Colors.black,
                      // textSectionTitleDisabledColor: '#d9e1e8',
                      // selectedDayBackgroundColor: '#00adf5',
                      // selectedDayTextColor: '#ffffff',
                      // todayTextColor: '#00adf5',
                      // dayTextColor: Colors.black,
                      // textDisabledColor: '#d9e1e8',
                      // dotColor: '#00adf5',
                      // selectedDotColor: '#ffffff',
                      // arrowColor: Colors.black,
                      // disabledArrowColor: '#d9e1e8',
                      monthTextColor: "black",
                      // indicatorColor: 'blue',
                      textDayFontFamily: Fonts.Regular,
                      textMonthFontFamily: Fonts.Medium,
                      textDayHeaderFontFamily: Fonts.Medium,
                      // //textDayFontWeight: '300',
                      // textMonthFontWeight: 'bold',
                      // textDayHeaderFontWeight: '300',
                      // textDayFontSize: 16,
                      // textMonthFontSize: 16,
                      // textDayHeaderFontSize: 16
                    }}
                    // initialDate={currentDate}
                    // Initially visible month. Default = now
                    // current={currentDate}
                    // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                    // minDate={currentDate}
                    // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                    //maxDate={'2012-05-30'}
                    // Handler which gets executed on day press. Default = undefined
                    // onDayPress={day => {
                    //   console.log('selected day', day);
                    //   setDateFrom(day)
                    // }}
                    // Handler which gets executed on day long press. Default = undefined
                    // onDayLongPress={day => {
                    //   console.log('selected day', day);
                    // initialDate={currentDate}
                    // }}
                    // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                    monthFormat={"yyyy MM"}
                    // Handler which gets executed when visible month changes in calendar. Default = undefined
                    onMonthChange={(month) => {
                      //console.log('month changed', month);
                      setMonth(moment(month.dateString).format("MMMM YYYY"))
                    }}
                    // Hide month navigation arrows. Default = false
                    //hideArrows={true}
                    // Replace default arrows with custom ones (direction can be 'left' or 'right')
                    renderArrow={(direction) => {
                      return <Image style={styles.sty20} source={direction == "left" ? Assets.cal_left : Assets.cal_right} />
                    }}
                    // Do not show days of other months in month page. Default = false
                    hideExtraDays={true}
                    // If hideArrows = false and hideExtraDays = false do not switch month when tapping on greyed out
                    // day from another month that is visible in calendar page. Default = false
                    //disableMonthChange={true}
                    // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
                    firstDay={1}
                    // Hide day names. Default = false
                    //hideDayNames={true}
                    // Show week numbers to the left. Default = false
                    //showWeekNumbers={true}
                    // Handler which gets executed when press arrow icon left. It receive a callback can go back month
                    onPressArrowLeft={(subtractMonth) => subtractMonth()}
                    // Handler which gets executed when press arrow icon right. It receive a callback can go next month
                    onPressArrowRight={(addMonth) => addMonth()}
                    // Disable left arrow. Default = false
                    //disableArrowLeft={true}
                    // Disable right arrow. Default = false
                    //disableArrowRight={true}
                    // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
                    //disableAllTouchEventsForDisabledDays={true}
                    // Replace default month and year title with custom one. the function receive a date as parameter
                    renderHeader={(date) => {
                      /*Return JSX*/
                      return <Text style={styles.sty21}>{month}</Text>
                    }}
                    // selected={dateFrom}
                    // Enable the option to swipe between months. Default = false
                    enableSwipeMonths={true}
                    //initialDate={dateFrom}
                    dayComponent={({ date, state }) => {
                      return (
                        <TouchableOpacity
                          onPress={() => {
                            // if (date.dateString >= currentDate) {
                            if (dateType == 2) {
                              if (dateFrom == "From" || date.dateString >= dateFrom) {
                                onDateSelect(dateType, date)
                              }
                            }
                            if (dateType == 1) {
                              if (dateTo == "To" || date.dateString <= dateTo) {
                                onDateSelect(dateType, date)
                              }
                            }
                            // }
                            // dateType == 1 ? setDateFrom(date.dateString) : setDateTo(date.dateString)
                          }}
                          style={
                            dateType == 1
                              ? date.dateString === dateFrom
                                ? styles.sty16
                                : styles.sty17
                              : date.dateString === dateTo
                                ? styles.sty16
                                : styles.sty17
                          }
                        >
                          <Text
                            style={
                              // 
                              dateType == 1
                                ? date.dateString === dateFrom
                                  ? styles.sty19
                                  : styles.sty18
                                : date.dateString === dateTo
                                  ? styles.sty19
                                  : styles.sty18
                            }
                          >
                            {date.day}
                          </Text>
                        </TouchableOpacity>
                      )
                    }}
                  />
                </View>                
              </View>
            </ScrollView>

            <View style={styles.sty14}>
              <PlieButton style={styles.sty15} text={"Apply"} onPress={() => onApply()} />

              <PlieButton isReverse text={"Reset"} onPress={() => onReset()} />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default FilterModal

const styles = StyleSheet.create({
  sty1: {
    flex: 1,
    // backgroundColor: Colors.modalbg,
  },
  sty2: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  sty3: {
    width: "100%",
    height: "90%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
    paddingTop: normalize(10),
    borderTopLeftRadius: normalize(26),
    borderTopRightRadius: normalize(26),
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
  sty4: {
    width: normalize(130),
    height: normalize(5),
    borderRadius: normalize(100),
    marginBottom: normalize(20),
    backgroundColor: Colors.black,
    alignSelf: "center",
  },
  sty5: {
    color: Colors.black,
    fontSize: normalize(12),
    fontFamily: Fonts.Regular,
    marginStart: normalize(18),
    marginBottom: normalize(10),
    alignSelf: "flex-start",
  },
  sty6: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: normalize(18),
    justifyContent: "flex-start",
  },
  sty7: {
    width: normalize(130),
    height: normalize(28),
    flexDirection: "row",
    alignItems: "center",
    borderColor: Colors.black,
    borderWidth: normalize(0.5),
    borderRadius: normalize(5),
    marginEnd: normalize(15),
  },
  sty8: {
    flex: 1,
    color: Colors.black,
    fontSize: normalize(10),
    fontFamily: Fonts.Regular,
    marginStart: normalize(10),
  },
  sty9: {
    width: normalize(10),
    height: normalize(10),
    marginEnd: normalize(10),
  },
  sty10: {
    width: "100%",
    height: normalize(0.5),
    marginVertical: normalize(15),
    backgroundColor: Colors.hint,
  },
  sty11: {
    height: normalize(28),
    alignItems: "center",
    justifyContent: "center",
    borderColor: Colors.black,
    borderWidth: normalize(0.5),
    borderRadius: normalize(5),
    marginStart: normalize(10),
    paddingHorizontal: normalize(10),
  },
  sty12: {
    color: Colors.black,
    fontSize: normalize(10),
    fontFamily: Fonts.Regular,
  },
  sty13: {
    width: normalize(18),
    height: normalize(18),
    marginEnd: normalize(8),
  },
  sty14: {
    flexDirection: "row",
    marginBottom: normalize(10),
    height: normalize(60),
    width: "100%",
    marginVertical: normalize(10),
    paddingHorizontal: normalize(10),    
    justifyContent: "center",
    // alignContent: "space-between",
    // alignItems: "center",
    backgroundColor: "white",
    position: "absolute",
    bottom: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  sty15: {
    marginEnd: normalize(15),
  },
  sty16: {
    width: normalize(25),
    height: normalize(25),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.color11,
  },
  sty17: {
    width: normalize(25),
    height: normalize(25),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
  },
  sty18: {
    color: Colors.black,
    fontSize: normalize(12),
    fontFamily: Fonts.Regular,
  },
  sty19: {
    color: Colors.white,
    fontSize: normalize(12),
    fontFamily: Fonts.Medium,
  },
  sty20: {
    width: normalize(16),
    height: normalize(16),
  },
  sty21: {
    color: Colors.black,
    fontSize: normalize(16),
    fontFamily: Fonts.Bold,
  },
  sty22: {
    color: Colors.primary,
    fontSize: normalize(10),
    fontFamily: Fonts.Regular,
  },
  sty23: {
    width: normalize(130),
    height: normalize(28),
    flexDirection: "row",
    alignItems: "center",
    borderColor: Colors.primary,
    borderWidth: normalize(1.2),
    borderRadius: normalize(5),
    marginEnd: normalize(15),
  },
  sty24: {
    color: Colors.black,
    fontSize: normalize(16),
    fontFamily: Fonts.Bold,
    marginStart: normalize(18),
    marginBottom: normalize(10),
    alignSelf: "flex-start",
  },
  sty25: {
    alignItems: "center",
    justifyContent: "center",
  },
  sty26: {
    color: Colors.black,
    fontSize: normalize(12),
    fontFamily: Fonts.Regular,
  },
  sty27: {
    width: normalize(15),
    height: normalize(15),
    marginEnd: normalize(15),
  },
  sty28: {
    color: Colors.color17,
    fontSize: normalize(12),
    fontFamily: Fonts.Regular,
  }
})
