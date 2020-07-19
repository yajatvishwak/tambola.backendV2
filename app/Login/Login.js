import React, { Component, useState } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import MaterialsIcon from "react-native-vector-icons/AntDesign";
import { Kohana } from "react-native-textinput-effects";
import AwesomeButton from "react-native-really-awesome-button";

import axios from "axios";
import EntypoIcon from "react-native-vector-icons/Entypo";
import env from "../../variable";
const AsyncStore = require("../../utility/AsyncStore");
import validator from "validator";

import Global from "../../utility/Global";
import { useNavigation } from "@react-navigation/native";

function Login(props) {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  const navigation = useNavigation();
  const handleLoginButton = () => {
    if (!validator.isEmpty(username) && !validator.isEmpty(password)) {
      try {
        axios
          .post(env.apiUrl + "/user/login", {
            username: username,
            password: password,
          })
          .then((isMatch) => {
            if (isMatch.data === true) {
              Global.username = username;
              Global.isLoggedin = true;
              AsyncStore.storeData(Global);
              navigation.replace("Feed");
            } else {
              alert("Wrong Credentials");
            }
          })
          .catch((err) => {
            console.log(err);
            alert("There is a network issue.");
          });
      } catch (err) {
        alert("Check your network");
      }
    } else {
      alert("Please fill in all the fields");
    }
  };
  const handleUsernameTextBox = (np) => {
    setusername(np);
  };
  const handlePassTextBox = (np) => {
    setpassword(np);
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar hidden />
      <View style={styles.heyThere1Stack}>
        <Text style={styles.heyThere1}>Welcome Back!🤘</Text>
      </View>
      <Text style={styles.loremIpsum}>
        Glad to have you back. You look fine today
      </Text>
      <View style={styles.textWrap}>
        <View style={styles.usernameTextBox}>
          <Kohana
            style={{ backgroundColor: "#f9f5ed", borderRadius: 7 }}
            label={"Username"}
            iconClass={MaterialsIcon}
            iconName={"adduser"}
            iconColor={"#f4d29a"}
            labelStyle={{ color: "#91627b" }}
            inputStyle={{ color: "#91627b" }}
            iconContainerStyle={{ padding: 20 }}
            onChangeText={handleUsernameTextBox}
          />
        </View>
        <View style={styles.usernameTextBox}>
          <Kohana
            style={{ backgroundColor: "#f9f5ed", borderRadius: 7 }}
            label={"Password"}
            iconClass={MaterialsIcon}
            iconName={"lock1"}
            iconColor={"#f4d29a"}
            labelStyle={{ color: "#91627b" }}
            inputStyle={{ color: "#91627b" }}
            iconContainerStyle={{ padding: 20 }}
            onChangeText={handlePassTextBox}
            secureTextEntry={true}
          />
        </View>
      </View>

      <AwesomeButton
        width={130}
        progress
        borderRadius={10}
        backgroundColor={"#f2a365"}
        backgroundDarker={"#ab5f24"}
        style={{ alignSelf: "center" }}
        onPress={handleLoginButton}
      >
        Login
      </AwesomeButton>

      <View style={styles.icon1Row}>
        <TouchableOpacity
          onPress={() => {
            navigation.replace("Landing");
          }}
        >
          <EntypoIcon
            name="chevron-thin-left"
            style={styles.icon1}
          ></EntypoIcon>
        </TouchableOpacity>
      </View>
      <View style={styles.loremIpsum1Column}>
        <View style={styles.textStack}>
          <AwesomeButton
            width={120}
            height={40}
            borderRadius={30}
            backgroundColor={"#30475e"}
            backgroundDarker={"#222831"}
            style={{ alignSelf: "center" }}
            onPress={() => {
              navigation.replace("Signup");
            }}
          >
            Signup?
          </AwesomeButton>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(227,214,214,1)",
  },
  textWrap: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 75,
  },
  usernameTextBox: {
    width: 300,
    height: 50,
    marginBottom: 40,
    alignSelf: "center",
  },
  heyThere1: {
    fontFamily: "roboto-900",
    color: "#121212",
    fontSize: 27,
  },

  heyThere1Stack: {
    width: 245,
    height: 35,
    marginTop: 160,
    marginLeft: 50,
  },
  loremIpsum: {
    fontFamily: "roboto-300",
    color: "#121212",
    marginTop: 17,
    marginLeft: 50,
  },
  placeholder: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 52,
    width: 245,
    backgroundColor: "rgba(236,236,236,1)",
    textAlign: "center",
    borderRadius: 24,
    marginTop: 90,
    marginLeft: 33,
  },
  placeholder1: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 52,
    width: 245,
    backgroundColor: "rgba(236,236,236,1)",
    textAlign: "center",
    borderRadius: 24,
    marginTop: 75,
    marginLeft: 35,
  },
  icon1: {
    color: "rgba(128,128,128,1)",
    fontSize: 30,
  },
  loremIpsum1: {
    fontFamily: "roboto-100",
    color: "#121212",
  },
  text: {
    top: 6,
    left: 31,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
  },
  button1: {
    width: 105,
    height: 31,
    backgroundColor: "rgba(48,71,94,1)",
    borderRadius: 100,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 7,
      height: 7,
    },
    elevation: 75,
    shadowOpacity: 0.3,
    shadowRadius: 25,
    marginTop: 15,
    marginLeft: "auto",

    justifyContent: "center",
    alignItems: "center",
  },
  signup: {
    fontFamily: "roboto-900",
    color: "rgba(255,255,255,1)",
  },
  loremIpsum1Column: {
    alignSelf: "flex-end",
    marginTop: 50,
    paddingTop: 20,
    paddingRight: 20,
    position: "absolute",
  },
  icon1Row: {
    height: 59,
    flexDirection: "row",
    alignSelf: "flex-start",
    marginTop: 75,
    marginLeft: 20,
    position: "absolute",
  },
  icon2: {
    top: 10,
    left: 13,
    position: "absolute",
    color: "rgba(255,255,255,1)",
    fontSize: 30,
  },
  button2: {
    width: 55,
    height: 55,
    backgroundColor: "rgba(242,163,101,1)",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 5,
    shadowOpacity: 0.3,
    shadowRadius: 25,
    borderRadius: 100,
    marginTop: 30,
    marginBottom: 10,
    alignSelf: "center",
  },
  icon3: {
    color: "rgba(255,255,255,1)",
    fontSize: 30,
    height: 33,
    width: 30,
    marginTop: 12,
    marginLeft: 12,
  },
  icon2Stack: {
    width: 55,
    height: 55,
    marginTop: 561,
    marginLeft: 148,
  },
});

export default Login;
