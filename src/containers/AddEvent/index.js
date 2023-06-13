import React, { useCallback, useEffect, useState } from 'react';
import {
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  useColorScheme,
  Share,
  BackHandler,
  ScrollView,
  RefreshControl,
  Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AuthRootView from "../../components/AuthRootView";

import { Assets } from '../../assets/Icons/index';
import Navigator from '../../common/Navigator';
import styles from './styles';
import { normalize } from '../../common/Normalize';
import Colors from '../../common/Colors';
import General from '../General';
import GeneralEdit from '../GeneralEdit';
import SchedulesEdit from '../SchedulesEdit';
import ArtistsEdit from '../ArtistsEdit';
import TicketsEdit from '../TicketsEdit';
import Others from '../Others';
import AppNavKeys from '../../common/AppNavKeys';
import {
  AddFavouriteAction,
  ClearEventDetail,
  FetchEventDetail,
} from '../../store/actions/EventAction';
import { ADD_FAVOURITE, EVENT_DETAIL,CLEAR_EVENT,CLEAR_EDIT_USER } from '../../common/StoreActionTypes';
import Generalnformation from '../Generalnformation';
import PlieButton from '../../components/PlieButton';
import {AddEventAction, AddEventEdit} from '../../store/actions/EventAction';
import SubmitModal from '../../components/SubmitModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AsyncParamsKeys } from '../../common/Constants';
export default function AddEvent({route}) {
  const editState = route.params != undefined ? route : null;

  const dispatch = useDispatch();
  const colorScheme = useColorScheme();
  const [flag, setFlag] = useState(true);
  const user = useSelector((state) => state.CommonReducer.user);
  const statusAddEvent = useSelector((state) => state.AddEventReducer.statusEvent);
  const [isFav, setIsFav] = useState(true);
  const EventReducer = useSelector((state) => state.EventReducer);
  const CommonReducer = useSelector((state) => state.CommonReducer);
  const detail =
    EventReducer.resData !== null
      ? EventReducer.resData.data
        ? EventReducer.resData.data.event
        : ''
      : '';
  const detailObject =
    EventReducer.resData !== null
      ? EventReducer.resData.data
        ? EventReducer.resData.data.eventObj
        : ''
      : '';
  const listTab = editState?.params?.params?.isEdit?  [{ status: "General" }, { status: "Artists" }, { status: "Tickets" }, { status: "Schedule" }] : [{ status: "General" }];
  const eventId = editState?.params?.params?.event?.event_id;
  const [status, setStatus] = useState(editState?.params?.params?.status? editState?.params?.params?.status : "General" );
  const [refreshing, setRefreshing] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [city,setCity] = useState("City");
  const [country,setCountry] = useState("Country");
  const [danceStyle, setDanceStyle] = useState(["Dance Style"]);
  const [rangeDate, setRangeDate] = useState([]);
  const [evenType, setEvenType] = useState([]);
  const [priceInitial,setPriceInitial] = useState(0);
  const [priceFinal,setPriceFinal] = useState(0); 
  //information name Event
  const eventdate = editState?.params?.params?.eventdate;
  console.log("EVENT DATEEEEEEE", eventdate);
  console.log("event reducer",detail)
  console.log("event object",detailObject);
  const [values, setValues] = useState({
    name: "",
    description:"",
  });
  //Image
  const [profileImage, setProfileImage] = useState();
  const [imageResponse, setImageResponse] = useState();
  const [openModalSubmit,setOpenModaSubmit] = useState(false);
  const [openModalSubmitOtherTabs,setOpenModalSubmitOtherTabs] = useState(false);
  const [openConfirmationSubmit,setOpenConfirmationSubmit]= useState(false);
  const [openBadConfirmationSubmit, setOpenBadConfirmationSubmit ]= useState(false);
  const [openModalConfirmationExitAddEvent, setOpenModalConfirmationExitAddEvent] = useState(false);
  const [verificationEdit,setVerificationEdit] = useState(false);
  let informationSubmitModal = ['We noticed you want to contribute to the dancing community.',
  'By adding events, you make more dancers, like you, aware of other places to dance.',
  'In name of the dancing community, we say: "Gracias"']
  let informationSubmitUpdate = ["Thank you very much for updating the event.",
  "Please be sure that all the information is accurate and the Application's policies has been respected."]
  useEffect(() => {
    if (CommonReducer.api_type) {
      getResponse();
    }
  }, [EventReducer]);

  useEffect(() => {
    
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick
      );
    };
  }, []);
  //event_id
  console.log("paramsSSSS",editState);
  useEffect(() => {
    if(editState?.params?.params?.isEdit)
    {
      setImageResponse(detail.event_profile_img);
      setValues({
        name: detail.event_name,
        description: detail.description,
        profile_image_url: detail.event_profile_img,
      });
      setCity(detailObject.city);
      setCountry(detailObject.country);
      if(detailObject.event_link_dance_style.length > 0){
        const listSelectedDanceStyle = detailObject.event_link_dance_style.map((item)=>{
          let danceStyle = item.dance_style;
          danceStyleUpdate = {...danceStyle,"isSelected": true };
          return danceStyleUpdate;
        })
        setDanceStyle(listSelectedDanceStyle);
      }
      

      
      let dateFrom =  detailObject.event_from_date? new Date(detailObject.event_from_date) : null;
      let dateTo = detailObject.event_to_date? new Date(detailObject.event_to_date): null;
      console.log("DateFrom Edit",typeof(dateFrom));
      console.log("DateTo Edit",typeof(dateTo));
      let dateFromFormat = "";
      let dateToFormat = "";
     
      dateFromFormat = getFormat(dateFrom);
      console.log("entra date to if s");
      dateToFormat = getFormat(dateTo)
      setRangeDate([dateFromFormat, dateToFormat]);
      const listSelectedTypes = detailObject.event_link_event_type.map((item)=>{
        let eventType = item.event_type;
        eventTypeUpdate = {...eventType,"isSelected": true };
        return eventTypeUpdate;
      })
      setEvenType(listSelectedTypes);
      if(detailObject.event_price_from > 0)
      {
        setPriceInitial(detailObject.event_price_from);
      }
      if(detailObject.event_price_to > 0)
      {
        setPriceFinal(detailObject.event_price_to);
      }
    }
    // dispatch(FetchEventDetail({ elementId: eventId }, false));
  }, []);

  function handleBackButtonClick() {
    console.log("leave page");
    clearForm();
    setOpenModalConfirmationExitAddEvent(false);
    Navigator.navigate('Event');
    return true;
  }
  function isverificationEdit(){
      if(verificationEdit)
      {
        setOpenModalConfirmationExitAddEvent(true);
    
      }
      else
      {
        Navigator.navigate('Event');
      }
  }

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: eventUrl,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const onClickFavourite = () => {
    setIsDisabled(true);
    if (user) {
      const body = {
        user_id: user.usr_id,
        event_id: detail.event_date_id,
      };
      setFavouriteIcon();
      dispatch(AddFavouriteAction(body));
    } else {
      Navigator.navigate(AppNavKeys.Login);
    }
  };

  const updateFavouriteIcon = (status) => {
    setIsFav(status);
    // setFlag((e) => !e)
  };

  const setFavouriteIcon = () => {
    setIsFav((e) => !e);
  };
  const clearForm= () =>{
    setValues({
      ...values,
      name: "",
      description:"",
    });
    setCountry("Country");
    setCity("City");
    setImageResponse();
    setEvenType([]);
    setDanceStyle(["Dance Style"]);
    setRangeDate([]);
    setPriceInitial(0);
    setPriceFinal(0);
    
  }

  console.log("State Event", statusAddEvent);
  if(statusAddEvent)
  {
   console.log("se añadio correctamente el evento del USER ");
  }
  useEffect(()=>{
    if(statusAddEvent)
    {
      if(editState?.params?.params?.isEdit)
      {
        resetStateEventSubmit();
      }
      else
      {
        setOpenConfirmationSubmit(true);
      }
    
    }
    else
    {
      if(statusAddEvent != false)
      {
        setOpenBadConfirmationSubmit(true);
      }
      // in this part modal have a problem
    }
  },[statusAddEvent])

  const getFormat = (dateForTransform) => {
    if(dateForTransform === null)
    {
      return "";
    }
    const day = dateForTransform.getDate();
    const month = dateForTransform.getMonth()+1;
    const dayFormat = day < 10? '0'+day : day;
    const monthFormat = month < 10? '0' + month: month;
    const dateFromFormat = dateForTransform.getFullYear() + '-' + monthFormat + '-' + dayFormat;
    return dateFromFormat;
  }
  function getResponse() {
    switch (CommonReducer.api_type) {
      case ADD_FAVOURITE: {
        const data = EventReducer.favData;
        setIsDisabled(false);
        if (data) {
          updateFavouriteIcon(data.data.favorite.ufe_status);
        }
        break;
      }
      case EVENT_DETAIL: {
        const data = EventReducer.resData;
        if (data != null) {
          console.log('datalog===>', data);
          setRefreshing(false);
          if (data.data.length !== 0 && data.data.event.isFavorite == 0) {
            setIsFav(false);
          } else {
            setIsFav(true);
          }
        }
        break;
      }
    }
  }
  const submitConfirmation = () => {
    setOpenModaSubmit(true);
  }
  const submitConfirmationTabs =  () => {
    Navigator.goBack("AddEvent");
    onRefresh();
  }
  const getDateNow = () =>{
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    //Alert.alert(date + '-' + month + '-' + year);
    // You can turn it in to your desired format
    return year + '-' + month + '-' + date;
  }
  const updateEvent = async() =>{
    const dateInitial = rangeDate[0];
    console.log("dateInitial",dateInitial);
    const dateFinal = rangeDate[1];
    console.log("dateFinal",dateFinal);
    let body = new FormData(),
        requestParams = {
          elementID:eventId,
          name: values.name.toLowerCase(),
          event_date_id: eventdate,
          eventId: eventId,
          country: country.cnt_id,
          city: city.cty_id,
          postcode:"",
          venue:"",
        };
      for (let requestKey in requestParams) {
        body.append(requestKey, requestParams[requestKey]);
      }

      if (profileImage) {
        body.append("profile-image", profileImage);
      }
      if(evenType[0]?.evt_name){
        let listid = ""
        evenType.map((item,index)=>{
          console.log("ID event type",item.evt_id)
          if(index == 0 )
          {
            listid = listid + item.evt_id;
          }
          else
          {
            listid = listid + "," +item.evt_id;
          }
        })
        console.log("listIDS",listid);
        body.append("event_types", listid);
      }
      if(danceStyle[0]?.ds_name){
        let listid = "";
        let listName = "";
        danceStyle.map((item,index)=>{
          
          if(index == 0 )
          {
            listid = listid + item.ds_id;
            listName = listName + item.ds_name;
          }
          else
          {
            listid = listid + "," + item.ds_id;
            listName = listName + "," + item.ds_name;
          }
        })
        console.log("listIDS",listid);
        body.append("dance_styles", listid);
        body.append("keywords",listName);
      }
      body.append("description", values.description);
      body.append("from-price", priceInitial);
      body.append("to-price", priceFinal);
      console.log(rangeDate,"range DATA");
      if(rangeDate.length >=1 && rangeDate[0] != "")
      {
       
        body.append("from-date-time", rangeDate[0]);
      }
    
      if(rangeDate.length >= 2 && rangeDate[1] != "")
      {
        console.log("ENTRAAAAAAAA");
        body.append("to-date-time", rangeDate[1]);
      }
      let fcmToken = await AsyncStorage.getItem(AsyncParamsKeys.TokenFCM);
      console.log("FCMTOKEN",fcmToken);
      if(fcmToken)
      {
        body.append("fcm-firebase",fcmToken);
      }
      if(user.usr_id){
        body.append("user_id",user.usr_id);
      }
      if(eventId)
      {
        body.append("keywordId[]",[eventId]);
      }
      console.log("BODYYYY update:",body);
      dispatch(AddEventEdit(body));
      Navigator.goBack("AddEvent");
  }
  const onSubmit = async() =>{
    if(editState?.params?.params?.isEdit)
    {
      console.log("UPDATE EVENTTTTTT");
      updateEvent();
      onRefresh();
    }
    else
    {
      
    
    const dateInitial = rangeDate[0];
    console.log("dateInitial",dateInitial);
    const dateFinal = rangeDate[1];
    console.log("dateFinal",dateFinal);
    let body = new FormData(),
        requestParams = {
          name: values.name.toLowerCase(),
          country: country.cnt_id,
          city: city.cty_id,
         
        };
      for (let requestKey in requestParams) {
        body.append(requestKey, requestParams[requestKey]);
      }

      if (profileImage) {
        body.append("profile-image", profileImage);
      }
      if(evenType[0]?.evt_name){
        let listid = ""
        evenType.map((item,index)=>{
          console.log("ID event type",item.evt_id)
          if(index == 0 )
          {
            listid = listid + item.evt_id;
          }
          else
          {
            listid = listid + "," +item.evt_id;
          }
        })
        console.log("listIDS",listid);
        body.append("event_types", listid);
      }
      if(danceStyle[0]?.ds_name){
        let listid = "";
        let listName = "";
        danceStyle.map((item,index)=>{
          
          if(index == 0 )
          {
            listid = listid + item.ds_id;
            listName = listName + item.ds_name;
          }
          else
          {
            listid = listid + "," + item.ds_id;
            listName = listName + "," + item.ds_name;
          }
        })
        console.log("listIDS",listid);
        body.append("dance_styles", listid);
      }
      body.append("description", values.description);
      body.append("from-price", priceInitial);
      body.append("to-price", priceFinal);
      console.log(rangeDate,"range DATA");
      if(rangeDate.length >=1 && rangeDate[0] != "")
      {
       
        body.append("from-date-time", rangeDate[0]);
      }
      
      if(rangeDate.length >= 2 && rangeDate[1] != "")
      {
        console.log("ENTRAAAAAAAA");
        body.append("to-date-time", rangeDate[1]);
      }
      let fcmToken = await AsyncStorage.getItem(AsyncParamsKeys.TokenFCM);
      console.log("FCMTOKEN",fcmToken);
      if(fcmToken)
      {
        body.append("fcm-firebase",fcmToken);
      }
      if(user.usr_id){
        body.append("user_id",user.usr_id);
      }
      console.log("BODYYYY:",body);
      
      dispatch(AddEventAction(body));
    }
  }
  const resetStateEventSubmit = () => {
    dispatch({ type: CLEAR_EVENT, payload: false });
  }

  const onRefresh = useCallback(() => {
    //setRefreshing(true);
    console.log("EVVVVENT IDDDDD",eventdate);
    dispatch(FetchEventDetail({ elementId: eventdate }, true));
  }, []);
  const doneSubmitSusscefull = ()=>{
    clearFormComplete();
    Navigator.navigate('Event');
  };
  const clearFormComplete = ()=>{
    clearForm();
    resetStateEventSubmit();
    setOpenConfirmationSubmit(false);
  }
  const tryAgain = () =>{
    setOpenBadConfirmationSubmit(false);
    onSubmit();
  }
  const addANewOne = () =>{
    clearForm();
    resetStateEventSubmit();
    setOpenBadConfirmationSubmit(false);
  }
  const readyForSubmit = () =>{
    setOpenModaSubmit(false);
    onSubmit();
  }
  const readyForSubmitOtherTabs = () => {
    setOpenModalSubmitOtherTabs(false);
    Navigator.goBack("AddEvent");
  } 
  //imageResponse && values.name != "" && city !="City" && country != "Country";
  const isAddSubmitEvent = values.name != "" && city !="City" && country != "Country";

  return (
    
    <View style={styles.sty1}>
      <SubmitModal
       visible={openBadConfirmationSubmit}
       information={["Oops, something went wrong","the image size may be greater than 2MB or your connection may be unstable"]}
       title={"Error in Submit"}
       accepted={"try again"}
       cancel={"Add a new one"}
       onSubmit={() => tryAgain()}
       onClose={() => addANewOne()}
       exitFunction={() => setOpenBadConfirmationSubmit(false)}
      />
      <SubmitModal
        visible={openConfirmationSubmit}
        information={["Our team will review the details shared and come back to you within 48 hours"]}
        title={"Event successfully submitted"}
        accepted={"Done"}
        cancel={"Keep adding events"}
        onSubmit={() => doneSubmitSusscefull()}
        onClose={() => clearFormComplete()}
        exitFunction={() => setOpenConfirmationSubmit(false)}
        height={250}
      />
      <SubmitModal
        visible={openModalSubmit}
        information={editState?.params?.params?.isEdit ? informationSubmitUpdate : informationSubmitModal}
        title={editState?.params?.params?.isEdit ? "Update Event" : "Submit Event"}
        height={editState?.params?.params?.isEdit ? 270 : 340}
        accepted={"I am Ready"}
        cancel={"Continue Editing"}
        onClose={() => setOpenModaSubmit(false)}
        onSubmit={() => readyForSubmit()}
        exitFunction={() => setOpenModaSubmit(false)}
      />
      <SubmitModal
        visible={openModalSubmitOtherTabs}
        information={editState?.params?.params?.isEdit ? informationSubmitUpdate : informationSubmitModal}
        title={editState?.params?.params?.isEdit ? "Update Event" : "Submit Event"}
        height={editState?.params?.params?.isEdit ? 270 : 340}
        accepted={"I am Ready"}
        cancel={"Continue Editing"}
        onClose={() => setOpenModalSubmitOtherTabs(false)}
        onSubmit={() => readyForSubmitOtherTabs()}
        exitFunction={() => setOpenModalSubmitOtherTabs(false)}
      />
      <SubmitModal
        visible={openModalConfirmationExitAddEvent}
        information={[editState?.params?.params?.isEdit ? "If you leave the page, the last changes made won't be saved neither published": "If you leave the page, your event won't be submited for approval and won't be published on the App "]}
        title={"Are you sure?"}
        accepted={"Stay and continue editing"}
        cancel={"Leave page"}
        onClose={() => handleBackButtonClick()}
        onSubmit={() => setOpenModalConfirmationExitAddEvent(false)}
        exitFunction={() => setOpenModalConfirmationExitAddEvent(false)}
        height={250}
      />
      <ScrollView
        style={styles.sty1}
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {EventReducer !== undefined && EventReducer?.resData && editState?.params?.params?.isEdit &&(
          <>
            <StatusBar
              backgroundColor={colorScheme == 'light' ? '#fff' : '#000'}
              barStyle={
                colorScheme == 'light' ? 'dark-content' : 'light-content'
              }
            />
            <View style={styles.sty2}>
              <Text style={styles.sty3}>
                Hello{user ? ' ' + user.usr_fname + '!' : '!'}
              </Text>
              <Text style={styles.sty4}>Are you ready to dance?</Text>
            </View>

            <View style={styles.tabBarStyle}>
              {listTab.map((e) => (
                <TouchableOpacity
                  style={[
                    styles.btnTab,
                    status === e.status && styles.selectedTab,
                  ]}
                  onPress={() => setStatus(e.status)}
                >
                  <Text
                    style={[
                      styles.tabText,
                      status === e.status && styles.selectedText,
                    ]}
                  >
                    {e.status}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity onPress={() => isverificationEdit()}>
              <Image style={styles.backIcon} source={Assets.back} />
            </TouchableOpacity>
          
            {console.log('EVENTREDUCER', EventReducer)}
            {
              <>
                {status === 'General'&&(
                  //   <General
                  //     onPressShare={() => onShare()}
                  //     onPressFavourite={() => onClickFavourite()}
                  //     isFavorite={isFav}
                  //     isDisabled={isDisabled}
                  //   />

                  <GeneralEdit
                   values ={values}
                   setValues = {setValues}
                   profileImage ={profileImage}
                   setProfileImage={setProfileImage}
                   imageResponse={imageResponse}
                   setImageResponse={setImageResponse}
                   city={city}
                   setCity={setCity}
                   country={country}
                   setCountry={setCountry}
                   danceStyle={danceStyle}
                   setDanceStyle={setDanceStyle}
                   rangeDate={rangeDate}
                   setRangeDate={setRangeDate}
                   evenType={evenType}
                   setEvenType={setEvenType}
                   priceInitial={priceInitial}
                   setPriceInitial={setPriceInitial}
                   priceFinal={priceFinal}
                   setPriceFinal={setPriceFinal}
                   isEdit={editState?.params?.params?.isEdit}
                  />
                )}
                {status === "Artists" && <ArtistsEdit eventId={eventId} eventdate={eventdate} onPressShare={() => console.log("on Share")} onPressFavourite={() => console.log("on Favourite")} isFavorite={isFav} isDisabled={isDisabled} />}
                {status === "Tickets" && <TicketsEdit eventId={eventId} eventdate={eventdate} onPressShare={() =>  console.log("on Share")} onPressFavourite={() => console.log("on Favourite")} isFavorite={isFav} isDisabled={isDisabled} setVerificationEdit={setVerificationEdit} />}
                {status === "Schedule" && <SchedulesEdit eventId={eventId} eventdate={eventdate} onPressShare={() => console.log("on Share")} onPressFavourite={() => console.log("on Favourite")} isFavorite={isFav} isDisabled={isDisabled} />}
                
              </>
            }
          </>
        )}
        { !editState?.params?.params?.isEdit && (
          <>
            <StatusBar
              backgroundColor={colorScheme == 'light' ? '#fff' : '#000'}
              barStyle={
                colorScheme == 'light' ? 'dark-content' : 'light-content'
              }
            />
            <View style={styles.sty2}>
              <Text style={styles.sty3}>
                Hello{user ? ' ' + user.usr_fname + '!' : '!'}
              </Text>
              <Text style={styles.sty4}>Are you ready to dance</Text>
            </View>

            <View style={styles.tabBarStyle}>
              {listTab.map((e) => (
                <TouchableOpacity
                  style={[
                    styles.btnTab,
                    status === e.status && styles.selectedTab,
                  ]}
                  onPress={() => setStatus(e.status)}
                >
                  <Text
                    style={[
                      styles.tabText,
                      status === e.status && styles.selectedText,
                    ]}
                  >
                    {e.status}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity onPress={() => setOpenModalConfirmationExitAddEvent(true)}>
              <Image style={styles.backIcon} source={Assets.back} />
            </TouchableOpacity>
          
            {console.log('EVENTREDUCER', EventReducer)}
            {
              <>
                {status === 'General'&&(
                  //   <General
                  //     onPressShare={() => onShare()}
                  //     onPressFavourite={() => onClickFavourite()}
                  //     isFavorite={isFav}
                  //     isDisabled={isDisabled}
                  //   />

                  <GeneralEdit
                   values ={values}
                   setValues = {setValues}
                   profileImage ={profileImage}
                   setProfileImage={setProfileImage}
                   imageResponse={imageResponse}
                   setImageResponse={setImageResponse}
                   city={city}
                   setCity={setCity}
                   country={country}
                   setCountry={setCountry}
                   danceStyle={danceStyle}
                   setDanceStyle={setDanceStyle}
                   rangeDate={rangeDate}
                   setRangeDate={setRangeDate}
                   evenType={evenType}
                   setEvenType={setEvenType}
                   priceInitial={priceInitial}
                   setPriceInitial={setPriceInitial}
                   priceFinal={priceFinal}
                   setPriceFinal={setPriceFinal}
                  />
                )}
                {status === "Artists" && <ArtistsEdit eventId={eventId} eventdate={eventdate} onPressShare={() => console.log("on Share")} onPressFavourite={() => console.log("on Favourite")} isFavorite={isFav} isDisabled={isDisabled} />}
                {status === "Tickets" && <TicketsEdit eventId={eventId} eventdate={eventdate} onPressShare={() =>  console.log("on Share")} onPressFavourite={() => console.log("on Favourite")} isFavorite={isFav} isDisabled={isDisabled} />}
                {status === "Schedule" && <SchedulesEdit eventId={eventId} eventdate={eventdate} onPressShare={() => console.log("on Share")} onPressFavourite={() => console.log("on Favourite")} isFavorite={isFav} isDisabled={isDisabled} />}
                
              </>
            }
          </>
        )}
      </ScrollView>
      {
        isAddSubmitEvent && status === 'General' &&(
        
        
            <PlieButton
              style={styles.buttonSubmit}
              text={"Submit"}
                
              onPress={() => submitConfirmation()}
            />

      
        )
      }
      {
        status == "Artists" || status == "Tickets" || status == "Schedule"? (
          <PlieButton
              style={styles.buttonSubmitTabs}
              text={"Submit"}
                
              onPress={() => submitConfirmationTabs()}
            />
        ) : <></>
      }
      
      
    </View>
  );
}
