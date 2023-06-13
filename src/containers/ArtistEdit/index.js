import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Image,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

import { Assets } from "../../assets/Icons";

import styles from "./styles";
import { normalize } from "../../common/Normalize";
import PlieTextInput from "../../components/PlieTextInput";
import PlieButton from "../../components/PlieButton";
import stylesProfile from "../UpdateProfile/styles";
import SelectLocationModal from "../../components/SelectLocationModal";
import {
  FetchCityListAction,
  FetchCountryListAction,
} from "../../store/actions/FilterAction";
import { useDispatch, useSelector } from "react-redux";
import PickerModalSingle from "../../components/PickerModalSingle";
import { CITY_LIST, COUNTRY_LIST,CLEAR_ARTIST,CLEAR_DELETE_ARTIST } from "../../common/StoreActionTypes";
import { AddArtist,DeleteArtist, FetchEventDetail} from '../../store/actions/EventAction';
import { showMessage } from "react-native-flash-message";
import {  Flash } from "../../common/Constants";

const ArtistEdit = (props) => {
    const { item,artistLocation,idEvent,onRefresh,isAdd,removeNew,scroll} = props;
    console.log("ITEM ARTIST", item);
    const [isVisible, setVisible] = useState(false);
    const [selectedCountryList, setSelectedCountryList] = useState([]);
    const [selectedCityList, setSelectedCityList] = useState([]);
    const [city, setCity] = useState(item?.art_city ?  item?.art_city : {} );
    const [country, setCountry] = useState(item?.art_country ? item?.art_country: {});
    const [pickerType, setPickerType] = useState(0);
    const [isPickerVisible, setPickerVisible] = useState(false);
    const [countryList, setCountryList] = useState([]);
    const [cityList, setCityList] = useState([]);
    const [nameArtist,setNameArtist] = useState(item.art_name);
    const [descriptionArtist,setDescriptionArtist] = useState(item.art_description);
    const dispatch = useDispatch();
    const statusUpdateArtist = useSelector((state) => state.EditArtistReducer.statusEdit);
    const statusDelete = useSelector((state) => state.EditArtistReducer.statusDelete);
    const refName = useRef();
    //{"cnt_id": 2, "cnt_name": "United Kingdom", "created_at": "2022-05-30T00:00:00.000000Z", "deleted_at": null, "isSelected": true, "updated_at": "2022-05-30T00:00:00.000000Z"}
    console.log("CITYYY",city);
    console.log("COUNTRY",country);
    let location = `${city?.cty_name ? city.cty_name : "city"}, ${
        country?.cnt_name ? country.cnt_name : "country"
    }`;
    const { CommonReducer,FilterReducer} = useSelector(
        (state) => ({
        
        CommonReducer: state.CommonReducer,
        FilterReducer: state.FilterReducer,
        })
    );
    useEffect(() => {
        if(CommonReducer.api_type)
        {
        console.log("FilterReducer GENERAL EDIT", CommonReducer.api_type);
        getResponse();
        }

    },[ FilterReducer]);
    useEffect(() => {
        if (!isVisible) {
        if (pickerType > 0) setPickerVisible(true);
        }
    }, [pickerType]);

    useEffect(()=>{
      if(statusUpdateArtist)
      {
        showMessage({ type: Flash.Success, message: "add or update Artist" });
        onRefresh();
        dispatch({ type: CLEAR_ARTIST, payload: false });
      }

    },[statusUpdateArtist]);
    useEffect(()=>{
      if(statusDelete)
      {
        showMessage({ type: Flash.Success, message: "delete Artist" });
        onRefresh();
        dispatch({ type: CLEAR_DELETE_ARTIST, payload: false });
      }

    },[statusDelete]);
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
    const scrollToInput = useCallback((reactNode: any)=> {
      // Add a 'scroll' ref to your ScrollView
      scroll.current.props.scrollToFocusedInput(reactNode)
      //this.scroll.props.scrollToFocusedInput(reactNode)
    })
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
        }
    }
   const onSaveArtist = ()=>{    
    if(isAdd)
    {
      onSaveNew();
    }
    else
    {
      let body = {
        eventId: idEvent.toString(),
        art_id: item.art_id,
        art_name: nameArtist,
        art_description: descriptionArtist,
        eventArtistId: item.art_id,
        art_city: city?.cty_id ? city.cty_id : "",
        art_country: country?.cnt_id?  country.cnt_id : "",
      };
      const messageError = getErrorArtist(body.art_name);
      if(messageError !== "")
      {
        showMessage({ type: Flash.Error, message: messageError });
      }
      else
      {
        console.log(" body artist update",body);
        dispatch(AddArtist(body));
      }
    }
    //for add artist 
    
  }
  const getErrorArtist = (name) =>{
    let messageError = "";
    if(name === "")
    {
      messageError = messageError +"is necesary name" + ".";
    }
    // if(city === "")
    // {
    //   messageError = messageError +"is necesary city" + ",";
    // }
    // if(country === "")
    // {
    //   messageError = messageError +"is necesary country" + ".";
    // }
    return messageError;
  }
  const onSaveNew = () =>{
    console.log("nameArist, ",typeof(nameArtist));
  
      
      let body = {
        eventId: idEvent.toString(),
        art_name: nameArtist ? nameArtist : "",
        art_description: descriptionArtist,
        art_city: city?.cty_id ? city.cty_id : null,
        art_country: country?.cnt_id?  country.cnt_id : null,
      };
      console.log("nameArist, ",typeof(nameArtist))
      const messageError = getErrorArtist(body.art_name);
      if(messageError !== "")
      {
        showMessage({ type: Flash.Error, message: messageError });
      }
      else
      {
        console.log("new body artist",body);
        dispatch(AddArtist(body));
    
      }
      
      

    
  }
  const deleteArtistSpecific = () =>{
    if(isAdd)
    {
      removeNew();
    }
    else
    {
      let body = {
        eventArtistId: item.art_id,
      };
    
      dispatch(DeleteArtist(body));
    }
   }
   const selected =(location) =>{
    console.log("LOCATIONN SELECTED", location);
    if( location)
    {
      location["isSelected"] = true;
      return location;
    }
    else
    {
      return location;
    }
    
   }
   return (
    <View style={{ flexDirection: "column" }}>
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
        title={"Artist Details"}
        onClose={() => setVisible(false)}
        openPickerModal={(type) => openPickerModel(type)}
        setCountry={setCountry}
        setCity={setCity}
        isEdit={true}
        countrySelected={selected(country)}
        citySelected={selected(city)}
        //onUpdateEventList={(list) => setEventTypeList(list)}
        //onUpdateDanceList={(list) => setDanceStyleList(list)}
      />
        <View style={styles.sty12}>
            <View style={{ flexDirection: "row", maxWidth: "45%" }}>
                {isAdd ?(
                  <Image
                  style={styles.sty9}
                  source={{uri:"https://plie.dev/images/default-artist-image.jpg"}}
                />
                ):(
                  <Image
                    style={styles.sty9}
                    source={{
                        uri:
                        item.artist_profile_img !== ""
                            ? item.artist_profile_img
                            : Assets.default_artist_image,
                    }}
                />
                )
              }
                <View style={{flexDirection:"column"}}>
                  <View style={{flexDirection:"row", width: normalize(150), marginStart:normalize(20), marginEnd:normalize(20)}} >
                    <Text style={{alignSelf:'flex-end'}}>Name</Text>
                    <PlieTextInput 
                        title={"Name"} 
                        rootStyle={{marginStart:normalize(10),width:normalize(100)}}
                        isWithoutTitle={true}
                        refs={refName}
                        value={nameArtist}
                        inputStyle={{alignSelf:'flex-start'}}
                        //refs={refName}
                        onFocus={(event: Event) => {
                          // `bind` the function if you're using ES6 classes
                          scrollToInput(ReactNative.findNodeHandle(event.target))
                        }}
                        onChangeText={(text) => setNameArtist(text)} 
                    />
                   
                  </View>
                  <View style={{width: normalize(150),marginStart:normalize(20), marginTop:normalize(20),marginEnd:normalize(20),flexDirection:"row"}} >
                    <Text style={styles.sty11}>{location}</Text>
                    <TouchableOpacity
                      style={[stylesProfile.editLocation]}
                      onPress={() => setVisible(true)}
                    >
                      <Image style={stylesProfile.sty6} source={Assets.edit} />
                    </TouchableOpacity>
                
                  </View>
       
                </View>
            </View>
          
            
        </View>
        <View style={{flexDirection:'row',justifyContent:'center'}}>
            <PlieButton
            style={styles.buttonSubmit}
            text={"Save"}
            onPress={() => onSaveArtist()}
            />
            <PlieButton
            style={styles.buttonRemove}
            textStyle={styles.texButtonRemove}
            text={"Remove"}
            onPress={() => deleteArtistSpecific()}
            />
        </View> 
    </View>
   ) 
}
export default ArtistEdit;