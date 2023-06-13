import { StyleSheet } from "react-native";
import { normalize } from "../../common/Normalize";
import Colors from "../../common/Colors";
import Fonts from "../../assets/Fonts";

export default StyleSheet.create({
  sty1: {
    color: Colors.hint,
    fontSize: normalize(12),
    fontFamily: Fonts.Regular,
    alignSelf: "flex-end",
    bottom: normalize(100),
  },
  sty2: {
    flexDirection: "row",
    paddingVertical: normalize(8)
  },
  sty3: {
    color: Colors.hint,
    fontSize: normalize(12),
    fontFamily: Fonts.Regular
  },
  sty4: {
    color: Colors.black,
    fontSize: normalize(12),
    fontFamily: Fonts.Regular,
    marginStart: normalize(3),
    textDecorationLine: "underline"
  },
  sty11: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  sty12: {
    alignSelf: "center",
    color: Colors.black,
    fontSize: normalize(24),
    fontFamily: Fonts.Regular,
    marginTop: normalize(10)
  },
  sty13: {
    alignSelf: "center",
    color: Colors.hint,
    fontSize: normalize(12),
    fontFamily: Fonts.Regular
  },
  sty14: {
    alignItems: "center"
  },
  sty15: {
    width: normalize(144),
    height: normalize(144),
    marginTop: normalize(20)
  },
  sty16: {
    flexDirection: "row",
    marginTop: normalize(30)
  },
  sty17: {
    width: normalize(24),
    height: normalize(24),
    justifyContent: "center",
    marginStart: normalize(8),
    marginTop: normalize(3)
  },
  sty18: {
    alignSelf: "center",
    width: normalize(24),
    height: normalize(24)
  }
});
