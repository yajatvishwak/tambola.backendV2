import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

function Previous(props) {
  const five = [];
  var arr = props.arr;
  var t = [];
  t[0] = arr[arr.length - 1];
  t[1] = arr[arr.length - 2];
  t[2] = arr[arr.length - 3];
  t[3] = arr[arr.length - 4];
  t[4] = arr[arr.length - 5];
  for (var i = 0; i < 5; i++) {
    five.push(
      <View style={styles.rect}>
        <Text style={styles.loremIpsum}>{t[i]}</Text>
      </View>
    );
  }
  return <View style={[styles.container, props.style]}>{five}</View>;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255,255,255,1)",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },

  rect: {
    width: 58,
    height: 58,
    backgroundColor: "#E6E6E6",
    borderRadius: 100,
    justifyContent: "center",
    alignSelf: "center",
  },
  loremIpsum: {
    fontFamily: "roboto-700",
    color: "#121212",
    textAlignVertical: "center",
    textAlign: "center",
  },
});

export default Previous;
