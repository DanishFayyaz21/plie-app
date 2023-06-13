import React from 'react';
import {
    SafeAreaView, StyleSheet, View, KeyboardAvoidingView, Platform, StatusBar
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Colors from '../common/Colors';
import { normalize } from '../common/Normalize';
import { useIsFocused } from '@react-navigation/native';

function RootView(props) {

    const { rootStyle, style, children, isWithScroll = true,
        statusBarColor = Colors.white } = props;

    function FocusAwareStatusBar(props) {
        const isFocused = useIsFocused();
        return isFocused ?
            <View style={[styles.statusBar, statusBarColor]}>
                <StatusBar
                    translucent
                    barStyle="dark-content"
                    backgroundColor={statusBarColor}
                    {...props} />
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
                        enableResetScrollToCoords={false}
                        overScrollMode={'never'}
                        extraScrollHeight={normalize(20)}
                        extraHeight={normalize(20)}
                        contentInset={{ top: 0, bottom: 0 }}
                        contentContainerStyle={{ flexGrow: 1 }}>
                        <KeyboardAvoidingView
                            style={styles.container}
                            behavior={Platform.OS === "ios" ? "padding" : "height"}>
                            <View style={[styles.subContainer, style]}>
                                {children}
                            </View>
                        </KeyboardAvoidingView>
                    </KeyboardAwareScrollView>
                    :
                    <KeyboardAvoidingView
                        style={styles.container1}
                        behavior={Platform.OS === "ios" ? "padding" : {}}>
                        <View style={[styles.subContainer, style]}>
                            {children}
                        </View>
                    </KeyboardAvoidingView>
                }
            </SafeAreaView>
        </>
    );

}

export default RootView;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
    container1: {
        flex: 1
    },
    subContainer: {
        flex: 1,
        paddingTop: normalize(20),
        paddingHorizontal: normalize(15)
    },
    statusBar: {
        height: StatusBar.currentHeight
    }
})
