import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import AwesomeButton from "react-native-really-awesome-button";

function Session(props) {
  var string = "";
  for (var i = 0; i < 100; i++) {
    if (props.deets.description[i]) string += props.deets.description[i];
  }

  string += "...";

  const onPressHandler = () => {
    props.updateSelected(props.item);
    props.openDeets();
  };

  //console.log(string);
  return (
    <View style={[styles.container, props.style]}>
      <Text style={styles.gameName}>
        {props.deets.Roomname + " (" + props.type + ")"}
      </Text>
      <Text style={styles.roomid}>
        #{props.roomID} {props.isActive ? "- Now Playing" : ""}
      </Text>
      <Text style={styles.roomid}>Owned by : {props.ownedBy}</Text>

      <Text style={styles.description}>{string}</Text>
      <View style={styles.buttonRow}>
        <AwesomeButton
          width={100}
          height={40}
          borderRadius={30}
          backgroundColor={"#30475e"}
          backgroundDarker={"#222831"}
          style={{ alignSelf: "center" }}
          onPress={() => onPressHandler()}
        >
          Register?
        </AwesomeButton>
      </View>
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
    marginTop: 15,
    marginLeft: 14,
  },
  roomid: {
    fontFamily: "roboto-regular",
    color: "#121212",
    fontSize: 14,
    marginTop: 4,
    marginLeft: 14,
  },
  description: {
    fontFamily: "roboto-regular",
    color: "#121212",
    textAlign: "justify",
    color: "rgba(0, 0, 0, 0.68)",
    fontSize: 14,
    marginTop: 10,
    marginLeft: 14,
    marginRight: 14,
  },
  button: {
    width: 83,
    height: 30,
    backgroundColor: "rgba(34,40,49,1)",
    borderRadius: 12,
    justifyContent: "center",
    alignContent: "center",
  },
  joinGame: {
    fontFamily: "roboto-500",
    color: "rgba(255,255,255,1)",
    fontSize: 10,
    alignSelf: "center",
  },
  button1: {
    width: 83,
    height: 30,
    backgroundColor: "rgba(48,71,94,1)",
    borderRadius: 7,
    marginLeft: 0,
    justifyContent: "center",
    alignContent: "center",
  },
  deets: {
    fontFamily: "roboto-500",
    color: "rgba(255,255,255,1)",
    fontSize: 10,
    alignSelf: "center",
  },
  buttonRow: {
    height: 30,
    flexDirection: "row",
    marginTop: 18,
    marginLeft: 14,
    marginRight: 109,
  },
});

export default Session;
