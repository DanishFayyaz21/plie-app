import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Pressable,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Assets } from "../../assets/Icons";
import Navigator from "../../common/Navigator";
import styles from "./styles";
import { normalize } from "../../common/Normalize";
import IncDecCounter from "../../components/IncDecCounter";
import PlieButton from "../../components/PlieButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncParamsKeys } from "../../common/Constants";
import StripeModel from "../../components/StripeModel";
import SubmitModal from "../../components/SubmitModal";
import { FetchEventDetail, TicketCharge } from "../../store/actions/EventAction";
import { getApi, postApi } from "../../store/actions/ApiCallFunction";
import { PURCHASE_ONLINE_ACTIVE_URL, TICKETS_CHARGE_COMPLETED_URL, TICKETS_CHARGE_URL } from "../../common/ApiConfig";
import { PURCHASE_ONLINE_ACTIVE, TICKETS_CHARGE_COMPLETED, TICKET_CHARGE } from "../../common/StoreActionTypes";
import { confirmPayment, usePaymentSheet } from "@stripe/stripe-react-native";
import { FetchGetProfileAction } from "../../store/actions/ProfileAction";


export default function Tickets({
  onPressShare,
  onPressFavourite,
  isFavorite,
  isDisabled,
}) {
  const [ticketsData, setTicketsData] = useState([])
  const [openStripeModel, setOpenStripeModel] = useState(false)
  const [onlineActive, setOnlineActive] = useState(false)
  const user = useSelector((state) => state.CommonReducer.user);
  const EventReducer = useSelector(
    (state) => state.EventReducer.resData.data.event
  );

  console.log("iiiiii", EventReducer?.event_id)
  const VerifyUserReducer = useSelector(
    (state) => state.VerifyUserReducer.responseVerifyEditUser
  );
  const User = useSelector(
    (state) => state.ProfileReducer
  );

  console.log("XXXXXXXXXXXXXXxxxxxxx", User)


  const dispatch = useDispatch()

  let eventDateString = "",
    eventLocation = "";

  if (EventReducer.readable_from_date) {
    eventDateString += EventReducer.readable_from_date;
  }

  if (EventReducer.readable_to_date) {
    if (eventDateString) {
      eventDateString += " - ";
    }
    eventDateString += EventReducer.readable_to_date;
  }

  if (EventReducer.city) {
    eventLocation +=
      EventReducer.city.charAt(0).toUpperCase() + EventReducer.city.slice(1);
  }

  if (EventReducer.country) {
    if (eventLocation) {
      eventLocation += ", ";
    }
    eventLocation +=
      EventReducer.country.charAt(0).toUpperCase() +
      EventReducer.country.slice(1);
  }

  useEffect(() => {
    if (EventReducer) {
      setOnlineActive(EventReducer.event_online_purchase)
    }

    dispatch(FetchGetProfileAction());
  }, [])


  const activeToggle = async () => {

    try {
      const { data, success } = await getApi(`${PURCHASE_ONLINE_ACTIVE_URL}/${EventReducer.event_id}`, PURCHASE_ONLINE_ACTIVE,);

      if (success) {
        if (User.user.stripe_account_id) {
          setOnlineActive(data.activated)
        }
        else {
          ToastAndroid.showWithGravity(
            'Connect your stripe first.',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        }
      }
    } catch (error) {

      return error
    }
  }

  const orderComplete = async () => {
    const cardItems = await AsyncStorage.getItem(AsyncParamsKeys.AddToCard);
    const body = {
      cardData: JSON.parse(cardItems),
    }
    try {
      const { data } = await postApi(TICKETS_CHARGE_COMPLETED_URL, TICKETS_CHARGE_COMPLETED, {}, body);
      setOpenStripeModel(false);
      AsyncStorage.removeItem(AsyncParamsKeys.AddToCard)
      dispatch(FetchEventDetail({ elementId: EventReducer.event_date_id }, true))
    } catch (error) {
      return error;
    }
  }

  const tryAgain = async () => {
    const cardItems = await AsyncStorage.getItem(AsyncParamsKeys.AddToCard);

    const body = {
      event_id: EventReducer?.event_id,
      cardData: JSON.parse(cardItems)
    }
    const billingDetails = {
      email: user.usr_email,
    };

    const { data } = await postApi(TICKETS_CHARGE_URL, TICKET_CHARGE, {}, body)


    // Fetch the intent client secret from the backend.
    if (data.paymentIntent) {
      const clientSecret = data.paymentIntent
      const { paymentIntent, error } = await confirmPayment(clientSecret, {
        paymentMethodType: 'Card',
        paymentMethodData: {
          billingDetails,
        },
      });

      if (error) {
        console.log('Payment confirmation error', error);
      } else if (paymentIntent) {
        await orderComplete()

        console.log('Success from promise', paymentIntent);
      }
    }
  }

  const addANewOne = () => {
    setOpenStripeModel(false);
  }


  const { initPaymentSheet, presentPaymentSheet, loading } = usePaymentSheet()
  const [ready, setReady] = useState(false)
  const [isChange, SetChange] = useState(0)

  useEffect(() => {
    initialisePaymentSheet()
  }, [isChange])


  const initialisePaymentSheet = async () => {
    const { paymentIntent, ephemeralKey, customer } = await fetchPaymentSheetParams()

    const { error } = await initPaymentSheet({
      merchantDisplayName: "Example, Inc.",
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: true,
      // defaultBillingDetails: {
      //   name: 'Jane Doe',
      // }
    });

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message)
    } else {
      setReady(true)

    }
  }


  const fetchPaymentSheetParams = async () => {

    const cardItems = await AsyncStorage.getItem(AsyncParamsKeys.AddToCard);
    const body = {
      event_id: EventReducer?.event_id,
      cardData: JSON.parse(cardItems)
    }
    const { data } = await postApi(TICKETS_CHARGE_URL, TICKET_CHARGE, {}, body)

    return {
      paymentIntent: data.paymentIntent,
      ephemeralKey: data.ephemeralKey,
      customer: data.customer
    }

  }

  const buy = async () => {

    const { error, paymentOption } = await presentPaymentSheet();
    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      await orderComplete()
      Alert.alert(
        'Success',
        'Your order is confirmed!'
      );
    }
  }
















  return (
    <View style={styles.sty1}>
      <StripeModel
        visible={openStripeModel}
        information={["Oops, something went wrong", "the image size may be greater than 2MB or your connection may be unstable"]}
        title={"Card Info"}
        accepted={"try again"}
        cancel={"Add a new one"}
        onSubmit={() => tryAgain()}
        onClose={() => addANewOne()}
        height={280}
        exitFunction={() => setOpenStripeModel(false)}
      />
      {EventReducer !== undefined && (
        <View style={styles.sty2}>
          <View style={styles.sty3}>
            <Image
              style={styles.sty4}
              source={{ uri: EventReducer.event_profile_img }}
            />

            <View
              style={{
                justifyContent: "space-between",
                maxWidth: "50%",
                paddingBottom: 20,
                marginLeft: normalize(10),
              }}
            >
              <Text style={styles.sty5} adjustsFontSizeToFit>
                {EventReducer.event_name.charAt(0).toUpperCase() +
                  EventReducer.event_name.slice(1)}
              </Text>
              <Text style={styles.sty6} numberOfLines={1}>
                {eventLocation}
              </Text>
            </View>

            <View
              style={{
                justifyContent: "space-between",
                maxWidth: "50%",
                paddingBottom: 20,
              }}
            >
              <View style={styles.sty7}>
                <Pressable onPress={onPressShare}>
                  <Image style={styles.sty8} source={Assets.share} />
                </Pressable>
                <Pressable
                  disabled={isDisabled}
                  onPress={() => {
                    onPressFavourite();
                  }}
                >
                  <Image
                    resizeMode="contain"
                    style={styles.sty8}
                    source={
                      !isFavorite ? Assets.favourite_off : Assets.favourite_on
                    }
                  />
                </Pressable>
              </View>
              <Text style={styles.sty6} numberOfLines={1} adjustsFontSizeToFit>
                {eventDateString}
                {/* {EventReducer.readable_from_date.split("-")[0] +
                  "." +
                  EventReducer.readable_from_date.split("-")[1] +
                  "." +
                  EventReducer.readable_to_date.split("-")[2].slice(-2)}
                {" - "}
                {EventReducer.readable_to_date.split("-")[0] +
                  "." +
                  EventReducer.readable_to_date.split("-")[1] +
                  "." +
                  EventReducer.readable_to_date.split("-")[2].slice(-2)} */}
              </Text>
            </View>
          </View>


          <FlatList
            style={styles.sty1}
            data={EventReducer.tickets}
            renderItem={({ item }) => (
              <View style={{ marginBottom: normalize(25) }}>
                <View style={styles.sty9}>
                  <Text numberOfLines={5} style={styles.sty10}>{item.tck_title}</Text>
                  <Text>
                    <Text style={styles.sty11}>
                      {"€"}
                      {item.tck_price}
                      {item.tck_booking_fee ? " + " : " "}
                      {item.tck_booking_fee ? "€" : ""}
                      {item.tck_booking_fee ? item.tck_booking_fee : " " + " "}
                    </Text>
                    <Text style={styles.sty12}>{item.tck_booking_fee ? "(Booking fee)" : " "}</Text>
                  </Text>
                </View>

                <View style={styles.sty13} />

                <View style={styles.sty15}>
                  <Text style={styles.sty14}>{item.tck_description}</Text>
                  {(VerifyUserReducer == null && onlineActive) && <IncDecCounter SetChange={SetChange} item={item} />}
                </View>

              </View>
            )}
            showsVerticalScrollIndicator={false}
            onEndReachedThreshold={0.2}
          />
          {VerifyUserReducer ?
            (<View style={{ marginBottom: 4 }}>
              <PlieButton
                style={styles.buttonEdit}
                text={!onlineActive ? "Deactivate online purchases" : "Activate online purchases"}
                onPress={activeToggle}
              />
              <Text style={styles.sty16}>{true ? "Users won't be able to buy tickets online" : 'Allow users to buy tickets online'}</Text>
            </View>)
            :
            (<PlieButton
              style={styles.buttonEdit}
              text={"Buy"}
              disabled={!onlineActive ? true : false}
              // onPress={() => setOpenStripeModel(true)}
              onPress={buy}
            />)
          }
        </View>
      )}
    </View>
  );
}
