import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

function DeetsDetails(props) {
  console.log(props);
  return (
    <View style={[styles.container, props.style]}>
      <Text style={styles.gameName}>{props.session.deets.Roomname}</Text>
      <Text style={styles.roomid}>#{props.session.roomID}</Text>
      <Text style={styles.loremIpsum}>{props.session.deets.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 10,
  },
  gameName: {
    fontFamily: "roboto-500",
    color: "#121212",
    fontSize: 20,
    marginTop: 35,
    marginLeft: 23,
  },
  roomid: {
    fontFamily: "roboto-300",
    color: "#121212",
    marginTop: 3,
    marginLeft: 23,
  },
  loremIpsum: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginTop: 32,
    marginLeft: 23,
  },
  prizePool: {
    fontFamily: "roboto-500",
    color: "#121212",
    fontSize: 20,
    marginTop: 96,
    marginLeft: 23,
  },
  rect: {
    width: 221,
    height: 165,
    backgroundColor: "rgba(255,255,255,1)",
    marginTop: 11,
    marginLeft: 23,
  },
  table: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginTop: 69,
    marginLeft: 49,
  },
  coupons50: {
    fontFamily: "roboto-500",
    color: "#121212",
    marginTop: -265,
    marginLeft: 23,
  },
  coupons51: {
    fontFamily: "roboto-500",
    color: "#121212",
    marginTop: 14,
    marginLeft: 23,
  },
});

export default DeetsDetails;
