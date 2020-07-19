import React, { useState } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  Text,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import { TextInput } from "react-native-gesture-handler";
import { AdMobBanner } from "expo-ads-admob";

import axios from "axios";
import env from "../../variable";
import Global from "../../utility/Global";

function Join(props) {
  const [PasswordText, setPasswordText] = useState("");

  const handleJoinClick = () => {
    //console.log("Button clicked");
    axios
      .post(env.apiUrl + "/user/signUpRoom", {
        roomID: props.session.roomID,
        secretKey: PasswordText,
        username: Global.username,
        type: props.session.type,
      })
      .then((res) => {
        //console.log(res.data);
        if (res.data == true) {
          alert(`You have Signed up for ${props.session.roomID} `);
          props.changeDisabled(false);
          props.toggleModal();
        } else if (res.data == "MLR") {
          alert("Maximum Limit reached for the room.");
          props.toggleModal();
        } else if (res.data == "DUS") {
          alert("You have alredy joined the room");
          props.changeDisabled(false);
          props.toggleModal();
        } else if (res.data == "AC") {
          alert("You are the admin of the room.");
          props.changeDisabled(false);
          props.toggleModal();
        } else if (res.data == "RLA") {
          alert(
            "You were disconnected by Admin. Please contact admin if you think that this was a mistake"
          );
          props.toggleModal();
        } else {
          alert(
            "Please check your password and network connection and try again"
          );
        }
      })
      .catch((err) => {
        console.log(err);
        alert("There is some error with your network");
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.adView}>
        <AdMobBanner
          bannerSize="fullBanner"
          adUnitID="ca-app-pub-7508456089542607/4282186984"
          servePersonalizedAds
          onDidFailToReceiveAdWithError={(bannerError) =>
            console.log(bannerError)
          }
        />
      </View>
      <StatusBar hidden />
      <View style={styles.icon1Row}>
        <TouchableOpacity
          onPress={() => {
            props.toggleModal();
          }}
        >
          <Icon name="chevron-thin-left" style={styles.icon1}></Icon>
        </TouchableOpacity>
      </View>
      <View style={styles.cont}>
        <Text style={styles.joinGame}>Join Game</Text>
        <Text style={styles.enterosecretKey}>Enter Room Secret Key 🔑</Text>
        <TextInput
          placeholder="Password (Leave blank for Open Rooms)"
          secureTextEntry={true}
          style={styles.placeholder1}
          onChangeText={(text) => {
            setPasswordText(text);
          }}
        ></TextInput>

        <TouchableOpacity
          style={styles.button2}
          onPress={() => {
            handleJoinClick();
          }}
        >
          <Text style={styles.joinUsing3}>Join using 🔑</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(227,214,214,1)",
  },
  adView: {
    alignSelf: "center",
  },
  cont: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  placeholder1: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 52,
    width: 300,
    backgroundColor: "rgba(236,236,236,1)",
    textAlign: "center",
    borderRadius: 24,
    alignSelf: "center",
  },
  joinGame: {
    fontFamily: "roboto-700",
    color: "#121212",
    fontSize: 30,
    alignSelf: "center",
  },

  icon1: {
    color: "rgba(128,128,128,1)",
    fontSize: 30,
  },

  icon1Row: {
    height: 33,
    flexDirection: "row",
    alignSelf: "flex-start",
    marginTop: 30,
    marginLeft: 20,
  },

  loremIpsum3: {
    fontFamily: "roboto-regular",
    color: "#121212",
  },
  enterosecretKey: {
    fontFamily: "roboto-regular",
    color: "#121212",
    textAlign: "left",
    fontSize: 20,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 30,
  },
  button2: {
    width: 218,
    height: 52,
    backgroundColor: "rgba(34,40,49,1)",
    borderRadius: 12,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    elevation: 75,
    shadowOpacity: 0.3,
    shadowRadius: 25,
    marginTop: 20,
    alignSelf: "center",
  },
  joinUsing3: {
    fontFamily: "roboto-500",
    color: "rgba(255,255,255,1)",
    fontSize: 20,
    marginTop: 14,
    marginLeft: 49,
  },
});

export default Join;
