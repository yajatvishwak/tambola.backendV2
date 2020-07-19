import React, { Component, useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";

function Calling(props) {
  return (
    <View style={[styles.container, props.style]}>
      <Text style={styles.loremIpsum}>{props.number}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(34,40,49,1)",
    borderRadius: 100,
    borderWidth: 19,
    borderColor: "rgba(48,71,94,1)",
    justifyContent: "center",
  },
  loremIpsum: {
    fontFamily: "roboto-700",
    color: "rgba(255,255,255,1)",
    fontSize: 50,
    alignSelf: "center",
  },
});

export default Calling;
