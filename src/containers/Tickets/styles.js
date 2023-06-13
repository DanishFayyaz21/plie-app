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
    resizeMode: Platform.OS === 'ios' ? 'cover' : 'contain',
    overflow: 'hidden',
  },
  sty5: {
    fontFamily: Fonts.GothicSemiBold,
    fontSize: normalize(16),
    color: Colors.black,
    marginLeft: 15,
  },
  sty6: {
    fontFamily: Fonts.Regular,
    fontSize: normalize(12),
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
  sty9: {
    flexDirection: "row",
    marginLeft: normalize(15),
    marginTop: normalize(48),
    marginRight: normalize(11),
    justifyContent: "space-around",
  },
  sty10: {
    fontFamily: Fonts.Bold,
    fontSize: normalize(13),
    color: Colors.color15,
    width: "70%"
  },
  sty11: {
    fontFamily: Fonts.PoppinsRegular,
    fontSize: normalize(11),
    color: Colors.black,
  },
  sty12: {
    fontFamily: Fonts.PoppinsRegular,
    fontSize: normalize(8),
    color: Colors.hint,
    marginLeft: normalize(15),
  },
  sty13: {
    height: normalize(1),
    backgroundColor: Colors.color16,
    marginTop: normalize(3),
  },
  sty14: {
    width: "58%",
    fontFamily: Fonts.Regular,
    fontSize: normalize(12),
    color: Colors.black,
    marginLeft: normalize(15),
    marginTop: normalize(10),
    marginRight: normalize(11),
  },
  sty15: {
    flexDirection: "row",
    marginRight: normalize(11),
    justifyContent: "space-between",
    // alignItems: "center"
  },
  buttonEdit: {
    width: '70%',
    backgroundColor: Colors.primary,
    borderRadius: normalize(24),
    alignSelf: 'center',
    textAlign: 'center',
    paddingHorizontal: normalize(14),
  },
  sty16: {
    fontFamily: Fonts.PoppinsRegular,
    fontSize: normalize(8),
    color: Colors.hint,
    textAlign: 'center'
  },
})
