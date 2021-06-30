import { observable, runInAction } from "mobx";
import { numberCalc } from "../lib";

const isAnswerEasy = (items) => {
  items[0][3].isCorrect =
    items[0][3].value ===
    numberCalc(items[0][0].value, items[0][1].value, items[0][2].value);
  items[2][3].isCorrect =
    items[2][3].value ===
    numberCalc(items[2][0].value, items[2][1].value, items[2][2].value);
  items[3][0].isCorrect =
    items[3][0].value ===
    numberCalc(items[0][0].value, items[1][0].value, items[2][0].value);
  items[3][2].isCorrect =
    items[3][2].value ===
    numberCalc(items[0][2].value, items[1][2].value, items[2][2].value);
  return items;
};
const isAnswerMedium = (items) => {
  items[0][5].isCorrect =
    items[0][5].value ===
    numberCalc(
      items[0][0].value,
      items[0][1].value,
      items[0][2].value,
      items[0][3].value,
      items[0][4].value
    );
  items[2][5].isCorrect =
    items[2][5].value ===
    numberCalc(
      items[2][0].value,
      items[2][1].value,
      items[2][2].value,
      items[2][3].value,
      items[2][4].value
    );
  items[3][0].isCorrect =
    items[3][0].value ===
    numberCalc(items[0][0].value, items[1][0].value, items[2][0].value);
  items[3][2].isCorrect =
    items[3][2].value ===
    numberCalc(items[0][2].value, items[1][2].value, items[2][2].value);
  items[3][4].isCorrect =
    items[3][4].value ===
    numberCalc(items[0][4].value, items[1][4].value, items[2][4].value);
  return items;
};
const isAnswerHardAndCrazy = (items) => {
  items[0][5].isCorrect =
    items[0][5].value ===
    numberCalc(
      items[0][0].value,
      items[0][1].value,
      items[0][2].value,
      items[0][3].value,
      items[0][4].value
    );
  items[2][5].isCorrect =
    items[2][5].value ===
    numberCalc(
      items[2][0].value,
      items[2][1].value,
      items[2][2].value,
      items[2][3].value,
      items[2][4].value
    );
  items[4][5].isCorrect =
    items[4][5].value ===
    numberCalc(
      items[4][0].value,
      items[4][1].value,
      items[4][2].value,
      items[4][3].value,
      items[4][4].value
    );
  items[5][0].isCorrect =
    items[5][0].value ===
    numberCalc(
      items[0][0].value,
      items[1][0].value,
      items[2][0].value,
      items[3][0].value,
      items[4][0].value
    );
  items[5][2].isCorrect =
    items[5][2].value ===
    numberCalc(
      items[0][2].value,
      items[1][2].value,
      items[2][2].value,
      items[3][2].value,
      items[4][2].value
    );
  items[5][4].isCorrect =
    items[5][4].value ===
    numberCalc(
      items[0][4].value,
      items[1][4].value,
      items[2][4].value,
      items[3][4].value,
      items[4][4].value
    );

  return items;
};

const game = observable({
  selectedNumber: 0,
  setSelectedNumber(value) {
    this.selectedNumber = value;
  },
  isAnswer(items, stage) {
    let d = null;
    switch (stage) {
      case "easy":
        d = isAnswerEasy(items);
        break;
      case "medium":
        d = isAnswerMedium(items);
        break;
      case "hard":
        d = isAnswerHardAndCrazy(items);
        break;
      case "crazy":
        d = isAnswerHardAndCrazy(items);
        break;
    }
    return d;
  },
});

export default game;
