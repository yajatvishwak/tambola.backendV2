import React, { useState } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  Text,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";

import env from "../../variable";
import EntypoIcon from "react-native-vector-icons/Entypo";

import { useNavigation } from "@react-navigation/native";
import Axios from "axios";
import Global from "../../utility/Global";
const AsyncStore = require("../../utility/AsyncStore");

import MaterialsIcon from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Kohana } from "react-native-textinput-effects";
import AwesomeButton from "react-native-really-awesome-button";
import validator from "validator";

function SignUp(props) {
  const navigation = useNavigation();
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  const handlePress = () => {
    if (validator.isEmpty(name.trim())) {
      alert("Please fill your name");
    } else if (validator.isEmpty(username.trim())) {
      alert("Please fill your username");
    } else if (validator.isEmpty(password.trim())) {
      alert("Please fill your password");
    } else if (!validator.isEmail(email.trim())) {
      alert("Please enter a valid email");
    } else {
      Axios.post(env.apiUrl + "/user/signup", {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        username: username.trim(),
        password: password.trim(),
      })
        .then((res) => {
          const data = res.data;
          if (data === true) {
            Global.username = username;
            Global.isLoggedin = true;
            AsyncStore.storeData(Global);
            navigation.replace("Feed");
          } else {
            alert("Someting went wrong, Try again later");
          }
        })
        .catch((err) => {
          alert("There is a network issue");
          console.log(err);
        });
    }
  };

  return (
    <ScrollView style={styles.scrollview} fadingEdgeLength={0}>
      <View style={styles.container}>
        <StatusBar hidden />
        <View style={styles.textGroup}>
          <Text style={styles.heyThere}>Hey There!👋</Text>
          <Text style={styles.subHeading}>Let&#39;s start by knowing you</Text>
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
              label={"Name"}
              iconClass={MaterialsIcon}
              iconName={"adduser"}
              iconColor={"#f4d29a"}
              labelStyle={{ color: "#91627b" }}
              inputStyle={{ color: "#91627b" }}
              onChangeText={(text) => {
                setname(text);
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
              label={"Email"}
              iconClass={MaterialCommunityIcons}
              iconName={"email"}
              iconColor={"#f4d29a"}
              labelStyle={{ color: "#91627b" }}
              inputStyle={{ color: "#91627b" }}
              onChangeText={(text) => {
                setemail(text);
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
              label={"Phone Number(Optional)"}
              iconClass={MaterialsIcon}
              iconName={"phone"}
              iconColor={"#f4d29a"}
              labelStyle={{ color: "#91627b" }}
              inputStyle={{ color: "#91627b" }}
              onChangeText={(text) => {
                setphone(text);
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
              label={"Username (unique)"}
              iconClass={MaterialsIcon}
              iconName={"adduser"}
              iconColor={"#f4d29a"}
              labelStyle={{ color: "#91627b" }}
              inputStyle={{ color: "#91627b" }}
              onChangeText={(text) => {
                setusername(text);
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
              label={"Password"}
              iconClass={MaterialsIcon}
              iconName={"lock1"}
              iconColor={"#f4d29a"}
              labelStyle={{ color: "#91627b" }}
              inputStyle={{ color: "#91627b" }}
              secureTextEntry
              onChangeText={(text) => {
                setpassword(text);
              }}
            />
          </View>
        </View>

        <AwesomeButton
          width={120}
          height={40}
          borderRadius={30}
          backgroundColor={"#30475e"}
          backgroundDarker={"#222831"}
          style={{ alignSelf: "center", marginTop: 30 }}
          onPress={handlePress}
        >
          Signup
        </AwesomeButton>

        <View style={styles.icon2Row}>
          <TouchableOpacity
            onPress={() => {
              navigation.replace("Landing");
            }}
          >
            <EntypoIcon
              name="chevron-thin-left"
              style={styles.icon2}
            ></EntypoIcon>
          </TouchableOpacity>
        </View>

        <View style={styles.loremIpsum3Column}>
          <AwesomeButton
            progress
            width={120}
            height={40}
            borderRadius={30}
            backgroundColor={"#f2a365"}
            backgroundDarker={"#ab5f24"}
            style={{ alignSelf: "center" }}
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            Login?
          </AwesomeButton>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollview: {
    backgroundColor: "rgba(227,214,214,1)",
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(227,214,214,1)",
  },
  textGroup: {
    marginTop: 125,
  },
  heyThere: {
    fontFamily: "roboto-900",
    color: "#121212",
    fontSize: 30,
    marginTop: 25,

    marginLeft: 50,
  },
  subHeading: {
    fontFamily: "roboto-300",
    color: "#121212",
    marginTop: 17,
    marginLeft: 50,
  },
  rect: {
    width: 311,
    height: 373,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 14,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    elevation: 20,
    shadowOpacity: 0.3,
    shadowRadius: 10,
    marginTop: 50,

    alignSelf: "center",
  },
  name: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 23,
    width: 265,
    marginTop: 54,
    marginLeft: 23,
  },
  name1: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 23,
    width: 265,
    marginTop: 39,
    marginLeft: 23,
  },
  name2: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 23,
    width: 265,
    marginTop: 36,
    marginLeft: 23,
  },
  name4: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 23,
    width: 265,
    marginTop: 32,
    marginLeft: 22,
  },
  name3: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 23,
    width: 265,
    marginTop: 34,
    marginLeft: 23,
  },
  button: {
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
    shadowRadius: 100,
    borderRadius: 100,
    marginTop: 30,
    marginBottom: 50,
    alignSelf: "center",
  },
  icon: {
    color: "rgba(255,255,255,1)",
    fontSize: 30,
    height: 33,
    width: 30,
    marginTop: 11,
    marginLeft: 13,
  },
  loremIpsum2: {
    fontFamily: "roboto-900",
    color: "rgba(255,255,255,1)",
    fontSize: 50,
    marginTop: -59,
    marginLeft: 170,
  },
  icon2: {
    color: "rgba(128,128,128,1)",
    fontSize: 30,
  },
  loremIpsum3: {
    fontFamily: "roboto-100",
    color: "#121212",
  },
  button2: {
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
    marginTop: 12,
    marginLeft: "auto",

    justifyContent: "center",
    alignItems: "center",
  },
  login: {
    fontFamily: "roboto-900",
    color: "rgba(255,255,255,1)",
  },
  loremIpsum3Column: {
    alignSelf: "flex-end",
    marginTop: 50,
    paddingTop: 20,
    paddingRight: 20,
    position: "absolute",
  },
  icon2Row: {
    height: 59,
    flexDirection: "row",
    alignSelf: "flex-start",
    marginTop: 75,
    marginLeft: 20,
    position: "absolute",
  },
});

export default SignUp;
