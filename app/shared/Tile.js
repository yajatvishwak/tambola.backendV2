import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

const Tile = (props) => {
  return (
    <View style={{ ...styles.tile, ...props.styles }}>
      <Text style={styles.text}>42</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  text: {
    fontFamily: "roboto-500",
    color: "#121212",
    fontSize: 60,

    alignSelf: "center",
  },
  tile: {
    width: 100,
    height: 100,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 27,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 5,
    shadowOpacity: 0.3,
    shadowRadius: 25,
    borderWidth: 3,
    borderColor: "#000000",
    marginTop: 50,

    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
  },
});
export default Tile;
