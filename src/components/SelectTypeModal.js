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
import {ModalsAddEvent} from "../common/Constants";

function SelectTypeModal(props) {
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

  const { visible, setEvenType, eventTypeList } = props

  // useEffect(() => {
  //   setVisible(visible)
  // }, [visible])

  useEffect(() => {
    setEventTypeList(eventTypeList)
  }, [eventTypeList])

  const onClose = () => {
    props.onClose()
    // setVisible(false)
  }

  const onApply = () => {
    let eventTypeIds = []


   
    mEventTypeList.map((item) => {
      if (item.isSelected) {
        eventTypeIds.push(item);
      }
    })
    setEvenType(eventTypeIds)
    console.log("event Selected", eventTypeIds);
    onClose();
    //props.onClose()
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

    setDateType(1)
    setDateFrom("From")
    setFlag(true)
    setDateTo("To")

    props.onReset()
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
    console.log("eventTypeSelected",mEventTypeList);
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
                <Text style={styles.sty24}>Event Details</Text>

                {/* </View> */}

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
              </View>
            </ScrollView>

            <View style={styles.sty14}>
              <PlieButton style={styles.sty15} text={ModalsAddEvent.Confirm} onPress={() => onApply()} />

              
            </View>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default SelectTypeModal;

const styles = StyleSheet.create({
  sty1: {
    flex: 1,
    backgroundColor: Colors.modalbg,
  },
  sty2: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  sty3: {
    width: "100%",
    height: normalize(250),
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
