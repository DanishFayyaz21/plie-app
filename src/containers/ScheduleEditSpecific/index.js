import React, { useEffect, useState, useCallback,useRef } from "react";
import {
  FlatList,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import moment from "moment";
import styles from "./styles";
import { normalize } from "../../common/Normalize";
import Colors from "../../common/Colors";
import PlieTextInput from "../../components/PlieTextInput";
import PlieButton from "../../components/PlieButton";
import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimeModal from "../../components/DateTimeModal";
import {AddSchedule, DeleteSchedule} from '../../store/actions/EventAction';
import { useDispatch, useSelector } from 'react-redux';
import { showMessage } from "react-native-flash-message";
import {  Flash } from "../../common/Constants";
import { CLEAR_SCHEDULE,CLEAR_DELETE_SCHEDULE } from "../../common/StoreActionTypes";

const ScheduleEditSpecific = (props) =>{
    
    var gsDayNames = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
    function getDay(date) {
        if(isFirst)
        {
            const d = new Date(date);
            d.setDate(d.getDate() + 1);
            return gsDayNames[d.getDay()];
        }
        const d = new Date(date);
        return gsDayNames[d.getDay()];
    }
    const {schedule,eventId,onRefresh,removeSchedule,isAdd,scroll} = props;
    console.log("eventIDDD", eventId);
    const [nameArtist, setNameArtist] = useState(schedule.sch_artist_name? schedule.sch_artist_name : "");
    const [description, setDescription] = useState(schedule.sch_short_description? schedule.sch_short_description : "");
    const [dateSchedule,setDateSchedule] = useState(schedule.sch_date ? new Date(schedule.sch_date) :new Date());
    const [isVisible,setIsVisible] = useState(false);
    const [mode,setMode] = useState("date");
    const [timeFrom,setTimeFrom] = useState(schedule.sch_from_time ? new Date(`October 13, 2014 ${schedule.sch_from_time}`) : new Date());
    const [timeTo,setTimeTo] = useState(schedule.sch_to_time ? new Date(`October 13, 2014 ${schedule.sch_to_time}`) : new Date());
    const [valueModal,setValueModal] = useState(null);
    const [typeTime,setTypeTime] = useState("");
    const [isFirst,setIsFirst] = useState(true);
    const dispatch = useDispatch();
    const EditScheduleStatusEdit = useSelector((state) => state.EditScheduleReducer.statusEdit);
    const EditScheduleStatusDelete = useSelector((state) => state.EditScheduleReducer.statusDelete);
    const refName = useRef();
    const refDescription = useRef();
    const getTime = (dateTime)=>{
        const hourFormat = `${dateTime.getHours()}:${dateTime.getMinutes()}:${dateTime.getSeconds()} `;
        return hourFormat;
    }
    const editDate = ( ) =>{
        if(isFirst)
        {
            console.log("ENTRAAAAAA");
            const tomorrow = new Date(dateSchedule);
            tomorrow.setDate(tomorrow.getDate() + 1);
            setValueModal(tomorrow);
            
        }
        else
        {
            console.log("NO ENTRAAAAAA");
            setValueModal(dateSchedule);
        }
        //const dateScheduleMoreDay = new Date(dateSchedule.getDate() + 1);
        setIsVisible(true);
        
        setMode("date");
    }
    const editTime = (time) =>{
        if(time == "TimeTo")
        {
            setTypeTime(time)
            setValueModal(timeTo);
        }
        if(time == "TimeFrom")
        {
            setTypeTime(time)
            setValueModal(timeFrom);
        }
        setIsVisible(true);
        setMode("time");
    }
    useEffect(()=>{
        if(EditScheduleStatusEdit)
        {
            showMessage({ type: Flash.Success, message: "add or update schedule" });
            onRefresh();
            dispatch({ type: CLEAR_SCHEDULE, payload: false });
        }
    },[EditScheduleStatusEdit])

    useEffect(()=>{
        if(EditScheduleStatusDelete)
        {
            showMessage({ type: Flash.Success, message: "delete schedule " });
            onRefresh();
            dispatch({ type: CLEAR_DELETE_SCHEDULE, payload: false });
        }
    },[EditScheduleStatusDelete])
    const updateSchedule = () =>{
        if(isAdd)
        {
            AddScheduleNew();
            
        }
        else
        {
            const scheduleString = dateSchedule.getFullYear() + '-'+(dateSchedule.getMonth()+1)+ '-'+ dateSchedule.getDate();
            const timeToString = timeTo.getHours() + ':' + timeTo.getMinutes() + ':'+timeTo.getSeconds();
            const timeFromString = timeFrom.getHours() + ':' + timeFrom.getMinutes() + ':'+timeFrom.getSeconds();
            let errorMessage = "";
            if(verifyInput(nameArtist) || verifyInput(description))
            {
              if (verifyInput(nameArtist))
              {
                console.log("entra titles");
                errorMessage= errorMessage +"Please enter the title,";
              }
              if(verifyInput(description))
              {
                console.log("entra descriptions");
                errorMessage = errorMessage + "Please enter the small description.";
              }
              showMessage({ type: Flash.Error, message: errorMessage});
            }
            else
            {
                let body={
                    sch_id:schedule.sch_id,
                    sch_date: scheduleString,
                    sch_from_time: timeFromString,
                    sch_to_time: timeToString,
                    sch_short_description:description,
                    sch_artist_name: nameArtist,
                    eventScheduleId:schedule.sch_id,
                    eventId: eventId,
                    sch_description: description
                }
                dispatch(AddSchedule(body));
            }
     
        }
      
    }
    const verifyInput = (input) =>{
        return (!input || input  === "");
    } 
    const AddScheduleNew = () =>{
        const scheduleString = dateSchedule.getFullYear() + '-'+(dateSchedule.getMonth()+1)+ '-'+ dateSchedule.getDate();
        const timeToString = timeTo.getHours() + ':' + timeTo.getMinutes() + ':'+timeTo.getSeconds();
        const timeFromString = timeFrom.getHours() + ':' + timeFrom.getMinutes() + ':'+timeFrom.getSeconds();
        let errorMessage = "";
        if(verifyInput(nameArtist) || verifyInput(description))
        {
          if (verifyInput(nameArtist))
          {
            console.log("entra titles");
            errorMessage= errorMessage +"Please enter the title,";
          }
          if(verifyInput(description))
          {
            console.log("entra descriptions");
            errorMessage = errorMessage + "Please enter the small description.";
          }
          showMessage({ type: Flash.Error, message: errorMessage});
        }
        else
        {
            let body={
                eventId: eventId,
                sch_date: scheduleString,
                sch_from_time: timeFromString,
                sch_to_time: timeToString,
                sch_short_description:description,
                sch_artist_name: nameArtist,
                sch_description: description
            }
            dispatch(AddSchedule(body));
            removeSchedule();
        }
      
    } 
    const deleteSchedule = () =>{
        if(isAdd)
        {
            removeSchedule();
        }
        else{

      
        let body={
            eventScheduleId:schedule.sch_id
        }
        dispatch(DeleteSchedule(body));
        }
    }
    const scrollToInput = useCallback((reactNode: any)=> {
        // Add a 'scroll' ref to your ScrollView
        scroll.current.props.scrollToFocusedInput(reactNode)
        //this.scroll.props.scrollToFocusedInput(reactNode)
    })
    return (
        
        <View style={{flexDirection:'column'}} >
            <DateTimeModal
                visible={isVisible}
                title={"Add Date or Time"}
                accepted={"ok"}
                mode={mode}
                cancel={"cancel"}
                onSubmit={() => console.log("submit")}
                onClose={() => setIsVisible(false)}
                dateOrTime = {valueModal}
                typeTime= {typeTime}
                setTimeTo = {setTimeTo}
                setTimeFrom = {setTimeFrom}
                setDateTime = {setDateSchedule}
                setIsFirst={setIsFirst}
                
            />
            <View style={{flexDirection:'row'}}>
                
                
                <Pressable
                    onPress={()=> editDate()}
                    style={{
                        alignSelf: "flex-end",
                        alignItems:'center',
                        marginLeft: normalize(10),
                        marginTop: normalize(48),
                        backgroundColor:Colors.color1,
                        borderRadius:normalize(50),
                        width:normalize(100)
                        
                        
                    }}
                >
                    <Text style={styles.sty10}>
                        {isFirst ? `${getDay(schedule.sch_date)} ${schedule.sch_date.split("-")[2]} th` : `${getDay(dateSchedule)} ${dateSchedule.getDate()}`}
                        {/* {!isFirst && getDay(dateSchedule)} {dateSchedule.getDate()} */}
                    </Text>
                   
                </Pressable>
                
                
            </View>
            <View style={{flexDirection:'row'}}>
                <PlieTextInput
                    title={"Artist name"}
                    value={nameArtist}
                    style={{
                        alignSelf: "flex-start",
                        alignItems:'center',
                        marginStart: normalize(10),
                        marginTop: normalize(2),
                        width:normalize(105) }}
                        onChangeText={(text) => setNameArtist(text)}
                    refs={refName}
                    onFocus={(event: Event) => {
                        // `bind` the function if you're using ES6 classes
                        scrollToInput(ReactNative.findNodeHandle(event.target))
                    }}
                />
                <Pressable 
                    onPress={()=> editTime("TimeFrom")}
                    style={{
                            alignSelf: "flex-start",
                            alignItems:'center',
                            marginLeft: normalize(10),
                            marginTop: normalize(28),
                            backgroundColor:Colors.color1,
                            borderRadius:normalize(50),
                            width:normalize(90)
                            
                            
                        }} >
                    <Text>Time From</Text>
                    <Text style={styles.sty10}>
                            {schedule.sch_from_time ? `${getTime(timeFrom)}`: "HH-MM-SS"}
                    </Text>
                </Pressable>
                <Pressable
                    onPress={()=> editTime("TimeTo")}
                    style={{
                        alignSelf: "flex-start",
                        alignItems:'center',
                        marginLeft: normalize(10),
                        marginTop: normalize(28),
                        backgroundColor:Colors.color1,
                        borderRadius:normalize(50),
                        width:normalize(90)
                        
                        
                    }}
                >
                    <Text>Time to</Text>
                    <Text style={styles.sty10}>
                        {schedule.sch_to_time ? `${getTime(timeTo)}` : "HH-MM-SS"}
                    </Text>
                </Pressable>
                
                    {/* <Text>Artist Name</Text> */}
                   
                    {/* <Text style={styles.sty10}>
                            {schedule.sch_artist_name? schedule.sch_artist_name : "" }
                    </Text> */}
                
            </View>
            <PlieTextInput
                style={styles.descriptionStyle}
                placeholder={'Max. 191 characters'}
                multiline={true}
                title={"Description"}
                numberOfLines={30}
                maxLengthCharacter={191}
                intro={true}
                value={description }
                onChangeText={(text) => setDescription(text)}
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
                onPress={() => updateSchedule()}
                />
                <PlieButton
                style={styles.buttonRemove}
                textStyle={styles.texButtonRemove}
                text={"Remove"}
                onPress={() => deleteSchedule()}
                />
            </View>
            <View style={styles.sty12} />
        </View>
    )
}
export default ScheduleEditSpecific;