import React, { useState, useRef, useEffect } from "react";
import { View, SafeAreaView, StyleSheet, Modal, ActivityIndicator } from 'react-native';
import { useSelector } from "react-redux";
import Colors from "../common/Colors";
import { normalize } from '../common/Normalize';
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppNavKeys from "../common/AppNavKeys";
import Navigator from "../common/Navigator";

export default function Loader() {

    const [showLoader, setLoading] = useState(false)
    const [tmpUnauthorised, setUnauthorised] = useState(false)
    const { CommonReducer, loader, unauthorised, message } = useSelector(state => ({
        CommonReducer: state.CommonReducer,
        loader: state.CommonReducer.isLoading,
        unauthorised: state.CommonReducer.unauthorised,
        message: state.CommonReducer.message
    }));


    const doLogout = async () => {
        try {

            const asyncStorageKeys = await AsyncStorage.getAllKeys();

            await AsyncStorage.multiRemove(asyncStorageKeys)
            await AsyncStorage.clear();
            Navigator.resetFrom(AppNavKeys.Login)
        } catch (error) {
        }
    }

    //Skipping first iteration (exactly like componentWillReceiveProps):
    const isFirstRun = useRef(true);
    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
            //componentDidMount
            setUnauthorised(unauthorised)
        } else {
            //componentWillReceiveProps
            setLoading(loader)
            if (unauthorised && tmpUnauthorised != unauthorised) {
                //SnackBar(Strings.userUnAuth)
                doLogout()
                setUnauthorised(unauthorised)

            }
        }
    }, [CommonReducer, unauthorised, loader])

    return (
        <SafeAreaView>
            <Modal
                visible={showLoader}
                transparent={true}
                // animated={true}
                // animationType="slide"
                onRequestClose={() => setLoading(false)}>
                <View style={styles.sty1}>
                    <View style={styles.sty2}>
                        <ActivityIndicator size="large" color={Colors.primary} />
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    sty1: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.modalbg
    },
    sty2: {
        height: normalize(90),
        width: normalize(90),
        borderRadius: normalize(10),
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.white
    }
})