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
    backgroundColor: Colors.white,
    alignItems: 'center'
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
    fontFamily: Fonts.GothicSemiBold,
    fontSize: normalize(16),
    marginTop: normalize(5)
  },
  sty6: {
    color: Colors.primary,
    fontFamily: Fonts.Medium,
    fontSize: normalize(12),
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
    fontFamily: Fonts.PoppinsMedium,
    fontSize: normalize(12),
    borderRadius: normalize(25),
    paddingHorizontal: normalize(10),
    marginEnd: normalize(5),
    backgroundColor: Colors.color6
  },
  sty9: {
    flex: 1,
    paddingTop: normalize(5)
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
    marginBottom: normalize(10)
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
    flexDirection: "row",
    paddingHorizontal: normalize(10),
    //paddingVertical: normalize(5),
    marginHorizontal: normalize(10),
    marginTop: normalize(20),
    marginBottom: normalize(10),
    backgroundColor: Colors.color10,
    borderRadius: normalize(12),
    alignItems: "center",
    elevation: 5,
    shadowColor: Colors.black,
    shadowOffset: {width: -1, height: 1},
    shadowOpacity: 0.1,
    //shadowRadius: 3,
  },
  sty19: {
    width: normalize(12),
    height: normalize(12),
    marginEnd: normalize(5)
  },
  sty20: {
    flex: 1,
    color: Colors.black,
    fontFamily: Fonts.Medium,
    fontSize: normalize(13),
    height: normalize(45),
    },
  sty21: {
    width: normalize(24),
    height: normalize(22.5)
  },
  sty22: {
    width: normalize(12),
    height: normalize(12),
    end: normalize(5)
  },
});
