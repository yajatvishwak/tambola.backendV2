import React, { Component, useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

function BHole(props) {
  return (
    <View style={props.done ? styles.buttonP : styles.button5}>
      <Text style={props.done ? styles.MarkedText : styles.notMarkedText}>
        {props.value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(176,176,176,1)",
    borderRadius: 100,
    borderColor: "rgba(98,93,93,1)",
    borderWidth: 2,
    borderStyle: "dashed",
    margin: 5,
  },
  button5: {
    width: 35,
    height: 35,
    backgroundColor: "rgba(255,255,255,1)",
    borderWidth: 2,
    borderColor: "rgba(242,163,101,1)",
    borderRadius: 34,
    marginLeft: 3,
    marginRight: 3,
    alignContent: "center",
    justifyContent: "center",
  },
  button0: {
    width: 35,
    height: 35,
    backgroundColor: "#8d8e8f",
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 34,
    marginLeft: 3,
    marginRight: 3,
    alignContent: "center",
    justifyContent: "center",
  },
  buttonP: {
    width: 35,
    height: 35,
    backgroundColor: "#30475e",
    borderWidth: 2,
    borderColor: "rgba(242,163,101,1)",
    borderRadius: 34,
    marginLeft: 3,
    marginRight: 3,
    alignContent: "center",
    justifyContent: "center",
  },
  notMarkedText: {
    alignSelf: "center",
  },
  MarkedText: {
    alignSelf: "center",
    color: "white",
  },

  zeroText: {
    color: "white",
  },
});

export default BHole;
