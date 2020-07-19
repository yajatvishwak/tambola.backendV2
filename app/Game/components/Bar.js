import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

import AwesomeButton from "react-native-really-awesome-button";

function Bar(props) {
  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.buttonContainer}>
        <AwesomeButton
          width={120}
          height={48}
          borderRadius={10}
          backgroundColor={"#f2a365"}
          backgroundDarker={"#ab5f24"}
          style={{ alignSelf: "center" }}
          onPress={props.clickBoardModal}
        >
          Board 🚩
        </AwesomeButton>
        <AwesomeButton
          width={120}
          height={48}
          borderRadius={10}
          backgroundColor={"#f2a365"}
          backgroundDarker={"#ab5f24"}
          style={{ alignSelf: "center" }}
          onPress={props.clickClaimModal}
        >
          Claim 📢
        </AwesomeButton>
        <AwesomeButton
          width={120}
          height={48}
          borderRadius={10}
          backgroundColor={"#f2a365"}
          backgroundDarker={"#ab5f24"}
          style={{ alignSelf: "center" }}
          onPress={props.clickRulesModal}
        >
          Rules 📜
        </AwesomeButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 120,
    height: 48,
    backgroundColor: "rgba(242,163,101,1)",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    bottom: 0,
  },
  login: {
    fontFamily: "roboto-700",
    color: "white",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-evenly",
  },
});

export default Bar;
