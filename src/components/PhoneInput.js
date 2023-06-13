import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, TouchableOpacity, View, TextInput } from 'react-native';
import { normalize } from '../common/Normalize';
import Fonts from '../assets/Fonts';
import Colors from '../common/Colors';
import CountryPicker from 'react-native-country-picker-modal';

function PhoneInput(props) {

    const [isVisible, setVisible] = useState(false)
    const [isFocusable, setFocus] = useState(false);

    const {
        style,
        countryCode = "GB",
        callingCode = "+44",
        title = "",
        placeholder = "Phone number",
        inputStyle,
        onChangeText,
        refs,
        isWithoutTitle = false,
        isError = false,
        isValidError = false } = props;

    const onSelect = (country) => {
        props.onSelect(country)
        setVisible(false)
    }

    return (
        <View style={styles.sty1}>
            {!isWithoutTitle ?
                <Text style={isFocusable ? styles.title1 : styles.title2}>{title != "" ? title : placeholder}</Text>
                : null}
            <View style={styles.sty2}>
                <TouchableOpacity style={[styles.sty3, style]}
                    onPress={() => setVisible(true)}>
                    <CountryPicker
                        visible={isVisible}
                        countryCode={countryCode}
                        withFlag
                        withFilter
                        withCallingCode
                        withAlphaFilter
                        onSelect={(country) => onSelect(country)}
                        onClose={() => setVisible(false)}
                    />
                    <Text style={styles.sty4}>{callingCode}</Text>
                </TouchableOpacity>

                <View style={styles.inputRoot}>
                    <View style={[isFocusable ? styles.container1 : styles.container2, style]}>
                        <TextInput
                            {...props}
                            placeholder={placeholder}
                            placeholderTextColor={Colors.color2}
                            style={[styles.textInput, inputStyle]}
                            onChangeText={onChangeText}
                            returnKeyType="next"
                            keyboardType="number-pad"
                            onFocus={() => setFocus(true)}
                            onBlur={() => setFocus(false)}
                            ref={refs}
                        />
                    </View>
                </View>
            </View>
            {isError ?
                <Text style={styles.error}>{isValidError ?
                    placeholder + " is invalid, please enter correct " + placeholder.toLowerCase() + "!"
                    : placeholder + " is required!"}</Text>
                : null}
        </View>
    );

}

export default PhoneInput;

const styles = StyleSheet.create({
    sty1: {
        marginTop: normalize(15)
    },
    sty2: {
        flexDirection: "row"
    },
    sty3: {
        flexDirection: "row",
        height: normalize(50),
        borderRadius: normalize(6),
        backgroundColor: Colors.color1,
        paddingHorizontal: normalize(10),
        marginEnd: normalize(10),
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center"
    },
    sty4: {
        color: Colors.black,
        fontSize: normalize(16),
        fontFamily: Fonts.Book
    },
    inputRoot: {
        flex: 1
    },
    container1: {
        width: "100%",
        flexDirection: "row",
        height: normalize(50),
        borderRadius: normalize(6),
        borderWidth: normalize(2),
        borderColor: Colors.primary,
        backgroundColor: Colors.white,
        paddingHorizontal: normalize(15),
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center"
    },
    container2: {
        width: "100%",
        flexDirection: "row",
        height: normalize(50),
        borderRadius: normalize(6),
        backgroundColor: Colors.color1,
        paddingHorizontal: normalize(15),
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center"
    },
    title1: {
        color: Colors.primary,
        fontSize: normalize(13),
        fontFamily: Fonts.Book,
        marginBottom: normalize(5)
    },
    title2: {
        color: Colors.black,
        fontSize: normalize(13),
        fontFamily: Fonts.Book,
        marginBottom: normalize(5)
    },
    textInput: {
        flex: 1,
        padding: 0,
        color: Colors.black,
        fontFamily: Fonts.Book,
        fontSize: normalize(16)
    },
    error: {
        color: Colors.red,
        fontSize: normalize(13),
        fontFamily: Fonts.Book,
        marginTop: normalize(3)
    }
})
