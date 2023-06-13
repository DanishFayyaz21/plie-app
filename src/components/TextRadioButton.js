import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { normalize } from '../common/Normalize';
import Fonts from '../assets/Fonts';
import Colors from '../common/Colors';

function TextRadioButton(props) {

    const [checked, setChecked] = useState(false);

    const { style, isChecked, text, isRecommended = false } = props;

    useEffect(() => {
        setChecked(isChecked);
    }, [isChecked]);

    const onValueChange = () => {
        props.onChecked(!checked)
        setChecked(!checked)
    }

    return (
        <TouchableOpacity
            style={[styles.sty1, style, { borderColor: checked ? Colors.primary : Colors.color7 }]}
            onPress={() => onValueChange()}>
            <View>
                {isRecommended ? <Text style={styles.sty5}>Recommended</Text> : null}
                <Text style={styles.sty2}>{text}</Text>
            </View>
            <View
                style={[styles.sty3, { borderColor: checked ? Colors.primary : Colors.color7 }]}>
                {checked ? <View style={styles.sty4} /> : null}
            </View>
        </TouchableOpacity>
    );

}

export default TextRadioButton;

const styles = StyleSheet.create({
    sty1: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: normalize(1.5),
        borderRadius: normalize(6),
        borderColor: Colors.color7,
        marginTop: normalize(15),
        paddingHorizontal: normalize(15)
    },
    sty2: {
        color: Colors.black,
        fontSize: normalize(16),
        fontFamily: Fonts.Book,
        marginVertical: normalize(13)
    },
    sty3: {
        width: normalize(20),
        height: normalize(20),
        borderRadius: normalize(10),
        borderWidth: normalize(1),
        borderColor: Colors.color7,
        backgroundColor: Colors.white,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
    },
    sty4: {
        alignSelf: "center",
        width: normalize(12),
        height: normalize(12),
        borderRadius: normalize(6),
        backgroundColor: Colors.primary
    },
    sty5: {
        width: normalize(110),
        height: normalize(16),
        textAlign: "center",
        color: Colors.white,
        fontSize: normalize(13),
        fontFamily: Fonts.Book,
        backgroundColor: Colors.primary,
        borderRadius: normalize(8),
        marginTop: normalize(10),
        overflow: "hidden"
    }
})
