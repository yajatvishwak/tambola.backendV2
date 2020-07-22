import React, { Component, useEffect, useState } from "react";
import { StyleSheet, View, StatusBar, Text, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation, useRoute } from "@react-navigation/native";
import ConfettiCannon from "react-native-confetti-cannon";
import axios from "axios";
import env from "../../variable";
import Global from "../../utility/Global";
const AsyncStore = require("../../utility/AsyncStore");

function Winners(props) {
  const navigation = useNavigation();
  const route = useRoute();
  const { roomID } = route.params;
  const { typeOfGame } = route.params;
  const [filler, setfiller] = useState([]);

  const handleBye = () => {
    Global.roomID = null;
    AsyncStore.storeData(Global);
    navigation.replace("Feed");
  };

  useEffect(() => {
    console.log(Global.roomID);
    const urlString =
      typeOfGame === "Instant" ? "/game/getWinnersInstant" : "/game/getWinners";
    axios
      .post(env.apiUrl + urlString, {
        roomID: typeOfGame === "Instant" ? roomID : Global.roomID,
      })
      .then((res) => {
        const winners = res.data;
        var f = [];
        for (var key in winners) {
          const type = key;
          const win = winners[type];
          f.push(
            <View>
              <View style={styles.rowContainer}>
                <Text style={styles.name}>{win}</Text>
                <Text style={styles.category}>- {type}</Text>
              </View>
              <View style={styles.divider}></View>
            </View>
          );
        }
        setfiller(f);
      });
  }, []);

  return (
    <ScrollView style={styles.container}>
      <StatusBar hidden />
      <ConfettiCannon count={50} fadeOut={true} origin={{ x: -10, y: 0 }} />

      <Text style={styles.winners}>Winners🎉</Text>
      <ScrollView style={styles.rect}>{filler}</ScrollView>
      <Text style={styles.subtext}>Congratulations! Play Again Soon!</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleBye}>
          <Text style={styles.bye}>Say Bye Bye! 👋</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(227,214,214,1)",
  },

  buttonContainer: {
    alignSelf: "center",
  },
  bye: {
    fontFamily: "roboto-700",
    color: "white",
  },
  button: {
    width: 120,
    height: 48,
    backgroundColor: "rgba(242,163,101,1)",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  rect: {
    width: 308,
    zIndex: -999,
    height: 471,
    backgroundColor: "rgba(34,40,49,1)",
    borderRadius: 18,
    marginTop: 40,
    alignSelf: "center",
  },
  name: {
    fontFamily: "roboto-700",
    color: "rgba(255,255,255,1)",
    fontSize: 20,
  },
  category: {
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    fontSize: 20,
    marginLeft: 14,
  },
  rowContainer: {
    height: 24,
    flexDirection: "row",
    marginTop: 50,
    marginLeft: 37,
    marginRight: 118,
  },
  divider: {
    width: 232,
    height: 2,
    backgroundColor: "#E6E6E6",
    marginTop: 8,
    marginLeft: 38,
  },
  winners: {
    fontFamily: "roboto-700",
    color: "#121212",
    fontSize: 40,
    marginTop: 40,
    alignSelf: "center",
  },
  subtext: {
    fontFamily: "roboto-700",
    color: "#121212",
    fontSize: 20,
    marginTop: 15,
    alignSelf: "center",
  },
});

export default Winners;
