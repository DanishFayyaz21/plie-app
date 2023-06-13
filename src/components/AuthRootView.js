import React from 'react';
import {
    SafeAreaView, StyleSheet, View, KeyboardAvoidingView, Platform, StatusBar,
    TouchableOpacity, Image, useColorScheme
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Colors from '../common/Colors';
import { normalize } from '../common/Normalize';
import { useIsFocused } from '@react-navigation/native';
import Header from './Header';
import { Assets } from '../assets/Icons';

function AuthRootView(props) {

    const { rootStyle, style, children, isWithScroll = true,
        statusBarColor = Colors.header, isWithoutBack = false, onPress,
        isWithoutHeader = false } = props;  

    function FocusAwareStatusBar(props) {
        const isFocused = useIsFocused();
        const colorScheme = useColorScheme();
        return isFocused ?
            <View style={[styles.statusBar, statusBarColor]}>
                {/* <StatusBar
                    translucent
                    barStyle="default"
                    backgroundColor={statusBarColor}
                    {...props} /> */}
                    <StatusBar
                    translucent
				backgroundColor={colorScheme == 'light' ? statusBarColor : '#000'}
				barStyle={colorScheme == 'light' ? 'dark-content' : 'light-content'}
                {...props}
			/>
            </View> : null;
    }

    return (
        <>
            <FocusAwareStatusBar />
            <SafeAreaView style={[styles.container, rootStyle]}>
                {isWithScroll ?
                    <KeyboardAwareScrollView
                        enableOnAndroid
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps={"handled"}
                        // enableResetScrollToCoords={false}
                        extraScrollHeight={normalize(30)}
                        extraHeight={normalize(30)}
                        // contentInset={{ top: 0, bottom: 0 }}
                        overScrollMode={"never"}
                        bounces={false}
                        keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
                        contentContainerStyle={{ flexGrow: 1 }}
                    >
                        {/*<KeyboardAvoidingView
                            //style={styles.container}
                            behavior={Platform.OS === "ios" ? "padding" : ""}>*/}
                            <View>
                                {!isWithoutHeader ?
                                    <Header /> : null}
                                {!isWithoutBack ?
                                    <TouchableOpacity style={styles.sty1}
                                        onPress={onPress}>
                                        <Image
                                            style={styles.sty2}
                                            source={Assets.back}
                                        />
                                    </TouchableOpacity>
                                    : null}
                                <View style={[styles.subContainer, style]}>
                                    {children}
                                </View>
                            </View>
                        {/*</KeyboardAvoidingView>*/}
                    </KeyboardAwareScrollView>
                    :
                    <KeyboardAvoidingView
                        style={styles.container1}
                        behavior={Platform.OS === "ios" ? "padding" : {}}>
                        <View>
                            {!isWithoutHeader ?
                                <Header /> : null}
                            {!isWithoutBack ?
                                <TouchableOpacity style={styles.sty1}
                                    onPress={onPress}>
                                    <Image
                                        style={styles.sty2}
                                        source={Assets.back}
                                    />
                                </TouchableOpacity>
                                : null}
                            <View style={[styles.subContainer, style]}>
                                {children}
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                }
            </SafeAreaView>
        </>
    );

}

export default AuthRootView;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
    container1: {
        flex: 1
    },
    subContainer: {
        //flex: 1,
        //paddingTop: normalize(20),
        paddingHorizontal: normalize(20)
        },
    statusBar: {
        height: StatusBar.currentHeight
    },
    sty1: {
        width: normalize(24),
        height: normalize(24),
        justifyContent: "center",
        marginStart: normalize(8),
        marginTop: normalize(3)
    },
    sty2: {
        alignSelf: "center",
        width: normalize(24),
        height: normalize(24)
    }
})