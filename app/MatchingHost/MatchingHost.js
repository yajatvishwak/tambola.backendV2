import React, { Component, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Share,
} from "react-native";
import AwesomeButton from "react-native-really-awesome-button";
import { useNavigation, useRoute } from "@react-navigation/native";
import Item from "../MatchingHost/component/Item";
var hri = require("human-readable-ids").hri;
const io = require("socket.io-client");
import env from "../../variable";
import Axios from "axios";

function ChooseInstant(props) {
  const navigation = useNavigation();
  const [roomID, setroomID] = useState("");
  const [data, setdata] = useState([]);
  const route = useRoute();
  const { username } = route.params;

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          username +
          " invites you to play a game of Tambola. Try your luck! Room ID : " +
          roomID +
          "\n If you still don't have the app, check it out on playstore. Do review us! https://play.google.com/store/apps/details?id=com.yajatvishwak.tamboola",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const users = data.map((item) => {
    return <Item element={item}> </Item>;
  });

  useEffect(() => {
    var n = hri.random();
    setroomID(n);
    const socket = io(env.apiUrl);
    socket.on("connect", function () {
      console.log("Connected to the WS server -- Matching Host");
      socket.emit("room", { username: username, room: n });
    });
    socket.on("broadcast", (m) => {
      //console.log(m);
      if (m.ready === true) {
        //alert("Navigating to Game page");
        navigation.replace("Game", {
          typeOfGame: "Instant",
          roomID: n,
          username: username,
        });
      }
    });
    socket.on("join", (m) => {
      setdata(m);
    });

    Axios.post(env.apiUrl + "/admin/createSessionInstant", {
      roomID: n,
    })
      .then((res) => {
        if (res.data === true) {
          console.log("Game created");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Check your internet connection and try again");
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
        <TouchableOpacity onPress={onShare}>
          <Text style={styles.copy}>Share</Text>
        </TouchableOpacity>
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

      <View style={styles.buttonView}>
        <AwesomeButton
          progress
          width={130}
          borderRadius={10}
          backgroundColor={"#f2a365"}
          backgroundDarker={"#ab5f24"}
          style={{ alignSelf: "center" }}
          onPress={() => {
            Axios.post(env.apiUrl + "/game/startInstant", {
              roomID: roomID,
            })
              .then((res) => {
                if (res.data === true) {
                  console.log("Game start");
                } else {
                  alert(
                    "There was some internal error. Please try again later"
                  );
                }
              })
              .catch((err) => {
                console.log(err);
                alert("Check your internet connection and try again");
              });
          }}
        >
          Start Game
        </AwesomeButton>
      </View>
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
    backgroundColor: "rgba(227,214,214,1)",
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
