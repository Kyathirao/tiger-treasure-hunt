import React from "react";
import axios from "axios";

export default async function MorseReq(str) {
  // const data = {
  //   text: "Hello world",
  // };
  // const response = await axios.get(
  //   `https://api.funtranslations.com/translate/morse?text=${word}`
  // );

  // return response.data;
  const morseCode = {
    A: ".-",
    B: "-...",
    C: "-.-.",
    D: "-..",
    E: ".",
    F: "..-.",
    G: "--.",
    H: "....",
    I: "..",
    J: ".---",
    K: "-.-",
    L: ".-..",
    M: "--",
    N: "-.",
    O: "---",
    P: ".--.",
    Q: "--.-",
    R: ".-.",
    S: "...",
    T: "-",
    U: "..-",
    W: ".--",
    X: "-..-",
    Y: "-.--",
    Z: "--..",
  };
  return str
    .toUpperCase()
    .split("")
    .map((el) => {
      return morseCode[el] ? morseCode[el] : el;
    })
    .join("");
}
