import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, TouchableOpacity, Keyboard, Platform, Image } from 'react-native';
import { normalize } from '../common/Normalize';
import Fonts from '../assets/Fonts';
import Colors from '../common/Colors';

function PlieButton(props) {

    const { style, onPress, textStyle, text, isBottom = true,
        icon, iconStyle, disabled = false, isReverse = false } = props;

    const [bottomMargin, setBottomMargin] = useState(20)

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => Platform.OS === "ios" ? setBottomMargin(25) : setBottomMargin(15))

        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => setBottomMargin(20))

        return () => {
            keyboardDidHideListener.remove()
            keyboardDidShowListener.remove()
        };
    }, []);
    return (
        <TouchableOpacity style={[isReverse ? styles.container1 : styles.container2, style, {
            //marginBottom: isBottom ? normalize(bottomMargin) : 0
        }]} onPress={onPress} disabled={disabled} >
            {icon ?
                <Image
                    style={[styles.icon, iconStyle]}
                    source={icon}
                /> : null}
            <Text style={[isReverse ? styles.text1 : styles.text2, textStyle]}>{text}</Text>
        </TouchableOpacity>
    );

}

export default PlieButton;

const styles = StyleSheet.create({
    container1: {
        flexDirection: "row",
        height: normalize(38),
        borderRadius: normalize(4),
        borderWidth: normalize(1),
        marginBottom: normalize(10),
        marginTop: normalize(20),
        paddingHorizontal: normalize(24),
        backgroundColor: Colors.white,
        borderColor: Colors.primary,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "flex-end",

    },
    container2: {
        flexDirection: "row",
        height: normalize(38),
        borderRadius: normalize(4),
        marginBottom: normalize(10),
        marginTop: normalize(20),
        paddingHorizontal: normalize(24),
        backgroundColor: Colors.primary ,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "flex-end"
    },
    text1: {
        color: Colors.primary,
        fontFamily: Fonts.Medium,
        fontSize: normalize(16)
    },
    text2: {
        color: Colors.white,
        fontFamily: Fonts.Medium,
        fontSize: normalize(12)
    },
    icon: {
        width: normalize(20),
        height: normalize(20),
        marginEnd: normalize(10)
    }
})
