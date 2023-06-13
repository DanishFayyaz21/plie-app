import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Image,
  Pressable,
  TouchableOpacity
} from "react-native";
import { normalize } from "../common/Normalize";
import Fonts from "../assets/Fonts";
import Colors from "../common/Colors";
import { Assets } from "../assets/Icons";

function PlieTextInput(props) {

  const [isVisible, setVisible] = useState(true);
  const [isFocusable, setFocus] = useState(false);

  const {
    style,
    rootStyle,
    title = "",
    error = "",
    placeholder,
    inputStyle,
    onChangeText,
    refs,
    isWithoutTitle = false,
    isPassword = false,
    isError = false,
    isValidError = false,
    isSearchIcon = false,
    isCurrency = false,
    multiline = false,
    numberOfLines = 1,
    onPress,
    maxLengthCharacter = 100,
    intro=false,
    focusOn = () => console.log("focus in textInput"),
    focusTextInput=() => console.log("focus in textInput description")
  } = props;

  return (
    <View style={[styles.root, rootStyle]}>
      {!isWithoutTitle ?
        <Text style={styles.title}>{title != "" ? title : placeholder}</Text>
        : null}
      <Pressable style={[styles.container, style]}
        onPress={() => focusOn()}>
        {isSearchIcon ?
          <Image
            style={styles.search}
            source={Assets.search}
          /> : null}
        {isCurrency ?
          <Text style={styles.currency}>£</Text> : null}
        <TextInput
          {...props}
          placeholder={placeholder}
          placeholderTextColor={Colors.hint}
          style={[styles.textInput, inputStyle]}
          onChangeText={onChangeText}
          secureTextEntry={isPassword && isVisible}
          returnKeyType={ intro? "default" :"next"}
          blurOnSubmit={false}
          onFocus={focusTextInput}
          onBlur={() => setFocus(false)}
          ref={refs}
          maxLength={maxLengthCharacter}
          multiline={multiline}
          numberOfLines={numberOfLines}
              
        />
        {isPassword ?
          <TouchableOpacity onPress={() => setVisible(!isVisible)}>
            <Image
              style={styles.eyeIcon}
              resizeMode="contain"
              source={isVisible ? Assets.close_eye : Assets.open_eye}
            />
          </TouchableOpacity>
          : null}
      </Pressable>
      {isError ?
        <Text style={styles.error}>{isValidError ?
          isPassword ? "Password must contain 8 characters, number, and symbol" :
            placeholder + " is invalid, please enter correct " + placeholder.toLowerCase() + "!"
          : error ? error : placeholder + " is required!"}</Text>
        : null}
    </View>
  );
}

export default PlieTextInput;

const styles = StyleSheet.create({
  root: {
    marginTop: normalize(10)
  },
  container: {
    width: "100%",
    flexDirection: "row",
    height: normalize(20),
    borderRadius: normalize(4),
    backgroundColor: Colors.white,
    paddingHorizontal: normalize(12),
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
  title: {
    color: Colors.text,
    fontSize: normalize(16),
    fontFamily: Fonts.Regular,
    marginBottom: normalize(5),
    marginStart: normalize(10)
  },
  textInput: {
    flex: 1,
    padding: 0,
    color: Colors.black,
    fontFamily: Fonts.Regular,
    fontSize: normalize(14)
  },
  eyeIcon: {
    width: normalize(20),
    height: normalize(20),
    marginStart: normalize(12),
    marginEnd: normalize(5)
  },
  error: {
    color: Colors.red,
    fontSize: normalize(13),
    fontFamily: Fonts.Regular,
    marginTop: normalize(3)
  },
  search: {
    width: normalize(20),
    height: normalize(20),
    marginEnd: normalize(10)
  },
  currency: {
    color: Colors.black,
    fontFamily: Fonts.Book,
    fontSize: normalize(16)
  },
  sty1: {
    flexDirection: "row"
  },
  sty2: {
    width: normalize(20),
    height: normalize(20),
    marginStart: normalize(5)
  }
});
