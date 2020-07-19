import React, { useState } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";

const InputModal = (props) => {
  const handlePress = () => {
    props.startGame();
    props.handleInputModal();
  };
  return (
    <View style={styles.container}>
      <Text style={styles.adminTitle}>
        How much to wait before next number call? (in seconds)
      </Text>
      <TextInput
        onChangeText={props.updateInterval}
        placeholder={"Enter interval (minimum 15)"}
        style={styles.textbox}
      ></TextInput>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text>Start!</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(227,214,214,1)",
  },
  adminTitle: {
    fontFamily: "roboto-900",
    color: "#121212",
    margin: 10,
    fontSize: 17,
    alignSelf: "center",
  },
  textbox: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 52,
    width: 245,
    backgroundColor: "rgba(236,236,236,1)",
    textAlign: "center",
    borderRadius: 24,
    marginBottom: 40,
  },
  button: {
    width: 200,
    height: 40,
    backgroundColor: "rgba(242,163,101,1)",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 5,
    shadowOpacity: 0.3,
    shadowRadius: 25,
    borderRadius: 20,

    marginBottom: 10,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
});
export default InputModal;
