import React, { useState, useCallback, useEffect } from "react";
import { Layout, Text } from "@ui-kitten/components";
import styled from "styled-components/native";
import { View, StyleSheet, Dimensions } from "react-native";
import { StatusBar } from "expo-status-bar";
// import { Sound } from "../../lib";
// import { Cat } from "../../assets/animations";
import { setInitGame } from "../../lib";
import Tile from "./Tile";
import Number from "./Number";
// import GradientButton from "react-native-gradient-buttons";

const containerPadding = 4;
const screen = Dimensions.get("screen");

const Container = styled.View`
  margin-top: 10px;
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${containerPadding}px;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
`;

export const Play = ({ navigation, route }) => {
  const { stage } = route.params;
  const maps = setInitGame(stage);

  return (
    <Layout style={styles.layout}>
      <StatusBar hidden />
      <Container>
        <Tile data={maps.map} stage={stage} />
        <Number numbers={maps.count} />
      </Container>
    </Layout>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#1F204C",
    // backgroundColor: "#111",
  },
  title: {
    fontSize: 44,
    fontWeight: "bold",
    marginTop: -4,
    letterSpacing: 1,
  },
  text: {
    fontSize: 24,
  },
});
