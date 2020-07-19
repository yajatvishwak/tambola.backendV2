import React from "react";
import { View, Image, Text, ScrollView, Clipboard } from "react-native";

import AwesomeButton from "react-native-really-awesome-button";
import Unorderedlist from "react-native-unordered-list";

const Howtoplay = () => {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "rgba(227, 214, 214, 1)" }}>
      <Text
        style={{
          fontFamily: "roboto-700",
          fontSize: 40,
          alignSelf: "flex-start",
          marginLeft: 15,
          marginTop: 30,
        }}
      >
        How to play?
      </Text>
      <Text
        style={{
          fontFamily: "roboto-300",
          fontSize: 17,
          alignSelf: "flex-start",
          marginLeft: 15,
          marginTop: 30,
          marginRight: 15,
          flexWrap: "wrap",
        }}
      >
        Welcome to Tamboola, an online live multiplayer game to play
        tambola/housie with your friends!{""} This game will allow you to play
        and host games of tambola/bingo/housie at the comfort of your home. This
        game is FREE to play.
      </Text>
      <Image
        source={require("../../assets/images/Landing.png")}
        resizeMode="contain"
        style={{ width: 360, height: 367, alignSelf: "center" }}
      ></Image>
      <Text
        style={{
          fontFamily: "roboto-500",
          fontSize: 30,
          alignSelf: "flex-start",
          marginLeft: 15,
        }}
      >
        Game Structure
      </Text>
      <Text
        style={{
          fontFamily: "roboto-300",
          fontSize: 17,
          alignSelf: "flex-start",
          marginLeft: 15,
          marginRight: 15,
          flexWrap: "wrap",
        }}
      >
        The game consists of 2 kinds of users namely:
      </Text>

      <View style={{ marginLeft: 15 }}>
        <Unorderedlist>
          <Text style={{ fontFamily: "roboto-300", fontSize: 17 }}>Admin</Text>
        </Unorderedlist>
        <Unorderedlist>
          <Text style={{ fontFamily: "roboto-300", fontSize: 17 }}>
            Players
          </Text>
        </Unorderedlist>
      </View>
      <Text
        style={{
          fontFamily: "roboto-regular",
          fontSize: 20,
          alignSelf: "flex-start",
          marginLeft: 15,
          marginTop: 15,
        }}
      >
        Admin
      </Text>
      <Text
        style={{
          fontFamily: "roboto-300",
          fontSize: 17,
          alignSelf: "flex-start",
          marginLeft: 15,
          marginRight: 15,
          flexWrap: "wrap",
        }}
      >
        A user is said to an Admin of the room if he/she owns the room. This
        kind of user will be granted addition powers to control the room. The
        functions that an Admin should take care of are:
      </Text>
      <View style={{ marginLeft: 15, marginRight: 15 }}>
        <Unorderedlist>
          <Text style={{ fontFamily: "roboto-300", fontSize: 17 }}>
            Structure the room i.e set the rooms ID, Room name, Description etc{" "}
          </Text>
        </Unorderedlist>
        <Unorderedlist>
          <Text style={{ fontFamily: "roboto-300", fontSize: 17 }}>
            Distribution of the room details to the players of the game using
            other platforms like Whatsapp etc
          </Text>
        </Unorderedlist>
        <Unorderedlist>
          <Text style={{ fontFamily: "roboto-300", fontSize: 17 }}>
            Set the types of winning category that the player can play for eg.
            First row, Second row etc (under development)
          </Text>
        </Unorderedlist>

        <Unorderedlist>
          <Text style={{ fontFamily: "roboto-300", fontSize: 17 }}>
            Monitor the game and Disconnect a user if required
          </Text>
        </Unorderedlist>
      </View>

      <Image
        source={require("../../assets/images/Screenshot_1594564312.png")}
        resizeMode="contain"
        style={{ width: 360, height: 500, margin: 20, alignSelf: "center" }}
      ></Image>

      <Text
        style={{
          fontFamily: "roboto-300",
          fontSize: 17,
          alignSelf: "flex-start",
          marginLeft: 15,
          marginRight: 15,
          flexWrap: "wrap",
        }}
      >
        This is the admin dashboard of a room. It can be used to control the
        game. It's functions are:
      </Text>
      <View style={{ marginLeft: 15, marginRight: 15 }}>
        <Unorderedlist>
          <Text style={{ fontFamily: "roboto-300", fontSize: 17 }}>
            Start a game - This will start the game for all your connected
            users. You can also set the interval of each number call
          </Text>
        </Unorderedlist>
        <Unorderedlist>
          <Text style={{ fontFamily: "roboto-300", fontSize: 17 }}>
            Pause a game - This will pause the number calling for time being. It
            can be started again by pressing the Start game button
          </Text>
        </Unorderedlist>
        <Unorderedlist>
          <Text style={{ fontFamily: "roboto-300", fontSize: 17 }}>
            Leaderboard - Show the current winners of the Game with their
            respective category
          </Text>
        </Unorderedlist>

        <Unorderedlist>
          <Text style={{ fontFamily: "roboto-300", fontSize: 17 }}>
            Reset a Game - This can be used to reset the game. All the called
            numbers and winners will be lost and the game starts fresh again
          </Text>
        </Unorderedlist>
        <Unorderedlist>
          <Text style={{ fontFamily: "roboto-300", fontSize: 17 }}>
            Disconnect - This button should be used to kick out a user from the
            room
          </Text>
        </Unorderedlist>
        <Unorderedlist>
          <Text style={{ fontFamily: "roboto-300", fontSize: 17 }}>
            Delete room - will delete the room and all it's connected players
            will be disconnected
          </Text>
        </Unorderedlist>
      </View>
      <Text
        style={{
          fontFamily: "roboto-300",
          fontSize: 17,
          alignSelf: "flex-start",
          marginLeft: 15,
          marginRight: 15,
          flexWrap: "wrap",
        }}
      >
        You can also see the numbers that are been called out in realtime,
        number of signed up users and the game state.
      </Text>

      <Text
        style={{
          fontFamily: "roboto-regular",
          fontSize: 20,
          alignSelf: "flex-start",
          marginLeft: 15,
          marginTop: 15,
        }}
      >
        Players
      </Text>
      <Text
        style={{
          fontFamily: "roboto-300",
          fontSize: 17,
          alignSelf: "flex-start",
          marginLeft: 15,
          marginRight: 15,
          flexWrap: "wrap",
        }}
      >
        A user is said to be a player if he/she owns no room. {""}Please note
        that the Admin of one room can be a player of someother room. That means
        if you own a room, you can still participate in some other room.
      </Text>
      <Image
        source={require("../../assets/images/Feed.png")}
        resizeMode="contain"
        style={{ width: 360, height: 500, margin: 20, alignSelf: "center" }}
      ></Image>

      <Text
        style={{
          fontFamily: "roboto-regular",
          fontSize: 20,
          alignSelf: "flex-start",
          marginLeft: 15,
          marginTop: 15,
        }}
      >
        How to Join a room?
      </Text>
      <Text
        style={{
          fontFamily: "roboto-300",
          fontSize: 17,
          alignSelf: "flex-start",
          marginLeft: 15,
          marginRight: 15,
          flexWrap: "wrap",
        }}
      >
        There are 2 types of Room an Admin can make - Open and Private
      </Text>
      <Text
        style={{
          fontFamily: "roboto-300",
          fontSize: 17,
          alignSelf: "flex-start",
          marginLeft: 15,
          marginRight: 15,
          flexWrap: "wrap",
        }}
      >
        An Open room requires no password while a Private room requires a
        password to join.
      </Text>
      <Text
        style={{
          fontFamily: "roboto-300",
          fontSize: 17,
          alignSelf: "flex-start",
          marginLeft: 15,
          marginRight: 15,
          flexWrap: "wrap",
        }}
      >
        To join a room, Press Register on one of the room you want to join.
      </Text>
      <Text
        style={{
          fontFamily: "roboto-300",
          fontSize: 17,
          alignSelf: "flex-start",
          marginLeft: 15,
          marginRight: 15,
          flexWrap: "wrap",
        }}
      >
        By defaut the Join room button is disabled. You have to first Sign up in
        the Room to activate the Join button
      </Text>
      <Text
        style={{
          fontFamily: "roboto-300",
          fontSize: 17,
          alignSelf: "flex-start",
          marginLeft: 15,
          marginRight: 15,
          flexWrap: "wrap",
        }}
      >
        To Sign up do the following, Click "Signup Room" button
      </Text>

      <Image
        source={require("../../assets/images/Feed2.png")}
        resizeMode="contain"
        style={{ width: 360, height: 500, margin: 20, alignSelf: "center" }}
      ></Image>
      <Text
        style={{
          fontFamily: "roboto-300",
          fontSize: 17,
          alignSelf: "flex-start",
          marginLeft: 15,
          marginRight: 15,
          flexWrap: "wrap",
        }}
      >
        Now You can enter the password given by your Room Admin and Press Join
        with 🔑 If your room is an Open room you can leave it blank and just
        press the button
      </Text>
      <Image
        source={require("../../assets/images/Feed3.png")}
        resizeMode="contain"
        style={{ width: 360, height: 500, margin: 20, alignSelf: "center" }}
      ></Image>
      <Text
        style={{
          fontFamily: "roboto-300",
          fontSize: 17,
          alignSelf: "flex-start",
          marginLeft: 15,
          marginRight: 15,
          flexWrap: "wrap",
        }}
      >
        You are now Signed Up for the game. This process usually takes place a
        time period before the actually game starts. YOU ARE NOW ELIGIBLE TO
        JOIN THE ROOM
      </Text>
      <Image
        source={require("../../assets/images/Feed4.png")}
        resizeMode="contain"
        style={{ width: 360, height: 500, margin: 20, alignSelf: "center" }}
      ></Image>
      <Text
        style={{
          fontFamily: "roboto-300",
          fontSize: 17,
          alignSelf: "flex-start",
          marginLeft: 15,
          marginRight: 15,
          flexWrap: "wrap",
        }}
      >
        Click The Join Room, you will be redirected to the Waiting area if the
        game has not started yet. If the game has started, You will directly be
        taken to the Game page
      </Text>
      <Image
        source={require("../../assets/images/Feed5.png")}
        resizeMode="contain"
        style={{ width: 360, height: 500, margin: 20, alignSelf: "center" }}
      ></Image>
      <Text
        style={{
          fontFamily: "roboto-300",
          fontSize: 17,
          alignSelf: "flex-start",
          marginLeft: 15,
          marginRight: 15,
          flexWrap: "wrap",
        }}
      >
        Waiting room will be directed to Game page as soon as Admin starts the
        game
      </Text>
      <Image
        source={require("../../assets/images/Feed6.png")}
        resizeMode="contain"
        style={{ width: 360, height: 500, margin: 20, alignSelf: "center" }}
      ></Image>
      <Text
        style={{
          fontFamily: "roboto-300",
          fontSize: 17,
          alignSelf: "flex-start",
          marginLeft: 15,
          marginRight: 15,
          flexWrap: "wrap",
        }}
      >
        This game is under active development. V 0.0.2
      </Text>
      <Text
        style={{
          fontFamily: "roboto-300",
          fontSize: 17,
          alignSelf: "flex-start",
          marginLeft: 15,
          marginRight: 15,
          marginBottom: 15,
          flexWrap: "wrap",
        }}
      >
        Reach me out at +91 7892244194 for futher assistance
      </Text>
      <AwesomeButton
        width={300}
        borderRadius={10}
        backgroundColor={"#30475e"}
        backgroundDarker={"#222831"}
        style={{ alignSelf: "center", margin: 15 }}
        onPress={() => {
          Clipboard.setString("+91 7892244194");
          alert("Copied Number to clipboard");
        }}
      >
        Copy number to clipboard
      </AwesomeButton>
    </ScrollView>
  );
};

export default Howtoplay;
