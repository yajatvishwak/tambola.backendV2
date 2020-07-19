import React, { Component } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import AwesomeButton from "react-native-really-awesome-button";
import { useNavigation } from "@react-navigation/native";

function Landing(props) {
  const navigation = useNavigation();
  return (
    <ScrollView>
      <View style={styles.container}>
        <StatusBar hidden />
        <Image
          source={require("../../assets/images/Landing.png")}
          resizeMode="contain"
          style={styles.image}
        ></Image>

        <View style={styles.rect}>
          <View style={styles.buttonContainer}>
            <View style={styles.groupRow}>
              <View style={styles.group}>
                <AwesomeButton
                  progress
                  width={130}
                  borderRadius={10}
                  backgroundColor={"#f2a365"}
                  backgroundDarker={"#ab5f24"}
                  style={{ alignSelf: "center" }}
                  onPress={() => {
                    navigation.replace("Login");
                  }}
                >
                  Login
                </AwesomeButton>
              </View>
              <View style={styles.group2}>
                <AwesomeButton
                  width={130}
                  borderRadius={10}
                  backgroundColor={"#30475e"}
                  backgroundDarker={"#222831"}
                  style={{ alignSelf: "center" }}
                  onPress={() => {
                    navigation.replace("Signup");
                  }}
                >
                  Signup
                </AwesomeButton>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Howtoplay");
              }}
            >
              <Text style={styles.howToPlay}>How to play?</Text>
            </TouchableOpacity>
          </View>
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

  image: {
    width: 360,
    height: 367,
    marginTop: 151,
    alignSelf: "center",
  },
  rect: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 33,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderWidth: 0,
    borderColor: "#000000",
    flex: 1,
    marginTop: 150,
  },
  buttonContainer: {
    flexDirection: "column",
    alignSelf: "center",
    marginLeft: 20,
  },
  group: {
    width: 120,
    height: 48,
    backgroundColor: "rgba(255,255,255,1)",
  },
  button: {
    width: 120,
    height: 48,
    backgroundColor: "rgba(242,163,101,1)",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  login: {
    fontFamily: "roboto-900",
    color: "rgba(255,255,255,1)",
  },
  group2: {
    width: 120,
    height: 48,
    backgroundColor: "rgba(255,255,255,1)",
    marginLeft: 37,
  },
  button1: {
    width: 120,
    height: 48,
    backgroundColor: "rgba(255,255,255,0)",
    borderRadius: 12,
    borderWidth: 4,
    borderColor: "rgba(242,163,101,1)",
    justifyContent: "center",
    alignItems: "center",
  },
  signUp: {
    fontFamily: "roboto-900",
    color: "#121212",
  },
  groupRow: {
    height: 48,
    flexDirection: "row",
    marginTop: 46,
    marginLeft: 45,
    marginRight: 38,
  },
  howToPlay: {
    fontFamily: "roboto-900",
    color: "rgba(179, 179, 179,1)",
    marginTop: 22,
    marginLeft: 141,
    opacity: 50,
    marginBottom: 40,
  },
});

export default Landing;
