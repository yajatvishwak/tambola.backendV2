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
          <BHole style={styles.holes} done={true} value={i} />
        </View>
      );
    } else {
      holes.push(
        <View style={styles.space}>
          <BHole style={styles.holes} done={false} value={i} />
        </View>
      );
    }
  }
  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.buttonRow}>{holes}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 15,
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
    marginTop: 10,
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});

export default Board;
