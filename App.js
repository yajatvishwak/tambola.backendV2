import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const asyncStore = require("./utility/AsyncStore/");
const Stack = createStackNavigator();

import Landing from "./app/Landing/Landing";
import Login from "./app/Login/Login";
import SignUp from "./app/SignUp/SignUp";
import Feed from "./app/Feed/Feed";
import Deets from "./app/Deets/Deets";
import Game from "./app/Game/Game";
import Waiting from "./app/Waiting/Waiting";
import Global from "./utility/Global";
import Winners from "./app/Winners/Winners";
import AdminGame from "./app/Admin/AdminGame";
import RoomCreation from "./app/RoomCreation/RoomCreation";
import Logout from "./app/Logout/Logout";
import Howtoplay from "./app/HowtoPlay/Howtoplay";

console.disableYellowBox = true;

const getFonts = () => {
  return Font.loadAsync({
    "roboto-regular": require("./assets/fonts/roboto-regular.ttf"),
    "roboto-100": require("./assets/fonts/roboto-100.ttf"),
    "roboto-900": require("./assets/fonts/roboto-900.ttf"),
    "roboto-700": require("./assets/fonts/roboto-700.ttf"),
    "roboto-300": require("./assets/fonts/roboto-300.ttf"),
    "roboto-500": require("./assets/fonts/roboto-500.ttf"),
  });
};

export default function App() {
  const [fontLoaded, setfontLoaded] = useState(false);
  const [logged, setlogged] = useState(false);

  useEffect(() => {
    //console.log("this is");
    asyncStore
      .getData()
      .then((val) => {
        //console.log(val);

        if (val.isLoggedin === true) {
          console.log("User logged in");
          Global.isLoggedin = val.isLoggedin;
          Global.roomID = null;
          Global.username = val.username;
          setlogged(true);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  if (!fontLoaded) {
    return (
      <AppLoading startAsync={getFonts} onFinish={() => setfontLoaded(true)} />
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          {!logged && (
            <>
              <Stack.Screen name="Landing" component={Landing} />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Signup" component={SignUp} />
            </>
          )}
          <>
            <Stack.Screen name="Feed" component={Feed} />
            <Stack.Screen name="Waiting" component={Waiting} />
            <Stack.Screen name="Game" component={Game} />
            <Stack.Screen name="Deets" component={Deets} />
            <Stack.Screen name="Winners" component={Winners} />
            <Stack.Screen name="AdminGame" component={AdminGame} />
            <Stack.Screen name="RoomCreation" component={RoomCreation} />
            <Stack.Screen name="Logout" component={Logout} />
            <Stack.Screen name="Howtoplay" component={Howtoplay} />
          </>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
