import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Hole from "./Hole";

function Ticket(props) {
  const row1 = [];
  const row2 = [];
  const row3 = [];
  const [marked, setmarked] = useState([]);
  const addtoMarked = (value) => {
    setmarked([...marked, value]);
    props.updateMark([...marked, value]);
  };
  const removefromMarked = (value) => {
    var index = marked.indexOf(value);
    var t = marked;
    if (index > -1) {
      t.splice(index, 1);
    }
    //setmarked(t);
    props.updateMark(t);
  };

  for (var i = 0; i < 9; i++) {
    row1.push(
      <Hole
        value={props.ticket[0][i]}
        done={props.done || null}
        addMarked={addtoMarked}
        removeMarked={removefromMarked}
      />
    );
  }
  for (var i = 0; i < 9; i++) {
    row2.push(
      <Hole
        value={props.ticket[1][i]}
        done={props.done || null}
        addMarked={addtoMarked}
        removeMarked={removefromMarked}
      />
    );
  }
  for (var i = 0; i < 9; i++) {
    row3.push(
      <Hole
        value={props.ticket[2][i]}
        done={props.done || null}
        addMarked={addtoMarked}
        removeMarked={removefromMarked}
      />
    );
  }
  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.buttonRow}>{row1}</View>
      <View style={styles.button1Row}>{row2}</View>
      <View style={styles.button2Row}>{row3}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  notMarkedText: {
    alignSelf: "center",
  },

  markedText: {
    fontFamily: "roboto-700",
    color: "rgba(255,255,255,1)",
    marginTop: 11,
    marginLeft: 9,
  },
  button5: {
    width: 38,
    height: 38,
    backgroundColor: "rgba(255,255,255,1)",
    borderWidth: 2,
    borderColor: "rgba(242,163,101,1)",
    borderRadius: 34,
    marginLeft: 3,
    marginRight: 3,
    alignContent: "center",
    justifyContent: "center",
  },

  buttonRow: {
    height: 36,
    flexDirection: "row",
    marginTop: 17,
    alignSelf: "center",
  },

  button1Row: {
    height: 36,
    flexDirection: "row",
    marginTop: 25,
  },

  button2Row: {
    height: 36,
    flexDirection: "row",
    marginTop: 25,
    alignSelf: "center",
  },
});

export default Ticket;
