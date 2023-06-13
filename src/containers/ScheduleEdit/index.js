import React, { useEffect, useState, useCallback } from "react";
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
import ScheduleEditSpecific from "../ScheduleEditSpecific";
import { useSelector, useDispatch } from "react-redux";
import { FetchEventDetail } from '../../store/actions/EventAction';
import { Assets } from "../../assets/Icons";

const ScheduleEdit = (props) => {
    const { item, scheduleList,eventId,eventdate,scroll } = props;
    const dispatch = useDispatch();
    console.log("scheduleList", scheduleList);
    const [newSchedules,setNewsSchedules] = useState([]);
    const defaultDate = new Date();
    const day = defaultDate.getDate();
    const month = (defaultDate.getMonth()+1);
    const year = defaultDate.getFullYear();
    const formatDay = day<10? '0'+ day : day;
    const formatmMonth= month<10? '0'+ month : month ;
    const formatStringDate =  year + '-'+ formatmMonth + '-'+ formatDay;
    const defaultTimeString = defaultDate.getHours() + ':' + defaultDate.getMinutes() + ':'+ defaultDate.getSeconds();

    const onRefresh = useCallback(() => {
      dispatch(FetchEventDetail({ elementId: eventdate }, true));
    }, []);

    const addNewSchedule = ()=>{
      console.log("add new schedule");
      console.log("date format date",formatStringDate);
      console.log("time format", defaultTimeString);
      if(newSchedules.length == 0)
      {
        setNewsSchedules([{sch_artist_name:"",sch_short_description:"",sch_date:formatStringDate.toString(),sch_from_time:defaultTimeString,sch_to_time:defaultTimeString}, ...newSchedules])
      }
    }
    const removeSchedule = () =>{
      setNewsSchedules([]);
    }
    return(
        <View >
            <View style={{alignItems:'flex-end'}}>
              <TouchableOpacity style={styles.buttonAdd} onPress={() => addNewSchedule()}>
                <Image style={styles.stylIcon} source={Assets.icon_event} />
              </TouchableOpacity>
            </View>
            <FlatList
              style={styles.sty1}
              data={newSchedules}
              renderItem={({ item,index }) => (
                <ScheduleEditSpecific isAdd={true} eventId={eventId} schedule={item} key={`new-${index}`} onRefresh={onRefresh} removeSchedule={removeSchedule}  scroll={scroll}/>
              )}
              showsVerticalScrollIndicator={false}
              onEndReachedThreshold={0.2}
            />
            <FlatList
              style={styles.sty1}
              data={scheduleList}
              renderItem={({ item, index }) => (
                      <ScheduleEditSpecific eventId={eventId} schedule={item} key={`shedule-${item.sch_id}`} onRefresh={onRefresh} scroll={scroll}/>
                    )}
                    showsVerticalScrollIndicator={false}
                    onEndReachedThreshold={0.2}
            />
            
            
        </View>)
    
}
export default ScheduleEdit;