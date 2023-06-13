import React from "react";
import { Text, StyleSheet, TouchableOpacity, Image, View } from "react-native";
import { normalize } from "../common/Normalize";
import Fonts from "../assets/Fonts";
import Colors from "../common/Colors";

function FileUpload(props) {
  const { title, style, onPress, file, isError = false, error } = props;

  return (
    <View style={style}>
      {title ? <Text style={styles.title}>{title}</Text> : null}
      <TouchableOpacity style={styles.sty1} onPress={onPress}>
        {file ? (
          <Image
            style={styles.sty3}
            resizeMode="contain"
            source={{ uri: file }}
          />
        ) : (
          <Text style={styles.sty2}>Upload</Text>
        )}
      </TouchableOpacity>
      {isError && title ? (
        <Text style={styles.error}>
          {title.toLowerCase() + " is required!"}
        </Text>
      ) : isError && error ? (
        <Text style={styles.error}>{error.toLowerCase()}</Text>
      ) : null}
    </View>
  );
}

export default FileUpload;

const styles = StyleSheet.create({
  title: {
    color: Colors.black,
    fontSize: normalize(13),
    fontFamily: Fonts.Book,
  },
  sty1: {
    height: normalize(160),
    alignItems: "center",
    justifyContent: "center",
    borderWidth: normalize(1),
    borderStyle: "dashed",
    borderRadius: normalize(8),
    borderColor: Colors.color4,
    marginTop: normalize(5),
  },
  sty2: {
    color: Colors.color4,
    fontSize: normalize(16),
    fontFamily: Fonts.Book,
  },
  sty3: {
    width: "100%",
    height: "100%",
  },
  error: {
    color: Colors.red,
    fontSize: normalize(13),
    fontFamily: Fonts.Book,
    marginTop: normalize(3),
  },
});
