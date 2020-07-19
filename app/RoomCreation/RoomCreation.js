import React, { useState } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  Text,
  Switch,
  ScrollView,
} from "react-native";
import Axios from "axios";
import Global from "../../utility/Global";
import env from "../../variable";
import { useNavigation } from "@react-navigation/native";
import { AdMobBanner } from "expo-ads-admob";

import MaterialsIcon from "react-native-vector-icons/AntDesign";

import { Kohana } from "react-native-textinput-effects";
import AwesomeButton from "react-native-really-awesome-button";
import validator from "validator";
function RoomCreation(props) {
  const [roomid, setroomid] = useState("");
  const [type, settype] = useState(false);
  const [maxuser, setmaxuser] = useState(10);
  const [roomName, setroomName] = useState("");
  const [description, setdescription] = useState("");
  const [password, setpassword] = useState("");
  const navigation = useNavigation();

  const handleToggle = () => {
    settype(!type);
  };

  const handlePress = () => {
    if (
      !validator.isEmpty(roomid.trim()) &&
      !validator.isEmpty(roomName.trim()) &&
      !validator.isEmpty(description.trim()) &&
      maxuser >= 10
    ) {
      Axios.post(env.apiUrl + "/admin/createSession", {
        roomID: roomid.trim(),
        type: type ? "Private" : "Open",
        user: Global.username,
        settings: { category: ["FH", "FR", "SR", "TR"], maxUsers: maxuser },
        deets: { Roomname: roomName.trim(), description: description.trim() },
        secretKey: password.trim(),
      }).then((res) => {
        const data = res.data;
        if (data === true) {
          alert("Room Created!");
          navigation.replace("Feed");
        } else {
          alert(
            "Error in making room: The RoomID specified has already been used, choose another RoomID  "
          );
        }
      });
    } else {
      alert(
        "Error in making room: Fill in all fields properly. Make sure the number of users in Room is more than 10 and the room name is filled properly"
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar hidden />
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
      <Text style={styles.createRoom}>Create Room</Text>
      <Text style={styles.loremIpsum1}>Live sessions to host Tambola</Text>

      <View style={styles.wrap}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: 10,
          }}
        >
          <View
            style={{
              width: 300,
              height: 50,
              marginBottom: 10,
              alignSelf: "center",
            }}
          >
            <Kohana
              style={{ backgroundColor: "#f9f5ed", borderRadius: 7 }}
              label={"Room Name"}
              iconClass={MaterialsIcon}
              iconName={"book"}
              iconColor={"#f4d29a"}
              labelStyle={{ color: "#91627b" }}
              inputStyle={{ color: "#91627b" }}
              iconContainerStyle={{ padding: 17 }}
              onChangeText={(text) => {
                setroomName(text);
              }}
            />
          </View>
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: 10,
          }}
        >
          <View
            style={{
              width: 300,
              height: 50,
              marginBottom: 10,
              alignSelf: "center",
            }}
          >
            <Kohana
              style={{ backgroundColor: "#f9f5ed", borderRadius: 7 }}
              label={"Room ID (unique)"}
              iconClass={MaterialsIcon}
              iconName={"user"}
              iconColor={"#f4d29a"}
              labelStyle={{ color: "#91627b" }}
              inputStyle={{ color: "#91627b" }}
              iconContainerStyle={{ padding: 20 }}
              onChangeText={(text) => {
                setroomid(text);
              }}
            />
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontFamily: "roboto-500", marginTop: 3 }}>
            Private Room?
          </Text>
          <Switch value={type} onValueChange={handleToggle} />
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: 10,
          }}
        >
          <View
            style={{
              width: 300,
              height: 50,
              marginBottom: 10,
              alignSelf: "center",
            }}
          >
            <Kohana
              style={{
                backgroundColor: type ? "#f9f5ed" : "#C0C0C0",
                borderRadius: 7,
              }}
              label={"Password"}
              editable={type}
              iconClass={MaterialsIcon}
              iconName={"lock1"}
              iconColor={"#f4d29a"}
              labelStyle={{ color: "#91627b" }}
              inputStyle={{ color: "#91627b" }}
              iconContainerStyle={{ padding: 20 }}
              onChangeText={(text) => {
                setpassword(text);
              }}
            />
          </View>
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: 10,
          }}
        >
          <View
            style={{
              width: 300,
              height: 50,
              marginBottom: 10,
              alignSelf: "center",
            }}
          >
            <Kohana
              style={{ backgroundColor: "#f9f5ed", borderRadius: 7 }}
              label={"Maximum Players (10 by Default)"}
              iconClass={MaterialsIcon}
              iconName={"addusergroup"}
              iconColor={"#f4d29a"}
              labelStyle={{ color: "#91627b" }}
              inputStyle={{ color: "#91627b" }}
              iconContainerStyle={{ padding: 20 }}
              onChangeText={(text) => {
                setmaxuser(text);
              }}
            />
          </View>
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: 10,
          }}
        >
          <View
            style={{
              width: 300,
              height: 150,
              marginBottom: 10,
              alignSelf: "center",
            }}
          >
            <Kohana
              style={{ backgroundColor: "#f9f5ed", borderRadius: 7 }}
              label={"Description"}
              iconClass={MaterialsIcon}
              iconName={"info"}
              iconColor={"#f4d29a"}
              labelStyle={{ color: "#91627b" }}
              inputStyle={{ color: "#91627b" }}
              iconContainerStyle={{ padding: 17 }}
              multiline
              onChangeText={(text) => {
                setdescription(text);
              }}
            />
          </View>
        </View>

        <AwesomeButton
          width={140}
          height={50}
          borderRadius={30}
          backgroundColor={"#f2a365"}
          backgroundDarker={"#ab5f24"}
          style={{ alignSelf: "center", margin: 25 }}
          onPress={handlePress}
        >
          Create Room
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
  wrap: {
    alignSelf: "center",
  },
  loremIpsum1: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginTop: 5,
    marginLeft: 24,
  },
  createRoom: {
    fontFamily: "roboto-900",
    color: "#121212",
    fontSize: 25,
    marginTop: 35,
    marginLeft: 23,
  },
  placeholder: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 45,
    width: 309,
    backgroundColor: "rgba(230, 230, 230,1)",
    borderRadius: 15,
    margin: 20,
    textAlign: "center",
  },
  placeholderd: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 100,
    width: 309,
    backgroundColor: "rgba(230, 230, 230,1)",
    borderRadius: 15,
    margin: 20,
    textAlign: "center",
  },

  button1: {
    width: 140,
    height: 60,
    alignSelf: "center",
    backgroundColor: "rgba(242,163,101,1)",
    borderRadius: 9,
    marginBottom: 20,
  },
  createRoom2: {
    fontFamily: "roboto-700",
    color: "rgba(255,255,255,1)",
    fontSize: 20,
    marginTop: 18,
    marginLeft: 12,
  },
});

export default RoomCreation;
