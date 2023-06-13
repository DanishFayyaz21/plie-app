import React, { useState, useEffect, useRef } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./styles";
import AppNavKeys from "../../common/AppNavKeys";
import Navigator from "../../common/Navigator";
import { Assets } from "../../assets/Icons";
import RootView from "../../components/RootView";
import PagerView from 'react-native-pager-view';
import Colors from "../../common/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncParamsKeys } from "../../common/Constants";

export default function LandingPage() {

  const viewPager = useRef(null)

  const [index, setIndex] = useState(0)

  const setVisited = async () => {
    await AsyncStorage.setItem(AsyncParamsKeys.IsVisited, JSON.stringify(true));
  }

  return (
    <RootView>

      <Image
        style={styles.sty1}
        source={Assets.plie}
        resizeMode="contain"
      />

      <PagerView style={styles.sty4}
        showPageIndicator={false}
        initialPage={0}
        ref={viewPager}
        onPageSelected={(e) => setIndex(e.nativeEvent.position)}>
        <View style={styles.sty5} key="1">
          <Image
            style={styles.sty18}
            resizeMode="contain"
            source={Assets.banner1}
          />
          <Text style={styles.sty9}>All dancing event{'\n'}in one single place</Text>
          <Text style={styles.sty10}>We centrilize all events in whole Europe, make them accessible and organized by city, country, and date.</Text>
        </View>
        <View style={styles.sty5} key="2">
          <Image
            style={styles.sty18}
            resizeMode="contain"
            source={Assets.banner2}
          />
          <Text style={styles.sty9}>Follow your favourite{'\n'}artists arround EU</Text>
          <Text style={styles.sty10}>Access the details of each event and check-out the Professional dancers or DJs attending the events.</Text>
        </View>
        <View style={styles.sty5} key="3">
          <Image
            style={styles.sty18}
            resizeMode="contain"
            source={Assets.banner3}
          />
          <Text style={styles.sty9}>Share your events{'\n'}with Friends</Text>
          <Text style={styles.sty10}>Share your favourite events with friends or other members of your dance community and connect.</Text>
        </View>
      </PagerView>

      <View style={styles.sty11}>
        <View style={[styles.sty12,
        { backgroundColor: index == 0 ? Colors.primary : Colors.color5 }]} />

        <View style={[styles.sty12,
        { backgroundColor: index == 1 ? Colors.primary : Colors.color5 }]} />

        <View style={[styles.sty12,
        { backgroundColor: index == 2 ? Colors.primary : Colors.color5 }]} />
      </View>

      <View style={styles.sty6}>
        <Text style={styles.sty7}
          onPress={() => {
            setVisited()
            Navigator.navigate(AppNavKeys.Login)
          }}>SKIP</Text>

        <TouchableOpacity
          style={styles.sty19}
          onPress={() => {
            setVisited()
            if (index < 2) viewPager.current.setPage(index + 1)
            else Navigator.navigate(AppNavKeys.Login)
          }}>
          <Image
            style={styles.sty20}
            source={Assets.right}
          />
        </TouchableOpacity>

      </View>

    </RootView>
  );
}
