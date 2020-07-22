import React, { Component, useState, useEffect } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Item from "../MatchingHost/component/Item";

const io = require("socket.io-client");
import env from "../../variable";
import Axios from "axios";

function ChooseInstant(props) {
  const navigation = useNavigation();

  const [data, setdata] = useState([]);
  const route = useRoute();
  const { username } = route.params;
  const { roomID } = route.params;

  const users = data.map((item) => {
    return <Item element={item}> </Item>;
  });

  useEffect(() => {
    const socket = io(env.apiUrl);
    socket.on("connect", function () {
      console.log("Connected to the WS server -- Matching Client");
      socket.emit("room", { username: username, room: roomID });
    });
    socket.on("broadcast", (m) => {
      //console.log(m);
      if (m.ready === true) {
        //alert("Navigating to Game page");
        navigation.replace("Game", {
          typeOfGame: "Instant",
          roomID: roomID,
          username: username,
        });
      }
    });
    socket.on("join", (m) => {
      setdata(m);
    });
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={{ alignItems: "flex-start", alignSelf: "center", marginTop: 20 }}
      >
        <Text style={styles.heyThere1}>Tamboola Quick Game</Text>
        <Text style={styles.loremIpsum}>
          Instant tambola game with predefined rules
        </Text>
      </View>
      <View
        style={{
          alignItems: "flex-start",
          alignSelf: "center",
          marginTop: 20,
          flexDirection: "row",
        }}
      >
        <Text style={styles.id}>{roomID}</Text>
      </View>

      <View style={{ marginTop: 50 }}>
        <Text
          style={{
            fontFamily: "roboto-500",
            fontSize: 17,
            alignSelf: "center",
          }}
        >
          Connected Users - {data.length || 0}
        </Text>
      </View>

      <ScrollView style={{ width: 300, height: 700, alignSelf: "center" }}>
        {users}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonView: {
    flexDirection: "row",
    margin: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingTop: 50,
  },
  container: {
    flex: 1,
  },
  heyThere1Stack: {
    width: 300,
    height: 35,
    marginLeft: 57,
    marginTop: 25,
  },
  heyThere1Stack2: {
    width: 300,
    height: 35,
    marginLeft: 57,
    marginTop: 30,
    flex: 1,
    flexDirection: "row",
  },
  heyThere1: {
    fontFamily: "roboto-900",
    color: "#121212",
    fontSize: 27,
  },
  id: {
    fontFamily: "roboto-700",
    fontSize: 20,
  },
  copy: {
    fontFamily: "roboto-regular",
    fontSize: 15,
    marginLeft: 10,
    marginTop: 5,
  },
});

export default ChooseInstant;
