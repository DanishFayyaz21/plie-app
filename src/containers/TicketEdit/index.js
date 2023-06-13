import React, { useEffect, useState,useRef,useCallback } from "react";
import {
  FlatList,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./styles";
import { normalize } from "../../common/Normalize";
import PlieTextInput from "../../components/PlieTextInput";
import PlieButton from "../../components/PlieButton";
import { useDispatch, useSelector } from 'react-redux';
import {AddTicket,DeleteTicket} from '../../store/actions/EventAction';
import { showMessage } from "react-native-flash-message";
import {  Flash } from "../../common/Constants";
import { CLEAR_TICKET,CLEAR_DELETE_TICKET } from "../../common/StoreActionTypes";

const TicketEdit = (props) => {
  const { item, idEvent, onRefresh, isAdd, removeTicket,scroll,setVerificationEdit} = props;
  const [title, setTitle ] = useState(item?.tck_title);
  const [price, setPrice] = useState(item?.tck_price?.toString());
  const [bookingFee, setBookingFee] = useState(item?.tck_booking_fee?.toString());
  const [isValidateTicket,setIsValidateTicket] = useState(false);
  const [descriptionTickets, setDescriptionTickets] = useState(item.tck_description);
  const EditTicketStatusEdit = useSelector((state) => state.EditTickesReducer.statusEdit);
  const EditTicketStatusDelete = useSelector((state) => state.EditTickesReducer.statusDelete);
  const refTitle = useRef();
  const refPrice = useRef();
  const refBookingFee = useRef();
  const refDescription = useRef();
  const dispatch = useDispatch();
  console.log("ITEM TICKET",item);
  useEffect(()=>{
    if(EditTicketStatusEdit)
    {
      showMessage({ type: Flash.Success, message: "add or update Ticket" });
      onRefresh();
      dispatch({ type: CLEAR_TICKET, payload: false });
    }

  },[EditTicketStatusEdit])
  useEffect(() => {
    if(EditTicketStatusDelete)
    {
      showMessage({ type: Flash.Success, message: "delete ticket" });
      onRefresh();
      dispatch({ type: CLEAR_DELETE_TICKET, payload: false });
    }

  },[EditTicketStatusDelete])
  const upateTicket = () => {
    if(isAdd)
    {
      Addticket();
      if(isValidateTicket)
      {
        removeTicket();
      }
      
    }
    else
    {
      if(verifyTitle(title) || verifyDescription(descriptionTickets))
      {
        if (verifyTitle(title))
        {
          showMessage({ type: Flash.Error, message: "Please enter the title" });
        }
        if(verifyDescription(descriptionTickets))
        {
          showMessage({ type: Flash.Error, message: "Please enter the small description" });
        }
        
      }
      else
      {
        let body = {
          tck_id: item.tck_id,
          eventTicketId: item.tck_id,
          eventId: idEvent.toString(),
          tck_title: title,
          tck_price: price !== "" ? price : "",
          tck_description: descriptionTickets !== "" ? descriptionTickets : "",
          tck_booking_fee: bookingFee !== "" ? bookingFee : "",
        };
        dispatch(AddTicket(body));
        setVerificationEdit(false);
      }
      
    }
    
  }
  const verifyTitle = (title)=>{
    return (!title || title  === "");
    

  }
  const verifyDescription = (description) =>{
    return (!description || description  == "");
  }
  const Addticket =() =>{
    let errorMessage = "";
    console.log("title edit",title);
    console.log("title descriptionTickets",descriptionTickets);
    if(verifyTitle(title) || verifyDescription(descriptionTickets))
    {
      if (verifyTitle(title))
      {
        console.log("entra titles");
        errorMessage= errorMessage +"Please enter the title,";
      }
      if(verifyDescription(descriptionTickets))
      {
        console.log("entra descriptions");
        errorMessage = errorMessage + "Please enter the small description.";
      }
      showMessage({ type: Flash.Error, message: errorMessage});
    }
    else
    {

    
      let body = {
        eventId: idEvent.toString(),
        tck_title: title,
        tck_price: price !== "" ? price : "",
        tck_description: descriptionTickets !== "" ? descriptionTickets : "",
        tck_booking_fee: bookingFee !== "" ? bookingFee : "",
      };
      setIsValidateTicket(true);
      dispatch(AddTicket(body));
      setVerificationEdit(false);
    }
  }
  const DeleteATicket = () => {
    if( isAdd)
    {
      removeTicket();
    }
    else
    {
      let body = {
        eventTicketId: item.tck_id,
      };
      dispatch(DeleteTicket(body));
    }
    
  }
  const scrollToInput = useCallback((reactNode: any)=> {
    // Add a 'scroll' ref to your ScrollView
    scroll.current.props.scrollToFocusedInput(reactNode)
    //this.scroll.props.scrollToFocusedInput(reactNode)
  })
  return (
    
    <View >
      <View style={styles.sty9}>
        <PlieTextInput
          title={"Title"}
          value={title}
          style={{ width: normalize(90) }}
          onChangeText={(text) => setTitle(text)}
          refs={refTitle}
          onFocus={(event: Event) => {
            // `bind` the function if you're using ES6 classes
            scrollToInput(ReactNative.findNodeHandle(event.target))
          }}
        />
        <PlieTextInput
          title={"Price"}
          value={price}
          style={{ width: normalize(50) }}
          onChangeText={(text) => setPrice(text)}
          refs={refPrice}
          onFocus={(event: Event) => {
            // `bind` the function if you're using ES6 classes
            scrollToInput(ReactNative.findNodeHandle(event.target))
          }}
        />
        <PlieTextInput
          title={"Booking Fee"}
          value={bookingFee}
          style={{ width: normalize(50) }}
          onChangeText={(text) => setBookingFee(text)}
          refs={refBookingFee}
          onFocus={(event: Event) => {
            // `bind` the function if you're using ES6 classes
            scrollToInput(ReactNative.findNodeHandle(event.target))
          }}
        />
      </View>

     

      <PlieTextInput
        style={styles.descriptionStyle}
        placeholder={'Max. 500 characters'}
        multiline={true}
        title={"Description"}
        numberOfLines={50}
        maxLengthCharacter={150}
        intro={true}
        value={descriptionTickets}
        onChangeText={(text) => setDescriptionTickets(text)}
        refs={refDescription}
        onFocus={(event: Event) => {
          // `bind` the function if you're using ES6 classes
          scrollToInput(ReactNative.findNodeHandle(event.target))
        }}
      />
      <View style={{flexDirection:'row',justifyContent:'center'}}>
            <PlieButton
            style={styles.buttonSubmit}
            text={"Save"}
            onPress={() => upateTicket()}
            />
            <PlieButton
            style={styles.buttonRemove}
            text={"Remove"}
            textStyle={styles.texButtonRemove}
            onPress={() => DeleteATicket()}
            />
      </View> 
      <View style={styles.sty13} />
    </View>
  );
};
export default TicketEdit;
