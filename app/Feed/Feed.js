import React, { useState, useEffect } from "react";
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

import Session from "./components/Session";
import EntypoIcon from "react-native-vector-icons/Entypo";
import FeatherIcon from "react-native-vector-icons/Feather";
import Deets from "./../Deets/Deets";
import axios from "axios";
import env from "../../variable";
import Global from "../../utility/Global";
import { useNavigation } from "@react-navigation/native";
import { AdMobBanner } from "expo-ads-admob";
import { Searchbar } from "react-native-paper";

const AsyncStore = require("../../utility/AsyncStore");

function Feed(props) {
  var navigation = useNavigation();
  const [DeetsModal, setDeetsModal] = useState(false);
  const [Sessions, setSessions] = useState([]);
  const [selectedSession, setselectedSession] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [result, setresult] = useState([]);

  const onChangeSearch = (query) => {
    setSearchQuery(query);
    var arr = Sessions.filter((item) => {
      var strform = JSON.stringify(item);
      if (strform.indexOf(query) !== -1) return item;
    });
    setresult(arr);
  };

  const handleRoomPress = () => {
    axios
      .post(env.apiUrl + "/user/isAdmin", { username: Global.username })
      .then((res) => {
        //console.log(res.data);
        if (res.data.adminPresent === true) {
          Global.admin.isAdmin = res.data.admin.isAdmin;
          Global.admin.roomID = res.data.admin.roomID;
          AsyncStore.storeData(Global);
          navigation.replace("AdminGame");
        } else if (res.data === false) {
          navigation.navigate("RoomCreation");
          console.log("redirecting to room creation page");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (Global.roomID !== null) {
      alert("You are already in a room");
      navigation.replace("Game", { typeOfGame: "Session" });
    } else {
      axios.get(env.apiUrl + "/user/getSessions").then((res) => {
        var data = res.data;
        var arr = data.map((item) => {
          if (item.gameOver !== true) {
            return (
              <Session
                roomID={item.roomID}
                deets={item.deets}
                isActive={item.active}
                style={styles.session}
                type={item.type}
                item={item}
                openDeets={handleDeetsModal}
                updateSelected={handleSelSession}
                ownedBy={item.ownedBy}
              />
            );
          }
        });
        setSessions(arr);
      });
    }
  }, []);

  const handleDeetsModal = () => {
    setDeetsModal(!DeetsModal);
  };
  const handleSelSession = (session) => {
    setselectedSession(session);
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={false}
        visible={DeetsModal}
        onRequestClose={handleDeetsModal}
      >
        <Deets toggleDeetsModal={handleDeetsModal} session={selectedSession} />
      </Modal>

      <StatusBar hidden />
      <View style={styles.adView}>
        <AdMobBanner
          bannerSize="fullBanner"
          adUnitID="ca-app-pub-7508456089542607/6274210913"
          servePersonalizedAds
          onDidFailToReceiveAdWithError={(bannerError) =>
            console.log(bannerError)
          }
        />
      </View>
      <View style={styles.icon1Row}>
        <TouchableOpacity onPress={handleRoomPress}>
          <EntypoIcon name="shop" style={styles.icon1}></EntypoIcon>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            Alert.alert(
              "Logout?",
              "Tusi ja rahe ho? Tusi mat jao 😞",
              [
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel",
                },
                {
                  text: "Logout",
                  onPress: () => {
                    var res = AsyncStore.deleteData();
                    navigation.replace("Logout");
                  },
                },
              ],
              { cancelable: false }
            );
          }}
        >
          <FeatherIcon name="user" style={styles.icon2}></FeatherIcon>
        </TouchableOpacity>
      </View>
      <View style={{ alignSelf: "flex-start" }}>
        <Text style={styles.sessions}>Sessions</Text>
        <Text style={styles.joinAGame}>Join a game!</Text>
        <Searchbar
          style={{ marginLeft: 30, width: 350, alignSelf: "center" }}
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
      </View>
      <ScrollView style={styles.scrollview}>
        {searchQuery.length === 0 ? Sessions : result}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(227,214,214,1)",
  },
  scrollview: {
    alignSelf: "center",
  },
  adView: {
    alignSelf: "center",
  },
  session: {
    height: 200,
    width: 350,
    marginTop: 10,
    marginBottom: 20,
    shadowColor: "#adaba5",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sessions: {
    fontFamily: "roboto-700",
    color: "#121212",
    fontSize: 30,
    marginTop: 50,
    marginLeft: 30,
  },
  joinAGame: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginTop: 2,
    marginLeft: 30,
    marginBottom: 15,
  },
  icon1: {
    color: "rgba(128,128,128,1)",
    fontSize: 30,
    marginTop: 11,
  },
  buyCoupons: {
    color: "#121212",
    marginLeft: 7,
    marginTop: 18,
  },
  containerUser: {
    flexDirection: "row-reverse",
    flex: 1,
  },
  group: {
    width: 39,
    height: 47,
    alignSelf: "flex-end",
    marginRight: 20,
    position: "absolute",
  },
  button: {
    width: 39,
    height: 47,
  },
  icon2: {
    color: "rgba(128,128,128,1)",
    fontSize: 30,
    height: 30,
    width: 30,
    marginTop: 12,
    marginLeft: 3,
  },
  icon1Row: {
    height: 47,
    flexDirection: "row",
    marginTop: 25,
    marginLeft: 30,
    justifyContent: "space-between",
    marginRight: 30,
  },
});

export default Feed;
