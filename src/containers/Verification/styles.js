import { StyleSheet } from "react-native";
import { normalize } from "../../common/Normalize";
import Colors from "../../common/Colors";
import Fonts from "../../assets/Fonts";

export default StyleSheet.create({
  sty1: {
    width: "95%",
    height: normalize(42),
    //alignSelf: "center",
    marginTop: normalize(20),
  },
  sty2: {
    width: normalize(42),
    height: normalize(42),
    color: Colors.black,
    fontFamily: Fonts.Medium,
    fontSize: normalize(16),
    borderWidth: normalize(1),
    borderRadius: normalize(3),
  },
  sty3: {
    borderColor: Colors.primary,
  },
  sty10: {
    color: Colors.black,
    fontSize: normalize(16),
    fontFamily: Fonts.Regular,
    marginTop: normalize(2),
  },
  sty11: {
    flexDirection: "row",
  },
  sty12: {
    color: Colors.black,
    fontSize: normalize(14),
    fontFamily: Fonts.Regular,
    marginStart: normalize(10),
    marginTop: normalize(15),
  },
  sty13: {
    textDecorationLine: "underline",
  },
  sty14: {
    alignSelf: "center",
    color: Colors.primary,
    fontSize: normalize(16),
    fontFamily: Fonts.Medium,
    marginTop: normalize(15),
    marginBottom: normalize(20),
  },
  sty19: {
    alignItems: "center",
    justifyContent: "center",
    color: Colors.red,
  },
});
