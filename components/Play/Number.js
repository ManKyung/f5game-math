import React, { useState, useCallback } from "react";
import styled from "styled-components/native";
import { Dimensions, View } from "react-native";
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
  font-size: 24px;
  text-decoration: none;
`;

const Number = observer(({ numbers }) => {
  const { game } = useStore();
  const [items, setItems] = useState(numbers);

  const countClick = useCallback((index, number) => {
    let t = items.map((item, number) => {
      return {
        ...item,
        isNumberClick: false,
      };
    });
    t[index].isNumberClick = !t[index].isNumberClick;
    setItems([...t]);
    game.setSelectedNumber(number);
  }, []);
  return (
    <>
      {items.map((item, index) => (
        <NumberOuterTile key={index} style={{ marginTop: index < 5 ? 70 : 0 }}>
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
    </>
  );
});

export default Number;
