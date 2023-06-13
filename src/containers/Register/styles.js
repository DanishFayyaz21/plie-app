import { StyleSheet } from 'react-native';
import { normalize } from '../../common/Normalize';
import Colors from '../../common/Colors';
import Fonts from '../../assets/Fonts';

export default StyleSheet.create({
    sty1: {
        flexDirection: "row"
    },
    sty2: {
        flex: 1,
        marginEnd: normalize(8)
    },
    sty3: {
        flex: 1,
        marginStart: normalize(8)
    },
    sty4: {
        flex: 1,
        height: normalize(1),
        backgroundColor: Colors.line
    },
    sty5: {
        color: Colors.line,
        fontSize: normalize(12),
        fontFamily: Fonts.Regular,
        marginHorizontal: normalize(5)
    },
    sty6: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: normalize(15)
    },
    sty7: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        marginTop: normalize(10),
        marginBottom: normalize(30)
    },
    sty8: {
        width: normalize(24),
        height: normalize(24)
    },
    sty9: {
        width: normalize(48),
        height: normalize(48)
    },
    sty10: {
        color: Colors.hint,
        fontSize: normalize(12),
        fontFamily: Fonts.Regular,
        marginTop: normalize(2)
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
        flexDirection: "row"
    },
    sty13: {
        color: Colors.black,
        fontSize: normalize(14),
        fontFamily: Fonts.Regular,
        marginStart: normalize(10),
        marginTop: normalize(5),
    },
    sty14: {
        textDecorationLine: "underline"
    },
})