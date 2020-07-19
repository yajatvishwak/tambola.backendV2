import React, { Component, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
} from "react-native";
import Board from "./components/Board";
import Leaderboard from "./Leaderboard";
import Disconnect from "./Disconnect";
import InputModal from "./InputModal";
import { AdMobBanner } from "expo-ads-admob";
const AsyncStore = require("../../utility/AsyncStore");

import env from "../../variable";
import Global from "../../utility/Global";
import { useNavigation } from "@react-navigation/native";

const io = require("socket.io-client");
const axios = require("axios");

function AdminGame(props) {
  const [leaderboardModal, setleaderboardModal] = useState(false);
  const [disconnectModal, setdisconnectModal] = useState(false);
  const [inputModal, setinputModal] = useState(false);
  const [currentCalling, setCurrentCalling] = useState(0);
  const [gameOver, setgameOver] = useState(false);
  const [done, setdone] = useState([]);
  const [connected, setconnected] = useState(0);
  const [interval, setinterval] = useState(10);
  const navigation = useNavigation();

  const startGame = () => {
    axios
      .post(env.apiUrl + "/game/startGame", {
        roomID: Global.admin.roomID,
        interval: interval || 15,
      })
      .then(function (response) {
        if (response.data === true) {
          alert("Game started!");
        } else {
          alert("Game encountered an error");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const pauseGame = () => {
    axios
      .post(env.apiUrl + "/game/pauseGame", {
        roomID: Global.admin.roomID,
      })
      .then(function (response) {
        if (response.data === true) {
          alert("Game paused");
        } else {
          alert("Game encountered an error");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Game encountered an error");
      });
  };

  const resetGame = () => {
    Alert.alert(
      "Are you sure you want to Reset the game?",
      "The previous game state will be lost",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Yes, Proceed.",
          onPress: () => {
            axios
              .post(env.apiUrl + "/admin/resetGame", {
                roomID: Global.admin.roomID,
              })
              .then((res) => {
                if (res.data === true) {
                  alert("Game has been Reset");
                } else {
                  alert("Game encountered an error");
                }
              })
              .catch((err) => {
                console.log(err);
                alert("Game encountered an error");
              });
          },
        },
      ],
      { cancelable: false }
    );
  };
  const deleteRoom = () => {
    Alert.alert(
      "Are you sure you want to delete the room?",
      "This can not be undone",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Yes, Proceed",
          onPress: () => {
            axios
              .post(env.apiUrl + "/admin/deleteSession", {
                roomID: Global.admin.roomID,
                username: Global.username,
              })
              .then((res) => {
                if (res.data === true) {
                  alert(
                    "Room has been deleted, you will be redirected to the Home page"
                  );
                  navigation.replace("Feed");
                  Global.admin.isAdmin = null;
                  Global.admin.roomID = null;
                  AsyncStore.storeData(Global);
                } else {
                  alert("Game encountered an error");
                }
              })
              .catch((err) => {
                console.log(err);
                alert("Game encountered an error");
              });
          },
        },
      ],
      { cancelable: false }
    );
  };

  useEffect(() => {
    const socket = io(env.apiUrl);
    function connectSocket(username, room) {
      socket.on("connect", function () {
        console.log("Connected to the WS server");
        socket.emit("room", { username: username, room: room });
      });
    }
    connectSocket("admin", Global.admin.roomID);

    socket.on("broadcast", (m) => {
      //console.log(m);
      setCurrentCalling(m.number);
      setgameOver(m.gameOver);
      setdone(m.done);
      setconnected(m.connected);
    });
    socket.on("winner", (m) => {
      //console.log(m);
      var type = m.type;
      if (type === "FH") {
        setgameOver(true);
      } else {
        alert(message);
      }
    });
  }, []);

  const handleLeaderBoard = () => {
    setleaderboardModal(!leaderboardModal);
  };
  const handleDisconnect = () => {
    setdisconnectModal(!disconnectModal);
  };
  const handleInputModal = () => {
    setinputModal(!inputModal);
  };
  const handleInterval = (text) => {
    setinterval(text);
  };
  if (gameOver === true) {
    Global.admin.isAdmin = false;
    Global.admin.roomID = null;
    AsyncStore.storeData(Global);
    navigation.replace("Feed");
  }

  return (
    <ScrollView style={styles.container}>
      <Modal
        animationType="fade"
        transparent={false}
        visible={leaderboardModal}
        onRequestClose={() => {
          setleaderboardModal(false);
        }}
      >
        <Leaderboard />
      </Modal>
      <Modal
        animationType="fade"
        transparent={false}
        visible={inputModal}
        onRequestClose={() => {
          setinputModal(false);
        }}
      >
        <InputModal
          updateInterval={handleInterval}
          handleInputModal={handleInputModal}
          startGame={startGame}
        />
      </Modal>

      <Modal
        animationType="fade"
        transparent={false}
        visible={disconnectModal}
        onRequestClose={() => {
          setdisconnectModal(false);
        }}
      >
        <Disconnect />
      </Modal>
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
      <Text style={styles.adminTitle}>
        Admin Control for {Global.admin.roomID}
      </Text>
      <Text style={styles.adminSubtext}>Overview of the on-going game</Text>
      <Board done={done} style={styles.board}></Board>
      <View style={styles.textWrap}>
        <Text style={styles.noOfTitle}>
          Number of participants signed up: {connected}
        </Text>
        <Text style={styles.noOfTitle}>
          Current Calling Number: {currentCalling}{" "}
        </Text>
        <Text style={styles.noOfTitle}>
          Gameover: {gameOver ? "Yes" : "No"}{" "}
        </Text>
      </View>

      <View style={styles.buttonWrap}>
        <TouchableOpacity style={styles.buttonstart} onPress={handleInputModal}>
          <Text style={styles.buttonText}>Start Game</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonpause} onPress={pauseGame}>
          <Text style={styles.buttonText}>Pause Game</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonlb} onPress={handleLeaderBoard}>
          <Text style={styles.buttonText}>Leaderboard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonlb} onPress={resetGame}>
          <Text style={styles.buttonText}>Reset Game</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttondisconnect}
          onPress={handleDisconnect}
        >
          <Text style={styles.buttonText}>Disconnect</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttondisconnect} onPress={deleteRoom}>
          <Text style={styles.buttonText}>Delete Room</Text>
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
  board: {
    height: 350,
    width: 375,
    padding: 4,
    marginTop: 14,

    alignSelf: "center",
  },

  noOfTitle: {
    fontFamily: "roboto-500",
    color: "#121212",
    marginLeft: 20,
    marginTop: 15,
  },
  textWrap: {
    marginBottom: 30,
  },

  adminTitle: {
    fontFamily: "roboto-900",
    color: "#121212",
    fontSize: 25,
    marginTop: 50,
    marginLeft: 14,
  },

  buttonstart: {
    backgroundColor: "rgba(67,205,76,1)",
    borderRadius: 5,
    width: 100,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  buttonpause: {
    backgroundColor: "rgba(242,163,101,1)",
    borderRadius: 5,
    width: 100,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  buttonlb: {
    backgroundColor: "rgba(242,163,101,1)",
    borderRadius: 5,
    width: 100,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  buttondisconnect: {
    backgroundColor: "rgba(208,2,27,1)",
    borderRadius: 5,
    width: 100,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  buttonText: {
    fontSize: 14,
    color: "white",
    fontFamily: "roboto-500",
  },
  buttonWrap: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 15,
    flexWrap: "wrap",
  },

  disconnectButton: {
    backgroundColor: "rgba(208,2,27,1)",
    borderRadius: 5,
  },

  stack2: {
    height: 16,
    flexDirection: "row",
    marginTop: 10,
    marginLeft: 48,
    marginRight: 74,
  },
  adminSubtext: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginTop: 12,
    marginLeft: 15,
  },
});

export default AdminGame;
