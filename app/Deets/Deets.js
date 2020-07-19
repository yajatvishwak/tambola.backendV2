import React, { Component, useState } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import DeetsDetails from "./components/DeetsDetail";
import Icon from "react-native-vector-icons/Entypo";
import axios from "axios";
import env from "../../variable";
import GLOBAL from "../../utility/Global";
import { YellowBox } from "react-native";
import Join from "../Join/Join";
import { AdMobBanner } from "expo-ads-admob";
import Global from "../../utility/Global";
const AsyncStore = require("../../utility/AsyncStore");

import AwesomeButton from "react-native-really-awesome-button";

YellowBox.ignoreWarnings(["Require cycle"]);

function Deets(props) {
  const navigation = useNavigation();
  const [isDisabled, setisDisabled] = useState(true);
  const [JoinModal, setJoinModal] = useState(false);
  const handleJoinRoom = () => {
    var roomID = props.session.roomID;
    //console.log(GLOBAL.roomID);
    axios
      .post(env.apiUrl + "/user/joinRoom", {
        roomID: roomID,
        username: Global.username, // props.user TODO: or global
      })
      .then((res) => {
        if (res.data === true) {
          // joining the room
          axios
            .post(env.apiUrl + "/game/checkGameStatus", { roomID: roomID })
            .then((res) => {
              if (GLOBAL.roomID !== null) {
                alert("You are already in a game");
                navigation.replace("Game");
              } else {
                if (res.data === true) {
                  alert("Game Active Now redirecting to game.");
                  GLOBAL.roomID = roomID;
                  AsyncStore.storeData(GLOBAL);
                  navigation.replace("Game");
                } else {
                  alert("Please wait till the admin starts the game");
                  props.toggleDeetsModal();
                  GLOBAL.roomID = roomID;
                  AsyncStore.storeData(GLOBAL);
                  navigation.replace("Waiting");
                }
              }
            })

            .catch((err) => {
              alert("There is some network issue. Please check your network");
              console.log(err);
            });
        } else {
          alert(
            "You are not signed up for this game. Please sign up first in order to join this room"
          );
        }
      })
      .catch((err) => {
        console.log(err);
        alert(
          "There is some network issue.Please check your network and try again"
        );
      });
  };

  const handleJoinModal = () => {
    setJoinModal(!JoinModal);
  };
  //console.log(props.session);
  const handleSignUpRoom = () => {
    // TODO: Make a signup page
    handleJoinModal();
  };
  //console.log(JoinModal);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.adView}>
        <AdMobBanner
          bannerSize="fullBanner"
          adUnitID="ca-app-pub-7508456089542607/6848925983"
          servePersonalizedAds
          onDidFailToReceiveAdWithError={(bannerError) =>
            console.log(bannerError)
          }
        />
      </View>
      <Modal
        animationType="fade"
        transparent={false}
        visible={JoinModal}
        onRequestClose={handleJoinModal}
      >
        <Join
          toggleModal={handleJoinModal}
          changeDisabled={(item) => {
            setisDisabled(item);
          }}
          session={props.session}
        />
      </Modal>
      <StatusBar hidden />
      <View style={styles.icon1Row}>
        <TouchableOpacity onPress={props.toggleDeetsModal}>
          <Icon name="chevron-thin-left" style={styles.icon1}></Icon>
        </TouchableOpacity>
      </View>
      <DeetsDetails
        session={props.session}
        style={styles.deetsDetails}
      ></DeetsDetails>

      <View style={styles.button1Row}>
        <AwesomeButton
          width={120}
          height={40}
          borderRadius={30}
          backgroundColor={"#30475e"}
          backgroundDarker={"#222831"}
          style={{ alignSelf: "center", marginTop: 15, marginRight: 15 }}
          onPress={handleSignUpRoom}
        >
          Signup Room
        </AwesomeButton>
        <AwesomeButton
          disabled={isDisabled}
          width={120}
          height={40}
          borderRadius={30}
          backgroundColor={"#30475e"}
          backgroundDarker={"#222831"}
          style={{ alignSelf: "center", marginTop: 15, marginLeft: 15 }}
          onPress={handleJoinRoom}
        >
          Join Room
        </AwesomeButton>
      </View>
    </ScrollView>
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
  deetsDetails: {
    height: 512,
    width: 289,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 20,
    shadowOpacity: 0.35,
    shadowRadius: 25,
    marginTop: 30,
    alignSelf: "center",
  },
  icon1: {
    color: "rgba(128,128,128,1)",
    fontSize: 30,
  },

  icon1Row: {
    height: 33,
    flexDirection: "row",
    alignContent: "flex-start",
    marginTop: 25,
    marginLeft: 20,
  },
  button1: {
    width: 129,
    height: 51,
    backgroundColor: "rgba(34,40,49,1)",
    borderRadius: 12,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 5,
    shadowOpacity: 0.3,
    shadowRadius: 25,
    marginBottom: 20,

    alignContent: "center",
    justifyContent: "center",
  },
  joinGame1: {
    fontFamily: "roboto-500",
    color: "rgba(255,255,255,1)",
    fontSize: 15,
    alignSelf: "center",
  },
  button2: {
    width: 129,
    height: 51,
    backgroundColor: "rgba(34,40,49,1)",
    borderRadius: 12,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 5,
    shadowOpacity: 0.3,
    shadowRadius: 25,
    marginBottom: 20,

    marginLeft: 30,
    alignContent: "center",
    justifyContent: "center",
  },
  leaveGame: {
    fontFamily: "roboto-500",
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    alignSelf: "center",
  },
  button1Row: {
    height: 51,
    flexDirection: "row",
    marginTop: 20,
    alignSelf: "center",
    marginBottom: 20,
  },
});

export default Deets;
