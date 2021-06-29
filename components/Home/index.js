import React from "react";
import { View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Layout } from "@ui-kitten/components";
// import { Sound } from "../../lib";
import { Cat } from "../../assets/animations";
import GradientButton from "react-native-gradient-buttons";

const stage = ["easy", "meduim", "hard"];

export const Home = ({ navigation }) => {
  const navi = (stage) => {
    // Sound.playSound("click");
    navigation.push(stage);
  };

  return (
    <Layout
      style={{
        flex: 1,
      }}
    >
      <View style={styles.view}>
        <Cat />
      </View>
      <View style={styles.view}>
        {stage.map((item, index) => (
          <GradientButton
            key={index}
            text={item.toUpperCase()}
            width="70%"
            gradientBegin="#5eb9a2"
            gradientEnd="#52a08c"
            onPressAction={() => navi(item)}
            style={{
              marginBottom: 20,
            }}
          />
        ))}
        <StatusBar hidden={true} />
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#27bf98",
  },
});
