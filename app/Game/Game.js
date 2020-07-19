import React, { Component, useState, useEffect } from "react";
import { StyleSheet, View, StatusBar, Modal } from "react-native";

import env from "../../variable";
import makeaCall from "../../utility/networkCall";
import * as Speech from "expo-speech";

import { AdMobBanner } from "expo-ads-admob";

import Previous from "./components/Previous";
import Calling from "./components/Calling";
import Bar from "./components/Bar";
import Ticket from "./components/Ticket";
import Claim from "./components/Claim";
import Board from "./components/Board";
import Global from "../../utility/Global";
import { useNavigation } from "@react-navigation/native";
import Axios from "axios";

const data = require("../TTS/tts.json");
const AsyncStore = require("../../utility/AsyncStore");
const io = require("socket.io-client");

// ongameover put playnow to false

//connectSocket(username, roomID);

function Game(props) {
  var roomID = Global.roomID;
  var username = Global.username;
  const navigation = useNavigation();
  const [claimModal, setclaimModal] = useState(false);
  const [boardModal, setboardModal] = useState(false);
  const [mark, setMark] = useState([]);
  const [calling, setcalling] = useState({});
  const [disconnect, setdisconnect] = useState(false);
  const [winner, setwinner] = useState({});
  const [gameOver, setgameOver] = useState(false);
  const [category, setcategory] = useState([]);
  const [catFull, setcatFull] = useState([]);
  const [ticket, setticket] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  //console.log("THEROOM:" + roomID);
  //console.log(username);

  useEffect(() => {
    // Pregame functions
    const socket = io(env.apiUrl);
    function connectSocket(username, room) {
      socket.on("connect", function () {
        console.log("Connected to the WS server");
        socket.emit("room", { username: username, room: room });
      });
    }
    makeaCall("POST", env.apiUrl + "/game/getCategoryandTicket", {
      roomID: roomID,
      username: username,
    }).then((res) => {
      //console.log("This is null wtf> " + res);
      if (res == null) {
        alert(
          "There's some network issue. Please check your network or contact the admin. Error code: NE-catTic"
        );
      } else {
        setcategory(res.category);
        setticket(res.ticket);
        setcatFull(res.ff);
      }
    });

    connectSocket(username, roomID);
    socket.on("winner", (m) => {
      //console.log(m);
      var message = m.message;
      var type = m.type;
      setwinner(m.winnerobj[0]);
      //console.log(winner);
      if (type === "FH") {
        setgameOver(true);
      } else {
        alert(message);
      }

      //console.log(m);
    });
    socket.on("deleteRoom", (m) => {
      var deleted = m.deleted;
      if (deleted === true) {
        Global.roomID = null;
        AsyncStore.storeData(Global);
        navigation.replace("Feed");
      }
    });

    socket.on("broadcast", (m) => {
      handleCallingNumber(m);
      var go = m.gameOver;
      setgameOver(go);
    });
    socket.on("kickUser", () => {
      alert("You have been disconnected by Admin");
      setdisconnect(true);
    });
  }, []);

  //TTS
  const callOut = (number) => {
    var array = data[number];
    const element = array[Math.floor(Math.random() * array.length)] || array[0];
    var speech = element + "    the number    " + number;
    Speech.speak(speech);
  };

  // handling state function
  const handleClaimModal = () => {
    setclaimModal(!claimModal);
  };
  const handleBoardModal = () => {
    setboardModal(!boardModal);
  };
  const handleCallingNumber = (m) => {
    //console.log(m);
    setcalling(m);
    if (m.number) {
      callOut(m.number);
    }
  };
  const handleWinners = (winner) => {
    setwinner(winner);
  };
  const updateMarked = (data) => {
    setMark(data);
    //console.log(mark);
  };
  // console.log(category);
  // console.log(ticket);
  const generateTicket = () => {
    //console.log(ticket);
    if (ticket.length == 0) {
      return [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
      ];
    } else {
      var arr = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
      ];
      for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 9; j++) {
          if (
            mark.indexOf(ticket[i][j]) > -1 &&
            mark[mark.indexOf(ticket[i][j])] === ticket[i][j]
          ) {
            arr[i][j] = ticket[i][j];
          } else if (mark.indexOf(ticket[i][j]) === -1 && ticket[i][j] !== 0) {
            arr[i][j] = -1;
          } else {
            continue;
          }
        }
      }
      //console.log(arr);
      return arr;
    }
    // the ticket in 3x9 format is stored in arr
  };

  if (disconnect) {
    alert(
      "You have been disconnected by admin. If you think this was a mistake, contact your admin."
    );
    Global.roomID = null;

    AsyncStore.storeData(Global);
    navigation.replace("Feed");
    return null;
  } else if (gameOver === true) {
    alert("Game Over");
    //redirect to winner page instead
    navigation.replace("Winners");
    return null;
  } else {
    return (
      <React.Fragment>
        <Modal
          animationType="fade"
          transparent={false}
          visible={claimModal}
          onRequestClose={() => {
            setclaimModal(false);
          }}
        >
          <Claim
            category={category}
            ticket={generateTicket()}
            updateWinner={handleWinners}
            close={handleClaimModal}
            username={username}
            roomID={roomID}
            ff={catFull}
          />
        </Modal>
        <Modal
          animationType="fade"
          transparent={false}
          visible={boardModal}
          onRequestClose={() => {
            setboardModal(false);
          }}
        >
          <Board done={calling.done || null} />
        </Modal>

        <View style={styles.prevContainer}>
          <Previous
            arr={calling.done || [0, 0, 0, 0, 0]}
            style={styles.previous}
          ></Previous>
        </View>
        <View style={styles.container}>
          <StatusBar hidden />
          <View style={styles.adView}>
            <AdMobBanner
              bannerSize="fullBanner"
              adUnitID="ca-app-pub-7508456089542607/5595268650"
              servePersonalizedAds
              onDidFailToReceiveAdWithError={(bannerError) =>
                console.log(bannerError)
              }
            />
          </View>

          <Calling
            number={calling.number || 0}
            style={styles.calling}
          ></Calling>
          <Ticket
            style={styles.rect}
            ticket={ticket}
            done={calling.done}
            updateMark={updateMarked}
          />
          <View style={styles.buttonContainer2}>
            <Bar
              clickClaimModal={handleClaimModal}
              clickBoardModal={handleBoardModal}
              clickRulesModal={() => {
                alert("Coming soon");
              }}
            />
          </View>
        </View>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 5,
    backgroundColor: "rgba(227,214,214,1)",
  },
  adView: { alignSelf: "center" },
  button: {
    width: 120,
    height: 48,
    backgroundColor: "rgba(242,163,101,1)",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-evenly",
  },
  buttonContainer2: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 15,
  },

  rect: {
    width: 400,
    height: 200,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 30,
  },
  previous: {
    height: 80,
    width: "100%",
    marginTop: 10,
  },
  prevContainer: {
    alignSelf: "center",
    flex: 1,
  },
  calling: {
    height: 170,
    width: 170,
    marginTop: 30,
    alignSelf: "center",
  },
  callingContainer: {
    justifyContent: "center",
    alignContent: "center",
    margin: 30,
  },
});

export default Game;
