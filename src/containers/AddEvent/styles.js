import { StyleSheet } from 'react-native';
import { normalize } from '../../common/Normalize';
import Colors from '../../common/Colors';
import Fonts from '../../assets/Fonts';

export default StyleSheet.create({
	backIcon: {
		width: normalize(20),
		height: normalize(20),
		justifyContent: 'center',
		marginStart: normalize(6),
		marginTop: normalize(5)
	},
	btnTab: {
		backgroundColor: Colors.color6,
		borderRadius: normalize(24),
		justifyContent: 'center',
		paddingHorizontal: normalize(3)
		// marginHorizontal: normalize(5),
	},
    selectedTab: {
		backgroundColor: Colors.primary,
		borderRadius: normalize(24),
		justifyContent: 'center',
	},
	tabText: {
		fontFamily: Fonts.GothicMedium,
		fontSize: normalize(13),
		color: Colors.black,
        paddingVertical: normalize(5),
        paddingHorizontal: normalize(8)
	},
    selectedText: {
		fontFamily: Fonts.GothicMedium,
		fontSize: normalize(13),
		color: Colors.white,
        paddingVertical: normalize(5),
        paddingHorizontal: normalize(8)
	},
	tabBarStyle: {
		backgroundColor: Colors.white,
		flexDirection: 'row',
		justifyContent: 'space-between',
        paddingHorizontal: normalize(16),
        paddingTop: normalize(9),
        paddingBottom: normalize(12),
		flexWrap: "wrap",
	},
	sty1: {
		flex: 1
	},
	sty2: {
		backgroundColor: Colors.white,
		paddingHorizontal: normalize(20),
		paddingVertical: normalize(15)
	},
	sty3: {
		color: Colors.black,
		fontFamily: Fonts.Bold,
		fontSize: normalize(26)
	},
	sty4: {
		color: Colors.hint,
		fontFamily: Fonts.Regular,
		fontSize: normalize(16)
	},
	sty5: {
		flex: 1,
		backgroundColor: Colors.white,
		marginLeft: normalize(18),
		marginRight: normalize(21),
		marginTop: normalize(23)
	},
	sty6: {
		flexDirection: 'row',
		marginTop: 14,
		justifyContent: 'space-between',
		marginLeft: normalize(13),
		marginRight: normalize(11)
	},
	sty7: {
		height: normalize(60),
		width: normalize(60)
	},
	sty8: {
		fontFamily: Fonts.GothicSemiBold,
		fontSize: normalize(22),
		color: Colors.black
	},
	sty9: {
		fontFamily: Fonts.Regular,
		fontSize: normalize(11),
		color: Colors.color13
	},
	sty10: {
		alignItems: 'flex-start',
		flexDirection: 'row',
		justifyContent: 'flex-end'
	},
	sty11: {
		width: normalize(20),
		height: normalize(20),
		marginLeft: normalize(5),
		marginBottom: 3
	},
	buttonSubmit:{
		width:'70%',
		backgroundColor: Colors.primary,
		borderRadius: normalize(24),
		alignSelf:'center',
		textAlign:'center',
		paddingHorizontal: normalize(15),
		
	},
	buttonSubmitTabs:{
		width:'70%',
		backgroundColor: Colors.primary,
		borderRadius: normalize(24),
		alignSelf:'center',
		textAlign:'center',
		paddingHorizontal: normalize(15),
		
	}
});
