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
    marginTop: normalize(10),
    marginRight: normalize(11),
    justifyContent: "space-between",
  },
  sty10: {
    fontFamily: Fonts.Bold,
    fontSize: normalize(13),
    color: Colors.color15,
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
  },
  sty13: {
    height: normalize(1),
    backgroundColor: Colors.color16,
    marginTop: normalize(10),
  },
  sty14: {
    fontFamily: Fonts.Regular,
    fontSize: normalize(12),
    color: Colors.black,
    marginLeft: normalize(15),
    marginTop: normalize(10),
    marginRight: normalize(11),
  },
  descriptionStyle:{
    width:normalize(270),
    height:normalize(70),
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  buttonSubmit:{
    width: normalize(100),
    backgroundColor: Colors.primary,
    borderRadius: normalize(24),
    alignSelf:'flex-start',
    textAlign:'center',
    paddingHorizontal: normalize(15),
    margin:normalize(10),
  },
  buttonRemove:{
    width: normalize(100),
    //backgroundColor: Colors.red,
    backgroundColor:'white',
    borderColor: Colors.primary,
    borderWidth: normalize(2),
    borderRadius: normalize(24),
    alignSelf:'flex-end',
    textAlign:'center',

    paddingHorizontal: normalize(15),
    margin:normalize(10),
    borderTopLeftRadius: normalize(24),
    borderTopRightRadius: normalize(24),
    borderBottomLeftRadius: normalize(24),
    borderBottomRightRadius: normalize(24),
  },
  texButtonRemove:{
    color:Colors.primary
  },
})
