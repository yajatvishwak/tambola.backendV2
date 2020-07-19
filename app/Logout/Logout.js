import React from "react";
import { StyleSheet, View, Text } from "react-native";

const Logout = () => {
  return (
    <View style={styles.container}>
      <Text>
        You have been logged out. Please kill the app and open it again.
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Logout;
