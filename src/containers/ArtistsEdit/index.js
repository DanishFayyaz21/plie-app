import React, { useState, useCallback, useRef } from "react";
import {
  FlatList,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  
} from "react-native";
import { useSelector , useDispatch} from "react-redux";
import { Assets } from "../../assets/Icons";
import Navigator from "../../common/Navigator";
import styles from "./styles";
import { normalize } from "../../common/Normalize";
import PlieTextInput from "../../components/PlieTextInput";
import PlieButton from "../../components/PlieButton";
import ArtistEdit from "../ArtistEdit";
import {FetchEventDetail} from '../../store/actions/EventAction';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
export default function ArtistsEdit({
  onPressShare,
  onPressFavourite,
  isFavorite,
  isDisabled,
  eventId,
  eventdate,
}) {
  console.log("EVENT ID",eventId);
  const user = useSelector((state) => state.CommonReducer.user);
  const EventReducer = useSelector(
    (state) => state?.EventReducer?.resData?.data?.event
  );
  const [newArtists,setNewArtists] = useState([]);
  const dispatch = useDispatch();
  const scroll = useRef();
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
    console.log("call onRefresh");
    console.log("eventdate",eventdate);
    dispatch(FetchEventDetail({ elementId: eventdate }, true));
  }, []);

  const AddNewArtist = () =>{
    if(newArtists.length == 0)
    {
      setNewArtists([{art_city:"city",art_country:"country",art_name:"",artist_profile_img:"",art_description:""}, ...newArtists]);
    }
   
  }
  const removeNew = () => {
    setNewArtists([]);
  }

  return (
    <>
    { EventReducer !== undefined && (
      <KeyboardAwareScrollView
      innerRef={ ref =>{
         scroll.current = ref 
       }
     
      }
      extraScrollHeight={normalize(200)}
     >
    <View style={styles.sty1}>
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
              <Text
                style={styles.sty5}
                // numberOfLines={1}
                adjustsFontSizeToFit
              >
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
                {/* {EventReducer.readable_from_date.split("-")[0] +
                  "." +
                  EventReducer.readable_from_date.split("-")[1] +
                  "." +
                  EventReducer.readable_to_date.split("-")[2].slice(-2)}
                {" - "}
                {EventReducer.readable_to_date.split("-")[0] +
                  "." +
                  EventReducer.readable_to_date.split("-")[1] +
                  "." +
                  EventReducer.readable_to_date.split("-")[2].slice(-2)} */}
              </Text>
            </View>
          </View>
        </View>
        <View style={{alignItems:'flex-end'}}>
          <TouchableOpacity style={styles.buttonAdd} onPress={() => AddNewArtist()}>
            <Image style={styles.stylIcon} source={Assets.icon_event} />
          </TouchableOpacity>
        </View>
          <FlatList
              style={styles.sty1}
              data={newArtists}
              renderItem={({ item }) => {
                let artistLocation = "";
                if (item.city_name) {
                  artistLocation += item.city_name;
                }
                if (item.country_name) {
                  if (artistLocation) {
                    artistLocation += ", ";
                  }
                  if (item.country_name) {
                    artistLocation += item.country_name;
                  }
                }
                return (
                  <ArtistEdit isAdd={true} removeNew={removeNew} onRefresh={()=> onRefresh()} item={item} idEvent={eventId} key={item.art_id} artistLocation={artistLocation} scroll={scroll}/>
                );
              }}
              showsVerticalScrollIndicator={false}
              onEndReachedThreshold={0.2}
          />
          <FlatList
            style={styles.sty1}
            data={EventReducer.artists}
            renderItem={({ item }) => {
              let artistLocation = "";
              if (item.city_name) {
                artistLocation += item.city_name;
              }
              if (item.country_name) {
                if (artistLocation) {
                  artistLocation += ", ";
                }
                if (item.country_name) {
                  artistLocation += item.country_name;
                }
              }
              return (
                <ArtistEdit onRefresh={()=> onRefresh()} item={item} idEvent={eventId} key={item.art_id} artistLocation={artistLocation} scroll={scroll}/>
              );
            }}
            showsVerticalScrollIndicator={false}
            onEndReachedThreshold={0.2}
          />
        
      </View>
    </View>
    </KeyboardAwareScrollView>)
    }
    </>
  );
}
