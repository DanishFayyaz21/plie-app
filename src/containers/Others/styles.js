import { StyleSheet } from "react-native"
import { normalize } from "../../common/Normalize"
import Colors from "../../common/Colors"
import Fonts from "../../assets/Fonts"

export default StyleSheet.create({
  backIcon: {
    width: normalize(20),
    height: normalize(20),
    justifyContent: "center",
    marginStart: normalize(6),
    marginTop: normalize(5),
  },
  sty1: {
    flex: 1,
  },
  sty2: {
    flex: 1,
    backgroundColor: Colors.white,
    marginLeft: normalize(18),
    marginRight: normalize(21),
    marginTop: normalize(12),
  },
  sty3: {
    flexDirection: "row",
    marginTop: 14,
    justifyContent: "space-around",
    marginLeft: normalize(13),
    marginRight: normalize(11),
  },
  sty4: {
    height: normalize(60),
    width: normalize(60),
    borderRadius: normalize(30),
    resizeMode: "contain",
  },
  sty5: {
    fontFamily: Fonts.GothicSemiBold,
    fontSize: normalize(16),
    color: Colors.black,
    marginLeft: 15,
  },
  sty6: {
    fontFamily: Fonts.Regular,
    fontSize: normalize(10),
    color: Colors.color13,
    marginLeft: 15,
  },
  sty7: {
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  sty8: {
    width: normalize(20),
    height: normalize(20),
    marginLeft: normalize(5),
    marginBottom: 3,
  },
})
