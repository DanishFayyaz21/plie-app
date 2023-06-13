import { StyleSheet } from "react-native";
import { normalize } from "../../common/Normalize";
import Colors from "../../common/Colors";
import Fonts from "../../assets/Fonts";

export default StyleSheet.create({
  sty1: {
    alignSelf: "center",
    color: Colors.black,
    fontSize: normalize(24),
    fontFamily: Fonts.Regular,
    marginTop: normalize(30),
    marginBottom: normalize(30)
  },
  sty2: {
    color: Colors.hint,
    fontSize: normalize(12),
    fontFamily: Fonts.Regular,
    marginTop: normalize(2)
  },
  sty3: {
    flex: 1,
    alignSelf: "center",
    marginTop: normalize(50),
    marginBottom: normalize(30)
  },
  sty4: {
    alignItems: "center",
    justifyContent: "center",
    color: Colors.red
  },
  sty5: {
    // alignSelf: "center",
    color: Colors.text,
    fontSize: normalize(16),
    fontFamily: Fonts.Regular,
    // marginTop: normalize(50),
    // marginBottom: normalize(10)
  },
  sty6: {
    color: Colors.red,
    fontSize: normalize(16),
    fontFamily: Fonts.Regular
  }
});
