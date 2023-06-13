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
    // paddingVertical: normalize(5),
    marginBottom: normalize(12)
  },
  sty2: {
    flexDirection: "row",
    alignSelf: "flex-end",
    paddingVertical: normalize(8)
  },
  sty3: {
    color: Colors.black,
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
  sty5: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: normalize(20)
  },
  sty6: {
    flex: 1,
    height: normalize(1),
    backgroundColor: Colors.line
  },
  sty7: {
    color: Colors.line,
    fontSize: normalize(12),
    fontFamily: Fonts.Regular,
    marginHorizontal: normalize(5)
  },
  sty8: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: normalize(10),
    marginBottom: normalize(10)
  },
  sty9: {
    width: normalize(24),
    height: normalize(24)
  },
  sty10: {
    width: normalize(48),
    height: normalize(48)
  },
  sty11: {
    width: normalize(48),
    height: normalize(48),
    backgroundColor: Colors.white,
    marginHorizontal: normalize(5),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: normalize(3),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  sty12: {
    color: Colors.hint,
    fontSize: normalize(12),
    fontFamily: Fonts.Regular,
    alignSelf: "flex-end",
    marginBottom: normalize(12),
    marginTop: normalize(12),
  },
});
