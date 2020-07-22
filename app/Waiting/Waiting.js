import React, { Component, useEffect } from "react";
import { StyleSheet, View, StatusBar, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

import { AdMobBanner } from "expo-ads-admob";

import env from "../../variable";
import Global from "../../utility/Global";
const io = require("socket.io-client");

function Waiting(props) {
  const navigation = useNavigation();
  const roomID = Global.roomID;
  const username = Global.username;
  useEffect(() => {
    const socket = io(env.apiUrl);
    socket.on("connect", function () {
      console.log("Connected to the WS server -- Waiting Room");
      socket.emit("room", { username: username, room: roomID });
    });
    socket.on("broadcast", (m) => {
      if (m.ready === true) {
        navigation.replace("Game", { typeOfGame: "Session" });
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View style={styles.adView}>
        <AdMobBanner
          bannerSize="fullBanner"
          adUnitID="ca-app-pub-7508456089542607/2808489060"
          servePersonalizedAds
          onDidFailToReceiveAdWithError={(bannerError) =>
            console.log(bannerError)
          }
        />
      </View>

      <Text style={styles.loremIpsum2}>Waiting Room for {roomID}</Text>
      <Icon name="clock" style={styles.icon}></Icon>
      <Text style={styles.loremIpsum}>
        Please wait till the admin {"\n"}starts the game. During this time ads
        will be played, you can safely disregard them.{"\n"} DO NOT EXIT THIS
        PAGE
      </Text>
      <View style={styles.adView}>
        <AdMobBanner
          bannerSize="smartBannerPortrait"
          adUnitID="ca-app-pub-7508456089542607/4901134080"
          servePersonalizedAds
          onDidFailToReceiveAdWithError={(bannerError) =>
            console.log(bannerError)
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(236,236,236,1)",
    justifyContent: "center",
  },
  adView: {
    alignSelf: "center",
  },
  icon: {
    color: "rgba(128,128,128,1)",
    fontSize: 200,
    alignSelf: "center",
  },
  loremIpsum: {
    fontFamily: "roboto-regular",
    color: "#121212",
    fontSize: 20,
    textAlign: "center",
    alignSelf: "center",
  },
  loremIpsum2: {
    fontFamily: "roboto-regular",
    color: "#121212",
    fontSize: 25,

    alignSelf: "center",
  },
});

export default Waiting;
