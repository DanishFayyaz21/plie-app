import React, { useEffect, useRef } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { normalize } from "../common/Normalize";
import Fonts from "../assets/Fonts";
import Colors from "../common/Colors";
import OTPInputView from '@twotalltotems/react-native-otp-input';

const { width } = Dimensions.get("window")

function PinInput(props) {

  const otpView = useRef(null)

  const {
    style,
    code,
    title = "",
    placeholder,
    onCodeChanged,
    isWithoutTitle = false,
    isError = false,
    isValidError = false
  } = props;

  // useEffect(() => {
  //   if (otpView && otpView.current) {
  //     setTimeout(() => {
  //       otpView.current.focusField(0)
  //     }, 500)
  //   }
  // }, [otpView])

  const onCodeFilled = () => {
    //props.onCodeFilled()
  }

  return (
    <View style={[styles.root, style]}>
      {!isWithoutTitle ?
        <Text style={styles.title}>{title}</Text>
        : null}
      <OTPInputView
        ref={otpView}
        style={styles.sty1}
        pinCount={4}
        code={code}
        onCodeChanged={onCodeChanged}
        //autoFocusOnLoad
        secureTextEntry
        codeInputFieldStyle={styles.sty2}
        codeInputHighlightStyle={styles.sty3}
        onCodeFilled={code => onCodeFilled()}
      />
      {isError ?
        <Text style={styles.error}>{isValidError ?
          placeholder + " is invalid, please enter correct " + placeholder.toLowerCase() + "!"
          : placeholder + " is required!"}</Text>
        : null}
    </View>
  );
}

export default PinInput;

const styles = StyleSheet.create({
  root: {
    marginTop: normalize(15)
  },
  title: {
    color: Colors.black,
    fontSize: normalize(13),
    fontFamily: Fonts.Book,
    marginBottom: normalize(5)
  },
  error: {
    color: Colors.red,
    fontSize: normalize(13),
    fontFamily: Fonts.Book,
    marginTop: normalize(3)
  },
  sty1: {
    width: "100%",
    height: normalize(57),
    alignSelf: "center"
  },
  sty2: {
    width: width / 5,
    height: normalize(57),
    color: Colors.black,
    fontFamily: Fonts.Medium,
    fontSize: normalize(26),
    borderWidth: normalize(1),
    borderRadius: normalize(8)
  },
  sty3: {
    borderColor: Colors.primary
  }
});
