import React, { Component, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import BHole from "./BHole";

function Board(props) {
  var done = props.done || [10];
  var holes = [];

  for (var i = 1; i <= 90; i++) {
    if (done.indexOf(i) !== -1) {
      holes.push(
        <View style={styles.space}>
          <BHole done={true} value={i} />
        </View>
      );
    } else {
      holes.push(
        <View style={styles.space}>
          <BHole done={false} value={i} />
        </View>
      );
    }
  }
  return (
    <View style={[styles.container, props.style]}>
      <Text style={styles.whichCategory}>Board So far...</Text>
      <View style={styles.buttonRow}>{holes}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  whichCategory: {
    fontFamily: "roboto-700",
    color: "#121212",
    fontSize: 30,
    alignSelf: "center",
    marginTop: 100,
  },
  notMarkedText: {
    alignSelf: "center",
  },
  space: {
    marginBottom: 5,
  },

  markedText: {
    fontFamily: "roboto-700",
    color: "rgba(255,255,255,1)",
    marginTop: 11,
    marginLeft: 9,
  },

  buttonRow: {
    height: 36,
    flexDirection: "row",
    marginTop: 50,
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
});

export default Board;
