import { StyleSheet } from 'react-native';
import { normalize } from '../../common/Normalize';
import Colors from '../../common/Colors';
import Fonts from '../../assets/Fonts';

export default StyleSheet.create({
    sty1: {
        alignSelf: "center",
        width: normalize(146),
        height: normalize(92),
        marginTop: normalize(5)
    },
    sty3: {
        color: Colors.black,
        fontSize: normalize(32),
        fontFamily: Fonts.Medium,
        marginStart: normalize(10)
    },
    sty4: {
        flex: 1
    },
    sty5: {
        alignItems: "center",
        justifyContent: "center"
    },
    sty6: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: normalize(20)
    },
    sty7: {
        color: Colors.hint,
        fontSize: normalize(16),
        fontFamily: Fonts.Medium
    },
    sty8: {
        color: Colors.primary,
        fontSize: normalize(16),
        fontFamily: Fonts.Book,
        marginStart: normalize(5)
    },
    sty9: {
        textAlign: "center",
        color: Colors.black,
        fontSize: normalize(30),
        fontFamily: Fonts.Medium,
        lineHeight: normalize(40),
        marginTop: normalize(20)
    },
    sty10: {
        textAlign: "center",
        color: Colors.hint,
        fontSize: normalize(12),
        fontFamily: Fonts.Medium,
        marginTop: normalize(20)
    },
    sty11: {
        flexDirection: "row",
        marginBottom: normalize(20)
    },
    sty12: {
        width: normalize(8),
        height: normalize(8),
        borderRadius: normalize(4),
        marginEnd: normalize(5)
    },
    sty13: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.white,
        paddingHorizontal: normalize(30),
        paddingVertical: normalize(30)
    },
    sty14: {
        color: Colors.black,
        fontSize: normalize(24),
        fontFamily: Fonts.Medium,
        marginBottom: normalize(10)
    },
    sty15: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: normalize(48),
        borderRadius: normalize(8),
        borderWidth: normalize(1),
        borderColor: Colors.black,
        marginTop: normalize(15)
    },
    sty16: {
        width: normalize(20),
        height: normalize(20)
    },
    sty17: {
        color: Colors.black,
        fontSize: normalize(16),
        fontFamily: Fonts.Book,
        marginStart: normalize(10)
    },
    sty18: {
        width: "100%",
        height: "50%"
    },
    sty19: {
        width: normalize(25),
        height: normalize(25),
        alignItems: "center",
        justifyContent: "center"
    },
    sty20: {
        width: normalize(14),
        height: normalize(14)
    }
})