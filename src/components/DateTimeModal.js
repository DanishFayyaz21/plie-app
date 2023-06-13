import React, { useState, useEffect } from "react"
import { View, StyleSheet, TouchableOpacity, Text, Image, ScrollView,FlatList } from "react-native"
import Fonts from "../assets/Fonts"
import { Assets } from "../assets/Icons"
import Colors from "../common/Colors"
import { normalize } from "../common/Normalize"
import { Calendar } from "react-native-calendars"
import PlieButton from "./PlieButton"
import moment from "moment"
import Modal from "react-native-modal";
import { SafeAreaView } from "react-native-safe-area-context"
import Pressable from "react-native/Libraries/Components/Pressable/Pressable"
import DateTimePicker from '@react-native-community/datetimepicker';
function DateTimeModal(props) {
  // const [isVisible, setVisible] = useState(false)


  
  const [month, setMonth] = useState(moment().format("MMMM YYYY"))
  const [flag, setFlag] = useState(true);

  const [mCountryList, setCountryList] = useState([])
  const [mCityList, setCityList] = useState([])
  const [mEventTypeList, setEventTypeList] = useState([])
  const [mDanceStyleList, setDanceStyleList] = useState([])

  const [todayDate, setDate] = useState(null)
  const currentDate = moment().format("YYYY-MM-DD");
  const [date, setnewDate] = useState(new Date());
  //const [isFirst, setIsFirst] = useState(false);
 
  const DROPDOWN_TIMING = 400;
  const { visible, accepted, cancel, title, height=250, mode, dateOrTime,setTimeTo,setTimeFrom,setDateTime,typeTime,setIsFirst} = props;
  
  const [dateSchedule, setDateSchedule] = useState(dateOrTime);
  const [oldDateSchedule,setOldDateSchedule] = useState(dateOrTime);
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);

  useEffect(()=>{
    if(dateOrTime)
    {
      setDateSchedule(dateOrTime);
      setOldDateSchedule(dateOrTime);
    }
  },[dateOrTime])
  const onClose = () => {
    setDateSchedule(oldDateSchedule);
    props.onClose();
    // setVisible(false)
  }
  const exitOnClose = () =>{
      setDateSchedule(oldDateSchedule);
      props.onClose();
    
  }
  const onApply = () => {
    console.log("OKKKK", dateSchedule);
    if(mode == "date")
    {
      setDateTime(dateSchedule);
      setIsFirst(false);
    }
    if(mode == "time")
    {
      if(typeTime == "TimeFrom")
      {
       
        setTimeFrom(dateSchedule);
       
      }
      if(typeTime == "TimeTo")
      {
        setTimeTo(dateSchedule);
       
      }
    }
    props.onClose();
    //props.onClose()
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
  const onDanceStyleSelect = (id) => {
    setDanceStyleList(
      mDanceStyleList.map((item) => {
        if (item.ds_id == id) item.isSelected = !item.isSelected
        return item
      })
    )
  }
  const onChange = (event, selectedDate)=>{
    const currentDate = selectedDate || dateSchedule;
    console.log("dateOrTime",dateOrTime);
    //setnewDate(currentDate);
    let tempdate = new Date(currentDate);
    let ftime = tempdate.getHours() + ':' + tempdate.getMinutes() + ':'+tempdate.getSeconds();
    if(mode == "date")
    {
      //setDateTime(new Date(tempdate));
      setDateSchedule(new Date(tempdate));
    }
    if(mode == "time")
    {
      if(typeTime == "TimeFrom")
      {
       
        //setTimeFrom(new Date(`December 1, 2022 ${ftime}`));
        setDateSchedule(new Date(`December 1, 2022 ${ftime}`));
      }
      if(typeTime == "TimeTo")
      {
        //setTimeTo(new Date(`December 1, 2022 ${ftime}`));
        setDateSchedule(new Date(`December 1, 2022 ${ftime}`));
      }
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
          <View style={[styles.sty3,{ height: normalize(height) }]}>
            <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-between" }}>
              <View style={{ marginStart: normalize(15) }} />
              
              <TouchableOpacity onPress={() => exitOnClose()}>
                <Image style={styles.sty27} resizeMode="contain" source={Assets.close} />
              </TouchableOpacity>
            </View>
            <Text style={styles.sty24}>{title}</Text>
            <ScrollView>
              <View style={styles.sty25}>
                {/* <View style={{ flexDirection: "row", justifyContent: "space-around",width: "100%" }}> */}
                

                {/* </View> */}


                   
                   {
                    visible && dateSchedule &&(
                        <DateTimePicker
                            testID="datetimePicker"
                            value={dateSchedule}
                            mode={mode}
                            onChange={onChange}
                            is24Hour={true}

                        />
                    )
                   }
               
              </View>
              <View style={styles.sty14}>
                <PlieButton style={styles.styButtonReady}  text={accepted} onPress={() => onApply()} />
                <PlieButton style={styles.styButtonEditing} textStyle={{color:Colors.primary,fontSize:normalize(14)}} text={cancel} onPress={() => onClose()} />
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default DateTimeModal;

const styles = StyleSheet.create({
  sty1: {
    flex: 1,
    backgroundColor: Colors.modalbg,
  },
  sty2: {
    width: "90%",
    height: "95%",
    justifyContent:"flex-end",
    alignSelf:'center'
    
  },
  sty3: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
    paddingTop: normalize(10),
    borderTopLeftRadius: normalize(26),
    borderTopRightRadius: normalize(26),
    borderBottomLeftRadius: normalize(26),
    borderBottomRightRadius: normalize(26),
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
    flexDirection: "column",
    marginBottom: normalize(10),
    height: normalize(100),
    width: "100%",
    marginVertical: normalize(10),
    paddingHorizontal: normalize(10), 
    borderTopLeftRadius: normalize(26),
    borderTopRightRadius: normalize(26),
    borderBottomLeftRadius: normalize(26),
    borderBottomRightRadius: normalize(26),   
    justifyContent: "center",
    // alignContent: "space-between",
    // alignItems: "center",
    backgroundColor: "white",
    bottom: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
  styButtonReady: {
    marginStart: normalize(15),
    marginTop:'1%',
    borderTopLeftRadius: normalize(10),
    borderTopRightRadius: normalize(10),
    borderBottomLeftRadius: normalize(10),
    borderBottomRightRadius: normalize(10),
    alignSelf:'center',
    width:'90%',

  },
  styButtonEditing: {
    marginStart: normalize(15),
    marginTop:'1%',
    borderTopLeftRadius: normalize(10),
    borderTopRightRadius: normalize(10),
    borderBottomLeftRadius: normalize(10),
    borderBottomRightRadius: normalize(10),
    backgroundColor:'white',
    alignSelf:'center',
    width:'90%',
    borderColor: Colors.primary,
    borderWidth: normalize(2),
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
    fontSize: normalize(25),
    fontFamily: Fonts.Bold,
    marginStart: normalize(18),
    marginBottom: normalize(10),
    alignSelf: "center",
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
    width: normalize(13),
    height: normalize(13),
    marginEnd: normalize(15),
  },
  sty28: {
    color: Colors.color17,
    fontSize: normalize(12),
    fontFamily: Fonts.Regular,
  },
  textStyle:{
    textAlign:'left',
    marginLeft:normalize(10),
    marginRight:normalize(10),
    marginTop:normalize(1)
  },
  textButton:{
    flexDirection: "column",
    borderRadius: normalize(4),
    marginBottom: normalize(10),
  }
})
