import { StyleSheet } from "react-native";
import { normalize } from "../../common/Normalize";
import Colors from "../../common/Colors";
import Fonts from "../../assets/Fonts";

export default StyleSheet.create({
  sty1: {
    flex: 1
  },
  sty2: {
    flex: 1,
    flexDirection: "row",
    marginHorizontal: normalize(10),
    marginVertical: normalize(8),
    borderRadius: normalize(12),
    backgroundColor: Colors.white
  },
  sty3: {
    width: normalize(80),
    height: normalize(80),
    margin: normalize(8),
    borderRadius: normalize(4)
  },
  sty4: {
    flex: 1
  },
  sty5: {
    color: Colors.black,
    fontFamily: Fonts.Bold,
    fontSize: normalize(16),
    marginTop: normalize(5)
  },
  sty6: {
    color: Colors.primary,
    fontFamily: Fonts.Medium,
    fontSize: normalize(12)
  },
  sty7: {
    color: Colors.hint,
    fontFamily: Fonts.Regular,
    fontSize: normalize(12)
  },
  sty8: {
    height: normalize(21),
    textAlign: "center",
    textAlignVertical: "center",
    color: Colors.black,
    fontFamily: Fonts.Medium,
    fontSize: normalize(12),
    borderRadius: normalize(25),
    paddingHorizontal: normalize(10),
    marginEnd: normalize(5),
    marginTop: normalize(5),
    backgroundColor: Colors.color6
  },
  sty9: {
    width: normalize(14),
    height: normalize(14),
    margin: normalize(5)
  },
  sty10: {
    // flex: 1,
    textAlignVertical: "center",
    color: Colors.hint,
    fontFamily: Fonts.Regular,
    fontSize: normalize(11),
    marginEnd: normalize(3)
  },
  sty11: {
    flex: 0.5,
    alignItems: "flex-end"
  },
  sty12: {
    flexDirection: "row"
  },
  sty13: {
    width: normalize(24),
    height: normalize(24),
    marginEnd: normalize(5),
    marginBottom: normalize(3)
  },
  sty14: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(15)
  },
  sty15: {
    color: Colors.black,
    fontFamily: Fonts.Bold,
    fontSize: normalize(26)
  },
  sty16: {
    color: Colors.hint,
    fontFamily: Fonts.Regular,
    fontSize: normalize(16)
  },
  sty17: {
    flex: 1,
    paddingTop: normalize(250),
    alignItems: "center",
    justifyContent: "center"
  },
  sty18: {
    flex: 1,
    paddingTop: normalize(5)
  },
  sty21: {
    width: normalize(24),
    height: normalize(22.5)
  }
});