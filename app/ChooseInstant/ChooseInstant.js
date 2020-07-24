import React, { useState } from "react";
import { StyleSheet, View, Text, Modal } from "react-native";
import AwesomeButton from "react-native-really-awesome-button";
import { useNavigation } from "@react-navigation/native";
import { Kohana } from "react-native-textinput-effects";
import MaterialsIcon from "react-native-vector-icons/AntDesign";
import Spinner from "react-native-loading-spinner-overlay";

function ChooseInstant(props) {
  const navigation = useNavigation();
  const [loading, setloading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setname] = useState("");
  const [room, setroom] = useState("");
  return (
    <View style={styles.container}>
      <Spinner
        visible={loading}
        textContent={"Ongoing request. Please wait"}
        textStyle={styles.spinnerTextStyle}
      />

      <Modal
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <View
            style={{
              alignItems: "flex-start",
              alignSelf: "center",
              marginBottom: 30,
            }}
          >
            <Text style={styles.heyThere1}>Tamboola Quick Game</Text>
            <Text style={styles.loremIpsum}>
              Instant tambola game with predefined rules
            </Text>
          </View>
          <Text style={{ fontFamily: "roboto-500", marginBottom: 25 }}>
            Enter Room ID to join
          </Text>
          <View
            style={{
              width: 300,
              height: 50,
              marginBottom: 10,
            }}
          >
            <Kohana
              style={{ backgroundColor: "#f9f5ed", borderRadius: 7 }}
              label={"Room Id"}
              iconClass={MaterialsIcon}
              iconName={"adduser"}
              iconColor={"#f4d29a"}
              labelStyle={{ color: "#91627b" }}
              inputStyle={{ color: "#91627b" }}
              onChangeText={(text) => {
                setroom(text);
              }}
            />
          </View>
          <AwesomeButton
            width={130}
            borderRadius={10}
            backgroundColor={"#f2a365"}
            backgroundDarker={"#ab5f24"}
            style={{ alignSelf: "center" }}
            onPress={() => {
              setloading(true);
              if (name.length > 0) {
                setloading(false);
                navigation.replace("MatchingClient", {
                  username: name,
                  roomID: room,
                });
              } else {
                setloading(false);
                alert("Please enter a RoomID");
              }
            }}
          >
            Join game
          </AwesomeButton>
        </View>
      </Modal>
      <View style={styles.heyThere1Stack}>
        <Text style={styles.heyThere1}>Tamboola Quick Game</Text>
        <Text style={styles.loremIpsum}>
          Instant tambola game with predefined rules
        </Text>
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: 70,
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

      <View style={styles.buttonView}>
        <AwesomeButton
          width={130}
          borderRadius={10}
          backgroundColor={"#f2a365"}
          backgroundDarker={"#ab5f24"}
          style={{ alignSelf: "center" }}
          onPress={() => {
            setloading(true);
            if (name.length > 0) {
              setloading(false);
              navigation.replace("MatchingHost", { username: name });
            } else {
              setloading(false);
              alert("Please enter a name");
            }
          }}
        >
          Host a Game
        </AwesomeButton>
        <AwesomeButton
          width={130}
          borderRadius={10}
          backgroundColor={"#f2a365"}
          backgroundDarker={"#ab5f24"}
          style={{ alignSelf: "center" }}
          onPress={() => {
            if (name.length > 0) {
              setModalVisible(true);
            } else {
              alert("Please enter a name");
            }
          }}
        >
          Join a Game
        </AwesomeButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonView: {
    flexDirection: "row",
    margin: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingTop: 40,
  },
  container: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "rgba(227,214,214,1)",
  },
  heyThere1Stack: {
    width: 300,
    height: 35,
    marginLeft: 57,
  },
  heyThere1: {
    fontFamily: "roboto-900",
    color: "#121212",
    fontSize: 27,
  },
});

export default ChooseInstant;
