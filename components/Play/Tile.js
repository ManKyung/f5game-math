import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { Text, StyleSheet, Dimensions, Image } from "react-native";
import { observer } from "mobx-react";
import { isClear } from "../../lib";
import useStore from "../../stores";
import { GameClearModal } from "./GameClearModal";

const screen = Dimensions.get("screen");
const containerPadding = 4;
const tilePadding = 1;

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

const getTileBackgroundColor = (item) => {
  let color = "";
  if (item.type === "answer") {
    color = "transparent";
  } else if (item.type === "number" && item.isStatus === true) {
    color = "#BEBFF4";
  } else if (item.active === true) {
    color = "#424392";
  } else if (item.active === false) {
    color = "#5f61bb";
  }
  return color;
};

const Tile = observer(({ navigation, data, level, number }) => {
  const { game, stage } = useStore();
  const [items, setData] = useState(data);
  const [isGameClearModal, setIsGameClearModal] = useState(false);

  const mapLen = items[0].length;
  const column = mapLen === 4 ? 4 : 6;
  const tileWidth = mapLen === 4 ? "25%" : "16%";
  const tileHeight =
    (screen.width - containerPadding * 2 - tilePadding * 2) / column;

  useEffect(() => {
    if (game.selectedNumber) {
      let row = game.currentRow;
      let col = game.currentCol;
      if (row !== null && col !== null) {
        let t = [...items];
        let tt = null;
        tt = { ...t[row][col] };
        tt.value = game.selectedNumber === -1 ? "" : game.selectedNumber;
        tt.isStatus = false;
        t[row][col] = tt;
        game.setCurrentRowCol(null, null);
        const d = game.isAnswer(t, level);
        setData(d);

        if (isClear(d)) {
          setTimeout(() => {
            setIsGameClearModal(true);
            game.setIsAnswerVisible(false);
            stage.setScore(level, number);
          }, 700);
        }
      }
    }
  }, [game.selectedNumber]);

  const doClick = (item, row, col) => {
    if (item.type !== "number") {
      return;
    }
    let t = [...items];
    let tt = null;
    t = t.map((row) => {
      return row.map((col) => {
        return {
          ...col,
          isStatus: false,
        };
      });
    });
    let d = [];
    if (game.selectedNumber) {
      let t = [...items];
      let tt = null;
      tt = { ...t[row][col] };
      tt.value = game.selectedNumber === -1 ? "" : game.selectedNumber;
      tt.isStatus = false;
      t[row][col] = tt;

      game.setCurrentRowCol(null, null);
      d = game.isAnswer(t, level);
      setData(d);
    } else if (item.value === "") {
      tt = { ...t[row][col] };
      if (game.currentRow === row && game.currentCol === col) {
        tt.isStatus = false;
        game.setCurrentRowCol(null, null);
      } else {
        tt.isStatus = true;
        game.setCurrentRowCol(row, col);
      }
      t[row][col] = tt;

      d = game.isAnswer(t, level);
      setData(d);
    } else if (item.value) {
      if (game.selectedNumber) {
        let t = [...items];
        let tt = null;
        tt = { ...t[row][col] };
        tt.value = game.selectedNumber === -1 ? "" : game.selectedNumber;
        tt.isStatus = false;
        t[row][col] = tt;

        game.setCurrentRowCol(null, null);
        d = game.isAnswer(t, level);
        setData(d);
      } else {
        return;
      }
    }

    if (isClear(d)) {
      setTimeout(() => {
        setIsGameClearModal(true);
        game.setIsAnswerVisible(false);
        stage.setScore(level, number);
      }, 700);
    }
  };
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
                    backgroundColor: getTileBackgroundColor(item),
                  }}
                >
                  {item.type === "oper" && item.value === "+" ? (
                    <Image
                      source={require("../../assets/images/plus.png")}
                      style={styles.operImage}
                    />
                  ) : null}
                  {item.type === "oper" && item.value === "-" ? (
                    <Image
                      source={require("../../assets/images/minus.png")}
                      style={styles.operImage}
                    />
                  ) : null}
                  {item.type === "oper" && item.value === "*" ? (
                    <Image
                      source={require("../../assets/images/multiply.png")}
                      style={styles.operImage}
                    />
                  ) : null}
                  {item.type === "number" || item.type === "answer" ? (
                    <Text
                      style={[
                        level === "crazy" && item.type === "answer"
                          ? styles.crazyText
                          : styles.text,
                        item.isCorrect ? styles.isCorrect : null,
                      ]}
                    >
                      {item.value}
                    </Text>
                  ) : null}
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
  crazyText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#fff",
  },
  isCorrect: {
    color: "#2ecc71",
  },
  operImage: {
    width: "40%",
    height: "40%",
  },
});

export default Tile;
