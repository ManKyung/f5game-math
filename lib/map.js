export const operArr = ["*", "+", "-"];

const typeArr = {
  n: "number",
  o: "oper",
  a: "answer",
  e: "empty",
};

const setColumnActive = (type) => {
  return type !== "n" ? true : false;
};

// const stage = ["easy", "meduim", "hard"];
const column = (type) => {
  return {
    type: typeArr[type],
    value: null,
    active: setColumnActive(type),
    isCorrect: false,
  };
};

let easyCount = [],
  mediumCount = [],
  hardCount = [],
  crazyCount = [];
for (let i = 1; i < 10; i++) {
  let t = {
    number: i,
    isNumberClick: false,
  };
  easyCount.push(t);
  mediumCount.push(t);
  hardCount.push(t);
}
for (let i = 11; i < 20; i++) {
  let t = {
    number: i,
    isNumberClick: false,
  };
  crazyCount.push(t);
}

let resetItem = {
  number: -1,
  isNumberClick: false,
};
easyCount.push(resetItem);
mediumCount.push(resetItem);
hardCount.push(resetItem);
crazyCount.push(resetItem);

const maps = {
  easy: {
    min: 1,
    max: 9,
    count: easyCount,
    numberCount: 4,
    map: [
      [column("n"), column("o"), column("n"), column("a")],
      [column("o"), column("e"), column("o"), column("e")],
      [column("n"), column("o"), column("n"), column("a")],
      [column("a"), column("e"), column("a"), column("e")],
    ],
  },
  medium: {
    min: 1,
    max: 9,
    count: mediumCount,
    numberCount: 6,
    map: [
      [
        column("n"),
        column("o"),
        column("n"),
        column("o"),
        column("n"),
        column("a"),
      ],
      [
        column("o"),
        column("e"),
        column("o"),
        column("e"),
        column("o"),
        column("e"),
      ],
      [
        column("n"),
        column("o"),
        column("n"),
        column("o"),
        column("n"),
        column("a"),
      ],
      [
        column("a"),
        column("e"),
        column("a"),
        column("e"),
        column("a"),
        column("e"),
      ],
    ],
  },
  hard: {
    min: 1,
    max: 9,
    count: hardCount,
    numberCount: 9,
    map: [
      [
        column("n"),
        column("o"),
        column("n"),
        column("o"),
        column("n"),
        column("a"),
      ],
      [
        column("o"),
        column("e"),
        column("o"),
        column("e"),
        column("o"),
        column("e"),
      ],
      [
        column("n"),
        column("o"),
        column("n"),
        column("o"),
        column("n"),
        column("a"),
      ],
      [
        column("o"),
        column("e"),
        column("o"),
        column("e"),
        column("o"),
        column("e"),
      ],
      [
        column("n"),
        column("o"),
        column("n"),
        column("o"),
        column("n"),
        column("a"),
      ],
      [
        column("a"),
        column("e"),
        column("a"),
        column("e"),
        column("a"),
        column("e"),
      ],
    ],
  },
  crazy: {
    min: 10,
    max: 19,
    count: crazyCount,
    numberCount: 9,
    map: [
      [
        column("n"),
        column("o"),
        column("n"),
        column("o"),
        column("n"),
        column("a"),
      ],
      [
        column("o"),
        column("e"),
        column("o"),
        column("e"),
        column("o"),
        column("e"),
      ],
      [
        column("n"),
        column("o"),
        column("n"),
        column("o"),
        column("n"),
        column("a"),
      ],
      [
        column("o"),
        column("e"),
        column("o"),
        column("e"),
        column("o"),
        column("e"),
      ],
      [
        column("n"),
        column("o"),
        column("n"),
        column("o"),
        column("n"),
        column("a"),
      ],
      [
        column("a"),
        column("e"),
        column("a"),
        column("e"),
        column("a"),
        column("e"),
      ],
    ],
  },
};

const getRandomNumber = (min, max) => {
  // 1 ~ 9
  const r = Math.random() * (max + 1 - min) + min;
  return Math.floor(r);
};

const getRandomOper = () => {
  const r = Math.floor(Math.random() * (2 - 0 + 1)) + 0;
  return operArr[r];
};

export const numberCalc = (
  num1 = "",
  oper1 = "",
  num2 = "",
  oper2 = "",
  num3 = ""
) => {
  if (num1 && oper1 && num2 && oper2 && num3) {
    return Number(eval(`${num1}${oper1}${num2}${oper2}${num3}`));
  } else if (num1 && oper1 && num2) {
    return Number(eval(`${num1}${oper1}${num2}`));
  } else {
    return -99;
  }
};

const getAnswer = (items, level) => {
  switch (level) {
    case "easy":
      items[0][3].value = numberCalc(
        items[0][0].value,
        items[0][1].value,
        items[0][2].value
      );
      items[2][3].value = numberCalc(
        items[2][0].value,
        items[2][1].value,
        items[2][2].value
      );
      items[3][0].value = numberCalc(
        items[0][0].value,
        items[1][0].value,
        items[2][0].value
      );
      items[3][2].value = numberCalc(
        items[0][2].value,
        items[1][2].value,
        items[2][2].value
      );
      break;
    case "medium":
      items[0][5].value = numberCalc(
        items[0][0].value,
        items[0][1].value,
        items[0][2].value,
        items[0][3].value,
        items[0][4].value
      );
      items[2][5].value = numberCalc(
        items[2][0].value,
        items[2][1].value,
        items[2][2].value,
        items[2][3].value,
        items[2][4].value
      );
      items[3][0].value = numberCalc(
        items[0][0].value,
        items[1][0].value,
        items[2][0].value
      );
      items[3][2].value = numberCalc(
        items[0][2].value,
        items[1][2].value,
        items[2][2].value
      );
      items[3][4].value = numberCalc(
        items[0][4].value,
        items[1][4].value,
        items[2][4].value
      );
      break;
    case "hard":
      items[0][5].value = numberCalc(
        items[0][0].value,
        items[0][1].value,
        items[0][2].value,
        items[0][3].value,
        items[0][4].value
      );
      items[2][5].value = numberCalc(
        items[2][0].value,
        items[2][1].value,
        items[2][2].value,
        items[2][3].value,
        items[2][4].value
      );
      items[4][5].value = numberCalc(
        items[4][0].value,
        items[4][1].value,
        items[4][2].value,
        items[4][3].value,
        items[4][4].value
      );
      items[5][0].value = numberCalc(
        items[0][0].value,
        items[1][0].value,
        items[2][0].value,
        items[3][0].value,
        items[4][0].value
      );
      items[5][2].value = numberCalc(
        items[0][2].value,
        items[1][2].value,
        items[2][2].value,
        items[3][2].value,
        items[4][2].value
      );
      items[5][4].value = numberCalc(
        items[0][4].value,
        items[1][4].value,
        items[2][4].value,
        items[3][4].value,
        items[4][4].value
      );
      break;
    case "crazy":
      items[0][5].value = numberCalc(
        items[0][0].value,
        items[0][1].value,
        items[0][2].value,
        items[0][3].value,
        items[0][4].value
      );
      items[2][5].value = numberCalc(
        items[2][0].value,
        items[2][1].value,
        items[2][2].value,
        items[2][3].value,
        items[2][4].value
      );
      items[4][5].value = numberCalc(
        items[4][0].value,
        items[4][1].value,
        items[4][2].value,
        items[4][3].value,
        items[4][4].value
      );
      items[5][0].value = numberCalc(
        items[0][0].value,
        items[1][0].value,
        items[2][0].value,
        items[3][0].value,
        items[4][0].value
      );
      items[5][2].value = numberCalc(
        items[0][2].value,
        items[1][2].value,
        items[2][2].value,
        items[3][2].value,
        items[4][2].value
      );
      items[5][4].value = numberCalc(
        items[0][4].value,
        items[1][4].value,
        items[2][4].value,
        items[3][4].value,
        items[4][4].value
      );
      break;
  }
  return items;
};

export const setInitGame = (level) => {
  let numberItems = [];
  let { numberCount, min, max, map } = maps[level];
  while (numberItems.length !== numberCount) {
    const randomNumber = getRandomNumber(min, max);
    if (!numberItems.includes(randomNumber)) {
      numberItems.push(randomNumber);
    }
  }
  let num = 0;
  map = map.map((row) => {
    return row.map((item) => {
      if (item.type === "number") {
        return {
          ...item,
          value: numberItems[num++],
        };
      } else if (item.type === "oper") {
        return {
          ...item,
          value: getRandomOper(),
        };
      } else {
        return item;
      }
    });
  });

  map = getAnswer(map, level);
  map = map.map((row) => {
    return row.map((item) => {
      if (item.type === "number") {
        return {
          ...item,
          value: "",
        };
      } else if (item.type === "answer") {
        return {
          ...item,
          isCorrect: false,
        };
      } else {
        return item;
      }
    });
  });
  maps[level].map = map;
  return maps[level];
};

export const isClear = (items) => {
  const len = items.length;
  const t = [];
  for (let i = 0; i < len; i++) {
    const _len = items[i].length;
    for (let j = 0; j < _len; j++) {
      if (items[i][j].type === "answer") {
        t.push(items[i][j]);
      }
    }
  }

  return t.every((item) => item.isCorrect === true);
};
