import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Rect = (props) => {
  //console.log(props);
  const [selected, setselected] = useState(false);
  return (
    <TouchableOpacity
      style={styles.rect}
      onPress={() => {
        setselected(!selected);
        if (selected === true) props.rem(props.element);
        else props.add(props.element);
      }}
    >
      <View style={styles.loremIpsumStackRow}>
        {selected && <Icon name="check" style={styles.icon}></Icon>}
        <Text style={styles.yajat}>{props.element}</Text>
      </View>
    </TouchableOpacity>
  );

  //console.log(name);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  close1: {
    fontFamily: "roboto-700",
    color: "rgba(255,255,255,1)",
    fontSize: 20,
  },
  buttonWrap: {
    flex: 1,
    flexDirection: "row",
    alignSelf: "center",
  },
  icon: {
    color: "rgba(128,128,128,1)",
    fontSize: 18,
    height: 20,
    width: 18,
    alignSelf: "flex-end",
  },
  loremIpsumStackRow: {
    height: 20,
    flexDirection: "row",
    flex: 1,
    marginRight: 11,
    marginLeft: 9,
    marginTop: 9,
  },
  rect: {
    width: 300,
    height: 40,
    backgroundColor: "rgba(245,245,245,1)",
    borderRadius: 7,
    flexDirection: "row",
    marginTop: 25,
    alignSelf: "center",
  },
  button1: {
    width: 130,
    height: 50,
    backgroundColor: "rgba(242,163,101,1)",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",

    margin: 20,
  },
  disconnect2: {
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    fontSize: 20,
  },

  disconnectUser: {
    fontFamily: "roboto-900",
    color: "#121212",
    fontSize: 25,
    marginTop: 50,
    marginLeft: 23,
  },
  loremIpsum: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginTop: 5,
    marginLeft: 24,
  },
  users: {
    height: 558,
    width: 301,
    marginTop: 31,
    alignSelf: "center",
  },
});
export default Rect;
