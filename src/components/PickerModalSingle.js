import React, { useState, useEffect } from "react"
import { View, StyleSheet, Modal, TouchableOpacity, FlatList, Text, Image, ActivityIndicator } from "react-native"
import Fonts from "../assets/Fonts"
import Colors from "../common/Colors"
import { normalize } from "../common/Normalize"
import { Assets } from "../assets/Icons"


function PickerModalSingle(props) {
  const [isVisible, setVisible] = useState(false)
  const [mItemList, setItemList] = useState([])
  const [countryIdSelected,setCountryIdSelected] = useState(null);
  const [cityIdSelected,setCityIdSelected] = useState(null);
  const { visible, itemList, isCountry } = props

  useEffect(() => {
    // setVisible(visible)
  }, [visible])

  useEffect(() => {
    setItemList(itemList)
    if (!isCountry) {
      let list = itemList.map((item) => {
        return item
      })
      list.sort(function (a, b) {
        return a.cty_name.localeCompare(b.cty_name);
      });
      setItemList(list)
    } else {
      setItemList(itemList)
    }
  }, [itemList])

  const onClose = () => {
    props.onClose()
    // setVisible(false)
  }

  const onSelected = () => {
    let selectedItemList = []

    mItemList.map((item) => {
      if (item.isSelected) {
        selectedItemList.push(item)
      }
    })

    props.onSelected(selectedItemList)
    props.onClose()
    // setVisible(false)
  }

  const onCountrySelect = (id) => {
    // setItemList(
    //   mItemList.map((item) => {
    //     if (item.cnt_id == id) {
    //       item.isSelected = true
    //     } else {
    //       item.isSelected = false
    //     }
    //     return item
    //   })
    // )
    // onSelected()
    // setItemList()
    console.log("Click en country");
    
    setItemList(
      mItemList.map((item) => {
        if(countryIdSelected){
          if (item.cnt_id == countryIdSelected) {
            item.isSelected = false;
          }
        }
        if (item.cnt_id == id) {
          item.isSelected = !item.isSelected;
          setCountryIdSelected(item.cnt_id);
        }
        
      return item;
      })
    )
  }

  const onCitySelect = (id) => {
    setItemList(
      mItemList.map((item) => {
        if (cityIdSelected) {
          if (item.cty_id == cityIdSelected) {
             item.isSelected = false;
            }
        }
        if (item.cty_id == id) {
          item.isSelected = !item.isSelected;
          setCityIdSelected(item.cty_id);
        }
        return item
      })
    )
  }

  return (
    <Modal visible={visible} transparent={true} animated={true} animationType="slide" onRequestClose={() => onClose()}>
      <View style={styles.sty1}>
        <View style={styles.sty2}>
          <View style={styles.sty3}>
            <View style={styles.sty7}>
              <Text style={styles.sty8}>Select {isCountry ? "Country" : "City"}</Text>
              {/* {!isCountry && */}
              <TouchableOpacity onPress={() => onSelected()}>
                <Text style={styles.sty5}>Done</Text>
              </TouchableOpacity>
              {/* } */}
              {/* {isCountry &&
                <TouchableOpacity onPress={() => onClose()}>
                  <Image style={styles.sty9} resizeMode="contain" source={Assets.close} />
                </TouchableOpacity>
              } */}
            </View>

            {isCountry && mItemList.length == 0 && <ActivityIndicator size="large" color={Colors.black} />}

            <FlatList
              style={{
                width: "100%",
                overflow: "hidden",
              }}
              data={mItemList}
              //keyExtractor={(index) => index.toString()}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  style={styles.sty4}
                  onPress={() => (isCountry ? onCountrySelect(item.cnt_id) : onCitySelect(item.cty_id))}
                >
                  <Text style={item.isSelected ? styles.sty6 : styles.sty5}>{isCountry ? item.cnt_name : item.cty_name}</Text>
                </TouchableOpacity>
              )}
              showsVerticalScrollIndicator={false}
              onEndReachedThreshold={0.2}
            />
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default PickerModalSingle;

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
    height: "70%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
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
    paddingVertical: normalize(10),
    paddingHorizontal: normalize(15),
    borderBottomColor: Colors.color9,
    borderBottomWidth: normalize(0.5),
  },
  sty5: {
    color: Colors.black,
    fontSize: normalize(16),
    fontFamily: Fonts.Medium,
  },
  sty6: {
    color: Colors.primary,
    fontSize: normalize(16),
    fontFamily: Fonts.Medium,
  },
  sty7: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: normalize(20),
    marginBottom: normalize(15),
    paddingHorizontal: normalize(20),
  },
  sty8: {
    color: Colors.black,
    fontSize: normalize(20),
    fontFamily: Fonts.Medium,
  },
  sty9: {
    width: normalize(15),
    height: normalize(15),
  },
})
