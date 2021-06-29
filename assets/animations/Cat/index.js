import React from "react";
import LottieView from "lottie-react-native";

export const Cat = () => {
  return <LottieView source={require("./index.json")} autoPlay loop />;
};
