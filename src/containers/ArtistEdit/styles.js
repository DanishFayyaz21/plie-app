import { StyleSheet } from "react-native"
import { normalize } from "../../common/Normalize"
import Colors from "../../common/Colors"
import Fonts from "../../assets/Fonts"

export default StyleSheet.create({
  sty9: {
    height: normalize(40),
    width: normalize(40),
    borderRadius: normalize(20),
    alignSelf: "center",
  },
  sty11: {
    fontFamily: Fonts.Regular,
    fontSize: normalize(12),
    color: Colors.color13,
    alignSelf: "center",
    alignItems: "center",
    alignContent: "center",
    textAlign: 'right',
    maxWidth: "50%",
    alignSelf:'center'
   },
  sty12: {
    flexDirection: "column",
    marginTop: 10,
    justifyContent: "space-between",
    marginLeft: 19,
    marginRight: 11,
  },
  descriptionStyle:{
    width:normalize(270),
    height:normalize(100),
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
    margin:normalize(10)
    
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
  title:{
    color: Colors.text,
    fontSize: normalize(16),
    fontFamily: Fonts.Regular,
    marginBottom: normalize(5)
  }
})
