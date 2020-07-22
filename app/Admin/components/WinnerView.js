import React, { Component, useEffect } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";

function WinnerView(props) {
  const winners = [];
  props.winners.forEach((item) => {
    winners.push(
      <View style={styles.rect}>
        <Text style={styles.yajat}>{item}</Text>
      </View>
    );
  });

  return (
    <ScrollView style={[styles.container, props.style]}>{winners}</ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 7,
    marginBottom: 20,
  },
  rect: {
    width: 300,
    height: 75,
    backgroundColor: "rgba(245,245,245,1)",
    borderRadius: 7,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 0,
    },
    elevation: 2,
    shadowOpacity: 0.25,
    shadowRadius: 5,
    flexDirection: "row",
    marginTop: 15,
    marginLeft: 13,
    marginBottom: 15,
    alignItems: "center",
  },
  firstRow: {
    fontFamily: "roboto-regular",
    color: "#121212",
    fontSize: 15,
  },
  yajat: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginLeft: 8,
    marginTop: 1,
  },
});

export default WinnerView;
