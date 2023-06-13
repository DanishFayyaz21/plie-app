import React, { useEffect, useState, useRef,useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  Keyboard,
  Alert,
  PermissionsAndroid,
  ScrollView,
  Pressable,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Assets } from "../../assets/Icons";
import Navigator from "../../common/Navigator";
import { normalize } from "../../common/Normalize";
import AuthRootView from "../../components/AuthRootView";
import styles from "./styles";
import stylesProfile from "../UpdateProfile/styles";
import styleGeneral from "../General/styles";
import PlieTextInput from "../../components/PlieTextInput";
import PlieButton from "../../components/PlieButton";
import { validateEmail } from "../../common/Validation";
import { AsyncParamsKeys, Constants } from "../../common/Constants";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_PROFILE,
  TOKEN,
  UPDATE_PROFILE,
  USER,
} from "../../common/StoreActionTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "react-native-image-picker";
import stylesGeneral from "../General/styles";
import SelectLocationModal from "../../components/SelectLocationModal";
import SelectorDanceStyle from "../../components/SelectorDanceStyle";
import SelectDateModal from "../../components/SelectDateModal";
import SelectTypeModal from "../../components/SelectTypeModal";
import {
  FetchCityListAction,
  FetchCountryListAction,
  FetchDanceStyleListAction,
  FetchEventTypeListAction,
} from "../../store/actions/FilterAction";
import PickerModalSingle from "../../components/PickerModalSingle";
import { CITY_LIST, COUNTRY_LIST, DANCE_STYLE_LIST,EVENT_TYPE_LIST } from "../../common/StoreActionTypes";
import SelectPriceModal from "../../components/SelectPriceModal";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";


export default function GeneralEdit({
  onPressShare,
  onPressFavourite,
  isFavorite,
  isDisabled,
  values,
  setValues,
  profileImage,
  setProfileImage,
  imageResponse,
  setImageResponse,
  city,
  setCity,
  country,
  setCountry,
  danceStyle,
  setDanceStyle,
  rangeDate,
  setRangeDate,
  evenType,
  setEvenType,
  priceInitial,
  setPriceInitial,
  priceFinal,
  setPriceFinal,
  isEdit
}) {
  const dispatch = useDispatch();
  const EventReducer = {"data": {"event": {"artists": [Array], "city": "Ludwigshafen", "country": "Germany", "dance_types": [Array],"description": "♦️ 20:00 UHR: DOOR OPEN", "event_from_date": "2022-09-24 20:00:00", "event_id": 252, "event_images": [Array], "event_link_dance_style": [Array], "event_link_event_type": [Array], "event_name": "SalsaBachata Noche", "event_parent_id": 0, "event_postcode": "", "event_price_from": 10, "event_price_to": 15, "event_profile_img": "https://plie.dev/uploads/event/1097168746-moxy.jpeg", "event_profile_pic": "1097168746-moxy.jpeg", "event_recurring_expiry": null, "event_recurring_type": 0, "event_to_date": null, "event_url": "https://plie.dev/events/252", "event_venue": "Moxy, Im Zollhof 5, 67061 Ludwigshafen am Rhein", "keywords": [Array], "multi_image": [Array], "schedules": [Array], "tickets": [Array], "updated_at": "2022-09-24T12:10:23.000000Z"}}, "message": "", "success": true,"keywords":["+"]}
  console.log("Event reducera", EventReducer);
  const EventObj ={"city": {"created_at": "2022-09-24T12:09:03.000000Z", "cty_country": "3", "cty_id": 36, "cty_name": "Ludwigshafen", "deleted_at": null, "updated_at": "2022-09-24T12:09:03.000000Z"}, "country": {"cnt_id": 3, "cnt_name": "Germany", "created_at": "2022-05-30T00:00:00.000000Z", "deleted_at": null, "updated_at": "2022-05-30T00:00:00.000000Z"}, "created_at": "2022-09-24T12:08:41.000000Z", "deleted_at": null, "event_city_id": 36, "event_country_id": 3, "event_description": "♦️ 20:00 UHR: DOOR OPEN", "event_from_date": "2022-09-24 20:00:00", "event_id": 252, "event_images": [], "event_link_dance_style": [{"created_at": "2022-09-24T12:13:34.000000Z", "dance_style": [Object], "elds_dance_style_id": 3, "elds_event_id": 252, "elds_id": 601, "updated_at": "2022-09-24T12:13:34.000000Z"}, {"created_at": "2022-09-24T12:13:34.000000Z", "dance_style": [Object], "elds_dance_style_id": 2, "elds_event_id": 252, "elds_id": 602, "updated_at": "2022-09-24T12:13:34.000000Z"}, {"created_at": "2022-09-24T12:13:34.000000Z", "dance_style": [Object], "elds_dance_style_id": 1, "elds_event_id": 252, "elds_id": 603, "updated_at": "2022-09-24T12:13:34.000000Z"}], "event_link_event_type": [{"created_at": "2022-09-24T12:13:34.000000Z", "elet_event_id": 252, "elet_event_type_id": 4, "elet_id": 447, "event_type": [Object], "updated_at": "2022-09-24T12:13:34.000000Z"}, {"created_at": "2022-09-24T12:13:34.000000Z", "elet_event_id": 252, "elet_event_type_id": 5, "elet_id": 448, "event_type": [Object], "updated_at": "2022-09-24T12:13:34.000000Z"}], "event_name": "SalsaBachata Noche", "event_parent_id": 0, "event_postcode": "", "event_price_from": 10, "event_price_to": 15, "event_profile_img": "https://plie.dev/uploads/event/1097168746-moxy.jpeg", "event_profile_pic": "1097168746-moxy.jpeg", "event_recurring_expiry": null, "event_recurring_type": 0, "event_to_date": null, "event_url": "https://plie.dev/events/252", "event_venue": "Moxy, Im Zollhof 5, 67061 Ludwigshafen am Rhein", "keywords": [], "multi_image": [], "schedules": [], "tickets": [], "updated_at": "2022-09-24T12:10:23.000000Z"}
  const [seeMoreTag, setSeeMoreTag] = useState(true);
  const [degree, setDegree] = useState(180);
  //Name selected
  // const [values, setValues] = useState({
  //   name: "",
  //   lastName: "",
  //   email: "",
  //   username: "",
  // });

  const [isVisible, setVisible] = useState(false);
  const [selectedCountryList, setSelectedCountryList] = useState([]);
  const [selectedCityList, setSelectedCityList] = useState([]);
  const [pickerType, setPickerType] = useState(0);
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const [cityList, setCityList] = useState([]);

  const [isVisibleDanceStyleModal, setVisibleDanceStyleModal] = useState(false);
  // dance Style selected
  //const [danceStyle, setDanceStyle] = useState(["+"]);
  const [danceStyleList, setDanceStyleList] = useState([]);

  const [isVisibleDateModal, setIsVisibleDateModal] = useState(false);
  // date range selected
  //const [rangeDate, setRangeDate] = useState([]);

  const [isVisibleDateTypeModal,setVisibleDateTypeModal] = useState(false);
  // event types selected
  // const [evenType, setEvenType] = useState([]);
  const [eventTypeList, setEventTypeList] = useState([]);

  const [isVisiblePriceModal,setIsVisiblePriceModal]= useState(false);
  //price selected
  // const [priceInitial,setPriceInitial] = useState(0);
  // const [priceFinal,setPriceFinal] = useState(0); 

  //profileImage Imagen
  //const [profileImage, setProfileImage] = useState();

  //const [imageResponse, setImageResponse] = useState();
  let danceStylesSelectedEdit ={};
  const positionsDanceStyles = []; 
  const maxSizeFormCharacter = 500;
  const refName = useRef();
  const refDescription = useRef();
  const scroll= useRef();
  const [fnErr, setFNErr] = useState(false);
  const [formErr,setFormError] = useState(false);
  // const [city,setCity] = useState("City");
  // const [country,setCountry] = useState("Country");
  const { CommonReducer,FilterReducer} = useSelector(
    (state) => ({
     
      CommonReducer: state.CommonReducer,
      FilterReducer: state.FilterReducer,
    })
  );
  const imagePickerOptions = {
    saveToPhotos: false,
    mediaType: "photo",
    includeBase64: false,
    quality: 0.1
  };
  const dayFrom = rangeDate[0]?.split("-")[2];
  const monthFrom = rangeDate[0]?.split("-")[1];
  const yearFrom =  rangeDate[0]?.split("-")[0].slice(-2);
  const dayTo = rangeDate[1]?.split("-")[2];
  const monthTo = rangeDate[1]?.split("-")[1];
  const yearTo =  rangeDate[1]?.split("-")[0].slice(-2);
  console.log("CITY",city);
  console.log("COUNTRY",country);
  console.log("DANCE STYLE", danceStyle);
  console.log("RANGE DATA",rangeDate);
  console.log("Event Typee", evenType);
  let location = `${ city.cty_name? city.cty_name :city }, ${country.cnt_name? country.cnt_name : country}`;
  useEffect(() => {
    if(CommonReducer.api_type)
    {
      console.log("FilterReducer GENERAL EDIT", CommonReducer.api_type);
      getResponse();
    }

  },[ FilterReducer]);
  useEffect(() => {
    if (imageResponse) {
      console.log("imageResponse", imageResponse);
      if (imageResponse.assets) {
        let data = imageResponse.assets[0];
        let fileName = Date.now().toString() + ".jpeg";
        let file = {
          uri: data.uri,
          type: data.type,
          name: fileName,
        };
        setProfileImage(file);
        let updatedValues = { ...values, profile_image_url: "" };
        setValues(updatedValues);
      }
    }
  }, [imageResponse]);
  useEffect(()=>{
    if(values)
    {
      console.log("values", values);
    }
  },[values])

  useEffect(() => {
    if (!isVisible) {
      if (pickerType > 0) setPickerVisible(true);
    }
  }, [pickerType]);

  useEffect(() => {
    if (isVisibleDanceStyleModal) {
      console.log("SE LLAMA A GETFILTERDATA");
      getFilterData();
    }
  }, [isVisibleDanceStyleModal]);

  useEffect(() => {
    if (isVisibleDateTypeModal) {
      getFilterDataEnvenType();
    }
  },[isVisibleDateTypeModal]);

  let priceString = "";
  const getFilterData = () => {
    if (danceStyleList.length == 0) dispatch(FetchDanceStyleListAction({}));
  };
  const getFilterDataEnvenType = ()=>{
    if (eventTypeList.length == 0) dispatch(FetchEventTypeListAction({}));
  }

  function getResponse() {
    switch (CommonReducer.api_type) {
      
      case COUNTRY_LIST: {
        if (FilterReducer.resData != null) {
          let responseData = FilterReducer.resData;
          let success = responseData.success;
          if (success) {
            let countryIds = [],
              newSelectedCountryList = [];
            selectedCountryList.map((item) => {
              if (item.isSelected) {
                countryIds.push(item.cnt_id);
              }
            });
            let list = responseData.data.country.map((item) => {
              if (countryIds.indexOf(item.cnt_id) != -1) {
                item["isSelected"] = true;
                newSelectedCountryList.push(item);
              } else {
                item["isSelected"] = false;
              }
              return item;
            });

            list.sort(function (a, b) {
              return a.cnt_name.localeCompare(b.cnt_name);
            });
            setSelectedCountryList(newSelectedCountryList);
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
            let cityIds = [],
              newSelectedCityList = [];

            cityIds = selectedCityList
              .filter((tempItem) => tempItem.isSelected)
              .map((tempItem) => tempItem.cty_id);
            let list = responseData.data.city.map((item) => {
              item["isSelected"] = false;
              if (cityIds.indexOf(item.cty_id) != -1) {
                item["isSelected"] = true;
                newSelectedCityList.push(item);
              }
              return item;
            });
            list.sort(function (a, b) {
              return a.cty_name.localeCompare(b.cty_name);
            });
            setSelectedCityList(newSelectedCityList);
            setCityList(list);
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
         
          danceStyle.forEach((element,index) => {
        
            danceStylesSelectedEdit[element.ds_name] = index;
          }); 
          
          list = responseData.data.danceStyle.map((item,index) => {
               
               const name = item.ds_name;
               if(name in danceStylesSelectedEdit )
               {
                positionsDanceStyles.push(index);
                item["isSelected"] = true;
               }
               return item;
          });

          setDanceStyleList(list);
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
            if(isEdit)
            {
              setEventTypeList(getTypeListEdit(list));
            }
            else
            {
              setEventTypeList(list);
            }
          }
        }
        break;
      }
    }
  }
  const onPickerItemSelected = (list) => {
    if (pickerType == 1) {
      let countryIds = [];
      list.map((item) => {
        if (item.isSelected) {
          countryIds.push(item.cnt_id);
        }
      });

      if (selectedCityList.length !== 0) {
        setSelectedCountryList(list);
        // if (selectedCountryList.length !== 0 && selectedCountryList[0].cnt_id !== list[0].cnt_id) {
        // setSelectedCityList([])
        // dispatch(FetchCityListAction({ countryID: list[0].cnt_id }))

        dispatch(FetchCityListAction({ countryIds }));

        // }
      } else {
        setSelectedCountryList(list);
        // dispatch(FetchCityListAction({ countryID: list[0].cnt_id }))

        // dispatch(FetchCityListAction({ countryIds }))
      }
    } else {
      setSelectedCityList(list);
    }
    setPickerVisible(false);
    setVisible(true);
  };
  const closePickerModel = () => {
    setVisible(true);
    setPickerVisible(false);
    setPickerType(0);
  };
  const openPickerModel = (type) => {
    if (type == 1) {
      dispatch(FetchCountryListAction({}));
    } else {
      let countryIds = [];
      selectedCountryList.map((item) => {
        if (item.isSelected) {
          countryIds.push(item.cnt_id);
        }
      });
      dispatch(FetchCityListAction({ countryIds }));
    }
    setVisible(false);
    setPickerType(type);
  };
  const EditLocation = () => {
    setVisible(true);
  }
  const onRemoveError = (name) => {
    if (name == "name") {
      setFNErr(false);
    }
  };
  const onChangeNameValue = (name, value) => {
    const re = /^[A-Za-z ]+$/;
    if (value === "" || re.test(value)) {
      setValues({ ...values, [name]: value });
      onRemoveError(name);
    }
  };
  const onChangeDescriptionValue = (name, value) => {
    setValues({ ...values, [name]: value });
  }
  const doSelectImage = async () => {
    Alert.alert(
      "Plie",
      "Pick Image from",
      [
        {
          text: "Camera",
          onPress: async () => {
            let permissionAcquired =
              Platform.OS == "ios" ? true : await requestCameraPermission();
            console.log("permissionAcquired", permissionAcquired);
            if (permissionAcquired) {
              ImagePicker.launchCamera(imagePickerOptions, setImageResponse);
            } else {
              Alert.alert(
                "Sorry",
                "Sorry but you have declined camera permission, so you can not perform this action!"
              );
            }
          },
        },
        {
          text: "Gallery",
          onPress: () =>
            ImagePicker.launchImageLibrary(
              imagePickerOptions,
              setImageResponse
            ),
        },
      ],
      { cancelable: true }
    );
  };

  const requestCameraPermission = async () => {
    let returnValue = false;
    try {
      if (await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA)) {
        returnValue = true;
      } else {
        const granted = await PermissionsAndroid.requestMultiple(
          [PermissionsAndroid.PERMISSIONS.CAMERA],
          {
            title: "Cool Photo App Camera Permission",
            message:
              "Cool Photo App needs access to your camera " +
              "so you can take awesome pictures.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("You can use the camera");
          returnValue = true;
        } else {
          console.log("Camera permission denied");
        }
      }
    } catch (err) {
      console.warn(err);
    }
  
    return returnValue;
  }; 
  const onFocusDescription = ()=>{
    console.log("focus in descriptionss");
    //this.refs.textInput.focus()
    refDescription.current.focus()
  }
   const scrollToInput = useCallback((reactNode: any)=> {
    // Add a 'scroll' ref to your ScrollView
    scroll.current.props.scrollToFocusedInput(reactNode)
    //this.scroll.props.scrollToFocusedInput(reactNode)
  })
  const onPressInputType = () =>{
    if(isEdit)
    {
      setVisibleDateTypeModal(true);
    }
  }
  const onPressInputPrice = () =>{
    if(isEdit)
    {
      setIsVisiblePriceModal(true);
    } 
  }
  const onPressInputDate = () =>{
    if(isEdit)
    {
      setIsVisibleDateModal(true);
    } 
  }
  const getDateFormat = (year, month, day) =>{
    console.log("getFormat", year,month,day);
    if(year && month && day)
    {
      const format = year+ "-"+ month +"-"+ day;
      return format;
    }
    else 
    {
      return null;
    }
  }
  const getTypeListEdit = (eventTypeList) =>{
    let idEventsSelected = {}; 
    if(eventTypeList.length > 0 && evenType.length>0)
    {
      evenType.map((type)=>{
        idEventsSelected[type.evt_id]= type.evt_name;
        
      })
      let typesSelected = eventTypeList.map((typeEvent)=>{
        if(typeEvent.evt_id in idEventsSelected)
        {
          typeEvent["isSelected"] = true;
          
        }
        return typeEvent;
      })
      return typesSelected;
    }
    else
    {
      return [];
    }
  }
  if (priceInitial) {
    
    priceString += "€" + priceInitial;
  }

  if (priceFinal) {
   
    if (priceString) {
      priceString += " - ";
    }

    priceString += "€" + priceFinal;
  }
    

  return (
    <View style={styles.sty1}>
      <PickerModalSingle
        visible={isPickerVisible}
        isCountry={pickerType == 1 ? true : false}
        itemList={pickerType == 1 ? countryList : cityList}
        onClose={() => closePickerModel()}
        onSelected={(list) => onPickerItemSelected(list)}
      />
      <SelectLocationModal
        visible={isVisible}
        selectedCountryList={selectedCountryList}
        selectedCityList={selectedCityList}
        //eventTypeList={eventTypeList}
        //danceStyleList={danceStyleList}
        onApply={(request) => console.log("EDITAR CITY COUNTRY")}
        onReset={() => {
          // refreshList();
          console.log("RESETEAR");
          // getFilterData();
        }}
        onClose={() => setVisible(false)}
        openPickerModal={(type) => openPickerModel(type)}
        setCountry={setCountry}
        setCity={setCity}
        //onUpdateEventList={(list) => setEventTypeList(list)}
        //onUpdateDanceList={(list) => setDanceStyleList(list)}
      />
      <SelectorDanceStyle
        visible={isVisibleDanceStyleModal}
        danceStyleList={danceStyleList}
        onClose={() => setVisibleDanceStyleModal(false)}
        setDanceStyle={setDanceStyle}
      />
      <SelectDateModal
        isEdit={isEdit}
        dateFromEdit={getDateFormat(yearFrom,monthFrom,dayFrom)}
        dateToEdit={getDateFormat(yearTo,monthTo,dayTo)}
        visible={isVisibleDateModal}
        onClose={() => setIsVisibleDateModal(false)}
        setRangeDate={setRangeDate}
      />
      <SelectTypeModal
        visible={isVisibleDateTypeModal}
        eventTypeList={eventTypeList}
        onClose={() => setVisibleDateTypeModal(false)}
        setEvenType={setEvenType}
      />
      <SelectPriceModal
        visible={isVisiblePriceModal}
        isEdit={isEdit}
        priceInitial={priceInitial}
        setPriceInitial={setPriceInitial}
        priceFinal={priceFinal}
        setPriceFinal={setPriceFinal}
        onClose={() => setIsVisiblePriceModal(false)}
      />
      <KeyboardAwareScrollView
       innerRef={ ref =>{
          scroll.current = ref 
        }
      
       }
       extraScrollHeight={normalize(200)}
      >
      <View style={styles.sty4}>
      
        <ScrollView
         innerRef={ref => {
          this.scroll = ref
         }}
        >
          
          <View>
            {/* icons  */}
            <View style={styles.sty2}></View>
            <View style={[stylesProfile.sty7, { backgroundColor: "green" }]}>
              <Image
                style={stylesProfile.sty4}
                source={
                  imageResponse?
                  {
                    uri: values.profile_image_url
                    ? values.profile_image_url
                    : profileImage
                    ? profileImage.uri
                    : null,
                  }: Assets.default_image
                }
              />
              <TouchableOpacity
                style={stylesProfile.sty5}
                onPress={() => doSelectImage()}
              >
                <Image style={stylesProfile.sty6} source={Assets.edit} />
              </TouchableOpacity>
            </View>
         
            <PlieTextInput
                
                style={{width:normalize(200)}}
                refs={refName}
                onSubmitEditing={() => refDescription.current.focus()}
                isError={fnErr}
                placeholder={"name"}
                value={values.name}
                isWithoutTitle={true}
                onChangeText={(text) => onChangeNameValue("name", text)}
                onFocus={(event: Event) => {
                  // `bind` the function if you're using ES6 classes
                  scrollToInput(ReactNative.findNodeHandle(event.target))
                }}
             
              />

         
            <View style={styles.cityCountry}>
              <Text style={styleGeneral.sty7} numberOfLines={1}>
                {location}
              </Text>
              <TouchableOpacity
                style={stylesProfile.sty5}
                onPress={() => EditLocation()}
              >
                <Image style={stylesProfile.sty6} source={Assets.edit} />
              </TouchableOpacity>
            </View>
            <ScrollView
              style={{ maxHeight: 40 }}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                flexGrow: 1,
                justifyContent: "space-evenly",
                marginTop: 11,
                maxHeight: 40,
                }}
            >
              {danceStyle.map((item, index) => {
                console.log("stylesss", item.ds_name);
                return (
                  <Pressable onPress={()=> setVisibleDanceStyleModal(true)}>
                    <Text
                      style={[
                        styles.sty18,
                        { marginStart: index === 0 ? 8 : 0 },
                      ]}>
                      {item.ds_name ? item.ds_name.charAt(0).toUpperCase() + item.ds_name.slice(1) : danceStyle}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>

            <View style={styles.sty9}>
              <View style={{ alignItems: "center", width: "60%" }}>
                <Pressable onPress={() => setIsVisibleDateModal(true)}>
                  <Text style={styles.sty10}>Date</Text>
                </Pressable>
                <Text style={styles.sty11} onPress={() => onPressInputDate()}>
                  {rangeDate[0] ? (rangeDate[0].split("-")[2] +
                      "." +
                      rangeDate[0].split("-")[1] +
                      "." +
                      rangeDate[0].split("-")[0].slice(-2) ) : ("")
                  }
                  {rangeDate[1] ? " - " : ""}
                  {rangeDate[1] ? (rangeDate[1].split("-")[2] +
                    "." +
                    rangeDate[1].split("-")[1] +
                    "." +
                    rangeDate[1].split("-")[0].slice(-2) ) : ("")
                  }
                </Text>
              </View>

              <View style={{ alignItems: "center", width: "60%" }}>
                <Pressable onPress={() => setVisibleDateTypeModal(true)}>
                  <Text style={styles.sty10}>Type</Text>
                </Pressable> 
                {evenType.length > 0 && (
                  <ScrollView
                    
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                      flexGrow: 1,
                      justifyContent: "space-evenly",
                      flexDirection: "row",
                      flexWrap: "wrap",
                      maxWidth: "60%",
                    }}
                  >
                    {evenType.map((item, index) => {
                      return (
                        <Text style={styles.sty8} onPress={()=>onPressInputType()}>
                          {item.evt_name}
                          {index !== evenType.length - 1 && ","}
                        </Text>
                      );
                    })}
                  </ScrollView>
                )}
              </View>
              <View style={{ alignItems: "center", width: "50%" }}>
                <Pressable onPress={() => setIsVisiblePriceModal(true)}>
                  <Text style={styles.sty10}>Prices</Text>
                </Pressable>
                <Text style={styles.sty11} onPress={()=> onPressInputPrice()}>
                  {priceString}
                </Text>
              </View>
            </View>

            <Text style={styles.sty12}>Description</Text>
            <PlieTextInput
              
              style={styles.descriptionStyle}
              isError={formErr}
              refs={refDescription}
              placeholder={"Max. 500 characters"}
              value={values.description}
              isWithoutTitle={true}
              multiline={true}
              numberOfLines={50}
              maxLengthCharacter={maxSizeFormCharacter}
              onFocus={(event: Event) => {
                // `bind` the function if you're using ES6 classes
                scrollToInput(ReactNative.findNodeHandle(event.target))
              }}
              onChangeText={(text) => onChangeDescriptionValue("description", text)}
              intro={true}
              focusOn={onFocusDescription}
              
            />

            <FlatList
              style={[
                styles.sty1,
                {
                  marginTop:
                    Platform.OS === "ios" ? normalize(15) : normalize(20),
                },
              ]}
              horizontal
              data={EventObj.multi_image}
              renderItem={({ item, index }) => (
                <View
                  style={{
                    marginRight:
                      index === EventObj.multi_image.length - 1
                        ? normalize(16)
                        : 0,
                    marginBottom: 20,
                  }}
                >
                  <Image
                    style={styles.sty15}
                    source={{ uri: item.event_multi_img }}
                  />
                </View>
              )}
              showsVerticalScrollIndicator={false}
              onEndReachedThreshold={0.2}
            />
          </View>
         
        </ScrollView>
       
      </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
