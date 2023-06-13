import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "../common/Colors";
import { normalize } from "../common/Normalize";
import Fonts from "../assets/Fonts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncParamsKeys } from "../common/Constants";
import { useEffect } from "react";

function IncDecCounter({ item, SetChange }) {
    const [num, setNum] = useState(0);
    const incNum = () => {
        if (num < 10) {
            setNum(Number(num) + 1);
        }
    };
    const decNum = () => {
        if (num > 0) {
            setNum(num - 1);
        }
    }
    useEffect(() => {
        AsyncStorage.getItem(AsyncParamsKeys.AddToCard).then((data) => {
            const itemData = JSON.parse(data);
            const findItem = itemData && itemData.find((it) => it.tck_id === item.tck_id)
            if (findItem) {
                setNum(findItem.qyt);
            }
        })
    }, [])


    useEffect(() => {
        addToCard(Number(num))
    }, [num])


    const addToCard = async (num) => {
        const cards = await AsyncStorage.getItem(AsyncParamsKeys.AddToCard);
        if (cards) {
            let cardsFormat = JSON.parse(cards);
            if (cardsFormat.find((el) => el.tck_id === item.tck_id)) {
                const index = cardsFormat.findIndex((el) => el.tck_id === item.tck_id)
                if (num > 0) {
                    cardsFormat[index].qyt = num;
                } else {
                    cardsFormat.splice(index, 1)
                }

            } else {
                cardsFormat.push({
                    tck_id: item.tck_id,
                    tck_price: item.tck_price,
                    qyt: num
                })
            }
            await AsyncStorage.setItem(AsyncParamsKeys.AddToCard, JSON.stringify(cardsFormat));
            setTimeout(() => {
                SetChange(JSON.stringify(cardsFormat))

            }, 1000)

        } else {
            await AsyncStorage.setItem(AsyncParamsKeys.AddToCard, JSON.stringify([{
                tck_id: item.tck_id,
                tck_price: item.tck_price,
                qyt: num
            }]));
            setTimeout(() => {

                SetChange(JSON.stringify([{
                    tck_id: item.tck_id,
                    tck_price: item.tck_price,
                    qyt: num
                }]))
            }, 1000)
        }
    }
    return (
        <>
            <View style={styles.sty1}>
                <TouchableOpacity style={styles.sty3} onPress={decNum} >
                    <Text style={styles.sty6}>-</Text>
                </TouchableOpacity>
                <Text style={styles.sty4}>{num}</Text>
                <TouchableOpacity style={styles.sty5} onPress={incNum} >
                    <Text style={styles.sty7}>+</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}

export default IncDecCounter;

const styles = StyleSheet.create({
    sty1: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        padding: 12
    },
    sty3: {
        width: 38,
        height: 38,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.color1,
        borderRadius: 14,
        textAlign: 'center'
    },
    sty4: {
        width: 38,
        height: 38,
        textAlign: 'center',
        color: Colors.hint,
        fontSize: normalize(18),
    },
    sty5: {
        width: 38,
        height: 38,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.primary,
        borderRadius: 14,
        textAlign: 'center'
    },
    sty6: {
        fontFamily: Fonts.PoppinsRegular,
        fontSize: normalize(28),
        color: Colors.hint,
    },
    sty7: {
        fontFamily: Fonts.PoppinsRegular,
        fontSize: normalize(28),
        color: Colors.white,
    },
});