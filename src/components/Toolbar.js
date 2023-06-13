import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { normalize } from '../common/Normalize';
import Fonts from '../assets/Fonts';
import Colors from '../common/Colors';
import { Assets } from '../assets/Icons';
//import * as Progress from 'react-native-progress';

function Toolbar(props) {

    const { style, onPress, isWithoutTitle = false, text,
        isShowProgress = true, progress = 0.0 } = props;

    return (
        <View style={style}>
            <View style={styles.sty1}>
                {/* {isShowProgress ?
                    <Progress.Bar
                        color={Colors.primary}
                        borderColor={Colors.primary}
                        progress={progress}
                        width={normalize(130)} /> : null} */}
                <TouchableOpacity style={styles.sty3}
                    onPress={onPress}>
                    <Image
                        style={styles.sty4}
                        source={Assets.back}
                    />
                </TouchableOpacity>
            </View>

            {!isWithoutTitle ? <Text style={styles.sty5}>{text}</Text> : null}
        </View>
    );

}

export default Toolbar;

const styles = StyleSheet.create({
    sty1: {
        height: normalize(22),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    sty2: {
        alignSelf: "center",
        width: normalize(130),
        height: normalize(6),
        borderRadius: normalize(3),
        backgroundColor: Colors.primary
    },
    sty3: {
        width: normalize(22),
        height: normalize(22),
        justifyContent: "center",
        position: "absolute",
        start: 0
    },
    sty4: {
        alignSelf: "center",
        width: normalize(14),
        height: normalize(14)
    },
    sty5: {
        color: Colors.black,
        fontSize: normalize(24),
        fontFamily: Fonts.Medium,
        marginTop: normalize(15),
        marginBottom: normalize(10)
    }
})
