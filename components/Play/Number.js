import React, { useState, useCallback } from "react";
import styled from "styled-components/native";
import { Text } from "@ui-kitten/components";
import { Dimensions } from "react-native";
import { observer } from "mobx-react";
import useStore from "../../stores";

const containerPadding = 4;
const tilePadding = 2;
const screen = Dimensions.get("screen");
const numberTileWidth = "20%";
const numberTileHeight =
  (screen.width - containerPadding * 2 - tilePadding * 2) / 5;

const NumberOuterTile = styled.View`
  padding: 4px;
  width: ${numberTileWidth};
  height: ${numberTileHeight}px;
`;
const NumberInnerTile = styled.TouchableOpacity`
  height: 100%;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 10px;
  box-shadow: 0 9px #999;
`;
const NumberInnerTileText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 24px;
`;

const Number = observer(({ numbers, answerItems }) => {
  const { game } = useStore();
  const [prevNumber, setPrevNumber] = useState(0);
  const [items, setItems] = useState(numbers);

  const countClick = useCallback(
    (index, number) => {
      let t = items.map((item) => {
        return {
          ...item,
          isNumberClick: false,
        };
      });
      if (game.currentRow !== null && game.currentCol !== null) {
        setPrevNumber(number);
        game.setSelectedNumber(number);
        setTimeout(() => {
          game.setSelectedNumber("");
        }, 10);
      } else {
        if (number === prevNumber) {
          setPrevNumber(0);
          game.setSelectedNumber("");
        } else {
          t[index].isNumberClick = true;
          setPrevNumber(number);
          game.setSelectedNumber(number);
        }
      }

      setItems(t);
    },
    [prevNumber]
  );
  return (
    <>
      {items.map((item, index) => (
        <NumberOuterTile key={index} style={{ marginTop: index < 5 ? 20 : 0 }}>
          <NumberInnerTile
            style={{
              backgroundColor: item.isNumberClick ? "#5f61bb" : "#424392",
            }}
            onPress={() => countClick(index, item.number)}
          >
            <NumberInnerTileText>
              {item.number !== -1 ? item.number : ""}
            </NumberInnerTileText>
          </NumberInnerTile>
        </NumberOuterTile>
      ))}
      {game.isAnswerVisible ? (
        <Text style={{ fontSize: 24 }}>HINT: {answerItems.join(", ")}</Text>
      ) : null}
    </>
  );
});

export default Number;
