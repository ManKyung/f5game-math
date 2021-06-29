import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components/native";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { observer } from "mobx-react";
import { isClear } from "../../lib";
import useStore from "../../stores";
import { GameClearModal } from "./GameClearModal";

const screen = Dimensions.get("screen");
const containerPadding = 4;
const tilePadding = 1;

// const tilePadding = 1;
const OuterTile = styled.View`
  padding: 4px;
`;

const InnerTile = styled.TouchableOpacity`
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  text-decoration: none;
  color: #fff;
  border: none;
  border-radius: 8px;
`;

const Tile = observer(({ navigation, data, level, number }) => {
  const { game, stage } = useStore();
  const [items, setData] = useState(data);
  const [isGameClearModal, setIsGameClearModal] = useState(false);

  const mapLen = items[0].length;
  const column = mapLen === 4 ? 4 : 6;
  const tileWidth = mapLen === 4 ? "25%" : "16%";
  const tileHeight =
    (screen.width - containerPadding * 2 - tilePadding * 2) / column;

  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsGameClearModal(true);
  //     stage.setScore(level, number);
  //   }, 2000);
  // }, []);
  const doClick = useCallback((item, row, col) => {
    if (!game.selectedNumber || item.type !== "number") {
      return;
    }
    let t = [...items];
    let tt = { ...t[row][col] };
    tt.value = game.selectedNumber === -1 ? "" : game.selectedNumber;
    t[row][col] = tt;
    const d = game.isAnswer(t, level);
    setData(d);
    if (isClear(d)) {
      setTimeout(() => {
        setIsGameClearModal(true);
        stage.setScore(level, number);
      }, 700);
    }
  }, []);
  return (
    <>
      {items.map((rows, row) => {
        {
          return rows.map((item, col) => {
            return (
              <OuterTile
                key={`${row}_${col}`}
                style={{
                  height: tileHeight,
                  width: tileWidth,
                  opacity: item.type === "empty" ? 0 : 1,
                }}
              >
                <InnerTile
                  onPress={() => doClick(item, row, col)}
                  style={{
                    backgroundColor:
                      item.type === "answer"
                        ? "transparent"
                        : item.active
                        ? "#424392"
                        : "#5f61bb",
                  }}
                >
                  <Text
                    style={[
                      styles.text,
                      item.isCorrect ? styles.isCorrect : null,
                    ]}
                  >
                    {item.value}
                  </Text>
                </InnerTile>
              </OuterTile>
            );
          });
        }
      })}
      {isGameClearModal ? (
        <GameClearModal
          setIsGameClearModal={setIsGameClearModal}
          navigation={navigation}
        />
      ) : null}
    </>
  );
});

const styles = StyleSheet.create({
  text: {
    fontWeight: "bold",
    fontSize: 24,
    color: "#fff",
  },
  isCorrect: {
    color: "#2ecc71",
  },
});

export default Tile;
