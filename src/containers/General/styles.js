import { StyleSheet, Platform } from 'react-native';
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
	sty1: {
		flex: 1
	},
	sty2: {
		alignItems: 'flex-end',
		flexDirection: 'row',
		justifyContent: 'flex-end',
		marginTop: normalize(8)
	},
	sty3: {
		width: normalize(24),
		height: normalize(24),
		marginEnd: normalize(11),
		marginBottom: normalize(3)
	},
	sty4: {
		flex: 1,
		backgroundColor: Colors.white,
		marginLeft: normalize(18),
		marginRight: normalize(21),
		marginTop: normalize(12)
	},
	sty5: {
		height: normalize(120),
		width: normalize(120),
		alignSelf: 'center',
		marginTop: normalize(4),
		borderRadius: normalize(60),
		resizeMode: Platform.OS === 'ios' ? 'cover' : 'contain',
		overflow: 'hidden',
	},
	sty6: {
		color: Colors.color12,
		fontFamily: Fonts.GothicSemiBold,
		fontSize: normalize(20),
		alignSelf: 'center',
		marginTop: normalize(12)
	},
	sty7: {
		flex: 1,
		color: Colors.color13,
		fontFamily: Fonts.Regular,
		fontSize: normalize(14),
		alignSelf: 'center',
		marginTop: normalize(4),
		width: '100%',
		textAlign: 'center'
	},
	// sty8: {
	// 	height: normalize(21),
	// 	textAlign: 'center',
	// 	textAlignVertical: 'center',
	// 	color: Colors.black,
	// 	fontFamily: Fonts.Medium,
	// 	fontSize: normalize(12),
	// 	borderRadius: normalize(25),
	// 	paddingHorizontal: normalize(10),
	// 	marginEnd: normalize(5),
	// 	backgroundColor: Colors.color6
	// },
	sty8: {
		// textAlignVertical: 'center',
		color: Colors.black,
		fontFamily: Fonts.Regular,
		fontSize: normalize(12),
		// marginEnd: normalize(2),
	},
	sty9: {
		justifyContent: 'space-around',
		flexDirection: 'row',
		marginTop: normalize(31)
	},
	sty10: {
		textAlignVertical: 'center',
		color: Colors.color13,
		fontFamily: Fonts.GothicMedium,
		fontSize: normalize(14),
	},
	sty11: {
		textAlignVertical: 'center',
		color: Colors.color12,
		fontFamily: Fonts.Regular,
		fontSize: normalize(14),
	},
	sty12: {
		fontFamily: Fonts.Medium,
		color: Colors.color14,
		fontSize: normalize(16),
		marginTop: normalize(22),
		marginLeft: normalize(12)
	},
	sty13: {
		fontFamily: Fonts.Regular,
		color: Colors.black,
		fontSize: normalize(12),
		marginLeft: normalize(12),
		marginRight: normalize(11)
	},
	sty14: {
		fontFamily: Fonts.Medium,
		color: Colors.primary,
		fontSize: normalize(9),
		marginLeft: normalize(12)
	},
	sty15: {
		height: normalize(152),
		width: normalize(152),
		marginLeft: normalize(16),
		borderRadius: normalize(10),
		resizeMode: "contain"
	},
	sty16: {
		color: Colors.hint,
		fontFamily: Fonts.Regular,
		fontSize: normalize(16)
	},
	sty17: {
		flex: 1,
		paddingTop: normalize(250),
		alignItems: 'center',
		justifyContent: 'center'
	},
	sty18: {
		height: normalize(21),
		textAlign: "center",
		textAlignVertical: "center",
		color: Colors.black,
		fontFamily: Fonts.PoppinsMedium,
		fontSize: normalize(12),
		borderRadius: Platform.OS === 'ios' ? normalize(12) : normalize(25),
		paddingHorizontal: normalize(10),
		marginEnd: normalize(8),
		backgroundColor: Colors.color6,
		overflow: 'hidden',
	},
	sty19: {
		padding: 10,
	},
	claimHeading: {
		fontWeight: "700",
		fontSize: normalize(20),
		color: Colors.black
	},
	claimText: {
		color: Colors.black,
		width: "80%",
		fontSize: normalize(12),

	},
	btnTab: {
		backgroundColor: Colors.color6,
		borderRadius: normalize(24),
		paddingHorizontal: normalize(10),
		fontSize: normalize(16),
		marginTop: 10,
		backgroundColor: Colors.primary,
		justifyContent: 'center',
	},
	tabText: {
		textAlign: "center",
		fontFamily: Fonts.GothicMedium,
		fontSize: normalize(13),
		color: Colors.white,
		paddingVertical: normalize(5),
		paddingHorizontal: normalize(8)
	},
});
