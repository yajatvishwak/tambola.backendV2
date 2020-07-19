import React, { Component, useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

function Hole(props) {
  const [punched, setpunched] = useState(false);

  var onpresshandler = () => {
    setpunched(!punched);
    if (!punched) {
      props.addMarked(props.value);
    } else {
      props.removeMarked(props.value);
    }
  };

  if (props.value === 0) {
    //console.log(props.done);
    return (
      <View style={styles.button0} onPress={onpresshandler}>
        <Text style={styles.notMarkedText}></Text>
      </View>
    );
  } else {
    return (
      <TouchableOpacity
        style={
          punched
            ? styles.buttonP
            : props.done === null
            ? styles.button5
            : props.done.indexOf(props.value) > -1
            ? styles.button5
            : styles.button6
        }
        onPress={onpresshandler}
      >
        <Text style={punched ? styles.MarkedText : styles.notMarkedText}>
          {props.value}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(176,176,176,1)",
    borderRadius: 100,
    borderColor: "rgba(98,93,93,1)",
    borderWidth: 2,
    borderStyle: "dashed",
  },
  button5: {
    width: 38,
    height: 38,
    backgroundColor: "rgba(255,255,255,1)",
    borderWidth: 2,
    borderColor: "rgba(242,163,101,1)",
    borderRadius: 34,
    marginLeft: 3,
    marginRight: 3,
    alignContent: "center",
    justifyContent: "center",
  },
  button6: {
    width: 38,
    height: 38,
    backgroundColor: "rgba(255,255,255,1)",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 34,
    marginLeft: 3,
    marginRight: 3,
    alignContent: "center",
    justifyContent: "center",
  },
  button0: {
    width: 38,
    height: 38,
    backgroundColor: "grey",
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 34,
    marginLeft: 3,
    marginRight: 3,
    alignContent: "center",
    justifyContent: "center",
  },
  buttonP: {
    width: 38,
    height: 38,
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

export default Hole;
