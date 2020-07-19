import * as Speech from "expo-speech";

const data = require("./tts.json");

const callOut = (number) => {
  var array = data[number];

  const element = array[Math.floor(Math.random() * array.length)];
  console.log(element);
  var speech = element + ".....the number..." + number;
  Speech.speak(speech);
};
exports.callOut = callOut;
