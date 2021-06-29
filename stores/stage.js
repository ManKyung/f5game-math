import { observable, runInAction } from "mobx";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getInitStage = () => {
  let levels = [];
  for (let i = 1; i <= 100; i++) {
    levels.push({
      number: i,
      isClear: false,
    });
  }
  return levels;
};

const getScores = (level) => {
  // AsyncStorage.removeItem(`f5_math_${level}_scores`);
  return new Promise(async (resolve) => {
    const scores = await AsyncStorage.getItem(`f5_math_${level}_scores`);
    resolve(scores ? JSON.parse(scores) : getInitStage());
  });
};

const stage = observable({
  levels: {
    easy: getInitStage(),
    medium: getInitStage(),
    hard: getInitStage(),
    crazy: getInitStage(),
  },
  async getScores(level) {
    let scores = await getScores(level);
    runInAction(() => {
      this.levels[level] = scores;
    });
  },
  async setScore(level, number) {
    let scores = await getScores(level);

    scores[number - 1].isClear = true;
    const d = await AsyncStorage.setItem(
      `f5_math_${level}_scores`,
      JSON.stringify(scores)
    );
    runInAction(() => {
      this.levels[level] = scores;
    });
  },
});

export default stage;
