import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { normalize } from "../common/Normalize";
import Colors from "../common/Colors";
import { Assets } from "../assets/Icons";

function Header(props) {
  const { style } = props;

  return (
    <View style={[styles.sty1, style]}>
      <Image
        style={styles.sty2}
        source={Assets.plie_combined}
        resizeMode="contain"
      />
    </View>
  );
}

export default Header;

const styles = StyleSheet.create({
  sty1: {
    backgroundColor: Colors.header,
    // height: normalize(300),
    alignItems: "center",
  },
  sty2: {
    alignSelf: "center",
    width: normalize(415),
    height: normalize(300),
    //marginTop: normalize(25)
  },
});
