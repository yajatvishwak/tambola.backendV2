import React, { Component, useState } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { AdMobBanner } from "expo-ads-admob";

import User from "./components/User";

import Axios from "axios";
import env from "../../variable";
import Global from "../../utility/Global";

function Disconnect(props) {
  const [data, setData] = useState([]);
  const [marked, setmarked] = useState([]);
  const [loading, setloading] = useState(false);

  const handleDisconnect = () => {
    setloading(true);
    if (marked.length === 0) {
      setloading(false);
    } else {
      marked.forEach((item) => {
        Axios.post(env.apiUrl + "/admin/disconnectUser", {
          roomID: Global.admin.roomID,
          username: item,
        }).then(() => {
          setloading(false);
          console.log("Disconnected all");
        });
      });
    }
  };
  const updateMark = (val) => {
    setmarked(val);
    console.log(marked);
  };

  const handleOnRefresh = () => {
    Axios.post(env.apiUrl + "/admin/getParticipants", {
      roomID: Global.admin.roomID,
    }).then((res) => {
      console.log(res.data);
      var data1 = res.data;
      setData(data1);
      //console.log(data);
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Spinner
        visible={loading}
        textContent={"Ongoing request. Please wait"}
        textStyle={styles.spinnerTextStyle}
      />
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

      <StatusBar hidden />
      <Text style={styles.disconnectUser}>Disconnect User</Text>
      <Text style={styles.loremIpsum}>Remove a user from the room</Text>

      <ScrollView>
        <User data={data} updateMark={updateMark} />
      </ScrollView>
      <View style={styles.buttonWrap}>
        <TouchableOpacity style={styles.button1} onPress={handleDisconnect}>
          <Text style={styles.disconnect2}>Disconnect</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button1} onPress={handleOnRefresh}>
          <Text style={styles.disconnect2}>Refresh</Text>
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

export default Disconnect;
