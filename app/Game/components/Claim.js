import React, { Component, useState } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/EvilIcons";
import makeaCall from "../../../utility/networkCall";
import env from "../../../variable";
import Spinner from "react-native-loading-spinner-overlay";
function ShoutModal(props) {
  const [spinner, setspinner] = useState(false);
  var category = props.category;
  var ticket = props.ticket;
  //console.log(props.ff);
  var i = -1;
  var cats = category.map((item) => {
    i += 1;
    return (
      <TouchableOpacity
        onPress={() => {
          setspinner(true);
          makeaCall("POST", env.apiUrl + "/game/checkWinner", {
            roomID: props.roomID,
            ticket: ticket,
            username: props.username,
            type: item,
          })
            .then((res) => {
              setspinner(false);
              //console.log(res);
              if (res === true) {
                console.log("you won");
                props.close();
              } else if (res.code == "DWC") {
                alert(
                  " Someone else won this claim already. Try again with some other claim!"
                );
                props.close();
              } else {
                alert(
                  "A few numbers from your ticket were not called, please check and try again"
                );
                props.close();
              }
            })
            .catch((err) => alert("There is some problem with the network"));
        }}
      >
        <View style={styles.rect}>
          <Text style={styles.number}>{item}</Text>
        </View>
        <Text style={styles.subtext}>{props.ff[i]}</Text>
      </TouchableOpacity>
    );
  });

  return (
    <ScrollView style={styles.container}>
      <StatusBar hidden />
      <Spinner
        visible={spinner}
        textContent={"Checking Request, Hold On"}
        textStyle={styles.spinnerTextStyle}
      />

      <Text style={styles.whichCategory}>Which Category? 👀</Text>
      <View style={styles.groupRow}>{cats}</View>

      <TouchableOpacity style={styles.button1} onPress={props.close}>
        <Icon name="close" style={styles.icon}></Icon>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(227,214,214,1)",
  },
  subtext: {
    alignSelf: "center",
  },

  rect: {
    width: 100,
    height: 100,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 27,
    borderWidth: 3,
    borderColor: "#000000",
    alignContent: "center",
    justifyContent: "center",
    margin: 10,
  },
  number: {
    fontFamily: "roboto-500",
    color: "#121212",
    fontSize: 60,
    alignSelf: "center",
  },

  groupRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 100,
    flexWrap: "wrap",
  },

  whichCategory: {
    fontFamily: "roboto-700",
    color: "#121212",
    fontSize: 30,
    alignSelf: "center",
    marginTop: 120,
  },

  button1: {
    width: 67,
    height: 67,
    backgroundColor: "rgba(48,71,94,1)",
    borderRadius: 100,
    marginBottom: 20,
    alignSelf: "center",
    marginTop: 50,
    justifyContent: "center",
    alignContent: "center",
  },
  icon: {
    color: "rgba(255,255,255,1)",
    fontSize: 40,
    height: 44,
    width: 40,
    marginTop: 11,
    marginLeft: 13,
  },
});

export default ShoutModal;
