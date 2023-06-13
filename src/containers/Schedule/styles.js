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
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  sty3: {
    width: normalize(20),
    height: normalize(20),
    marginLeft: normalize(5),
    marginBottom: 3,
  },
  sty4: {
    flex: 1,
    backgroundColor: Colors.white,
    marginLeft: normalize(18),
    marginRight: normalize(21),
    marginTop: normalize(12),
  },
  sty5: {
    flexDirection: "row",
    marginTop: 14,
    justifyContent: "space-around",
    marginLeft: normalize(13),
    marginRight: normalize(11),
  },
  sty6: {
    height: normalize(60),
    width: normalize(60),
    borderRadius: normalize(30),
		resizeMode: Platform.OS === 'ios' ? 'cover' : 'contain',
		overflow: 'hidden',
  },
  sty7: {
    fontFamily: Fonts.GothicSemiBold,
    fontSize: normalize(16),
    color: Colors.black,
    marginLeft: 15,
  },
  sty8: {
    fontFamily: Fonts.Regular,
    fontSize: normalize(12),
    color: Colors.color13,
    marginLeft: 15,
  },
  sty9: {
    fontFamily: Fonts.Regular,
    fontSize: normalize(12),
    color: Colors.color13,
    width: "33%",
    textAlign: "left",
    marginBottom: normalize(8),
  },
  sty10: {
    fontFamily: Fonts.Bold,
    fontSize: normalize(12),
    color: Colors.color15,
  },
  sty11: {
    fontFamily: Fonts.Bold,
    fontSize: normalize(8),
    color: Colors.color15,
  },
  sty12: {
    height: normalize(1),
    backgroundColor: Colors.color16,
    marginBottom: normalize(10),
    marginTop: normalize(3),
  },
})
