import React, { useState, useRef } from "react";
import { StyleSheet, View, TextInput, Text } from "react-native";
import { normalize } from "../common/Normalize";
import Fonts from "../assets/Fonts";
import Colors from "../common/Colors";

function DateInput(props) {

  const [isFocusable1, setFocus1] = useState(false);
  const [isFocusable2, setFocus2] = useState(false);
  const [isFocusable3, setFocus3] = useState(false);

  const [dd, setDD] = useState("")
  const [mm, setMM] = useState("")
  const [yy, setYY] = useState("")

  //const ref1 = useRef(null)
  const ref2 = useRef(null)
  const ref3 = useRef(null)

  const { style, title, inputStyle, refs, isError = false } = props;

  const onDateSubmit = () => {
    let date = yy + "-" + mm + "-" + dd
    props.onDateSubmit(date)
  }

  return (
    <View style={styles.root}>
      <Text style={styles.title}>{title}</Text>
      <View style={[styles.container, style]}>
        <TextInput
          {...props}
          maxLength={2}
          placeholder={"DD"}
          placeholderTextColor={Colors.color2}
          style={[isFocusable1 ? styles.textInput1 : styles.textInput2, inputStyle]}
          onChangeText={(text) => {
            if (text.length == 2) {
              setDD(text)
              ref2.current.focus()
            }
          }}
          returnKeyType="next"
          keyboardType="number-pad"
          onFocus={() => setFocus1(true)}
          onBlur={() => setFocus1(false)}
          ref={refs}
        />

        <TextInput
          {...props}
          maxLength={2}
          placeholder={"MM"}
          placeholderTextColor={Colors.color2}
          style={[isFocusable2 ? styles.textInput1 : styles.textInput2, inputStyle,
          { marginHorizontal: normalize(10) }]}
          onChangeText={(text) => {
            if (text.length == 2) {
              setMM(text)
              ref3.current.focus()
            }
          }}
          returnKeyType="next"
          keyboardType="number-pad"
          onFocus={() => setFocus2(true)}
          onBlur={() => setFocus2(false)}
          ref={ref2}
        />

        <TextInput
          {...props}
          maxLength={4}
          placeholder={"YYYY"}
          placeholderTextColor={Colors.color2}
          style={[isFocusable3 ? styles.textInput1 : styles.textInput2, inputStyle]}
          onChangeText={(text) => {
            if (text.length == 4) {
              setYY(text)
              onDateSubmit()
            }
          }}
          returnKeyType="next"
          keyboardType="number-pad"
          onFocus={() => setFocus3(true)}
          onBlur={() => setFocus3(false)}
          ref={ref3}
        />
      </View>
      {isError ?
        <Text style={styles.error}>{title.toLowerCase() + " is required!"}</Text>
        : null}
    </View>
  );
}

export default DateInput;

const styles = StyleSheet.create({
  root: {
    marginTop: normalize(15)
  },
  container: {
    width: "100%",
    flexDirection: "row"
  },
  title: {
    color: Colors.black,
    fontSize: normalize(13),
    fontFamily: Fonts.Book,
    marginBottom: normalize(5)
  },
  textInput1: {
    flex: 1,
    padding: 0,
    height: normalize(50),
    textAlign: "center",
    color: Colors.black,
    fontFamily: Fonts.Book,
    fontSize: normalize(16),
    borderRadius: normalize(6),
    borderWidth: normalize(2),
    borderColor: Colors.primary,
    backgroundColor: Colors.white
  },
  textInput2: {
    flex: 1,
    padding: 0,
    height: normalize(50),
    textAlign: "center",
    color: Colors.black,
    fontFamily: Fonts.Book,
    fontSize: normalize(16),
    borderRadius: normalize(6),
    backgroundColor: Colors.color1
  },
  error: {
    color: Colors.red,
    fontSize: normalize(13),
    fontFamily: Fonts.Book,
    marginTop: normalize(3)
  }
});
