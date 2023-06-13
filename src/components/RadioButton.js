import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { normalize } from '../common/Normalize';
import Colors from '../common/Colors';

function RadioButton(props) {

    const [checked, setChecked] = useState(false);

    const { style, isChecked } = props;

    useEffect(() => {
        setChecked(isChecked);
    }, [isChecked]);

    const onValueChange = () => {
        props.onChecked(!checked)
        setChecked(!checked)
    }

    return (
        <TouchableOpacity style={[styles.container, style]}
            onPress={() => onValueChange()}>
            {checked ? <View style={styles.view} /> : null}
        </TouchableOpacity>
    );

}

export default RadioButton;

const styles = StyleSheet.create({
    container: {
        width: normalize(16),
        height: normalize(16),
        borderColor: Colors.color3,
        backgroundColor: Colors.white,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    view: {
        width: normalize(12),
        height: normalize(12),
        backgroundColor: Colors.primary
    }
})
