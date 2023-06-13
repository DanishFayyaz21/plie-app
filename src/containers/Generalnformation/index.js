import React, { useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { Assets } from "../../assets/Icons";
import Navigator from "../../common/Navigator";
import styles from "./styles";
import { normalize } from "../../common/Normalize";

export default function Generalnformation({
    imageEvent,
    nameEvent,
    locationEvent,
    dateEvent
}){
    return (
        <View style={styles.sty1}>
        <View style={styles.sty2}>
          <View style={styles.sty3}>
            <Image
              style={styles.sty4}
              source={imageEvent.uri ?{ uri: imageEvent.uri } : imageEvent}
            />
  
            <View
              style={{
                justifyContent: "space-between",
                maxWidth: "50%",
                paddingBottom: 10,
                marginLeft: normalize(10),
              }}
            >
              <Text
                style={styles.sty5}
                // numberOfLines={1}
                adjustsFontSizeToFit
              >
                {nameEvent.charAt(0).toUpperCase() +
                  nameEvent.slice(1)}
              </Text>
              <Text style={styles.sty6} numberOfLines={1}>
                {locationEvent}
              </Text>
            </View>
  
            <View
              style={{
                justifyContent: "space-between",
                maxWidth: "50%",
                paddingBottom: 10,
              }}
            >
              <View style={styles.sty7}>
                <Pressable>
                  <Image style={styles.sty8} source={Assets.share} />
                </Pressable>
                <Pressable
                  disabled={true}
                >
                  <Image
                    resizeMode="contain"
                    style={styles.sty8}
                    source={ Assets.favourite_off 
                    }
                  />
                </Pressable>
              </View>
              <Text style={styles.sty6} numberOfLines={1} adjustsFontSizeToFit>
              {dateEvent[0] ? (dateEvent[0].split("-")[2] +
                      "." +
                      dateEvent[0].split("-")[1] +
                      "." +
                      dateEvent[0].split("-")[0].slice(-2) ) : ("")
                  }
                  {dateEvent[1] ? " - " : ""}
                  {dateEvent[1] ? (dateEvent[1].split("-")[2] +
                    "." +
                    dateEvent[1].split("-")[1] +
                    "." +
                    dateEvent[1].split("-")[0].slice(-2) ) : ("")
                  }
              </Text>
            </View>
          </View>
        </View>
      </View>
    )
}