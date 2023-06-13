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
        alignSelf: "center",
        width: normalize(100),
        height: normalize(100),
        borderColor: Colors.primary,
        borderWidth: normalize(3),
        borderRadius: normalize(50)
    },
    sty5: {
        width: normalize(29),
        height: normalize(29),
        borderRadius: normalize(15),
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.primary,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        position: "absolute",
        end: 0,

    },
    editLocation: {
        width: normalize(29),
        height: normalize(29),
        borderRadius: normalize(15),
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.primary,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        // position: "absolute",
        marginStart: normalize(10),
        end: 0,

    },
    sty6: {
        width: normalize(13),
        height: normalize(16.5),
    },
    sty7: {
        alignSelf: "center",
        width: normalize(100),
        height: normalize(100),
        borderRadius: normalize(50)
    },
    sty8: {
        alignSelf: "center",
        marginTop: normalize(50)
    },
    sty9: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row"
    },
    sty10: {
        alignSelf: "center",
        color: Colors.black,
        fontSize: normalize(24),
        fontFamily: Fonts.Regular,
        marginTop: normalize(30),
        marginBottom: normalize(30)
    },
    sty11: {
        width: normalize(25),
        height: normalize(25),
        position: "absolute",
        end: 0
    },
    sty12: {
        width: normalize(25),
        height: normalize(25)
    },
    sty13: {
        alignSelf: "center",
        color: Colors.text,
        fontSize: normalize(16),
        fontFamily: Fonts.Regular,
        marginTop: normalize(10),
        marginBottom: normalize(30)
    },
    sty14: {
        alignSelf: "center",
        color: Colors.text,
        fontSize: normalize(16),
        fontFamily: Fonts.Regular,
        marginTop: normalize(50),
        marginBottom: normalize(10)
    },
    sty15: {
        color: Colors.red,
        fontSize: normalize(16),
        fontFamily: Fonts.Regular
    },
    sty16: {
        width: '62%',
        height: normalize(48),
        backgroundColor: Colors.color18,
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
        elevation: 5,
        alignSelf: "center",

    },
    sty17: {
        width: '100%',
        height: normalize(48)
    },
    sty18: {
        width: '100%',
        height: normalize(48),
        color: Colors.white,
        textAlign: 'center',
        fontSize: 18,
        paddingTop: 12,
        fontWeight: '600'
    },

})