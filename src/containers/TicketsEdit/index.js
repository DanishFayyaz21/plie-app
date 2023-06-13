import React, { useState, useCallback,useRef } from "react";
import {
  FlatList,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  findNodeHandle
} from "react-native";
import { useSelector,useDispatch } from "react-redux";
import { Assets } from "../../assets/Icons";
import Navigator from "../../common/Navigator";
import styles from "./styles";
import { normalize } from "../../common/Normalize";
import PlieTextInput from "../../components/PlieTextInput";
import TicketEdit from "../TicketEdit";
import { FetchEventDetail } from '../../store/actions/EventAction';
import PlieButton from "../../components/PlieButton";
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
export default function TicketsEdit({
  onPressShare,
  onPressFavourite,
  isFavorite,
  isDisabled,
  eventId,
  eventdate,
  setVerificationEdit
}) {
  const user = useSelector((state) => state.CommonReducer.user);
  const EventReducer = useSelector(
    (state) => state?.EventReducer?.resData?.data?.event
  );
  const [newTickets,setNewsTickets] = useState([]);

  const dispatch = useDispatch();
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
  const onRefresh = useCallback(() => {
    dispatch(FetchEventDetail({ elementId: eventdate }, true));
  }, []);
  const addNewTicket = ()=>{
    if(newTickets.length == 0)
    {
      setNewsTickets([{tck_title:"",tck_price:"",tck_booking_fee:"",tck_description:""}, ...newTickets])
      setVerificationEdit(true);
    }
  }
  const removeTicket = () =>{
    setNewsTickets([]);
    setVerificationEdit(false);
  }
  let scroll = useRef();
  const scrollToInput= useCallback((reactNode: any)=> {
    // Add a 'scroll' ref to your ScrollView
    scroll.current.props.scrollToFocusedInput(reactNode)
    //this.scroll.props.scrollToFocusedInput(reactNode)
  })
  return ( 
    <>
    { EventReducer !== undefined && (
    <KeyboardAwareScrollView
     innerRef={ ref =>{
        scroll.current = ref 
      }
    
     }
     extraScrollHeight={normalize(10)}
    >
    <View style={styles.sty1}>
      {EventReducer !== undefined && (
        <View style={styles.sty2}>
          <View style={styles.sty3}>
            <Image
              style={styles.sty4}
              source={{ uri: EventReducer.event_profile_img }}
            />
            <View style={{flexDirection:"column",width:"75%"}}>
              <View
                style={{
                  justifyContent: "space-between",
                  maxWidth: "100%",
                  paddingBottom: 2,
                  flexDirection:"row",
                }}
              >
                <Text style={styles.sty5} adjustsFontSizeToFit>
                  {EventReducer.event_name.charAt(0).toUpperCase() +
                    EventReducer.event_name.slice(1)}
                </Text>
               
              </View>

              <View
                style={{
                  justifyContent: "space-between",
                  maxWidth: "100%",
                  paddingBottom: 2,
                  flexDirection:"row"
                }}
              >
                 <Text style={styles.sty6} numberOfLines={1}>
                  {eventLocation}
                </Text>
                <View style={styles.sty7}>
                </View>
                <Text style={styles.sty6} numberOfLines={1} adjustsFontSizeToFit>
                  {eventDateString}
                </Text>
              </View>
            </View>
          </View>
          <View style={{alignItems:'flex-end'}}>
            <TouchableOpacity style={styles.buttonAdd} onPress={() => addNewTicket()}>
              <Image style={styles.stylIcon} source={Assets.icon_event} />
            </TouchableOpacity>
          </View>
          
            <FlatList
              style={styles.sty1}
              data={newTickets}
              renderItem={({ item },index) => (
                <TicketEdit isAdd={true} key={`${index}-ticket`} removeTicket={removeTicket} item={item} idEvent={eventId} onRefresh={onRefresh} scroll={scroll} setVerificationEdit={setVerificationEdit}/>
              )}
              showsVerticalScrollIndicator={false}
              onEndReachedThreshold={0.2}
            />
            
            <FlatList
              innerRef={r => (scroll.current = r)}
              extraScrollHeight={normalize(100)}
              style={styles.sty1}
              data={EventReducer.tickets}
              renderItem={({ item },index) => (
                <TicketEdit item={item} key={`${index}-tickets`} idEvent={eventId} onRefresh={onRefresh} scroll={scroll} setVerificationEdit={setVerificationEdit}/>
                // <View style={{flex: 1}}>
                 
                //   <TextInput
                //     placeholder={`enter text${index}`}
                //     onFocus={(event: Event) => {
                //       // `bind` the function if you're using ES6 classes
            
                //       scrollToInput(findNodeHandle(event.target));
                //     }}
                //   />
                // </View>
              )}
            
            />

         
        {/* <PlieButton
          style={styles.buttonAdd}
          text={"Add"}
          onPress={() => addNewTicket()}
        /> */}
        </View>
      )}
    </View>
    </KeyboardAwareScrollView>
    )}
  </>
  );
}
