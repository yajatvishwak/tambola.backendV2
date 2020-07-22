import React, { Component, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  StatusBar,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import WinnerView from "./components/WinnerView";
import Axios from "axios";
import Global from "../../utility/Global";
import env from "../../variable";
import { AdMobBanner } from "expo-ads-admob";
import AwesomeButton from "react-native-really-awesome-button";

function Winner(props) {
  const [winners, setwinners] = useState([]);
  const handleRefresh = () => {
    Axios.post(env.apiUrl + "/game/getWinners", {
      roomID: Global.admin.roomID,
    }).then((res) => {
      const data = res.data;
      const twinners = [];
      for (var prop in data) {
        twinners.push(prop + ": " + data[prop]);
      }
      setwinners(twinners);
    });
  };

  return (
    <>
      <View
        style={{
          alignSelf: "center",
        }}
      >
        <AdMobBanner
          bannerSize="fullBanner"
          adUnitID="ca-app-pub-7508456089542607/7886390076"
          servePersonalizedAds
          onDidFailToReceiveAdWithError={(bannerError) =>
            console.log(bannerError)
          }
        />
      </View>
      <ScrollView style={styles.container}>
        <StatusBar hidden />

        <Text style={styles.leaderboard}>Leaderboard</Text>
        <Text style={styles.realtimeLeaderboard}>Realtime Leaderboard</Text>
        <AwesomeButton
          width={100}
          onPress={handleRefresh}
          style={styles.button}
        >
          Refresh
        </AwesomeButton>

        <WinnerView style={styles.winnerView} winners={winners}></WinnerView>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(227,214,214,1)",
  },
  button: {
    marginBottom: 10,
    marginLeft: 25,
    alignSelf: "flex-start",
    justifyContent: "center",
    alignItems: "center",
  },
  leaderboard: {
    fontFamily: "roboto-900",
    color: "#121212",
    fontSize: 25,
    marginTop: 41,
    marginLeft: 23,
  },
  winnerView: {
    height: 528,
    width: 324,
    alignSelf: "center",
    marginTop: 20,
  },

  realtimeLeaderboard: {
    fontFamily: "roboto-regular",
    color: "#121212",

    marginLeft: 25,
  },
});

export default Winner;
