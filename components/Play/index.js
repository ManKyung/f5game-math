import React from "react";
import { Layout } from "@ui-kitten/components";
import styled from "styled-components/native";
import { StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { setInitGame } from "../../lib";
import Tile from "./Tile";
import Number from "./Number";

const Container = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
`;

export const Play = ({ navigation, route }) => {
  const { level, number } = route.params;
  const maps = setInitGame(level);

  return (
    <Layout style={styles.layout}>
      <StatusBar hidden />
      <Container>
        <Tile
          data={maps.map}
          level={level}
          navigation={navigation}
          number={number}
        />
        <Number numbers={maps.count} />
      </Container>
    </Layout>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    backgroundColor: "#1F204C",
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
