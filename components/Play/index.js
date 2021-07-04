import React, { useEffect } from "react";
import styled from "styled-components/native";
import {
  Layout,
  Icon,
  Text,
  Button,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";
import { StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { AdMobRewarded } from "expo-ads-admob";
import { setInitGame, Banner, Rewared } from "../../lib";
import useStore from "../../stores";
import Tile from "./Tile";
import Number from "./Number";

const Container = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 4px;
`;

const HintIcon = (props) => <Icon {...props} name="bulb-outline" />;

const renderRightActions = () => (
  <TopNavigationAction
    icon={() => (
      <Button
        appearance="ghost"
        status="warning"
        accessoryRight={HintIcon}
        onPress={async () => await Rewared()}
      >
        HINT
      </Button>
    )}
  />
);

export const Play = ({ navigation, route }) => {
  const { level, number } = route.params;
  const { game } = useStore();

  const maps = setInitGame(level);

  useEffect(() => {
    AdMobRewarded.addEventListener("rewardedVideoUserDidEarnReward", () => {
      game.setIsAnswerVisible(true);
    });
    return () => {
      game.setIsAnswerVisible(false);
    };
  }, []);

  return (
    <Layout style={styles.layout}>
      <StatusBar hidden />

      <TopNavigation
        title={() => {
          return (
            <Text category="h4">
              {level.toUpperCase()} {number}
            </Text>
          );
        }}
        accessoryRight={renderRightActions}
      />

      <Container>
        <Tile
          data={maps.map}
          level={level}
          navigation={navigation}
          number={number}
        />
        <Number numbers={maps.count} answerItems={maps.answerItems} />
      </Container>
      <Banner />
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
  view: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: 10,
  },
});
