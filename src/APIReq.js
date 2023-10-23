import React from "react";
import axios from "axios";

export default async function APIReq() {
  const response = await axios.get("https://riddles-api.vercel.app/random");
  return response.data;
}
