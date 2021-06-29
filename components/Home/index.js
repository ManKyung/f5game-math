import React from "react";
import { View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Layout } from "@ui-kitten/components";
import { Cat } from "../../assets/animations";
import GradientButton from "react-native-gradient-buttons";

export const Home = ({ navigation }) => (
  <Layout
    style={{
      flex: 1,
    }}
  >
    <View style={styles.view}>
      <Cat />
    </View>
    <View style={styles.view}>
      <GradientButton
        text="START"
        width="70%"
        gradientBegin="#2eb9a2"
        gradientEnd="#52a08c"
        onPressAction={() => navigation.push("Stage")}
        style={{ marginTop: 80 }}
      />
      <StatusBar hidden={true} />
    </View>
  </Layout>
);

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#1F204C",
  },
});
